import { runCodingAutonomyBenchmark } from './codingAutonomyBenchmarks.js';
import { runFrontierBenchmark } from './frontierBenchmarks.js';
import { runMemoryReflectionCycle } from './memoryReflection.js';
import { getFinancialDataSourcePlan, fetchSandboxMarketSnapshot } from './financialDataSources.js';

export const OPERATOR_GOAL = 'Build the best, smartest, most hardened, most autonomous, fastest, most universal, most syncable, most useful, most unbreakable AI operating system in the world.';
export const DOUBLED_STRETCH_GOAL = 'Build a 2x-stretched autopilot operating system that works 24/7, finds high-value intelligence, ranks opportunities, drafts assets, simulates outcomes, self-reflects, and only alerts Jeremy for true exceptions.';

export const OPPORTUNITY_SYSTEMS = [
  { id: 'enterprise-ai-implementation', score: 99, name: 'Enterprise AI implementation offers', path: 'B2B implementation, dashboards, automations, retainers' },
  { id: 'contractor-ai-tools', score: 98, name: 'Contractor AI tool templates', path: 'templates, calculators, lead systems, training assets' },
  { id: 'ai-media-company', score: 96, name: 'AI in Action media engine', path: 'content, education, sponsorship, lead magnets, productized knowledge' }
];

export const INVESTOR_SYSTEMS = [
  { id: 'traction-dashboard', score: 99, name: 'Traction dashboard', pattern: 'leads, usage, conversions, retention, revenue experiments' },
  { id: 'repeatable-growth-loop', score: 97, name: 'Repeatable growth loop', pattern: 'content -> tool -> lead -> offer -> proof -> investor narrative' },
  { id: 'defensible-workflow-data', score: 95, name: 'Defensible workflow data', pattern: 'niche workflow data, templates, operating history, automation logs' }
];

export async function generateDailyCommandBrief() {
  const coding = runCodingAutonomyBenchmark();
  const frontier = runFrontierBenchmark();
  const reflection = runMemoryReflectionCycle();
  const marketSources = getFinancialDataSourcePlan();
  const marketSnapshot = await fetchSandboxMarketSnapshot();

  const rankedOpportunities = OPPORTUNITY_SYSTEMS.slice().sort((a, b) => b.score - a.score).map((item, index) => ({ rank: index + 1, ...item }));
  const systemUpgrades = [
    { rank: 1, title: 'Autopilot exception-only review mode', status: 'active', impact: 'reduce operator burden' },
    { rank: 2, title: 'Daily command brief persistence', status: 'active', impact: 'daily decision automation' },
    { rank: 3, title: 'Sandbox market data adapter', status: 'active', impact: 'real-data research context without trading' },
    { rank: 4, title: 'AI in Action media simulation', status: 'queued', impact: 'content business engine' },
    { rank: 5, title: 'Investor readiness scorecard', status: 'queued', impact: 'capital attraction readiness' }
  ];

  const approvalRequests = [
    { id: 'public-publish', trigger_phrase: 'APPROVE PUBLIC PUBLISHING', reason: 'Needed only before live public posting.' },
    { id: 'production-release', trigger_phrase: 'APPROVE PRODUCTION', reason: 'Needed only before production deployment.' },
    { id: 'real-outreach', trigger_phrase: 'APPROVE REAL OUTREACH', reason: 'Needed only before sending real messages.' }
  ];

  return {
    brief_id: `daily-command-${crypto.randomUUID()}`,
    generated_at: new Date().toISOString(),
    operator_goal: OPERATOR_GOAL,
    doubled_stretch_goal: DOUBLED_STRETCH_GOAL,
    mode: 'autopilot_exception_only',
    release_gate: 'HOLD',
    external_actions_taken: false,
    coding_autonomy_benchmark: coding,
    frontier_benchmark: frontier,
    memory_reflection: reflection,
    financial_data_plan: marketSources,
    market_snapshot: marketSnapshot,
    ranked_opportunities: rankedOpportunities,
    investor_readiness_systems: INVESTOR_SYSTEMS,
    system_upgrades: systemUpgrades,
    content_ideas: [
      { rank: 1, title: 'AI in Action: what the best coding agents teach business owners', format: 'short video + article' },
      { rank: 2, title: 'How to turn a trade business into an AI-powered operating system', format: 'video script' },
      { rank: 3, title: 'Daily command brief: make AI work while you sleep', format: 'lead magnet' }
    ],
    digital_asset_ideas: [
      { rank: 1, title: 'Autopilot Operating Method playbook' },
      { rank: 2, title: 'Investor readiness dashboard' },
      { rank: 3, title: 'AI in Action media content kit' }
    ],
    risks: [
      { severity: 'high', item: 'Unverified claims', control: 'Label simulations and hypotheses clearly.' },
      { severity: 'high', item: 'Live financial action', control: 'Blocked. Paper simulation only.' },
      { severity: 'medium', item: 'Automation noise', control: 'Exception-only alerts and ranked outputs.' }
    ],
    approval_requests: approvalRequests,
    next_best_actions: systemUpgrades.slice(0, 3)
  };
}
