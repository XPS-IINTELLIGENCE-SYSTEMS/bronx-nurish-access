# Vizual-X AutoBuild Workflow Implementation Roadmap

## Purpose

Translate the AutoBuild workflow template and documentation system into the next executable implementation phase inside Vizual-X.

This roadmap is the exact build sequence for turning the committed workflow template into a working Vizual-X user flow.

## Current Repo State

Already committed:

- AutoBuild workflow template definition;
- intake form specification;
- browser discovery and benchmark specification;
- builder-document generation specification;
- package / connector / environment specification;
- workflow template read API route;
- Vizual-X frontend builder-doc package;
- Vercel build-loop and cron specification.

## Next Implementation Goal

Create the working Vizual-X AutoBuild workflow at:

```text
/intelligence-os/workflows/autobuild
```

## Required Frontend Components

### 1. AutoBuild Intake Form

Implement the form using the exact fields from:

```text
35_VIZUAL_X_AUTOBUILD_INTAKE_FORM_SPEC_PART_1.md
36_VIZUAL_X_AUTOBUILD_INTAKE_FORM_SPEC_PART_2.md
```

Required UI:

- sectioned form wizard or long-form panel layout;
- progress indicator;
- completion percentage;
- required-field validation;
- sidebar section summary;
- execute-button footer;
- pre-submit summary.

### 2. Execute Button

Button label:

```text
Execute AutoBuild Workflow
```

Button behavior:

- disabled until required fields pass validation;
- submits intake object;
- creates an AutoBuild workflow run;
- routes to run status panel;
- triggers the build job path.

### 3. Workflow Run Tracker

Create a stage tracker that shows:

- intake validation;
- discovery plan;
- benchmark generation;
- builder docs generation;
- Vercel runtime spec generation;
- cron/workflow/sandbox/agent spec generation;
- connector/env spec generation;
- package generation;
- final archive.

### 4. Generated Package Viewer

Create a result panel that displays:

- package summary;
- generated docs list;
- benchmark summary;
- connector table;
- env var table;
- sandbox readiness;
- remaining blockers;
- next steps.

## Required Backend Routes

The next implementation phase should add:

```text
/api/workflow/vizual-x-autobuild-intake
/api/workflow/vizual-x-autobuild-execute
/api/workflow/vizual-x-autobuild-status/[runId]
/api/workflow/autobuild-template-cycle
```

## Required Data Tables

The next implementation phase should create runtime persistence for:

```text
autobuild_intakes
autobuild_runs
autobuild_documents
autobuild_connector_specs
autobuild_env_specs
autobuild_packages
```

## Recommended State Machine

```text
intake_received
intake_validated
discovery_planned
research_in_progress
benchmark_completed
builder_docs_generated
runtime_specs_generated
sandbox_plan_generated
package_generated
complete
blocked
```

## Execution Button Job Path

When the operator clicks Execute:

1. create intake record;
2. create run record;
3. transition state to `intake_received`;
4. queue discovery phase;
5. allow the scheduled 5-minute cycle to advance the job;
6. generate package artifacts phase by phase;
7. write package state into Postgres;
8. render live run status inside Vizual-X.

## Scheduled Trigger Integration

Add or extend cron:

```json
{
  "path": "/api/workflow/autobuild-template-cycle",
  "schedule": "*/5 * * * *"
}
```

This cycle should:

- inspect active runs;
- select next incomplete phase;
- execute or queue safe next action;
- persist status;
- stop when package is complete or blocked.

## Browser Discovery Integration

The discovery phase should use the rules in:

```text
37_VIZUAL_X_AUTOBUILD_BROWSER_DISCOVERY_AND_BENCHMARK_SPEC.md
```

Future implementation choices:

- browser-search backed discovery through approved research systems;
- optional connector-backed discovery;
- stored source log and benchmark scorecard;
- explicit `could_not_verify` markers.

## Vercel Runtime Integration

The docs package already defines the runtime outputs to generate:

- Vercel Workflow spec;
- Vercel Sandbox spec;
- Vercel Agent architecture spec;
- Vercel Cron spec;
- Vercel AI Gateway chat spec.

The working workflow should populate these artifacts from the intake data.

## Package Completion Conditions

A run is complete only when:

1. all required builder docs exist;
2. browser discovery output exists;
3. benchmark report exists;
4. runtime specs exist;
5. connector/env specs exist;
6. package manifest exists;
7. package is saved inside the system;
8. Vizual-X can display the package.

## Non-Negotiable Constraints

- Do not overwrite `app/page.js`.
- Do not replace the existing public frontend.
- Do not discard the v0/Vizual-X benchmark direction.
- Do not create a one-off chat workflow.
- Build a repeatable workflow template system.
- Keep implementation aligned to the existing `autonomous-gpt-bridge` branch system.

## Final Build Sequence

### Build Pass 1

- AutoBuild intake form UI;
- workflow template fetch integration;
- execute button layout;
- route shell at `/intelligence-os/workflows/autobuild`.

### Build Pass 2

- intake API;
- execute API;
- Postgres tables;
- workflow run state.

### Build Pass 3

- 5-minute cycle API;
- status API;
- state machine advancement;
- package artifact records.

### Build Pass 4

- generated package viewer;
- connector/env tables;
- docs/package status cards;
- run history.

### Build Pass 5

- Vercel Workflow/Sandbox/Agents spec generators;
- discovery benchmark output records;
- final end-to-end simulation.
