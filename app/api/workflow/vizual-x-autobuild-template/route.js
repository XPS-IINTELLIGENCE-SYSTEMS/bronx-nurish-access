import { standardResponse } from '../../../../src/autobuild/runtime.js';
import { getVizualXAutobuildTemplate } from '../../../../src/workflow/vizualXAutobuildTemplate.js';
import { logAudit } from '../../../../src/autobuild/storeLogs.js';

export async function GET() {
  const template = getVizualXAutobuildTemplate();
  await logAudit('workflow.vizual_x_autobuild_template.read', 'VizualXAutobuildTemplate', 'Vizual-X AutoBuild workflow template exposed.', {
    template_id: template.id,
    phase_count: template.workflow_phases.length,
    output_count: template.outputs.length
  });
  return standardResponse(template, {
    warnings: ['Workflow template only. This endpoint exposes the reusable AutoBuild form and stage definition; it does not perform a production build.'],
    audit_event: {
      event_type: 'workflow.vizual_x_autobuild_template.read',
      actor: 'VizualXAutobuildTemplate',
      message: 'Vizual-X AutoBuild workflow template returned safely.'
    }
  });
}
