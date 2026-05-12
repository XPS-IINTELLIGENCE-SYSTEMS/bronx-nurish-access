export const SYSTEM_STATE = {
  system_mode: 'mock',
  dry_run: true,
  draft_only: true,
  release_gate: 'HOLD',
  real_external_actions: false
};

export const SCENARIOS = ['SIM-001', 'SIM-002', 'SIM-003', 'SIM-004', 'SIM-005'];

export const MOCK_QUEUE = [
  {
    id: 'task-001',
    title: 'Mock Shopify draft workflow',
    type: 'shopify_draft_spec',
    agent: 'ShopifyWorkflowAgent',
    status: 'queued'
  },
  {
    id: 'task-002',
    title: 'Mock social draft workflow',
    type: 'social_draft_spec',
    agent: 'SocialMediaAgent',
    status: 'queued'
  },
  {
    id: 'task-003',
    title: 'Mock release gate validation',
    type: 'release_gate_check',
    agent: 'ReleaseGateAgent',
    status: 'queued'
  }
];

export function standardResponse(data = {}, overrides = {}) {
  return Response.json({
    ok: overrides.ok ?? true,
    meta: {
      ...SYSTEM_STATE,
      request_id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    },
    data,
    blockers: overrides.blockers ?? [],
    warnings: overrides.warnings ?? [],
    audit_event: overrides.audit_event ?? {
      event_type: 'mock.autobuild.completed',
      actor: 'mock-runtime',
      message: 'Mock AutoBuild runtime completed safely.'
    }
  });
}

export function refuse(message, code = 'blocked_by_mock_safety') {
  return standardResponse({}, {
    ok: false,
    blockers: [
      {
        code,
        severity: 'P0',
        message,
        safe_next_action: 'Keep release gate HOLD and convert to mock or draft-only task.'
      }
    ],
    audit_event: {
      event_type: 'mock.autobuild.refused',
      actor: 'mock-runtime',
      message
    }
  });
}

export function dispatchMockTask() {
  const task = MOCK_QUEUE[0];
  return {
    selected_task: task,
    result_status: 'mock_drafted',
    validation_required: true,
    next_step: 'Run validation and simulation in mock mode.',
    external_actions_taken: false
  };
}

export function runValidation() {
  return {
    score: 100,
    passed: true,
    p0_blockers: 0,
    p1_blockers: 0,
    findings: [
      { check: 'dry_run', result: 'passed' },
      { check: 'draft_only', result: 'passed' },
      { check: 'release_gate_hold', result: 'passed' },
      { check: 'no_secrets', result: 'passed' },
      { check: 'no_real_external_actions', result: 'passed' }
    ]
  };
}

export function runSimulation(passes = 5) {
  const results = [];
  for (let pass = 1; pass <= passes; pass++) {
    for (const scenario_id of SCENARIOS) {
      results.push({
        scenario_id,
        pass_number: pass,
        score: 100,
        passed: true,
        blockers: []
      });
    }
  }
  return {
    suite: 'mock_connector_vercel_sandbox',
    passes_required: 5,
    passes_completed: passes,
    scenario_executions: results.length,
    all_scores: 100,
    p0_blockers: 0,
    p1_blockers: 0,
    release_gate: 'HOLD',
    recommendation: 'APPROVED_FOR_IMPLEMENTATION_AFTER_OWNER_REVIEW',
    results
  };
}

export function evaluateRelease() {
  return {
    current_state: 'HOLD',
    recommended_state: 'HOLD',
    can_open: false,
    required_actions: [
      'Owner approval required before staging.',
      'Keep all real connectors disabled.',
      'Keep external actions mocked.'
    ]
  };
}
