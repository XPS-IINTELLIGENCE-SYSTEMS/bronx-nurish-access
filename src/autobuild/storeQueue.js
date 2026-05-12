import { getDb, supabaseInsert, supabasePatch, supabaseSelect, supabaseUpsert } from './db.js';
import { memory, summarizeState } from './state.js';

function memoryQueueSummary(warnings = []) {
  return summarizeState(memory, 'memory_fallback', warnings);
}

function safeQueueSeedTask(task) {
  return {
    task_title: task.task_title,
    task_type: task.task_type,
    assigned_agent: task.assigned_agent,
    status: task.status,
    priority: task.priority,
    system_mode: 'dry_run',
    payload: { ...task.payload, source_task_id: task.id }
  };
}

export async function seedSandboxQueue() {
  const db = getDb();
  if (!db) return { persistence: 'memory_fallback', seeded: true };
  try {
    await supabaseUpsert('release_gates', {
      gate_name: 'main_release_gate',
      state: 'HOLD',
      notes: 'Supabase sandbox release gate. Keep closed until owner approval.'
    }, { onConflict: 'gate_name', returning: false });

    const existing = await supabaseSelect('build_queue', { select: 'id', limit: '1' });
    if (!existing.length) {
      await supabaseInsert('build_queue', memory.build_queue.map(safeQueueSeedTask), { returning: false });
    }
    return { persistence: 'supabase', seeded: true };
  } catch (error) {
    return { persistence: 'memory_fallback', seeded: false, error: error.message };
  }
}

export async function readSandboxStatus() {
  const db = getDb();
  if (!db) return memoryQueueSummary();
  try {
    const q = await supabaseSelect('build_queue', { order: 'priority.asc,created_at.asc' });
    const g = await supabaseSelect('release_gates', { order: 'updated_at.desc' });
    return summarizeState({ ...memory, build_queue: q, release_gates: g }, 'supabase');
  } catch (error) {
    return memoryQueueSummary([error.message]);
  }
}

export async function claimSandboxTask() {
  const db = getDb();
  if (!db) {
    const task = memory.build_queue.find(t => t.status === 'queued') || memory.build_queue[0];
    if (task) task.status = 'claimed';
    return { task: task || null, persistence: 'memory_fallback' };
  }
  try {
    const rows = await supabaseSelect('build_queue', {
      status: 'eq.queued',
      order: 'priority.asc,created_at.asc',
      limit: '1'
    });
    if (!rows.length) return { task: null, persistence: 'supabase', error: 'No queued task' };
    const task = rows[0];
    const updated = await supabasePatch('build_queue', { id: `eq.${task.id}` }, {
      status: 'claimed',
      claimed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    return { task: updated[0] || { ...task, status: 'claimed' }, persistence: 'supabase' };
  } catch (error) {
    return { task: null, persistence: 'memory_fallback', error: error.message };
  }
}

export async function finishSandboxTask(task, result) {
  const db = getDb();
  if (!db) {
    if (task) task.status = 'drafted';
    return { persistence: 'memory_fallback' };
  }
  try {
    if (task?.id) {
      await supabasePatch('build_queue', { id: `eq.${task.id}` }, {
        status: 'drafted',
        result,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, { returning: false });
    }
    return { persistence: 'supabase' };
  } catch (error) {
    return { persistence: 'memory_fallback', error: error.message };
  }
}
