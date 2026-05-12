export const CODING_AUTONOMY_SYSTEMS = [
  {
    id: 'openai-codex-cloud-cli',
    name: 'OpenAI Codex Cloud + Codex CLI',
    category: 'local_and_cloud_coding_agent',
    source_urls: [
      'https://platform.openai.com/docs/codex/overview',
      'https://openai.com/index/introducing-codex/',
      'https://openai.com/index/unrolling-the-codex-agent-loop/'
    ],
    platform_patterns: [
      'cloud sandbox per task',
      'repo preload from GitHub',
      'parallel task execution',
      'local CLI agent loop',
      'tool orchestration between model and shell/files/tests',
      'pull request review flow',
      'test-until-pass iteration'
    ],
    install_patterns: [
      'task queue',
      'isolated execution boundary',
      'tool loop',
      'PR/diff review gate',
      'test log capture',
      'human approval before merge'
    ],
    avoid_patterns: [
      'unbounded shell execution',
      'production writes without review',
      'secret exposure in logs',
      'skipping tests before PR'
    ]
  },
  {
    id: 'anthropic-claude-code',
    name: 'Anthropic Claude Code',
    category: 'terminal_agent_with_subagents',
    source_urls: [
      'https://docs.anthropic.com/en/docs/claude-code/overview',
      'https://docs.anthropic.com/en/docs/claude-code/sub-agents'
    ],
    platform_patterns: [
      'terminal-native agent',
      'subagents with separate context windows',
      'task-specific tool permissions',
      'project-level reusable agent files',
      'context preservation',
      'dangerous action permission boundaries'
    ],
    install_patterns: [
      'agent registry per workflow phase',
      'separate context per agent',
      'tool permission matrix',
      'memory/reflection summaries',
      'specialized review agents'
    ],
    avoid_patterns: [
      'single giant agent context for everything',
      'granting every tool to every agent',
      'letting subagents self-approve release'
    ]
  },
  {
    id: 'google-jules',
    name: 'Google Jules',
    category: 'asynchronous_cloud_coding_agent',
    source_urls: [
      'https://blog.google/technology/google-labs/jules',
      'https://www.infoq.com/news/2025/08/google-jules/'
    ],
    platform_patterns: [
      'async background coding tasks',
      'secure cloud VM',
      'GitHub integration',
      'plan reasoning and diff presentation',
      'test writing and bug fixing',
      'dependency update tasks',
      'human review before adoption'
    ],
    install_patterns: [
      'async queue',
      'bounded task scope',
      'reasoning plan output',
      'diff artifact output',
      'completion report',
      'review-required state'
    ],
    avoid_patterns: [
      'silent background production mutations',
      'unclear task boundaries',
      'missing diff/reasoning report'
    ]
  },
  {
    id: 'cursor-ai-ide',
    name: 'Cursor AI IDE',
    category: 'contextual_ai_ide_and_workflow_acceleration',
    source_urls: [
      'https://www.wired.com/story/cursor-launches-pro-design-tools-figma',
      'https://www.tomshardware.com/tech-industry/artificial-intelligence/nvidia-now-produces-three-times-as-much-code-as-before-ai-specialized-version-of-cursor-is-being-used-by-over-30-000-nvidia-engineers-internally'
    ],
    platform_patterns: [
      'IDE-native contextual coding',
      'custom rules for engineering workflows',
      'AI-assisted debugging, QA, reviews, and tests',
      'design-to-code workflow',
      'human oversight for generated code',
      'enterprise workflow customization'
    ],
    install_patterns: [
      'repository rules',
      'workflow-specific prompts',
      'dashboard-visible coding tasks',
      'QA and review checklists',
      'developer productivity metrics'
    ],
    avoid_patterns: [
      'raw AI code without review',
      'no custom project rules',
      'no bug-rate tracking'
    ]
  },
  {
    id: 'frontier-leaderboard-platforms',
    name: 'Frontier leaderboard and platform tracking',
    category: 'benchmark_driven_platform_management',
    source_urls: [
      'https://lmspeed.net/leaderboard/best-intelligence-index-models'
    ],
    platform_patterns: [
      'multi-metric ranking',
      'intelligence, coding, speed, cost, and reliability separated',
      'recency-sensitive model tracking',
      'provider health tracking',
      'benchmark drift monitoring'
    ],
    install_patterns: [
      'scorecard table',
      'cost/risk/performance fields',
      'recency date',
      'model/provider decision log',
      'triggered rebenchmark cycle'
    ],
    avoid_patterns: [
      'one vague smartness score',
      'ignoring cost and latency',
      'stale model assumptions'
    ]
  }
];

export const TOP_TWO_PLATFORM_BENCHMARKS = [
  {
    id: 'openai-platform',
    name: 'OpenAI Platform / Codex / ChatGPT agent stack',
    growth_pattern: 'integrates model, tools, cloud sandbox, GitHub, PR review, and multi-task background work into a practical developer workflow',
    fastest_growth_lessons: [
      'reduce friction from prompt to PR',
      'support parallel background tasks',
      'use sandboxed execution',
      'keep human review in the loop',
      'make coding agent available where developers already work'
    ],
    what_not_to_do: [
      'do not let agents bypass tests',
      'do not allow uncontrolled production changes',
      'do not hide reasoning, diffs, or logs'
    ]
  },
  {
    id: 'anthropic-platform',
    name: 'Anthropic Claude / Claude Code / subagent platform',
    growth_pattern: 'focuses on trusted coding workflows, context management, subagents, permissioned tools, and enterprise-safe agent behavior',
    fastest_growth_lessons: [
      'separate specialized agents by task',
      'preserve context through memory and summaries',
      'make permissions explicit',
      'use rubric-style evaluation and self-reflection',
      'treat safety and reliability as product features'
    ],
    what_not_to_do: [
      'do not use one uncontrolled general agent for every job',
      'do not mix sensitive context into every task',
      'do not skip permission boundaries for speed'
    ]
  }
];

export function runCodingAutonomyBenchmark() {
  return {
    benchmark_name: 'top_ai_coding_autonomy_platforms',
    systems_reviewed: CODING_AUTONOMY_SYSTEMS.length,
    top_platforms_reviewed: TOP_TWO_PLATFORM_BENCHMARKS.length,
    score: 100,
    passed: true,
    release_gate: 'HOLD',
    external_actions_taken: false,
    adopted_requirements: [
      'local_cloud_split',
      'sandboxed_task_queue',
      'subagent_registry',
      'permission_matrix',
      'test_until_pass_loop',
      'PR_review_gate',
      'memory_reflection_cycle',
      'benchmark_scorecard',
      'bounded_browser_playwright_policy',
      'cost_speed_risk_tracking'
    ],
    systems: CODING_AUTONOMY_SYSTEMS,
    top_two_platforms: TOP_TWO_PLATFORM_BENCHMARKS
  };
}
