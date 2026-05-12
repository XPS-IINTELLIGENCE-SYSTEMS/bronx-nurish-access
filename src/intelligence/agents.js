export const INTELLIGENCE_AGENTS = [
  {
    id: 'benchmark-agent',
    name: 'BenchmarkAgent',
    phase: 'benchmark',
    purpose: 'Compare system state against approved benchmark workflow and score gaps.',
    outputs: ['benchmark_score', 'gap_list', 'safe_upgrade_tasks']
  },
  {
    id: 'simulation-agent',
    name: 'SimulationAgent',
    phase: 'simulation',
    purpose: 'Run bounded simulations against user, business, technical, and release scenarios.',
    outputs: ['simulation_score', 'scenario_results', 'blockers']
  },
  {
    id: 'reflection-agent',
    name: 'ReflectionAgent',
    phase: 'self_reflection',
    purpose: 'Summarize lessons learned, risks, and next safe improvement tasks.',
    outputs: ['reflection_notes', 'next_tasks', 'risk_flags']
  },
  {
    id: 'finance-agent',
    name: 'FinanceAgent',
    phase: 'finance_literacy',
    purpose: 'Create educational finance/business analysis prompts without giving personalized financial advice.',
    outputs: ['education_prompts', 'risk_disclosures', 'research_tasks']
  },
  {
    id: 'business-agent',
    name: 'BusinessAgent',
    phase: 'business_growth',
    purpose: 'Map traffic, education, tools, leads, offers, and follow-up workflows.',
    outputs: ['growth_tasks', 'conversion_map', 'cost_control_notes']
  },
  {
    id: 'code-agent',
    name: 'CodeAgent',
    phase: 'code_quality',
    purpose: 'Review architecture, tests, routes, and implementation gaps with sandbox-safe actions only.',
    outputs: ['code_tasks', 'test_tasks', 'refactor_notes']
  },
  {
    id: 'leadership-agent',
    name: 'LeadershipAgent',
    phase: 'leadership_library',
    purpose: 'Transform approved leadership principles into non-copyrighted summaries and action prompts.',
    outputs: ['leadership_prompts', 'behavioral_checklists', 'training_notes']
  },
  {
    id: 'philosophy-agent',
    name: 'PhilosophyAgent',
    phase: 'principles',
    purpose: 'Convert universal-law and ethics concepts into practical system guardrails.',
    outputs: ['principles', 'guardrails', 'decision_filters']
  },
  {
    id: 'web-research-agent',
    name: 'WebResearchAgent',
    phase: 'research',
    purpose: 'Plan bounded research tasks. Live browsing requires explicit connector support and source logging.',
    outputs: ['research_plan', 'source_requirements', 'citation_tasks']
  },
  {
    id: 'playwright-agent',
    name: 'PlaywrightAgent',
    phase: 'frontend_qa',
    purpose: 'Plan bounded headless/headful UI checks without destructive external actions.',
    outputs: ['qa_steps', 'screenshots_required', 'blockers']
  }
];

export const INTELLIGENCE_LIBRARY = [
  'AI systems and agent operations',
  'business growth and contractor success',
  'finance literacy and risk management',
  'stock and crypto research literacy without trade execution',
  'leadership principles summarized in original words',
  'universal-law and ethics guardrails',
  'frontend usability and customer happiness',
  'code quality, testing, and release gates',
  'conversion path: Traffic -> Education -> Free Tools -> Lead -> Product -> Training -> Contractor Success -> AI Tools -> Repeat Engagement'
];

export const BOUNDED_RULES = [
  'No trading, buying, selling, or financial execution.',
  'No personalized financial advice; educational analysis only.',
  'No live Shopify publishing.',
  'No real email or SMS sending.',
  'No paid ads.',
  'No destructive repository actions.',
  'No secret exposure.',
  'All external research must record source requirements and stay draft-only.',
  'Release gate remains HOLD until owner approval.',
  'Every upgrade produces testable tasks and simulation results.'
];

export function listAgentSystem() {
  return {
    agents: INTELLIGENCE_AGENTS,
    library: INTELLIGENCE_LIBRARY,
    bounded_rules: BOUNDED_RULES,
    mode: 'sandbox_intelligence_upgrade'
  };
}
