-- Bronx Nourish Access production lead intake schema
-- Run this in Supabase SQL Editor before launching the live form.

create extension if not exists pgcrypto;

create table if not exists public.bna_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  phone text not null,
  zip_code text not null check (zip_code in ('10451','10452','10453','10454','10455')),
  medicaid_status text not null,
  food_need text not null,
  best_callback_time text not null,
  preferred_language text not null,
  consent_to_contact boolean not null default false,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  page_url text,
  user_agent text,
  status text not null default 'new',
  notes text,
  constraint bna_leads_consent_required check (consent_to_contact = true)
);

create index if not exists bna_leads_created_at_idx on public.bna_leads (created_at desc);
create index if not exists bna_leads_zip_code_idx on public.bna_leads (zip_code);
create index if not exists bna_leads_status_idx on public.bna_leads (status);
create index if not exists bna_leads_utm_source_idx on public.bna_leads (utm_source);

alter table public.bna_leads enable row level security;

-- No public browser reads/writes. The Vercel API route inserts with SUPABASE_SERVICE_ROLE_KEY only.
-- Do not expose service role key to client-side code.

revoke all on public.bna_leads from anon;
revoke all on public.bna_leads from authenticated;
