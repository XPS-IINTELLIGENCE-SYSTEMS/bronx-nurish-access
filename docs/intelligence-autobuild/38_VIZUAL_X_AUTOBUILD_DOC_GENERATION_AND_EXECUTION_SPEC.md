# Vizual-X AutoBuild Builder-Doc Generation and Execute Workflow Specification

## Purpose

Define the workflow that transforms a validated Vizual-X AutoBuild intake plus discovery findings into a complete system specification package, Vercel runtime plan, sandbox build sequence, trigger plan, and execute-button-driven workflow.

## Workflow Sequence

```text
Validated Intake
-> Browser Discovery Pack
-> Benchmark Report
-> Builder Docs Package
-> Vercel Runtime Specs
-> Cron / Trigger Specs
-> Sandbox Build Plan
-> Connector / Env Specs
-> Execute Workflow Package
-> Stored System Package
```

## Builder Documents to Generate

The AutoBuild workflow must generate a structured package containing:

1. `00_PROJECT_OVERVIEW.md`
2. `01_OPERATOR_GOAL_AND_DOUBLED_TARGET.md`
3. `02_USER_AND_PROBLEM_MODEL.md`
4. `03_BUSINESS_AND_VALUE_PATH.md`
5. `04_SYSTEM_ARCHITECTURE.md`
6. `05_WORKFLOW_PHASE_MAP.md`
7. `06_AGENT_MATRIX.md`
8. `07_DASHBOARD_AND_FRONTEND_SPEC.md`
9. `08_AI_GATEWAY_CHAT_SPEC.md`
10. `09_BROWSER_DISCOVERY_REPORT.md`
11. `10_BENCHMARK_SCORECARD.md`
12. `11_VERCEL_WORKFLOW_SPEC.md`
13. `12_VERCEL_SANDBOX_SPEC.md`
14. `13_VERCEL_AGENTS_SPEC.md`
15. `14_VERCEL_CRON_TRIGGER_SPEC.md`
16. `15_CONNECTOR_SPEC.md`
17. `16_ENVIRONMENT_VARIABLE_SPEC.md`
18. `17_DATABASE_AND_STATE_SPEC.md`
19. `18_SIMULATION_AND_TEST_HARNESS.md`
20. `19_RELEASE_AND_APPROVAL_GATE.md`
21. `20_PACKAGE_MANIFEST.md`
22. `21_IMPLEMENTATION_CHECKLIST.md`

## Document Generation Rules

Every generated document must:

- be tied to intake fields;
- incorporate verified benchmark findings;
- separate facts from assumptions;
- preserve operator intent;
- define scope, dependencies, and next implementation actions;
- avoid fake claims;
- identify any missing inputs or unresolved facts;
- be structured for later implementation or client handoff.

## Execute Button Workflow

### UI Trigger

Button text:

```text
Execute AutoBuild Workflow
```

### Trigger Behavior

The button should create an execution job with:

```json
{
  "workflow_template_id": "vizual-x-autobuild-template-v1",
  "intake_id": "intake-id",
  "execution_mode": "prepare_and_build_in_sandbox",
  "release_gate": "HOLD",
  "status": "queued"
}
```

### Execution Stages

When triggered, the workflow should:

1. validate the intake;
2. create the discovery research plan;
3. run or queue browser/source research;
4. assemble benchmark inputs;
5. generate builder docs;
6. generate Vercel runtime specs;
7. generate cron/workflow/sandbox/agents specs;
8. generate connector/env/database specs;
9. create sandbox build execution plan;
10. create package manifest;
11. persist outputs;
12. update Vizual-X workflow status.

## Vercel Workflow Integration

The Execute workflow should be designed for a durable Vercel Workflow-style implementation:

- each stage is discrete;
- each stage can report progress;
- each stage has a clear output;
- failures can retry safely;
- state should persist between phases;
- completion should create a final package record.

## Vercel Sandbox Integration

The sandbox build plan should describe:

- isolated build target;
- no production mutation;
- mock or draft-only actions where needed;
- generated runtime specs before code-level execution;
- test harness requirements;
- packaging and archival.

## Vercel Agents Integration

The generated system spec must define how agents are expected to participate:

- Intake Normalization Agent
- Discovery Agent
- Benchmark Agent
- Builder Docs Agent
- Workflow Spec Agent
- Sandbox Build Agent
- Package Agent
- Connector/Env Agent
- Validation Agent

Each agent must have:

- role;
- inputs;
- outputs;
- success criteria;
- failure states;
- handoff logic.

## 5-Minute Trigger Requirement

The workflow system must support a 5-minute scheduled status/build loop while execution is active.

### Recommended Route

```text
/api/workflow/autobuild-template-cycle
```

### Recommended Schedule

```text
*/5 * * * *
```

### Trigger Responsibilities

- check active AutoBuild jobs;
- read current phase;
- determine next safe workflow action;
- log current state;
- queue follow-up phase if appropriate;
- stop when the job is complete or blocked.

## Workflow State Model

Recommended states:

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
ready_for_review_or_execution
complete
blocked
```

## Vizual-X UI Requirements

The workflow page should show:

- current stage;
- stage history;
- completed outputs;
- open issues;
- package status;
- generated documents list;
- connector/env requirements;
- sandbox build state;
- execute button / rerun button where appropriate.

## Completion Criteria

The workflow run is complete when:

1. intake is validated;
2. research/benchmark package exists;
3. builder docs package exists;
4. Vercel specs exist;
5. connector/env specs exist;
6. sandbox build plan exists;
7. package manifest exists;
8. all outputs are saved into system state;
9. Vizual-X displays the final package status.
