import { classifyAutopilotAction, getAutopilotPolicy } from './autonomyPolicy.js';
import { generateDailyCommandBrief } from '../intelligence/dailyCommandBrief.js';
import { saveDailyCommandBrief } from '../intelligence/dailyBriefStore.js';

export async function runAutopilotCycle() {
  const actions = [
    'benchmark_systems',
    'run_simulations',
    'score_opportunities',
    'write_memory_reflections',
    'generate_daily_briefs',
    'rank_ideas',
    'paper_trade_simulation',
    'production_release',
    'public_publish'
  ];

  const classifications = actions.map(classifyAutopilotAction);
  const autoExecutable = classifications.filter(item => item.can_execute);
  const escalations = classifications.filter(item => !item.can_execute);

  const brief = await generateDailyCommandBrief();
  const saveResult = await saveDailyCommandBrief(brief);

  return {
    cycle_id: `autopilot-${crypto.randomUUID()}`,
    generated_at: new Date().toISOString(),
    mode: 'autopilot_exception_only',
    policy: getAutopilotPolicy(),
    release_gate: 'HOLD',
    external_actions_taken: false,
    actions_classified: classifications,
    auto_executed_internal_actions: autoExecutable.map(item => item.action),
    exception_alerts: escalations.map(item => ({ action: item.action, reason: item.reason, approval_required: item.approval_required })),
    daily_command_brief: brief,
    persistence: saveResult,
    next_cycle: {
      trigger: 'scheduled',
      cadence: 'every_10_minutes_or_daily_5am_depending_route',
      next_task: brief.next_best_actions?.[0] || null
    }
  };
}
