export const DEFAULT_STATE = {
  system_mode: 'sandbox',
  dry_run: true,
  draft_only: true,
  release_gate: 'HOLD',
  real_external_actions: false
};

export const memory = globalThis.__AUTO_BUILD_SANDBOX_STATE__ || {
  build_queue: [
    { id: 'task-001', task_title: 'Persisted Shopify draft workflow', task_type: 'shopify_draft_spec', assigned_agent: 'ShopifyWorkflowAgent', status: 'queued', priority: 10, payload: { draft_only: true } },
    { id: 'task-002', task_title: 'Persisted social draft workflow', task_type: 'social_draft_spec', assigned_agent: 'SocialMediaAgent', status: 'queued', priority: 20, payload: { draft_only: true } },
    { id: 'task-003', task_title: 'Persisted release gate validation', task_type: 'release_gate_check', assigned_agent: 'ReleaseGateAgent', status: 'queued', priority: 30, payload: { release_gate: 'HOLD' } }
  ],
  agent_runs: [],
  validation_results: [],
  simulation_runs: [],
  release_gates: [{ id: 'gate-main', gate_name: 'main_release_gate', state: 'HOLD', p0_blockers: 0, p1_blockers: 0, achieved_simulation_passes: 0 }],
  audit_log: []
};

globalThis.__AUTO_BUILD_SANDBOX_STATE__ = memory;

export function makeId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function runtimeMeta(extra = {}) {
  return {
    ...DEFAULT_STATE,
    request_id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...extra
  };
}

export function summarizeState(state = memory, persistence = 'memory_fallback', warnings = []) {
  const q = state.build_queue || [];
  const count = status => q.filter(task => task.status === status).length;
  return {
    persistence,
    queue: {
      queued: count('queued'),
      claimed: count('claimed'),
      drafted: count('drafted'),
      blocked: count('blocked'),
      ready_for_review: count('ready_for_review')
    },
    agents: { mock_ready: 16, real_enabled: 0 },
    release_gate: state.release_gates?.[0]?.state || 'HOLD',
    warnings
  };
}
