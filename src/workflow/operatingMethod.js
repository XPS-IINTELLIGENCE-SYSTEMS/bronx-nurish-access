export const OPERATOR_METHOD = {
  id: 'jeremy_operating_method_v1',
  name: 'Jeremy 24/7 Programmatic Operating Method',
  principle: 'Goal -> Double -> Reverse Engineer -> Benchmark -> Implement -> Simulate -> Score -> Reflect -> Queue Next Step -> Approval Gate',
  release_gate: 'HOLD',
  external_actions_taken: false
};

export const WORKFLOW_PHASES = [
  {
    id: 'capture_goal',
    order: 1,
    title: 'Capture Operator Goal',
    deterministic_action: 'normalize_latest_operator_goal',
    input: ['operator_command'],
    output: ['goal_record'],
    ai_required: false
  },
  {
    id: 'double_goal',
    order: 2,
    title: 'Double Stretch Target',
    deterministic_action: 'create_stretch_target',
    input: ['goal_record'],
    output: ['stretch_goal'],
    ai_required: false
  },
  {
    id: 'reverse_engineer',
    order: 3,
    title: 'Reverse Engineer Outcome',
    deterministic_action: 'build_outcome_map',
    input: ['stretch_goal'],
    output: ['outcome_map', 'phase_map'],
    ai_required: false
  },
  {
    id: 'benchmark',
    order: 4,
    title: 'Benchmark Proven Systems',
    deterministic_action: 'select_benchmark_registry',
    input: ['phase_map'],
    output: ['benchmark_matches'],
    ai_required: false
  },
  {
    id: 'task_generation',
    order: 5,
    title: 'Generate Programmatic Tasks',
    deterministic_action: 'create_tasks_from_patterns',
    input: ['benchmark_matches'],
    output: ['queued_tasks'],
    ai_required: false
  },
  {
    id: 'simulation',
    order: 6,
    title: 'Run Simulation Harness',
    deterministic_action: 'run_phase_simulations',
    input: ['queued_tasks'],
    output: ['simulation_results'],
    ai_required: false
  },
  {
    id: 'scoring',
    order: 7,
    title: 'Score and Rank',
    deterministic_action: 'score_tasks_and_system_state',
    input: ['simulation_results'],
    output: ['ranked_tasks', 'scorecard'],
    ai_required: false
  },
  {
    id: 'reflection',
    order: 8,
    title: 'Memory and Reflection',
    deterministic_action: 'write_memory_reflection',
    input: ['scorecard'],
    output: ['memory_reflection'],
    ai_required: false
  },
  {
    id: 'approval_gate',
    order: 9,
    title: 'Approval Gate',
    deterministic_action: 'hold_or_request_approval',
    input: ['ranked_tasks', 'memory_reflection'],
    output: ['approval_requests'],
    ai_required: false
  },
  {
    id: 'next_cycle',
    order: 10,
    title: 'Queue Next Cycle',
    deterministic_action: 'schedule_next_safe_task',
    input: ['approval_requests'],
    output: ['next_cycle_seed'],
    ai_required: false
  }
];

export const UNIVERSAL_SCORECARD = {
  opportunity_weight: 20,
  leverage_weight: 15,
  revenue_path_weight: 15,
  automation_value_weight: 15,
  accuracy_weight: 10,
  risk_control_weight: 10,
  speed_weight: 5,
  cost_control_weight: 5,
  approval_clarity_weight: 5
};

export const BENCHMARK_REGISTRY = [
  'OpenAI Codex: cloud sandbox, PR loop, parallel task execution',
  'Anthropic Claude Code: subagents, context isolation, permission matrix',
  'Google Jules: async cloud task execution, human-reviewed diffs',
  'Temporal: durable workflows, retries, signals, timers, state replay',
  'Cloudflare Workflows: durable multi-step execution, retryable steps, long-running tasks',
  'Vercel Cron: scheduled API endpoint triggers',
  'Postgres Queue: durable state, SKIP LOCKED compatible work claiming',
  'Cursor: workflow-native AI assistance and custom project rules'
];

export function getOperatingMethod() {
  return {
    method: OPERATOR_METHOD,
    phases: WORKFLOW_PHASES,
    scorecard: UNIVERSAL_SCORECARD,
    benchmarks: BENCHMARK_REGISTRY
  };
}
