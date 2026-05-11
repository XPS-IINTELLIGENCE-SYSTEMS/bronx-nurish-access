import { neon } from "@neondatabase/serverless";

export type SqlClient = ReturnType<typeof getSql> extends null ? never : NonNullable<ReturnType<typeof getSql>>;

export function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
}

export async function ensureContentCommandTables(sql: SqlClient) {
  await sql`create table if not exists bna_content_items (
    id bigserial primary key,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    title text not null,
    campaign_id text default 'tap_the_green_bag_bronx_launch',
    platform text default 'multi',
    content_type text default 'post',
    language text default 'en',
    hook text,
    caption text,
    script text,
    cta text default 'Check Food Help Options',
    asset_id text,
    video_job_id bigint,
    image_job_id bigint,
    claim_status text default 'pending_scan',
    approval_status text default 'draft',
    scheduler_status text default 'not_packaged',
    owner text default 'Strategic Minds Advisory',
    scheduled_at timestamptz,
    proof_log_id bigint,
    utm_url text,
    metadata jsonb default '{}'::jsonb
  )`;

  await sql`create table if not exists bna_asset_registry (
    id bigserial primary key,
    created_at timestamptz default now(),
    asset_key text unique not null,
    asset_name text not null,
    asset_type text default 'image',
    drive_folder_url text,
    source_url text,
    public_url text,
    rights_status text default 'needs_review',
    approval_status text default 'draft',
    platform_fit jsonb default '[]'::jsonb,
    notes text,
    metadata jsonb default '{}'::jsonb
  )`;

  await sql`create table if not exists bna_video_jobs (
    id bigserial primary key,
    created_at timestamptz default now(),
    tool text default 'manual',
    title text not null,
    prompt text not null,
    platform text default 'multi',
    duration_seconds int default 15,
    status text default 'draft',
    asset_refs jsonb default '[]'::jsonb,
    output_url text,
    approval_status text default 'draft',
    notes text,
    metadata jsonb default '{}'::jsonb
  )`;

  await sql`create table if not exists bna_image_jobs (
    id bigserial primary key,
    created_at timestamptz default now(),
    tool text default 'ai_gateway',
    title text not null,
    prompt text not null,
    aspect_ratio text default '9:16',
    status text default 'draft',
    source_asset_id text,
    output_url text,
    approval_status text default 'draft',
    notes text,
    metadata jsonb default '{}'::jsonb
  )`;

  await sql`create table if not exists bna_chat_threads (
    id bigserial primary key,
    created_at timestamptz default now(),
    title text not null,
    mode text default 'operator_copilot',
    status text default 'active',
    owner text default 'Strategic Minds Advisory',
    metadata jsonb default '{}'::jsonb
  )`;

  await sql`create table if not exists bna_chat_messages (
    id bigserial primary key,
    created_at timestamptz default now(),
    thread_id bigint references bna_chat_threads(id) on delete cascade,
    role text not null,
    content text not null,
    tool_calls jsonb default '[]'::jsonb,
    metadata jsonb default '{}'::jsonb
  )`;

  await sql`create table if not exists bna_scheduler_packages (
    id bigserial primary key,
    created_at timestamptz default now(),
    package_key text unique not null,
    destination text not null,
    status text default 'draft',
    content_count int default 0,
    csv_url text,
    json_url text,
    proof_log_id bigint,
    notes text,
    metadata jsonb default '{}'::jsonb
  )`;

  await sql`create table if not exists bna_proof_checks (
    id bigserial primary key,
    created_at timestamptz default now(),
    target_type text not null,
    target_id text not null,
    check_type text not null,
    status text default 'pending',
    findings jsonb default '[]'::jsonb,
    evidence jsonb default '{}'::jsonb,
    notes text
  )`;

  await sql`create table if not exists bna_automation_runs (
    id bigserial primary key,
    created_at timestamptz default now(),
    run_key text unique not null,
    run_type text not null,
    status text default 'queued',
    source text default 'content_command_os',
    started_at timestamptz,
    completed_at timestamptz,
    evidence jsonb default '{}'::jsonb,
    notes text
  )`;

  await sql`create table if not exists bna_approval_events (
    id bigserial primary key,
    created_at timestamptz default now(),
    target_type text not null,
    target_id text not null,
    approval_type text not null,
    status text default 'requested',
    approver text,
    approved_at timestamptz,
    notes text,
    evidence jsonb default '{}'::jsonb
  )`;

  await sql`create index if not exists bna_content_items_status_idx on bna_content_items (approval_status, claim_status, scheduler_status)`;
  await sql`create index if not exists bna_asset_registry_status_idx on bna_asset_registry (approval_status, rights_status)`;
  await sql`create index if not exists bna_video_jobs_status_idx on bna_video_jobs (status, approval_status)`;
  await sql`create index if not exists bna_image_jobs_status_idx on bna_image_jobs (status, approval_status)`;
  await sql`create index if not exists bna_scheduler_packages_status_idx on bna_scheduler_packages (status, destination)`;
  await sql`create index if not exists bna_proof_checks_status_idx on bna_proof_checks (status, check_type)`;
  await sql`create index if not exists bna_automation_runs_status_idx on bna_automation_runs (status, run_type)`;
  await sql`create index if not exists bna_approval_events_status_idx on bna_approval_events (status, approval_type)`;
}

export async function getContentCommandCounts(sql: SqlClient) {
  const [content] = await sql`select count(*)::int as total, count(*) filter (where approval_status='draft')::int as draft, count(*) filter (where claim_status='blocked')::int as blocked, count(*) filter (where approval_status='approved')::int as approved from bna_content_items`;
  const [assets] = await sql`select count(*)::int as total, count(*) filter (where rights_status='approved')::int as rights_approved, count(*) filter (where public_url is not null and public_url <> '')::int as public_urls from bna_asset_registry`;
  const [videos] = await sql`select count(*)::int as total, count(*) filter (where status='draft')::int as draft, count(*) filter (where output_url is not null and output_url <> '')::int as outputs from bna_video_jobs`;
  const [images] = await sql`select count(*)::int as total, count(*) filter (where status='draft')::int as draft, count(*) filter (where output_url is not null and output_url <> '')::int as outputs from bna_image_jobs`;
  const [scheduler] = await sql`select count(*)::int as total, count(*) filter (where status='ready')::int as ready from bna_scheduler_packages`;
  const [proof] = await sql`select count(*)::int as total, count(*) filter (where status='passed')::int as passed, count(*) filter (where status='blocked')::int as blocked from bna_proof_checks`;
  const [automation] = await sql`select count(*)::int as total, count(*) filter (where status='failed')::int as failed, count(*) filter (where status='completed')::int as completed from bna_automation_runs`;
  const [approvals] = await sql`select count(*)::int as total, count(*) filter (where status='approved')::int as approved, count(*) filter (where status='requested')::int as requested from bna_approval_events`;
  return { content, assets, videos, images, scheduler, proof, automation, approvals };
}
