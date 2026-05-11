import { getDb } from './db.js';
import { memory, summarizeState } from './state.js';

async function ensureSchema(sql) {
  await sql`create table if not exists build_queue (id text primary key, task_title text not null, task_type text not null, assigned_agent text not null, status text not null default 'queued', priority integer not null default 100, payload jsonb not null default '{}'::jsonb, result jsonb, blocker_reason text, created_at timestamptz not null default now(), updated_at timestamptz not null default now())`;
  await sql`create table if not exists release_gates (id text primary key, gate_name text not null unique, state text not null default 'HOLD', p0_blockers integer not null default 0, p1_blockers integer not null default 0, achieved_simulation_passes integer not null default 0, notes text, updated_at timestamptz not null default now())`;
}

export async function seedSandboxQueue() {
  const sql = getDb();
  if (!sql) return { persistence: 'memory_fallback', seeded: true };
  await ensureSchema(sql);
  await sql`insert into release_gates (id, gate_name, state, notes) values ('gate-main', 'main_release_gate', 'HOLD', 'Postgres sandbox release gate. Keep closed until owner approval.') on conflict (gate_name) do nothing`;
  for (const task of memory.build_queue) {
    await sql`insert into build_queue (id, task_title, task_type, assigned_agent, status, priority, payload) values (${task.id}, ${task.task_title}, ${task.task_type}, ${task.assigned_agent}, ${task.status}, ${task.priority}, ${JSON.stringify(task.payload)}::jsonb) on conflict (id) do nothing`;
  }
  return { persistence: 'postgres', seeded: true };
}

export async function readSandboxStatus() {
  const sql = getDb();
  if (!sql) return summarizeState(memory, 'memory_fallback');
  try {
    await ensureSchema(sql);
    const q = await sql`select * from build_queue order by priority asc, created_at asc`;
    const g = await sql`select * from release_gates order by updated_at desc`;
    return summarizeState({ ...memory, build_queue: q, release_gates: g }, 'postgres');
  } catch (error) {
    return summarizeState(memory, 'memory_fallback', [error.message]);
  }
}

export async function claimSandboxTask() {
  const sql = getDb();
  if (!sql) {
    const task = memory.build_queue.find(t => t.status === 'queued') || memory.build_queue[0];
    task.status = 'claimed';
    return { task, persistence: 'memory_fallback' };
  }
  try {
    await ensureSchema(sql);
    const rows = await sql`select * from build_queue where status = 'queued' order by priority asc, created_at asc limit 1`;
    if (!rows.length) return { task: null, persistence: 'postgres', error: 'No queued task' };
    const task = rows[0];
    await sql`update build_queue set status = 'claimed', updated_at = now() where id = ${task.id}`;
    return { task: { ...task, status: 'claimed' }, persistence: 'postgres' };
  } catch (error) {
    return { task: null, persistence: 'memory_fallback', error: error.message };
  }
}

export async function finishSandboxTask(task, result) {
  const sql = getDb();
  if (!sql) { if (task) task.status = 'drafted'; return { persistence: 'memory_fallback' }; }
  try {
    if (task?.id) await sql`update build_queue set status = 'drafted', result = ${JSON.stringify(result)}::jsonb, updated_at = now() where id = ${task.id}`;
    return { persistence: 'postgres' };
  } catch (error) {
    return { persistence: 'memory_fallback', error: error.message };
  }
}
