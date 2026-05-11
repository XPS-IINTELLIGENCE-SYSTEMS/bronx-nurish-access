import { getDb } from './db.js';
import { memory, makeId } from './state.js';

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
  const db = getDb();
  if (!db) { memory.agent_runs.push(row); return row; }
  await db.from('agent_runs').insert(row);
  return row;
}

export async function logAudit(event_type, actor, message, metadata = {}) {
  const row = { id: makeId('audit'), event_type, actor, message, metadata };
  const db = getDb();
  if (!db) { memory.audit_log.push(row); return row; }
  await db.from('audit_log').insert(row);
  return row;
}
