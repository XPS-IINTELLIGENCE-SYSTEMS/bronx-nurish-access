import { getDb } from './db.js';
import { memory, summarizeState } from './state.js';

export async function seedSandboxQueue() {
  const db = getDb();
  if (!db) return { persistence: 'memory_fallback', seeded: true };
  await db.from('release_gates').upsert({ id: 'gate-main', gate_name: 'main_release_gate', state: 'HOLD', p0_blockers: 0, p1_blockers: 0, achieved_simulation_passes: 0 }, { onConflict: 'gate_name' });
  await db.from('build_queue').upsert(memory.build_queue, { onConflict: 'id' });
  return { persistence: 'supabase', seeded: true };
}

export async function readSandboxStatus() {
  const db = getDb();
  if (!db) return summarizeState(memory, 'memory_fallback');
  const q = await db.from('build_queue').select('*');
  const g = await db.from('release_gates').select('*');
  if (q.error || g.error) return summarizeState(memory, 'memory_fallback', [q.error?.message, g.error?.message].filter(Boolean));
  return summarizeState({ ...memory, build_queue: q.data || [], release_gates: g.data || [] }, 'supabase');
}

export async function claimSandboxTask() {
  const db = getDb();
  if (!db) {
    const task = memory.build_queue.find(t => t.status === 'queued') || memory.build_queue[0];
    task.status = 'claimed';
    return { task, persistence: 'memory_fallback' };
  }
  const r = await db.from('build_queue').select('*').eq('status', 'queued').order('priority', { ascending: true }).limit(1);
  if (r.error || !r.data?.length) return { task: null, persistence: 'supabase', error: r.error?.message || 'No queued task' };
  const task = r.data[0];
  await db.from('build_queue').update({ status: 'claimed', updated_at: new Date().toISOString() }).eq('id', task.id);
  return { task: { ...task, status: 'claimed' }, persistence: 'supabase' };
}

export async function finishSandboxTask(task, result) {
  const db = getDb();
  if (!db) { if (task) task.status = 'drafted'; return { persistence: 'memory_fallback' }; }
  if (task?.id) await db.from('build_queue').update({ status: 'drafted', result, updated_at: new Date().toISOString() }).eq('id', task.id);
  return { persistence: 'supabase' };
}
