import { getDb } from './db.js';
import { memory } from './state.js';

export async function readReleaseGate() {
  const db = getDb();
  if (!db) return { ...memory.release_gates[0], persistence: 'memory_fallback' };
  const r = await db.from('release_gates').select('*').eq('gate_name', 'main_release_gate').limit(1);
  return { ...(r.data?.[0] || memory.release_gates[0]), persistence: 'supabase' };
}

export async function keepReleaseGateHold() {
  const db = getDb();
  if (!db) { memory.release_gates[0].state = 'HOLD'; return { persistence: 'memory_fallback', state: 'HOLD' }; }
  await db.from('release_gates').update({ state: 'HOLD', updated_at: new Date().toISOString() }).eq('gate_name', 'main_release_gate');
  return { persistence: 'supabase', state: 'HOLD' };
}
