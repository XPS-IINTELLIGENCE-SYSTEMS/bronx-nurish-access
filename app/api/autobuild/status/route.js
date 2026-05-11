import { MOCK_QUEUE, standardResponse } from '../../../../src/autobuild/runtime.js';

export async function GET() {
  return standardResponse({
    queue: {
      queued: MOCK_QUEUE.length,
      claimed: 0,
      blocked: 0,
      ready_for_review: 0
    },
    agents: {
      mock_ready: 16,
      real_enabled: 0
    },
    release_gate: 'HOLD'
  }, {
    warnings: ['Mock runtime only. No real external actions are enabled.'],
    audit_event: {
      event_type: 'status.read',
      actor: 'mock-runtime',
      message: 'AutoBuild mock status read completed.'
    }
  });
}
