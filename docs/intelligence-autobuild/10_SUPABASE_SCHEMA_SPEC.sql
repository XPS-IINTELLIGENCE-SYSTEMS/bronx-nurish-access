-- Intelligence OS + AutoBuild OS Supabase Schema Specification
-- Documentation/specification only. Do not apply to production until reviewed.

-- Purpose:
-- Define the future state ledger, queues, validation records, simulations, and release gates
-- required for the Vercel cron sandbox and agent runtime.

-- Required extensions, if approved by implementation team:
-- create extension if not exists pgcrypto;

-- ENUM NOTES:
-- Implementation may use text constraints instead of enums for migration flexibility.

-- 1. Source Ledger
-- Stores all approved and unverified sources used by agents.
create table if not exists source_ledger (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_uri text not null,
  title text,
  owner text,
  approval_status text not null default 'unreviewed',
  verification_status text not null default 'could_not_verify',
  publish_risk text not null default 'unknown',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Agent Registry
-- Lists available phase agents and allowed modes.
create table if not exists agent_registry (
  id uuid primary key default gen_random_uuid(),
  agent_name text not null unique,
  phase_number integer not null,
  purpose text not null,
  allowed_modes text[] not null default array['docs','dry_run'],
  enabled boolean not null default false,
  release_risk text not null default 'medium',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Build Queue
-- Work packets selected by Vercel cron dispatcher.
create table if not exists build_queue (
  id uuid primary key default gen_random_uuid(),
  task_title text not null,
  task_type text not null,
  source_ledger_id uuid references source_ledger(id),
  assigned_agent text references agent_registry(agent_name),
  priority integer not null default 100,
  status text not null default 'queued',
  system_mode text not null default 'dry_run',
  payload jsonb not null default '{}'::jsonb,
  result jsonb,
  blocker_reason text,
  claimed_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. Agent Runs
-- One record per agent execution attempt.
create table if not exists agent_runs (
  id uuid primary key default gen_random_uuid(),
  build_queue_id uuid references build_queue(id),
  agent_name text not null,
  run_status text not null default 'started',
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  input_summary text,
  output_summary text,
  error_message text,
  risk_level text not null default 'unknown',
  metadata jsonb not null default '{}'::jsonb
);

-- 5. Validation Results
-- Scores every output before review or release.
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

-- 6. Simulation Runs
-- Records each test harness scenario run.
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

-- 7. Predictive Reports
-- Stores future bottleneck, risk, and next-action forecasts.
create table if not exists predictive_reports (
  id uuid primary key default gen_random_uuid(),
  report_type text not null,
  confidence numeric,
  forecast jsonb not null default '{}'::jsonb,
  recommended_actions jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- 8. Release Gates
-- Controls approval state.
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

-- 9. Audit Log
-- Append-only event stream.
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

-- RLS SPECIFICATION
-- Implementation must enable RLS before production.
-- Service role may write system records.
-- Authenticated users may read approved dashboards only.
-- Public access must be denied unless explicitly approved.

-- INDEX SPECIFICATION
create index if not exists idx_build_queue_status_priority on build_queue(status, priority, created_at);
create index if not exists idx_agent_runs_queue on agent_runs(build_queue_id, started_at);
create index if not exists idx_validation_queue on validation_results(build_queue_id, created_at);
create index if not exists idx_simulation_scenario on simulation_runs(scenario_id, pass_number);
create index if not exists idx_audit_created on audit_log(created_at);

-- SEED SPECIFICATION
-- Insert agents only after docs are approved.
-- Release gate must default to HOLD.
