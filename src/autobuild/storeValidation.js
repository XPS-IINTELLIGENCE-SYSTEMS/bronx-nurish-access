import { getDb, supabaseInsert } from './db.js';
import { memory } from './state.js';

function makeMemoryId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function normalizeQueueId(value) {
  if (!value || typeof value !== 'string') return null;
  return value.includes('-') && value.length > 30 ? value : null;
}

export async function saveValidation(result, buildQueueId = null) {
  const row = {
    build_queue_id: normalizeQueueId(buildQueueId),
    validator_name: 'ValidationAgent',
    score: result.score,
    passed: result.passed,
    p0_blockers: result.p0_blockers,
    p1_blockers: result.p1_blockers,
    findings: result.findings || []
  };

  const db = getDb();
  if (!db) {
    const memoryRow = { id: makeMemoryId('validation'), ...row };
    memory.validation_results.push(memoryRow);
    return { ...memoryRow, persistence: 'memory_fallback' };
  }

  try {
    const rows = await supabaseInsert('validation_results', row);
    return { ...(rows[0] || row), persistence: 'supabase' };
  } catch (error) {
    const memoryRow = { id: makeMemoryId('validation'), ...row };
    memory.validation_results.push(memoryRow);
    return { ...memoryRow, persistence: 'memory_fallback', error: error.message };
  }
}
