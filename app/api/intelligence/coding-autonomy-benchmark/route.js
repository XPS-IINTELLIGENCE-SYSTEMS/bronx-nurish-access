import { standardResponse } from '../../../../src/autobuild/runtime.js';
import { runCodingAutonomyBenchmark } from '../../../../src/intelligence/codingAutonomyBenchmarks.js';
import { runMemoryReflectionCycle } from '../../../../src/intelligence/memoryReflection.js';
import { logAudit } from '../../../../src/autobuild/storeLogs.js';

export async function GET() {
  const benchmark = runCodingAutonomyBenchmark();
  const reflection = runMemoryReflectionCycle();
  const result = {
    trigger: 'coding_autonomy_benchmark_cycle',
    schedule: 'every_10_minutes',
    mode: 'bounded_sandbox',
    benchmark,
    reflection_summary: reflection.memory_event,
    next_safe_actions: reflection.reflection.next_safe_actions,
    release_gate: 'HOLD',
    external_actions_taken: false
  };
  await logAudit('intelligence.coding_autonomy_benchmark.completed', 'CodingAutonomyBenchmarkAgent', 'Coding autonomy benchmark completed.', { systems: benchmark.systems_reviewed, score: benchmark.score });
  return standardResponse(result, {
    warnings: ['Sandbox only. No shell execution, no trading, no production mutation, no external publishing.'],
    audit_event: {
      event_type: 'intelligence.coding_autonomy_benchmark.completed',
      actor: 'CodingAutonomyBenchmarkAgent',
      message: 'Coding autonomy benchmark cycle completed safely.'
    }
  });
}

export async function POST() {
  return GET();
}
