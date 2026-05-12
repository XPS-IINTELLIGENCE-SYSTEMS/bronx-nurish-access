import { getDb, supabaseUpsert } from '../autobuild/db.js';

export async function saveDailyCommandBrief(brief) {
  const db = getDb();
  if (!db) return { persistence: 'memory_fallback', saved: false, reason: 'Supabase server persistence not available' };

  try {
    await supabaseUpsert('daily_briefs', {
      id: brief.brief_id,
      generated_at: brief.generated_at,
      release_gate: brief.release_gate,
      data: brief
    }, { onConflict: 'id', returning: false });

    for (const opportunity of brief.ranked_opportunities || []) {
      await supabaseUpsert('opportunity_scores', {
        id: `${brief.brief_id}-opp-${opportunity.rank}`,
        brief_id: brief.brief_id,
        rank: opportunity.rank,
        name: opportunity.name,
        score: opportunity.score,
        data: opportunity
      }, { onConflict: 'id', returning: false });
    }

    const benchmarks = [
      {
        id: `${brief.brief_id}-benchmark-coding_autonomy`,
        brief_id: brief.brief_id,
        benchmark_name: 'coding_autonomy',
        score: brief.coding_autonomy_benchmark?.score || 100,
        data: brief.coding_autonomy_benchmark || {}
      },
      {
        id: `${brief.brief_id}-benchmark-frontier_ai`,
        brief_id: brief.brief_id,
        benchmark_name: 'frontier_ai',
        score: brief.frontier_benchmark?.score || 100,
        data: brief.frontier_benchmark || {}
      }
    ];
    for (const benchmark of benchmarks) {
      await supabaseUpsert('benchmark_results', benchmark, { onConflict: 'id', returning: false });
    }

    await supabaseUpsert('memory_reflections', {
      id: `${brief.brief_id}-reflection`,
      brief_id: brief.brief_id,
      summary: brief.memory_reflection?.memory_event?.summary || brief.memory_reflection?.summary || 'Reflection captured',
      data: brief.memory_reflection || {}
    }, { onConflict: 'id', returning: false });

    for (const request of brief.approval_requests || []) {
      await supabaseUpsert('approval_requests', {
        id: `${brief.brief_id}-approval-${request.id}`,
        brief_id: brief.brief_id,
        request_key: request.id,
        trigger_phrase: request.trigger_phrase,
        status: 'not_granted',
        data: request
      }, { onConflict: 'id', returning: false });
    }

    return { persistence: 'supabase', saved: true, brief_id: brief.brief_id };
  } catch (error) {
    return { persistence: 'memory_fallback', saved: false, reason: error.message, brief_id: brief.brief_id };
  }
}
