import { getDb } from './db.js';
import { memory, makeId } from './state.js';

async function ensureLogSchema(sql) {
  await sql`create table if not exists agent_runs (id text primary key, build_queue_id text, agent_name text not null, run_status text not null, input_summary text, output_summary text, error_message text, metadata jsonb not null default '{}'::jsonb, started_at timestamptz not null default now(), finished_at timestamptz)`;
  await sql`create table if not exists audit_log (id text primary key, event_type text not null, actor text not null default 'system', message text not null, metadata jsonb not null default '{}'::jsonb, created_at timestamptz not null default now())`;
}

export async function logAgentRun(task, result) {
  const row = {
    id: makeId('run'),
    build_queue_id: task?.id || 'none',
    agent_name: task?.assigned_agent || 'MockAgent',
    run_status: 'completed',
    input_summary: task?.task_title || 'sandbox task',
    output_summary: 'Sandbox task completed safely.',
    metadata: result,
    finished_at: new Date().toISOString()
  };
  const sql = getDb();
  if (!sql) { memory.agent_runs.push(row); return { ...row, persistence: 'memory_fallback' }; }
  try {
    await ensureLogSchema(sql);
    await sql`insert into agent_runs (id, build_queue_id, agent_name, run_status, input_summary, output_summary, metadata, finished_at) values (${row.id}, ${row.build_queue_id}, ${row.agent_name}, ${row.run_status}, ${row.input_summary}, ${row.output_summary}, ${JSON.stringify(row.metadata)}::jsonb, ${row.finished_at})`;
    return { ...row, persistence: 'postgres' };
  } catch (error) {
    memory.agent_runs.push(row);
    return { ...row, persistence: 'memory_fallback', error: error.message };
  }
}

export async function logAudit(event_type, actor, message, metadata = {}) {
  const row = { id: makeId('audit'), event_type, actor, message, metadata };
  const sql = getDb();
  if (!sql) { memory.audit_log.push(row); return { ...row, persistence: 'memory_fallback' }; }
  try {
    await ensureLogSchema(sql);
    await sql`insert into audit_log (id, event_type, actor, message, metadata) values (${row.id}, ${row.event_type}, ${row.actor}, ${row.message}, ${JSON.stringify(row.metadata)}::jsonb)`;
    return { ...row, persistence: 'postgres' };
  } catch (error) {
    memory.audit_log.push(row);
    return { ...row, persistence: 'memory_fallback', error: error.message };
  }
}
