import { getDb } from './db.js';
import { memory, makeId } from './state.js';

export async function saveValidation(result, buildQueueId = 'task-001') {
  const row = {
    id: makeId('validation'),
    build_queue_id: buildQueueId,
    validator_name: 'ValidationAgent',
    score: result.score,
    passed: result.passed,
    p0_blockers: result.p0_blockers,
    p1_blockers: result.p1_blockers,
    findings: result.findings || []
  };
  const db = getDb();
  if (!db) { memory.validation_results.push(row); return { ...row, persistence: 'memory_fallback' }; }
  await db.from('validation_results').insert(row);
  return { ...row, persistence: 'supabase' };
}
