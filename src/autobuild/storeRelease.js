import { getDb, supabaseSelect, supabaseUpsert } from './db.js';
import { memory } from './state.js';

function memoryGate(error) {
  return {
    ...memory.release_gates[0],
    persistence: 'memory_fallback',
    ...(error ? { error } : {})
  };
}

export async function readReleaseGate() {
  const db = getDb();
  if (!db) return memoryGate();
  try {
    const rows = await supabaseSelect('release_gates', {
      gate_name: 'eq.main_release_gate',
      limit: '1'
    });
    return {
      ...(rows[0] || memory.release_gates[0]),
      persistence: 'supabase'
    };
  } catch (error) {
    return memoryGate(error.message);
  }
}

export async function keepReleaseGateHold() {
  const db = getDb();
  if (!db) {
    memory.release_gates[0].state = 'HOLD';
    return { persistence: 'memory_fallback', state: 'HOLD' };
  }
  try {
    const rows = await supabaseUpsert('release_gates', {
      gate_name: 'main_release_gate',
      state: 'HOLD',
      notes: 'Supabase sandbox gate. Production not approved.',
      updated_at: new Date().toISOString()
    }, { onConflict: 'gate_name' });
    return {
      ...(rows[0] || {}),
      persistence: 'supabase',
      state: 'HOLD'
    };
  } catch (error) {
    memory.release_gates[0].state = 'HOLD';
    return { persistence: 'memory_fallback', state: 'HOLD', error: error.message };
  }
}
