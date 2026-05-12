import { standardResponse } from '../../../../src/autobuild/runtime.js';
import { seedSandboxQueue, claimSandboxTask, finishSandboxTask } from '../../../../src/autobuild/storeQueue.js';
import { logAgentRun, logAudit } from '../../../../src/autobuild/storeLogs.js';

export async function GET() {
  await seedSandboxQueue();
  const claimed = await claimSandboxTask();
  const task = claimed.task;
  const result = {
    selected_task: task,
    result_status: task ? 'sandbox_drafted' : 'no_task_available',
    validation_required: Boolean(task),
    next_step: task ? 'Run validation and simulation in sandbox mode.' : 'Seed or add more build_queue tasks.',
    external_actions_taken: false,
    persistence: claimed.persistence,
    error: claimed.error || null
  };
  if (task) {
    await logAgentRun(task, result);
    await finishSandboxTask(task, result);
  }
  await logAudit('dispatcher.completed', 'vercel-schedule-sandbox', 'Sandbox dispatch completed safely.', result);
  return standardResponse(result, {
    audit_event: {
      event_type: 'dispatcher.completed',
      actor: 'vercel-schedule-sandbox',
      message: 'One sandbox task dispatched safely. No external actions taken.'
    }
  });
}

export async function POST() {
  return GET();
}
