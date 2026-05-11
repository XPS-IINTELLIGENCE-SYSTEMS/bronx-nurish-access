import { getDb } from './db.js';
import { memory } from './state.js';

async function ensureReleaseSchema(sql) {
  await sql`create table if not exists release_gates (id text primary key, gate_name text not null unique, state text not null default 'HOLD', p0_blockers integer not null default 0, p1_blockers integer not null default 0, achieved_simulation_passes integer not null default 0, notes text, updated_at timestamptz not null default now())`;
}

export async function readReleaseGate() {
  const sql = getDb();
  if (!sql) return { ...memory.release_gates[0], persistence: 'memory_fallback' };
  try {
    await ensureReleaseSchema(sql);
    const rows = await sql`select * from release_gates where gate_name = 'main_release_gate' limit 1`;
    return { ...(rows[0] || memory.release_gates[0]), persistence: 'postgres' };
  } catch (error) {
    return { ...memory.release_gates[0], persistence: 'memory_fallback', error: error.message };
  }
}

export async function keepReleaseGateHold() {
  const sql = getDb();
  if (!sql) { memory.release_gates[0].state = 'HOLD'; return { persistence: 'memory_fallback', state: 'HOLD' }; }
  try {
    await ensureReleaseSchema(sql);
    await sql`insert into release_gates (id, gate_name, state, notes) values ('gate-main', 'main_release_gate', 'HOLD', 'Postgres sandbox gate. Production not approved.') on conflict (gate_name) do update set state = 'HOLD', updated_at = now()`;
    return { persistence: 'postgres', state: 'HOLD' };
  } catch (error) {
    memory.release_gates[0].state = 'HOLD';
    return { persistence: 'memory_fallback', state: 'HOLD', error: error.message };
  }
}
