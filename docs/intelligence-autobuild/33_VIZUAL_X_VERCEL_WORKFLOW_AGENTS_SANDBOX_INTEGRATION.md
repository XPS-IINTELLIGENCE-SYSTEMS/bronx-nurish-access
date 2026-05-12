# Vizual-X + Intelligence OS + AutoBuild OS Integration Spec

## Purpose

Define how the **Vizual-X** v0-benchmarked frontend integrates with the existing Intelligence OS, AutoBuild OS, Vercel crons, Vercel Workflow concepts, Vercel-hosted agent surfaces, and sandbox runtime systems already built on the `autonomous-gpt-bridge` branch.

This is an integration specification. It does **not** replace the current system runtime and does **not** invent a new architecture.

## Source System

Current source branch:

```text
autonomous-gpt-bridge
```

Existing runtime layers already present:

- AutoBuild mock/runtime endpoints
- Postgres-backed sandbox persistence
- autopilot cycle
- daily command brief
- benchmark routes
- frontier benchmark routes
- agent launch routes
- release gate routes
- Vercel cron scheduling

## Vizual-X Role

Vizual-X is the frontend layer that makes the operating system visible and usable.

It does not replace:

- Intelligence OS;
- AutoBuild OS;
- the autonomous workflow runtime;
- Postgres state;
- existing APIs.

It visualizes and controls them.

## Integration Layers

### 1. Frontend Layer

```text
Vizual-X v0-benchmarked frontend
```

Responsibilities:

- display system state;
- display agents;
- display workflow tracker;
- display daily brief;
- display simulation lab;
- display trigger health;
- host AI Gateway chat;
- surface exception alerts.

### 2. Intelligence OS Layer

Responsibilities:

- frontier benchmarks;
- coding/autonomy benchmarks;
- daily command brief;
- opportunity scores;
- memory/reflection;
- simulation outputs.

### 3. AutoBuild OS Layer

Responsibilities:

- dispatcher;
- validation;
- simulation;
- release gate evaluation;
- build queue status;
- sandbox persistence.

### 4. Vercel Runtime Layer

Responsibilities:

- deploy preview/prod apps;
- schedule cron triggers;
- run API routes;
- provide AI Gateway connectivity;
- host Vizual-X.

### 5. Postgres State Layer

Responsibilities:

- daily briefs;
- opportunity scores;
- benchmark results;
- memory reflections;
- approval requests;
- queues and logs.

## Vercel Cron Integration

Current cron system should be preserved and extended only according to the build-loop requirement.

### Existing Scheduling Pattern

Already aligned with:

- 10-minute coding-autonomy benchmark;
- 10-minute autopilot cycle;
- 5 AM daily command brief.

### New Build Loop Requirement

The Vizual-X builder docs require a controlled build-loop trigger every 5 minutes **until the frontend implementation pass is complete**.

Recommended route name:

```text
/api/workflow/vizual-x-build-loop
```

Recommended schedule:

```text
*/5 * * * *
```

## Build Loop Purpose

Every 5 minutes the loop should be able to:

1. read build status;
2. read implementation checklist;
3. determine whether frontend implementation is complete;
4. generate next safe builder task;
5. log state;
6. stop generating new work when completion criteria are met.

## Build Loop Completion Criteria

The loop should consider Vizual-X implementation complete only when:

1. Vizual-X route exists at `/intelligence-os`;
2. white-font `Vizual-X` top-left brand is present;
3. v0-benchmarked module inventory exists;
4. AI Gateway chat route is present;
5. current Intelligence OS APIs are bound or documented as binding targets;
6. current AutoBuild OS APIs are bound or documented as binding targets;
7. no `app/page.js` homepage overwrite exists;
8. build passes;
9. deployment preview is healthy;
10. the install manifest is satisfied.

## Vercel Workflow Alignment

Vizual-X should adopt a **workflow-tracker frontend** that mirrors programmatic execution phases:

```text
Goal Intake -> Doubled Target -> Reverse Engineer -> Benchmark -> Opportunity Score -> Asset Draft -> Simulation -> Validation -> Autopilot Execute -> Memory Archive
```

The frontend Kanban tracker must map to this same workflow language.

## Vercel Agents Alignment

Vizual-X should not invent a different agent system. It should surface the existing agent system already defined in the repo and prepare for future Gateway-based chat routing.

Key agent views:

- executive assistant;
- research/benchmark agent;
- workflow/autopilot agent;
- media/content agent;
- investor-readiness agent;
- simulation agent;
- coding/autonomy benchmark agent.

## Vercel Sandbox Alignment

Sandbox mode remains the default during implementation.

Required state flags:

```text
release_gate = HOLD
external_actions_taken = false
```

The Vizual-X frontend must show these visibly.

## AI Gateway Integration Alignment

Vizual-X chat must use Vercel AI Gateway as specified in:

```text
29_VIZUAL_X_AI_GATEWAY_CHAT_SPEC.md
```

The Gateway layer is the model transport abstraction for:

- chat;
- agent-room conversations;
- diagnostics;
- workflow contextual discussion.

## Builder Integration Checklist

- [ ] Docs package committed
- [ ] Vizual-X frontend exported from v0
- [ ] `/intelligence-os` route added
- [ ] white-font Vizual-X logo placed top-left
- [ ] AI Gateway chat shell added
- [ ] existing APIs bound through frontend adapters
- [ ] workflow Kanban installed
- [ ] trigger monitor installed
- [ ] build-loop route added if implementation requires it
- [ ] 5-minute build-loop cron active if route exists
- [ ] preview build healthy
- [ ] homepage untouched

## What This Spec Intentionally Does Not Do

It does not:

- replace the repo;
- redesign Intelligence OS runtime;
- redesign AutoBuild OS runtime;
- create a custom frontend instead of v0;
- auto-promote production;
- mutate the homepage;
- hardcode a single model provider;
- expose secrets.
