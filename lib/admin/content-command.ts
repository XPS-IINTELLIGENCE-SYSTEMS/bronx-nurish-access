import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export type ModuleKey = "content" | "assets" | "video" | "images" | "chat" | "scheduler" | "proof" | "automation";

export const MODULE_TABLES: Record<ModuleKey, string> = {
  content: "bna_content_items",
  assets: "bna_asset_registry",
  video: "bna_video_jobs",
  images: "bna_image_jobs",
  chat: "bna_chat_threads",
  scheduler: "bna_scheduler_packages",
  proof: "bna_proof_checks",
  automation: "bna_automation_runs"
};

export function authorized(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET || process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export function requireAdmin(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  return null;
}

export function db() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
}

export async function ensureContentCommandTables() {
  const sql = db();
  if (!sql) throw new Error("Database env missing");

  await sql`create table if not exists bna_content_items (
    id bigserial primary key,
    title text not null,
    module text default 'content',
    platform text default 'multi',
    content_type text default 'post',
    draft_body text default '',
    prompt text default '',
    approval_status text default 'draft',
    compliance_status text default 'pending_scan',
    scheduled_for timestamptz,
    version int default 1,
    payload jsonb default '{}'::jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  )`;

  await sql`create table if not exists bna_asset_registry (
    id bigserial primary key,
    title text not null,
    asset_type text default 'unknown',
    source_url text default '',
    storage_url text default '',
    rights_status text default 'pending_review',
    approval_status text default 'draft',
    payload jsonb default '{}'::jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  )`;

  await sql`create table if not exists bna_video_jobs (
    id bigserial primary key,
    title text not null,
    provider text default 'manual_export',
    prompt text default '',
    script text default '',
    status text default 'draft',
    approval_status text default 'draft',
    spend_approved boolean default false,
    provider_job_id text default '',
    output_url text default '',
    payload jsonb default '{}'::jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  )`;

  await sql`create table if not exists bna_image_jobs (
    id bigserial primary key,
    title text not null,
    prompt text default '',
    model text default 'vercel_ai_gateway_or_manual',
    status text default 'draft',
    approval_status text default 'draft',
    output_url text default '',
    payload jsonb default '{}'::jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  )`;

  await sql`create table if not exists bna_chat_threads (
    id bigserial primary key,
    title text not null,
    owner text default 'admin',
    status text default 'open',
    payload jsonb default '{}'::jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  )`;

  await sql`create table if not exists bna_chat_messages (
    id bigserial primary key,
    thread_id bigint references bna_chat_threads(id) on delete cascade,
    role text not null,
    content text not null,
    tool_call jsonb default '{}'::jsonb,
    created_at timestamptz default now()
  )`;

  await sql`create table if not exists bna_scheduler_packages (
    id bigserial primary key,
    title text not null,
    destination text default 'buffer_meta_export',
    status text default 'draft',
    approval_status text default 'draft',
    package_url text default '',
    payload jsonb default '{}'::jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  )`;

  await sql`create table if not exists bna_proof_checks (
    id bigserial primary key,
    title text not null,
    check_type text default 'claims_scan',
    status text default 'queued',
    passed boolean,
    findings jsonb default '[]'::jsonb,
    payload jsonb default '{}'::jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  )`;

  await sql`create table if not exists bna_automation_runs (
    id bigserial primary key,
    title text not null,
    run_type text default 'sandbox',
    status text default 'queued',
    execution_mode text default 'draft_export_review_only',
    live_publish boolean default false,
    payload jsonb default '{}'::jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  )`;

  await sql`create table if not exists bna_approval_events (
    id bigserial primary key,
    target_table text not null,
    target_id bigint,
    event_type text not null,
    status text default 'draft',
    actor text default 'system',
    notes text default '',
    payload jsonb default '{}'::jsonb,
    created_at timestamptz default now()
  )`;

  return { ok: true };
}

async function countForModule(module: ModuleKey) {
  const sql = db();
  if (!sql) throw new Error("Database env missing");

  if (module === "content") return sql`select count(*)::int as total from bna_content_items` as Promise<Array<{ total: number }>>;
  if (module === "assets") return sql`select count(*)::int as total from bna_asset_registry` as Promise<Array<{ total: number }>>;
  if (module === "video") return sql`select count(*)::int as total from bna_video_jobs` as Promise<Array<{ total: number }>>;
  if (module === "images") return sql`select count(*)::int as total from bna_image_jobs` as Promise<Array<{ total: number }>>;
  if (module === "chat") return sql`select count(*)::int as total from bna_chat_threads` as Promise<Array<{ total: number }>>;
  if (module === "scheduler") return sql`select count(*)::int as total from bna_scheduler_packages` as Promise<Array<{ total: number }>>;
  if (module === "proof") return sql`select count(*)::int as total from bna_proof_checks` as Promise<Array<{ total: number }>>;
  return sql`select count(*)::int as total from bna_automation_runs` as Promise<Array<{ total: number }>>;
}

export async function moduleStatus(module: ModuleKey) {
  await ensureContentCommandTables();
  const table = MODULE_TABLES[module];
  const rows = await countForModule(module);
  return {
    module,
    table,
    total: rows[0]?.total || 0,
    mode: "draft_export_review_only",
    livePosting: false,
    livePublishing: false,
    creditSpend: false
  };
}

export async function logApprovalEvent(targetTable: string, targetId: number | null, eventType: string, notes: string, payload: Record<string, unknown> = {}) {
  const sql = db();
  if (!sql) throw new Error("Database env missing");
  await sql`insert into bna_approval_events (target_table, target_id, event_type, status, actor, notes, payload)
    values (${targetTable}, ${targetId}, ${eventType}, 'draft', 'content_command_os', ${notes}, ${JSON.stringify(payload)}::jsonb)`;
}
