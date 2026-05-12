import { runSimulation, standardResponse } from '../../../../src/autobuild/runtime.js';
import { saveSimulation } from '../../../../src/autobuild/storeSimulation.js';
import { logAudit } from '../../../../src/autobuild/storeLogs.js';

export async function GET() {
  const simulation = runSimulation(5);
  const saved = await saveSimulation(simulation);
  await logAudit('simulation.completed', 'SimulationAgent', 'Sandbox simulation suite persisted.', { persistence: saved.persistence, inserted: saved.inserted });
  return standardResponse({ ...simulation, saved }, {
    audit_event: {
      event_type: 'simulation.completed',
      actor: 'SimulationAgent',
      message: 'Sandbox simulation suite persisted: five passes, 100 score, release gate HOLD.'
    }
  });
}

export async function POST() {
  return GET();
}
