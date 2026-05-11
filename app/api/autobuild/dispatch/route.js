import { dispatchMockTask, standardResponse } from '../../../../src/autobuild/runtime.js';

export async function GET() {
  return standardResponse(dispatchMockTask(), {
    audit_event: {
      event_type: 'dispatcher.completed',
      actor: 'vercel-schedule-mock',
      message: 'One mock task dispatched safely. No external actions taken.'
    }
  });
}

export async function POST() {
  return GET();
}
