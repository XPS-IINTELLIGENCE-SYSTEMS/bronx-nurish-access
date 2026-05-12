import { standardResponse } from '../../../../src/autobuild/runtime.js';
import { runAutopilotCycle } from '../../../../src/workflow/orchestrator.js';
import { logAudit } from '../../../../src/autobuild/storeLogs.js';

export async function GET() {
  const cycle = await runAutopilotCycle();
  await logAudit('workflow.autopilot_cycle.completed', 'AutopilotOrchestrator', 'Autopilot cycle completed with exception-only alerts.', { cycle_id: cycle.cycle_id, persistence: cycle.persistence });
  return standardResponse(cycle, {
    warnings: ['Autopilot executed safe internal work only. High-risk actions are exception alerts, not executed.'],
    audit_event: {
      event_type: 'workflow.autopilot_cycle.completed',
      actor: 'AutopilotOrchestrator',
      message: 'Autopilot cycle completed safely.'
    }
  });
}

export async function POST() {
  return GET();
}
