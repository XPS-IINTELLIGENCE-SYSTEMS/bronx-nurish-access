import { standardResponse } from '../../../../src/autobuild/runtime.js';
import { createCompanyLaunchInvocation } from '../../../../src/agents/launchInvocations.js';
import { logAudit } from '../../../../src/autobuild/storeLogs.js';

export async function GET() {
  const launch = createCompanyLaunchInvocation();
  await logAudit('agents.launch.invoked', 'AgentLaunchSystem', 'Sandbox multi-agent company launch generated.', { launch_id: launch.launch_id, agents: launch.invocations.length });
  return standardResponse(launch, {
    warnings: ['Sandbox launch only. Release gate remains HOLD and external actions are disabled.'],
    audit_event: {
      event_type: 'agents.launch.invoked',
      actor: 'AgentLaunchSystem',
      message: 'Sandbox multi-agent launch generated safely.'
    }
  });
}

export async function POST() {
  return GET();
}
