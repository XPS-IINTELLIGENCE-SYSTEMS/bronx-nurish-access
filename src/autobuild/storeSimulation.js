import { getDb, supabaseInsert, supabaseUpsert } from './db.js';
import { memory } from './state.js';

function makeMemoryId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export async function saveSimulation(simulation) {
  const rows = (simulation.results || []).map(result => ({
    scenario_id: result.scenario_id,
    scenario_name: result.scenario_name || result.scenario_id,
    pass_number: result.pass_number,
    score: result.score,
    passed: result.passed,
    report: result
  }));

  const db = getDb();
  if (!db) {
    const memoryRows = rows.map(row => ({ id: makeMemoryId('sim'), ...row }));
    memory.simulation_runs.push(...memoryRows);
    return { inserted: memoryRows.length, persistence: 'memory_fallback' };
  }

  try {
    if (rows.length) {
      await supabaseInsert('simulation_runs', rows, { returning: false });
    }
    await supabaseUpsert('release_gates', {
      gate_name: 'main_release_gate',
      state: 'HOLD',
      achieved_simulation_passes: simulation.passes_completed || 0,
      updated_at: new Date().toISOString()
    }, { onConflict: 'gate_name', returning: false });
    return { inserted: rows.length, persistence: 'supabase' };
  } catch (error) {
    const memoryRows = rows.map(row => ({ id: makeMemoryId('sim'), ...row }));
    memory.simulation_runs.push(...memoryRows);
    return { inserted: memoryRows.length, persistence: 'memory_fallback', error: error.message };
  }
}
