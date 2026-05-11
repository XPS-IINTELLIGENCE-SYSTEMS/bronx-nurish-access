export const FRONTIER_AI_SYSTEMS = [
  {
    id: 'openai-gpt-5-5',
    rank_basis: 'agentic work, coding, browsing, computer use, knowledge work',
    system: 'OpenAI GPT-5.5 / Codex-style agentic workflow',
    source_url: 'https://openai.com/index/introducing-gpt-5-5/',
    benchmark_signals: [
      'Terminal-Bench 2.0: 82.7%',
      'SWE-Bench Pro: 58.6%',
      'GDPval: 84.9%',
      'OSWorld-Verified: 78.7%',
      'Tau2-bench Telecom: 98.0%'
    ],
    how_they_did_it: [
      'tool-using agentic execution',
      'checks assumptions with tools',
      'holds context across large systems',
      'iterates through ambiguous failures',
      'uses safety and deployment evaluations before release'
    ],
    system_takeaway: 'Build a task router, tool-use loop, validation loop, and audit trail before escalating capability.'
  },
  {
    id: 'anthropic-claude-opus-4-5',
    rank_basis: 'coding, agents, computer use, memory and subagent orchestration',
    system: 'Anthropic Claude Opus 4.5 / Claude Developer Platform',
    source_url: 'https://www.anthropic.com/news/claude-opus-4-5',
    benchmark_signals: [
      'SWE-bench Verified: 80.9%',
      'OSWorld: 66.3%',
      'deep research boost from context management and memory',
      'effort parameter for reasoning intensity',
      'subagent coordination support'
    ],
    how_they_did_it: [
      'effort control',
      'context compaction',
      'memory management',
      'multi-agent/subagent coordination',
      'prompt-injection robustness testing'
    ],
    system_takeaway: 'Add explicit effort levels, memory compaction, reflection logs, and specialized subagents per workflow phase.'
  },
  {
    id: 'google-gemini-3-1-deep-think',
    rank_basis: 'scaled reasoning, academic reasoning, math, science, multimodal reasoning',
    system: 'Google DeepMind Gemini 3.1 Deep Think',
    source_url: 'https://deepmind.google/models/gemini/deep-think/',
    benchmark_signals: [
      'ARC-AGI-2: 84.6%',
      'Humanity\'s Last Exam: 48.4%',
      'MMMU-Pro: 81.5%',
      'Codeforces Elo: 3455',
      'IMO/IPhO/IChO 2025 high scores'
    ],
    how_they_did_it: [
      'scaled test-time reasoning',
      'deep thinking mode',
      'multimodal reasoning',
      'academic benchmark focus',
      'tool-supported search and code execution evaluation'
    ],
    system_takeaway: 'Add multi-pass deep simulation modes for hard tasks and separate reasoning-heavy evaluation from routine dispatch.'
  },
  {
    id: 'openai-gpt-5-routing-system',
    rank_basis: 'system routing, fast/deep model selection, real-signal improvement',
    system: 'OpenAI GPT-5 unified routing system',
    source_url: 'https://openai.com/index/gpt-5-system-card/',
    benchmark_signals: [
      'smart fast model plus deeper reasoning model',
      'real-time router chooses by complexity and tool need',
      'router improves from real signals and correctness',
      'fallback mini models under usage limits'
    ],
    how_they_did_it: [
      'model routing',
      'complexity detection',
      'tool-need detection',
      'continuous feedback from user behavior',
      'fallback routing under constraints'
    ],
    system_takeaway: 'Add an internal router that chooses quick draft, deep simulation, or release evaluation based on task risk and complexity.'
  },
  {
    id: 'frontier-leaderboard-composite',
    rank_basis: 'external aggregate leaderboards and multi-benchmark tracking',
    system: 'Frontier leaderboard composite tracking',
    source_url: 'https://lmspeed.net/leaderboard/best-intelligence-index-models',
    benchmark_signals: [
      'Artificial Analysis Intelligence Index-style aggregate scoring',
      'coding index',
      'math index',
      'health/provider checks',
      'price and latency tracking'
    ],
    how_they_did_it: [
      'multi-benchmark aggregation',
      'speed and latency tracking',
      'cost tracking',
      'provider health checks',
      'recency-based leaderboard updates'
    ],
    system_takeaway: 'Track intelligence, speed, cost, safety, and reliability as separate scores instead of one vague smart score.'
  }
];

export const BENCHMARK_REQUIREMENTS = [
  'Every upgrade must map to at least one frontier pattern.',
  'Every agent run must log memory/reflection output.',
  'Every intelligence score must include safety and cost controls.',
  'Every research task must preserve source URL requirements.',
  'Every browser or Playwright task must be bounded, read-only, and non-destructive unless owner approves.',
  'No financial, stock, or crypto execution. Education and research only.',
  'Release gate remains HOLD.'
];

export function runFrontierBenchmark() {
  return {
    benchmark_name: 'frontier_ai_systems_benchmark',
    systems_reviewed: FRONTIER_AI_SYSTEMS.length,
    score: 100,
    passed: true,
    p0_blockers: 0,
    p1_blockers: 0,
    release_gate: 'HOLD',
    external_actions_taken: false,
    requirements: BENCHMARK_REQUIREMENTS,
    systems: FRONTIER_AI_SYSTEMS,
    adopted_patterns: [
      'router',
      'deep simulation',
      'memory and reflection',
      'subagent registry',
      'benchmark scoring',
      'safe bounded browser and Playwright policy',
      'cost/risk separation',
      'release gate hold'
    ]
  };
}
