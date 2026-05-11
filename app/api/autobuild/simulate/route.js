import { runSimulation, standardResponse } from '../../../../src/autobuild/runtime.js';

export async function GET() {
  return standardResponse(runSimulation(5), {
    audit_event: {
      event_type: 'simulation.completed',
      actor: 'SimulationAgent',
      message: 'Mock simulation suite completed: five passes, 100 score, release gate HOLD.'
    }
  });
}

export async function POST() {
  return GET();
}
