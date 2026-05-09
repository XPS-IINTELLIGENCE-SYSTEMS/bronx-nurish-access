-- Bronx Nourish Access — Neon/Vercel MVP schema
-- Run in Neon SQL Editor after installing the Neon integration on Vercel.

create table if not exists bna_leads (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  first_name text not null,
  phone text not null,
  zip_code text not null check (zip_code in ('10451','10452','10453','10454','10455')),
  medicaid_status text not null,
  food_need text not null,
  best_callback_time text not null,
  preferred_language text not null,
  consent_to_contact boolean not null check (consent_to_contact = true),
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  page_url text,
  user_agent text,
  status text not null default 'new',
  notes text
);

create table if not exists bna_content_queue (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  content_date date not null default current_date,
  platform text not null default 'multi',
  language text not null default 'en',
  content_type text not null default 'short_video',
  hook text not null,
  caption text not null,
  script text not null,
  cta text not null default 'Check Food Help Options',
  landing_url text not null default 'https://bronx-nourish-access.vercel.app/',
  utm_source text not null default 'organic_social',
  utm_campaign text not null default 'bna_organic_poc',
  compliance_status text not null default 'pending_scan',
  approval_status text not null default 'draft',
  scheduled_for timestamptz,
  posted_at timestamptz,
  external_post_id text,
  notes text
);

create table if not exists bna_proof_log (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  loop_name text not null,
  status text not null,
  message text not null,
  source_table text,
  source_id bigint,
  evidence jsonb default '{}'::jsonb
);

create index if not exists bna_leads_created_at_idx on bna_leads(created_at desc);
create index if not exists bna_leads_status_idx on bna_leads(status);
create index if not exists bna_content_queue_approval_idx on bna_content_queue(approval_status, compliance_status);
create index if not exists bna_content_queue_date_idx on bna_content_queue(content_date desc);
create index if not exists bna_proof_log_created_idx on bna_proof_log(created_at desc);
