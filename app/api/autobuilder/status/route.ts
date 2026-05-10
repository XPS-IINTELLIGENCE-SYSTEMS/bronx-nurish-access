import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

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

async function ensureAutoBuilderTable(sql: ReturnType<typeof neon>) {
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

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const sql = db();
  if (!sql) {
    return NextResponse.json({ ok: false, message: "Database env missing" }, { status: 503 });
  }

  await ensureAutoBuilderTable(sql);

  const totals = await sql`
    select
      count(*)::int as total,
      count(*) filter (where status = 'draft')::int as draft,
      count(*) filter (where status = 'pending_review')::int as pending_review,
      count(*) filter (where status = 'approved')::int as approved,
      count(*) filter (where status = 'blocked')::int as blocked,
      count(*) filter (where status = 'executing')::int as executing,
      count(*) filter (where status = 'executed')::int as executed,
      count(*) filter (where status = 'failed')::int as failed
    from bna_autobuilder_commands
  `;

  const byType = await sql`
    select command_type, count(*)::int as count
    from bna_autobuilder_commands
    group by command_type
    order by count desc, command_type asc
  `;

  return NextResponse.json({
    ok: true,
    initialized: true,
    automationMode: "queue_only",
    executesAutomatically: false,
    publishesContent: false,
    liveFacebookPostingRouteExists: false,
    commandTypes: COMMAND_TYPES,
    commandStatuses: COMMAND_STATUSES,
    totals: totals[0] || {},
    byType
  });
}
