import { getDb } from './db.js';
import { memory, makeId } from './state.js';

export async function saveSimulation(simulation) {
  const rows = (simulation.results || []).map(r => ({
    id: makeId('sim'),
    scenario_id: r.scenario_id,
    pass_number: r.pass_number,
    score: r.score,
    passed: r.passed,
    report: r
  }));
  const db = getDb();
  if (!db) { memory.simulation_runs.push(...rows); return { inserted: rows.length, persistence: 'memory_fallback' }; }
  if (rows.length) await db.from('simulation_runs').insert(rows);
  await db.from('release_gates').update({ achieved_simulation_passes: simulation.passes_completed, state: 'HOLD', updated_at: new Date().toISOString() }).eq('gate_name', 'main_release_gate');
  return { inserted: rows.length, persistence: 'supabase' };
}
