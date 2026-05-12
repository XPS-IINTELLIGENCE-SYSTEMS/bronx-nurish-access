import { getDb, supabaseInsert } from './db.js';
import { memory } from './state.js';

function makeMemoryId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function normalizeQueueId(value) {
  if (!value || typeof value !== 'string') return null;
  return value.includes('-') && value.length > 30 ? value : null;
}

export async function logAgentRun(task, result) {
  const row = {
    build_queue_id: normalizeQueueId(task?.id),
    agent_name: task?.assigned_agent || 'MockAgent',
    run_status: 'completed',
    input_summary: task?.task_title || 'sandbox task',
    output_summary: 'Sandbox task completed safely.',
    risk_level: 'low',
    metadata: result || {},
    finished_at: new Date().toISOString()
  };

  const db = getDb();
  if (!db) {
    const memoryRow = { id: makeMemoryId('run'), ...row };
    memory.agent_runs.push(memoryRow);
    return { ...memoryRow, persistence: 'memory_fallback' };
  }

  try {
    const rows = await supabaseInsert('agent_runs', row);
    return { ...(rows[0] || row), persistence: 'supabase' };
  } catch (error) {
    const memoryRow = { id: makeMemoryId('run'), ...row };
    memory.agent_runs.push(memoryRow);
    return { ...memoryRow, persistence: 'memory_fallback', error: error.message };
  }
}

export async function logAudit(event_type, actor, message, metadata = {}) {
  const row = {
    event_type,
    actor,
    system_mode: 'dry_run',
    message,
    metadata
  };

  const db = getDb();
  if (!db) {
    const memoryRow = { id: makeMemoryId('audit'), ...row };
    memory.audit_log.push(memoryRow);
    return { ...memoryRow, persistence: 'memory_fallback' };
  }

  try {
    const rows = await supabaseInsert('audit_log', row);
    return { ...(rows[0] || row), persistence: 'supabase' };
  } catch (error) {
    const memoryRow = { id: makeMemoryId('audit'), ...row };
    memory.audit_log.push(memoryRow);
    return { ...memoryRow, persistence: 'memory_fallback', error: error.message };
  }
}
