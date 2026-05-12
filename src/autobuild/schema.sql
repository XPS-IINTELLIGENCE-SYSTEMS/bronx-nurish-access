-- Vizual-X + Intelligence OS + AutoBuild OS Supabase Sandbox Schema
-- Supabase-only persistence contract for the autonomous-gpt-bridge branch.
-- Safe sandbox only. Do not apply to production without review.

create extension if not exists pgcrypto;

create table if not exists build_queue (
  id uuid primary key default gen_random_uuid(),
  task_title text not null,
  task_type text not null,
  assigned_agent text,
  status text not null default 'queued',
  priority integer not null default 100,
  system_mode text not null default 'dry_run',
  payload jsonb not null default '{}'::jsonb,
  result jsonb,
  blocker_reason text,
  claimed_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists agent_runs (
  id uuid primary key default gen_random_uuid(),
  build_queue_id uuid references build_queue(id),
  agent_name text not null,
  run_status text not null default 'started',
  input_summary text,
  output_summary text,
  error_message text,
  risk_level text not null default 'unknown',
  metadata jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create table if not exists validation_results (
  id uuid primary key default gen_random_uuid(),
  build_queue_id uuid references build_queue(id),
  validator_name text not null,
  score integer not null check (score >= 0 and score <= 100),
  passed boolean not null default false,
  p0_blockers integer not null default 0,
  p1_blockers integer not null default 0,
  warnings jsonb not null default '[]'::jsonb,
  findings jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists simulation_runs (
  id uuid primary key default gen_random_uuid(),
  scenario_id text not null,
  scenario_name text not null,
  pass_number integer not null,
  score integer not null check (score >= 0 and score <= 100),
  passed boolean not null default false,
  report jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists release_gates (
  id uuid primary key default gen_random_uuid(),
  gate_name text not null unique,
  state text not null default 'HOLD',
  p0_blockers integer not null default 0,
  p1_blockers integer not null default 0,
  required_simulation_passes integer not null default 5,
  achieved_simulation_passes integer not null default 0,
  approved_by text,
  approved_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  actor text not null default 'system',
  system_mode text not null default 'dry_run',
  message text not null,
  related_table text,
  related_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists daily_briefs (
  id text primary key,
  generated_at timestamptz not null default now(),
  release_gate text not null default 'HOLD',
  data jsonb not null
);

create table if not exists opportunity_scores (
  id text primary key,
  brief_id text,
  rank integer,
  name text,
  score integer,
  data jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists benchmark_results (
  id text primary key,
  brief_id text,
  benchmark_name text,
  score integer,
  data jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists memory_reflections (
  id text primary key,
  brief_id text,
  summary text,
  data jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists approval_requests (
  id text primary key,
  brief_id text,
  request_key text,
  trigger_phrase text,
  status text not null default 'not_granted',
  data jsonb not null,
  created_at timestamptz not null default now()
);

insert into release_gates (gate_name, state, notes)
values ('main_release_gate', 'HOLD', 'Default Supabase sandbox release gate. Keep closed until owner approval.')
on conflict (gate_name) do nothing;

create index if not exists idx_build_queue_status_priority on build_queue(status, priority, created_at);
create index if not exists idx_agent_runs_queue on agent_runs(build_queue_id, started_at);
create index if not exists idx_validation_queue on validation_results(build_queue_id, created_at);
create index if not exists idx_simulation_scenario on simulation_runs(scenario_id, pass_number);
create index if not exists idx_audit_created on audit_log(created_at);

-- RLS policy requirements are documented in docs/intelligence-autobuild/10_SUPABASE_SCHEMA_SPEC.sql.
-- Server-side service role access only during sandbox runtime until approved.