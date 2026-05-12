import { standardResponse } from '../../../../src/autobuild/runtime.js';
import { getVizualXOperatorControlCenter } from '../../../../src/workflow/vizualXOperatorControlCenter.js';
import { logAudit } from '../../../../src/autobuild/storeLogs.js';

export async function GET() {
  const controlCenter = getVizualXOperatorControlCenter();
  await logAudit('workflow.vizual_x_operator_control_center.read', 'VizualXOperatorControlCenter', 'Vizual-X operator control center schema returned.', {
    section_count: controlCenter.primary_sections.length,
    linked_system_count: controlCenter.linked_systems.length
  });
  return standardResponse(controlCenter, {
    warnings: [
      'Control-center schema only. UI implementation belongs in the Vizual-X frontend layer.',
      'Cron changes require an implementation strategy that respects Vercel cron deployment and plan limits.'
    ],
    audit_event: {
      event_type: 'workflow.vizual_x_operator_control_center.read',
      actor: 'VizualXOperatorControlCenter',
      message: 'Vizual-X operator control center schema returned safely.'
    }
  });
}
