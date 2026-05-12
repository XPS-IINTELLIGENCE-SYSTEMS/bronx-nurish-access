import { standardResponse } from '../../../../src/autobuild/runtime.js';
import { evaluateVizualXBuildLoop } from '../../../../src/workflow/vizualXBuildLoop.js';
import { logAudit } from '../../../../src/autobuild/storeLogs.js';

export async function GET() {
  const result = evaluateVizualXBuildLoop();
  await logAudit('workflow.vizual_x_build_loop.evaluated', 'VizualXBuildLoop', 'Vizual-X build loop status evaluated.', {
    build_complete: result.build_complete,
    remaining_count: result.remaining_count
  });
  return standardResponse(result, {
    warnings: result.build_complete ? [] : ['Vizual-X implementation remains in progress; continuing scheduled build status evaluation.'],
    audit_event: {
      event_type: 'workflow.vizual_x_build_loop.evaluated',
      actor: 'VizualXBuildLoop',
      message: 'Vizual-X scheduled build-loop evaluation completed.'
    }
  });
}

export async function POST() {
  return GET();
}
