import { getDb } from './db.js';
import { memory, makeId } from './state.js';

async function ensureValidationSchema(sql) {
  await sql`create table if not exists validation_results (id text primary key, build_queue_id text, validator_name text not null, score integer not null, passed boolean not null, p0_blockers integer not null default 0, p1_blockers integer not null default 0, findings jsonb not null default '[]'::jsonb, created_at timestamptz not null default now())`;
}

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
  const sql = getDb();
  if (!sql) { memory.validation_results.push(row); return { ...row, persistence: 'memory_fallback' }; }
  try {
    await ensureValidationSchema(sql);
    await sql`insert into validation_results (id, build_queue_id, validator_name, score, passed, p0_blockers, p1_blockers, findings) values (${row.id}, ${row.build_queue_id}, ${row.validator_name}, ${row.score}, ${row.passed}, ${row.p0_blockers}, ${row.p1_blockers}, ${JSON.stringify(row.findings)}::jsonb)`;
    return { ...row, persistence: 'postgres' };
  } catch (error) {
    memory.validation_results.push(row);
    return { ...row, persistence: 'memory_fallback', error: error.message };
  }
}
