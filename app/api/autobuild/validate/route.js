import { runValidation, standardResponse } from '../../../../src/autobuild/runtime.js';

export async function GET() {
  return standardResponse(runValidation(), {
    audit_event: {
      event_type: 'validation.passed',
      actor: 'ValidationAgent',
      message: 'Mock validation completed with score 100.'
    }
  });
}

export async function POST() {
  return GET();
}
