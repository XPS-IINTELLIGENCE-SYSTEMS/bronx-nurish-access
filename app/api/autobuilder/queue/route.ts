import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

type SqlClient = ReturnType<typeof db> extends null ? never : NonNullable<ReturnType<typeof db>>;

const COMMAND_TYPES = [
  "generate_content",
  "generate_video_script",
  "generate_asset_prompt",
  "create_qr_package",
  "create_partner_pack",
  "export_social",
  "run_claim_scan",
  "run_launch_audit",
  "build_daily_report"
];

const COMMAND_STATUSES = [
  "draft",
  "pending_review",
  "approved",
  "blocked",
  "executing",
  "executed",
  "failed"
];

function authorized(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function db() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
}

async function ensureAutoBuilderTable(sql: SqlClient) {
  await sql`
    create table if not exists bna_autobuilder_commands (
      id bigserial primary key,
      created_at timestamptz default now(),
      updated_at timestamptz default now(),
      command_type text not null,
      status text default 'draft',
      title text,
      prompt text,
      payload jsonb default '{}'::jsonb,
      output jsonb default '{}'::jsonb,
      approval_required boolean default true,
      approved_by text,
      approved_at timestamptz,
      executed_at timestamptz,
      github_issue_url text,
      github_pr_url text,
      notes text,
      constraint bna_autobuilder_command_type_check check (command_type in (
        'generate_content',
        'generate_video_script',
        'generate_asset_prompt',
        'create_qr_package',
        'create_partner_pack',
        'export_social',
        'run_claim_scan',
        'run_launch_audit',
        'build_daily_report'
      )),
      constraint bna_autobuilder_status_check check (status in (
        'draft',
        'pending_review',
        'approved',
        'blocked',
        'executing',
        'executed',
        'failed'
      ))
    )
  `;

  await sql`create index if not exists bna_autobuilder_commands_status_idx on bna_autobuilder_commands (status)`;
  await sql`create index if not exists bna_autobuilder_commands_type_idx on bna_autobuilder_commands (command_type)`;
  await sql`create index if not exists bna_autobuilder_commands_created_idx on bna_autobuilder_commands (created_at desc)`;
}

function asObject(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const sql = db();
  if (!sql) return NextResponse.json({ ok: false, message: "Database env missing" }, { status: 503 });

  await ensureAutoBuilderTable(sql);

  const rows = await sql`
    select id, created_at, updated_at, command_type, status, title, prompt, payload, output, approval_required, approved_by, approved_at, executed_at, github_issue_url, github_pr_url, notes
    from bna_autobuilder_commands
    order by created_at desc
    limit 100
  `;

  return NextResponse.json({
    ok: true,
    mode: "queue_only",
    executesAutomatically: false,
    publishesContent: false,
    items: rows
  });
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const sql = db();
  if (!sql) return NextResponse.json({ ok: false, message: "Database env missing" }, { status: 503 });

  await ensureAutoBuilderTable(sql);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const commandType = String(body.commandType || body.command_type || "");
  if (!COMMAND_TYPES.includes(commandType)) {
    return NextResponse.json({ ok: false, message: "Invalid command type", allowed: COMMAND_TYPES }, { status: 400 });
  }

  const requestedStatus = String(body.status || "draft");
  const status = COMMAND_STATUSES.includes(requestedStatus) ? requestedStatus : "draft";

  if (["executing", "executed"].includes(status)) {
    return NextResponse.json({ ok: false, message: "Queue route does not execute commands. Use draft, pending_review, approved, blocked, or failed." }, { status: 400 });
  }

  const title = String(body.title || commandType);
  const prompt = String(body.prompt || "");
  const payload = asObject(body.payload);
  const approvalRequired = body.approvalRequired === false || body.approval_required === false ? false : true;
  const githubIssueUrl = body.githubIssueUrl ? String(body.githubIssueUrl) : null;
  const githubPrUrl = body.githubPrUrl ? String(body.githubPrUrl) : null;
  const notes = body.notes ? String(body.notes) : "Queued only. No automatic execution, publishing, sending, or posting.";

  const inserted = await sql`
    insert into bna_autobuilder_commands (
      command_type,
      status,
      title,
      prompt,
      payload,
      approval_required,
      github_issue_url,
      github_pr_url,
      notes
    ) values (
      ${commandType},
      ${status},
      ${title},
      ${prompt},
      ${JSON.stringify(payload)}::jsonb,
      ${approvalRequired},
      ${githubIssueUrl},
      ${githubPrUrl},
      ${notes}
    )
    returning id, created_at, command_type, status, title, approval_required
  `;

  await sql`
    insert into bna_proof_log (loop_name, status, message, source_table, source_id, evidence)
    values ('autobuilder-queue', 'queued', 'AutoBuilder command queued without execution', 'bna_autobuilder_commands', ${inserted[0]?.id}, ${JSON.stringify({ commandType, status, executesAutomatically: false, publishesContent: false })}::jsonb)
  `;

  return NextResponse.json({
    ok: true,
    mode: "queue_only",
    executesAutomatically: false,
    publishesContent: false,
    item: inserted[0]
  }, { status: 201 });
}
