import { standardResponse } from '../../../../src/autobuild/runtime.js';
import { runFrontierBenchmark } from '../../../../src/intelligence/frontierBenchmarks.js';
import { runMemoryReflectionCycle, getMemoryPolicy } from '../../../../src/intelligence/memoryReflection.js';
import { logAudit } from '../../../../src/autobuild/storeLogs.js';

export async function GET() {
  const benchmark = runFrontierBenchmark();
  const reflection = runMemoryReflectionCycle();
  const memory_policy = getMemoryPolicy();
  const result = {
    trigger: 'frontier_benchmark_intelligence_cycle',
    schedule: 'every_10_minutes',
    benchmark,
    reflection,
    memory_policy,
    release_gate: 'HOLD',
    external_actions_taken: false
  };
  await logAudit('intelligence.frontier_benchmark.completed', 'FrontierBenchmarkAgent', 'Frontier benchmark and reflection cycle completed.', { systems: benchmark.systems_reviewed, score: benchmark.score });
  return standardResponse(result, {
    warnings: ['Sources are stored as URLs and summaries. No copyrighted benchmark text is reproduced. No trading or external execution is enabled.'],
    audit_event: {
      event_type: 'intelligence.frontier_benchmark.completed',
      actor: 'FrontierBenchmarkAgent',
      message: 'Frontier AI benchmark cycle completed safely.'
    }
  });
}

export async function POST() {
  return GET();
}
