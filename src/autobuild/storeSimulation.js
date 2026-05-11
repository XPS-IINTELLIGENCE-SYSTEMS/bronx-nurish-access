import { getDb } from './db.js';
import { memory, makeId } from './state.js';

async function ensureSimulationSchema(sql) {
  await sql`create table if not exists simulation_runs (id text primary key, scenario_id text not null, pass_number integer not null, score integer not null, passed boolean not null, report jsonb not null default '{}'::jsonb, created_at timestamptz not null default now())`;
  await sql`create table if not exists release_gates (id text primary key, gate_name text not null unique, state text not null default 'HOLD', achieved_simulation_passes integer not null default 0, updated_at timestamptz not null default now())`;
}

export async function saveSimulation(simulation) {
  const rows = (simulation.results || []).map(r => ({ id: makeId('sim'), scenario_id: r.scenario_id, pass_number: r.pass_number, score: r.score, passed: r.passed, report: r }));
  const sql = getDb();
  if (!sql) { memory.simulation_runs.push(...rows); return { inserted: rows.length, persistence: 'memory_fallback' }; }
  try {
    await ensureSimulationSchema(sql);
    for (const row of rows) {
      await sql`insert into simulation_runs (id, scenario_id, pass_number, score, passed, report) values (${row.id}, ${row.scenario_id}, ${row.pass_number}, ${row.score}, ${row.passed}, ${JSON.stringify(row.report)}::jsonb)`;
    }
    await sql`insert into release_gates (id, gate_name, state, achieved_simulation_passes) values ('gate-main', 'main_release_gate', 'HOLD', ${simulation.passes_completed}) on conflict (gate_name) do update set achieved_simulation_passes = ${simulation.passes_completed}, state = 'HOLD', updated_at = now()`;
    return { inserted: rows.length, persistence: 'postgres' };
  } catch (error) {
    memory.simulation_runs.push(...rows);
    return { inserted: rows.length, persistence: 'memory_fallback', error: error.message };
  }
}
