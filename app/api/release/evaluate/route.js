import { evaluateRelease, standardResponse } from '../../../../src/autobuild/runtime.js';
import { keepReleaseGateHold, readReleaseGate } from '../../../../src/autobuild/storeRelease.js';
import { logAudit } from '../../../../src/autobuild/storeLogs.js';

export async function GET() {
  await keepReleaseGateHold();
  const gate = await readReleaseGate();
  const evaluation = evaluateRelease();
  await logAudit('release.evaluated', 'ReleaseGateAgent', 'Sandbox release gate evaluated and kept HOLD.', { persistence: gate.persistence, state: gate.state });
  return standardResponse({ ...evaluation, gate }, {
    warnings: ['Release gate remains HOLD. Production is not approved.'],
    audit_event: {
      event_type: 'release.evaluated',
      actor: 'ReleaseGateAgent',
      message: 'Release gate evaluated, persisted, and kept closed.'
    }
  });
}

export async function POST() {
  return GET();
}
