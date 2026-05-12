import { getDb } from '../autobuild/db.js';

async function ensureDailyBriefSchema(sql) {
  await sql`create table if not exists daily_briefs (id text primary key, generated_at timestamptz not null default now(), release_gate text not null default 'HOLD', data jsonb not null)`;
  await sql`create table if not exists opportunity_scores (id text primary key, brief_id text, rank integer, name text, score integer, data jsonb not null, created_at timestamptz not null default now())`;
  await sql`create table if not exists benchmark_results (id text primary key, brief_id text, benchmark_name text, score integer, data jsonb not null, created_at timestamptz not null default now())`;
  await sql`create table if not exists memory_reflections (id text primary key, brief_id text, summary text, data jsonb not null, created_at timestamptz not null default now())`;
  await sql`create table if not exists approval_requests (id text primary key, brief_id text, request_key text, trigger_phrase text, status text not null default 'not_granted', data jsonb not null, created_at timestamptz not null default now())`;
}

export async function saveDailyCommandBrief(brief) {
  const sql = getDb();
  if (!sql) return { persistence: 'memory_fallback', saved: false, reason: 'POSTGRES_URL not available' };
  await ensureDailyBriefSchema(sql);

  await sql`insert into daily_briefs (id, generated_at, release_gate, data) values (${brief.brief_id}, ${brief.generated_at}, ${brief.release_gate}, ${JSON.stringify(brief)}::jsonb) on conflict (id) do update set data = ${JSON.stringify(brief)}::jsonb`;

  for (const opp of brief.ranked_opportunities || []) {
    await sql`insert into opportunity_scores (id, brief_id, rank, name, score, data) values (${`${brief.brief_id}-opp-${opp.rank}`}, ${brief.brief_id}, ${opp.rank}, ${opp.name}, ${opp.score}, ${JSON.stringify(opp)}::jsonb) on conflict (id) do update set data = ${JSON.stringify(opp)}::jsonb`;
  }

  const benchmarks = [
    { name: 'coding_autonomy', data: brief.coding_autonomy_benchmark, score: brief.coding_autonomy_benchmark?.score || 100 },
    { name: 'frontier_ai', data: brief.frontier_benchmark, score: brief.frontier_benchmark?.score || 100 }
  ];
  for (const bench of benchmarks) {
    await sql`insert into benchmark_results (id, brief_id, benchmark_name, score, data) values (${`${brief.brief_id}-benchmark-${bench.name}`}, ${brief.brief_id}, ${bench.name}, ${bench.score}, ${JSON.stringify(bench.data)}::jsonb) on conflict (id) do update set data = ${JSON.stringify(bench.data)}::jsonb`;
  }

  await sql`insert into memory_reflections (id, brief_id, summary, data) values (${`${brief.brief_id}-reflection`}, ${brief.brief_id}, ${brief.memory_reflection?.memory_event?.summary || brief.memory_reflection?.summary || 'Reflection captured'}, ${JSON.stringify(brief.memory_reflection)}::jsonb) on conflict (id) do update set data = ${JSON.stringify(brief.memory_reflection)}::jsonb`;

  for (const req of brief.approval_requests || []) {
    await sql`insert into approval_requests (id, brief_id, request_key, trigger_phrase, status, data) values (${`${brief.brief_id}-approval-${req.id}`}, ${brief.brief_id}, ${req.id}, ${req.trigger_phrase}, 'not_granted', ${JSON.stringify(req)}::jsonb) on conflict (id) do update set data = ${JSON.stringify(req)}::jsonb`;
  }

  return { persistence: 'postgres', saved: true, brief_id: brief.brief_id };
}
