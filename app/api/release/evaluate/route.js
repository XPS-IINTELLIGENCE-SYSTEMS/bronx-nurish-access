import { evaluateRelease, standardResponse } from '../../../../src/autobuild/runtime.js';

export async function GET() {
  return standardResponse(evaluateRelease(), {
    warnings: ['Release gate remains HOLD. Production is not approved.'],
    audit_event: {
      event_type: 'release.evaluated',
      actor: 'ReleaseGateAgent',
      message: 'Release gate evaluated and kept closed.'
    }
  });
}

export async function POST() {
  return GET();
}
