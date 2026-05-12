# Coding Autonomy Benchmark Integration

## Objective

Install a recurring benchmark layer that studies how leading AI coding and autonomy systems structure local + cloud coding, agent control, memory, review, testing, and autonomous task execution.

## Top Systems Benchmarked

1. OpenAI Codex Cloud + Codex CLI
2. Anthropic Claude Code
3. Google Jules
4. Cursor AI IDE
5. Frontier leaderboard/platform tracking

## Top Two Platform Benchmarks

### OpenAI Platform / Codex / ChatGPT Agent Stack

Growth pattern:

- reduce friction from prompt to PR;
- support parallel background tasks;
- use sandboxed execution;
- keep human review in loop;
- meet developers where they already work.

What not to do:

- do not bypass tests;
- do not allow uncontrolled production changes;
- do not hide reasoning, diffs, or logs.

### Anthropic Claude / Claude Code / Subagent Platform

Growth pattern:

- separate specialized agents by task;
- preserve context through memory and summaries;
- make permissions explicit;
- use rubric-style evaluation and self-reflection;
- treat safety and reliability as product features.

What not to do:

- do not use one uncontrolled general agent for every job;
- do not mix sensitive context into every task;
- do not skip permission boundaries for speed.

## Installed Repo Files

- `src/intelligence/codingAutonomyBenchmarks.js`
- `app/api/intelligence/coding-autonomy-benchmark/route.js`
- `src/intelligence/memoryReflection.js`
- `src/intelligence/frontierBenchmarks.js`

## Scheduled Trigger

`vercel.json` now runs:

```json
{
  "path": "/api/intelligence/coding-autonomy-benchmark",
  "schedule": "*/10 * * * *"
}
```

## Adopted Requirements

- local/cloud split
- sandboxed task queue
- subagent registry
- permission matrix
- test-until-pass loop
- PR review gate
- memory/reflection cycle
- benchmark scorecard
- bounded browser and Playwright policy
- cost/speed/risk tracking

## Safety Rules

This integration is sandbox-only:

- no shell execution;
- no production mutation;
- no trading;
- no personalized financial advice;
- no live external publishing;
- no secret exposure;
- no destructive GitHub actions;
- release gate remains `HOLD`.

## Test Plan

1. Verify deployment after the latest commit.
2. Test `/api/intelligence/coding-autonomy-benchmark`.
3. Confirm `systems_reviewed: 5`.
4. Confirm `top_platforms_reviewed: 2`.
5. Confirm `external_actions_taken: false`.
6. Confirm `release_gate: HOLD`.
7. Confirm audit log writes through Postgres where available.

## Result Tracking

The endpoint returns:

- benchmark name;
- systems reviewed;
- top two platform benchmarks;
- adopted requirements;
- memory/reflection summary;
- next safe actions;
- release gate state.

## Production Gate

This integration does not approve production. It improves the intelligence benchmark layer only.
