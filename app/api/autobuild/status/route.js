import { standardResponse } from '../../../../src/autobuild/runtime.js';
import { seedSandboxQueue, readSandboxStatus } from '../../../../src/autobuild/storeQueue.js';
import { logAudit } from '../../../../src/autobuild/storeLogs.js';

export async function GET() {
  await seedSandboxQueue();
  const status = await readSandboxStatus();
  await logAudit('status.read', 'sandbox-runtime', 'Persisted sandbox status read.', { persistence: status.persistence });
  return standardResponse(status, {
    warnings: status.warnings?.length ? status.warnings : ['Sandbox persistence active. Real external actions remain disabled.'],
    audit_event: {
      event_type: 'status.read',
      actor: 'sandbox-runtime',
      message: 'AutoBuild sandbox status read completed.'
    }
  });
}
