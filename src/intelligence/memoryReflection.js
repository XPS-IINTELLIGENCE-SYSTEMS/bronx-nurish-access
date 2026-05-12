import { runFrontierBenchmark } from './frontierBenchmarks.js';
import { runIntelligenceSimulation, generateUpgradeTasks, generatePromptLibrary } from './simulation.js';

export function runMemoryReflectionCycle() {
  const benchmark = runFrontierBenchmark();
  const simulation = runIntelligenceSimulation({ passes: 5 });
  const upgradeTasks = generateUpgradeTasks();
  const prompts = generatePromptLibrary();

  return {
    cycle: 'memory_reflection_frontier_upgrade',
    mode: 'bounded_sandbox',
    release_gate: 'HOLD',
    external_actions_taken: false,
    memory_event: {
      summary: 'Captured frontier benchmark patterns and converted them into safe internal upgrade tasks.',
      retained_patterns: benchmark.adopted_patterns,
      next_reflection_question: 'Which safe, testable system improvement produces the most leverage without opening production risk?'
    },
    reflection: {
      strengths: [
        'Postgres-backed sandbox runtime exists.',
        'Simulation and validation endpoints produce auditable results.',
        'Agent registry and dashboard are now available.',
        'Release gate remains closed.'
      ],
      weaknesses: [
        'Audit warnings still require lockfile-level verification.',
        'Live browser and Playwright execution are policy-stubbed, not unrestricted.',
        'Production environment still requires owner approval before promotion.'
      ],
      next_safe_actions: upgradeTasks.slice(0, 5)
    },
    benchmark,
    simulation,
    prompt_library: prompts
  };
}

export function getMemoryPolicy() {
  return {
    retention_mode: 'audit_log_and_postgres_safe_summary',
    stores_secrets: false,
    stores_personal_financial_advice: false,
    stores_trade_execution: false,
    stores_release_decisions: true,
    stores_reflection_summaries: true,
    bounded_rules: [
      'Summarize learning; do not store secrets.',
      'Reflect into tasks; do not self-authorize production.',
      'Track benchmark deltas; do not claim unverified capability gains.',
      'Keep release gate HOLD until owner approval.'
    ]
  };
}
