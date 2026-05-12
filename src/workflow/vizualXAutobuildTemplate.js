export const VIZUAL_X_AUTOBUILD_TEMPLATE = {
  id: 'vizual-x-autobuild-template-v1',
  name: 'Vizual-X AutoBuild System Workflow',
  purpose: 'Convert an operator or client intake form into builder docs, discovery research, Vercel implementation specifications, sandbox build plans, packaging specs, connector requirements, and environment-variable maps.',
  mode: 'programmatic_workflow_template',
  release_gate: 'HOLD',
  external_actions_taken: false,
  entrypoint: {
    type: 'form',
    route_target: '/intelligence-os/workflows/autobuild',
    execute_button_label: 'Execute AutoBuild Workflow'
  },
  intake_form_sections: [
    {
      id: 'operator_identity',
      label: 'Operator / Client Identity',
      fields: [
        { key: 'project_name', label: 'Project or System Name', type: 'text', required: true },
        { key: 'operator_name', label: 'Operator / Client Name', type: 'text', required: true },
        { key: 'business_name', label: 'Business / Brand Name', type: 'text', required: false },
        { key: 'primary_email', label: 'Primary Email', type: 'email', required: false },
        { key: 'timezone', label: 'Timezone', type: 'text', required: false }
      ]
    },
    {
      id: 'system_goal',
      label: 'System Goal and Outcome',
      fields: [
        { key: 'core_goal', label: 'Exact Goal', type: 'textarea', required: true },
        { key: 'doubled_goal', label: 'Doubled Stretch Goal', type: 'textarea', required: false },
        { key: 'success_definition', label: 'Definition of Success', type: 'textarea', required: true },
        { key: 'primary_users', label: 'Primary Users', type: 'textarea', required: true },
        { key: 'operator_problem', label: 'Problem the System Must Solve', type: 'textarea', required: true }
      ]
    },
    {
      id: 'business_and_revenue',
      label: 'Business Model and Value Path',
      fields: [
        { key: 'revenue_paths', label: 'Revenue Paths', type: 'textarea', required: true },
        { key: 'lead_capture_path', label: 'Lead Capture Path', type: 'textarea', required: false },
        { key: 'offer_ladder', label: 'Offer / Product Ladder', type: 'textarea', required: false },
        { key: 'investor_goal', label: 'Investor or Capital Goal', type: 'textarea', required: false },
        { key: 'cost_constraints', label: 'Cost Constraints', type: 'textarea', required: false }
      ]
    },
    {
      id: 'workflow_and_autonomy',
      label: 'Workflow and Autonomy Requirements',
      fields: [
        { key: 'workflow_phases', label: 'Required Workflow Phases', type: 'textarea', required: true },
        { key: 'automation_scope', label: 'What Must Run Automatically', type: 'textarea', required: true },
        { key: 'approval_scope', label: 'What Requires Approval', type: 'textarea', required: false },
        { key: 'trigger_cadence', label: 'Desired Trigger Cadence', type: 'select', required: true, options: ['5_minutes', '10_minutes', 'hourly', 'daily', 'mixed'] },
        { key: 'dashboard_requirements', label: 'Required Dashboard Modules', type: 'textarea', required: true }
      ]
    },
    {
      id: 'ai_and_agents',
      label: 'AI, Agents, and Intelligence Requirements',
      fields: [
        { key: 'agent_roles', label: 'Agent Roles Needed', type: 'textarea', required: true },
        { key: 'chat_requirements', label: 'Chat / Copilot Requirements', type: 'textarea', required: false },
        { key: 'ai_gateway_modes', label: 'AI Gateway Modes Needed', type: 'textarea', required: false },
        { key: 'memory_requirements', label: 'Memory / Reflection Requirements', type: 'textarea', required: false },
        { key: 'simulation_requirements', label: 'Simulation / Test Harness Requirements', type: 'textarea', required: true }
      ]
    },
    {
      id: 'research_and_discovery',
      label: 'Discovery and Browser Research',
      fields: [
        { key: 'competitors_or_benchmarks', label: 'Systems / Competitors to Benchmark', type: 'textarea', required: false },
        { key: 'source_domains', label: 'Preferred Source Domains', type: 'textarea', required: false },
        { key: 'industry_research_topics', label: 'Research Topics', type: 'textarea', required: true },
        { key: 'must_verify_facts', label: 'Facts That Must Be Verified', type: 'textarea', required: false }
      ]
    },
    {
      id: 'vercel_and_runtime',
      label: 'Vercel Runtime Requirements',
      fields: [
        { key: 'workflow_required', label: 'Use Vercel Workflow', type: 'boolean', required: true },
        { key: 'sandbox_required', label: 'Use Vercel Sandbox', type: 'boolean', required: true },
        { key: 'agents_required', label: 'Use Vercel-Agent-Compatible Architecture', type: 'boolean', required: true },
        { key: 'cron_required', label: 'Use Vercel Cron', type: 'boolean', required: true },
        { key: 'ai_gateway_required', label: 'Use Vercel AI Gateway', type: 'boolean', required: true }
      ]
    },
    {
      id: 'connectors_and_environment',
      label: 'Connectors, APIs, and Environment Variables',
      fields: [
        { key: 'required_connectors', label: 'Required Connectors', type: 'textarea', required: false },
        { key: 'external_apis', label: 'External APIs', type: 'textarea', required: false },
        { key: 'database_requirements', label: 'Database / Persistence Requirements', type: 'textarea', required: false },
        { key: 'env_requirements', label: 'Expected Environment Variables', type: 'textarea', required: false },
        { key: 'safety_constraints', label: 'Safety / Release Constraints', type: 'textarea', required: true }
      ]
    },
    {
      id: 'packaging_and_handoff',
      label: 'Packaging and Handoff',
      fields: [
        { key: 'package_type', label: 'Package Type', type: 'select', required: true, options: ['repo_package', 'client_spec_package', 'deployment_package', 'all'] },
        { key: 'documentation_depth', label: 'Documentation Depth', type: 'select', required: true, options: ['standard', 'enterprise', 'faang_grade'] },
        { key: 'handoff_expectations', label: 'Handoff Expectations', type: 'textarea', required: false }
      ]
    }
  ],
  workflow_phases: [
    'intake_form_validation',
    'goal_normalization_and_gap_detection',
    'browser_discovery_plan',
    'source_research_and_benchmarking',
    'builder_docs_generation',
    'vercel_runtime_spec_generation',
    'cron_and_workflow_trigger_spec',
    'sandbox_build_plan',
    'agent_system_spec',
    'connector_and_env_spec',
    'execute_button_job_packaging',
    'system_spec_package_generation',
    'sandbox_build_result_capture',
    'final_package_and_archive'
  ],
  outputs: [
    'autobuild_intake_record',
    'discovery_research_plan',
    'benchmark_report',
    'builder_docs_package',
    'vercel_workflow_spec',
    'vercel_sandbox_spec',
    'vercel_agent_spec',
    'vercel_cron_spec',
    'execute_button_trigger_spec',
    'system_spec_package',
    'connector_spec',
    'environment_variable_spec',
    'handoff_package'
  ]
};

export function getVizualXAutobuildTemplate() {
  return VIZUAL_X_AUTOBUILD_TEMPLATE;
}
