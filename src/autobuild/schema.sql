-- Persisted Sandbox Runtime Schema
-- Safe sandbox only. Do not apply to production without review.

create table if not exists build_queue (
  id text primary key,
  task_title text not null,
  task_type text not null,
  assigned_agent text not null,
  status text not null default 'queued',
  priority integer not null default 100,
  payload jsonb not null default '{}'::jsonb,
  result jsonb,
  blocker_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists agent_runs (
  id text primary key,
  build_queue_id text,
  agent_name text not null,
  run_status text not null,
  input_summary text,
  output_summary text,
  error_message text,
  metadata jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create table if not exists validation_results (
  id text primary key,
  build_queue_id text,
  validator_name text not null,
  score integer not null,
  passed boolean not null,
  p0_blockers integer not null default 0,
  p1_blockers integer not null default 0,
  findings jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists simulation_runs (
  id text primary key,
  scenario_id text not null,
  pass_number integer not null,
  score integer not null,
  passed boolean not null,
  report jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists release_gates (
  id text primary key,
  gate_name text not null unique,
  state text not null default 'HOLD',
  p0_blockers integer not null default 0,
  p1_blockers integer not null default 0,
  achieved_simulation_passes integer not null default 0,
  notes text,
  updated_at timestamptz not null default now()
);

create table if not exists audit_log (
  id text primary key,
  event_type text not null,
  actor text not null default 'system',
  message text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

insert into release_gates (id, gate_name, state, notes)
values ('gate-main', 'main_release_gate', 'HOLD', 'Default sandbox release gate. Keep closed until owner approval.')
on conflict (gate_name) do nothing;

insert into build_queue (id, task_title, task_type, assigned_agent, status, priority, payload)
values
  ('task-001', 'Persisted Shopify draft workflow', 'shopify_draft_spec', 'ShopifyWorkflowAgent', 'queued', 10, '{"draft_only":true}'::jsonb),
  ('task-002', 'Persisted social draft workflow', 'social_draft_spec', 'SocialMediaAgent', 'queued', 20, '{"draft_only":true}'::jsonb),
  ('task-003', 'Persisted release gate validation', 'release_gate_check', 'ReleaseGateAgent', 'queued', 30, '{"release_gate":"HOLD"}'::jsonb)
on conflict (id) do nothing;
