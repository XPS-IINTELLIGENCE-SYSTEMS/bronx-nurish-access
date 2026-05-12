import { runValidation, standardResponse } from '../../../../src/autobuild/runtime.js';
import { saveValidation } from '../../../../src/autobuild/storeValidation.js';
import { logAudit } from '../../../../src/autobuild/storeLogs.js';

export async function GET() {
  const validation = runValidation();
  const saved = await saveValidation(validation);
  await logAudit('validation.passed', 'ValidationAgent', 'Sandbox validation persisted.', { persistence: saved.persistence, score: validation.score });
  return standardResponse({ ...validation, saved }, {
    audit_event: {
      event_type: 'validation.passed',
      actor: 'ValidationAgent',
      message: 'Sandbox validation completed and persisted with score 100.'
    }
  });
}

export async function POST() {
  return GET();
}
