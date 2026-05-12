import { standardResponse } from '../../../../src/autobuild/runtime.js';
import { getSupabaseConfig } from '../../../../src/autobuild/db.js';
import { logAudit } from '../../../../src/autobuild/storeLogs.js';

export async function GET() {
  const config = getSupabaseConfig();
  const data = {
    hasUrl: config.hasUrl,
    hasKey: config.hasKey,
    persistence_ready: config.hasUrl && config.hasKey,
    env_names_present: config.status,
    values_exposed: false
  };
  await logAudit('env.checked', 'sandbox-runtime', 'Supabase env names checked without exposing values.', data);
  return standardResponse(data, {
    warnings: config.hasUrl && config.hasKey ? [] : ['Supabase env vars are not visible to this deployment/runtime.'],
    audit_event: {
      event_type: 'env.checked',
      actor: 'sandbox-runtime',
      message: 'Supabase env names checked. No secret values exposed.'
    }
  });
}
