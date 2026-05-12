export const AUTOPILOT_POLICY = {
  id: 'jeremy_autopilot_v1',
  mode: 'autonomous_by_default',
  operator_burden_goal: 'avoid_review_for_safe_internal_work',
  release_gate: 'HOLD',
  external_actions_taken: false
};

export const AUTO_RUN_ACTIONS = [
  'benchmark_systems',
  'run_simulations',
  'score_opportunities',
  'draft_content',
  'draft_pages',
  'draft_playbooks',
  'write_memory_reflections',
  'create_internal_tasks',
  'update_internal_dashboards',
  'generate_daily_briefs',
  'rank_ideas',
  'create_sandbox_agent_messages',
  'paper_trade_simulation',
  'fix_docs',
  'add_tests',
  'add_safe_internal_modules'
];

export const ESCALATE_ACTIONS = [
  'production_release',
  'public_publish',
  'real_outreach',
  'paid_campaign',
  'live_financial_execution',
  'regulated_claim',
  'credential_or_secret_change',
  'destructive_repo_change'
];

export function classifyAutopilotAction(action) {
  if (AUTO_RUN_ACTIONS.includes(action)) {
    return {
      action,
      tier: 'AUTO_RUN',
      can_execute: true,
      approval_required: false,
      reason: 'Safe internal or sandbox action.'
    };
  }
  if (ESCALATE_ACTIONS.includes(action)) {
    return {
      action,
      tier: 'ESCALATE_ONLY',
      can_execute: false,
      approval_required: true,
      reason: 'Creates external, financial, legal, public, credential, destructive, or production risk.'
    };
  }
  return {
    action,
    tier: 'AUTO_DRAFT_LOG',
    can_execute: true,
    approval_required: false,
    reason: 'Default to safe draft/log mode.'
  };
}

export function getAutopilotPolicy() {
  return {
    policy: AUTOPILOT_POLICY,
    auto_run_actions: AUTO_RUN_ACTIONS,
    escalate_actions: ESCALATE_ACTIONS,
    review_everything: false,
    release_gate: 'HOLD'
  };
}
