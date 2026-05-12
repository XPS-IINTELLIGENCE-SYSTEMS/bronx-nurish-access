# Vizual-X AutoBuild Workflow Template Overview

## Purpose

Install a repeatable Vizual-X workflow that begins with a structured operator/client intake form and transforms that intake into:

1. research and browser discovery;
2. benchmark findings;
3. builder documentation;
4. Vercel cron/workflow/sandbox/agent specifications;
5. an execute-button trigger model;
6. a sandbox build package;
7. connector and environment-variable specifications;
8. a final system package saved inside the operating system.

## Product Location

The workflow is intended to appear inside Vizual-X at:

```text
/intelligence-os/workflows/autobuild
```

## Core UX Flow

```text
Operator Form -> Validate -> Discover -> Benchmark -> Generate Builder Docs -> Generate Vercel Specs -> Create Trigger Plan -> Execute Sandbox Workflow -> Package System -> Save/Archive -> Connector/Env Spec
```

## Source Runtime

This workflow is designed to use:

- Intelligence OS runtime;
- AutoBuild OS runtime;
- autonomous-gpt-bridge workflow patterns;
- Vercel Cron;
- Vercel Workflow concepts;
- Vercel Sandbox concepts;
- Vercel AI Gateway;
- existing Postgres-backed state model.

## Workflow Template Source File

```text
src/workflow/vizualXAutobuildTemplate.js
```

## Exact Workflow Phases

1. `intake_form_validation`
2. `goal_normalization_and_gap_detection`
3. `browser_discovery_plan`
4. `source_research_and_benchmarking`
5. `builder_docs_generation`
6. `vercel_runtime_spec_generation`
7. `cron_and_workflow_trigger_spec`
8. `sandbox_build_plan`
9. `agent_system_spec`
10. `connector_and_env_spec`
11. `execute_button_job_packaging`
12. `system_spec_package_generation`
13. `sandbox_build_result_capture`
14. `final_package_and_archive`

## Primary Outputs

- AutoBuild intake record
- Discovery research plan
- Benchmark report
- Builder docs package
- Vercel workflow spec
- Vercel sandbox spec
- Vercel agent spec
- Vercel cron spec
- Execute-button trigger spec
- System spec package
- Connector spec
- Environment-variable spec
- Handoff package

## Operator Result

The operator should be able to:

1. complete the form;
2. click **Execute AutoBuild Workflow**;
3. have the system prepare the full spec/build/package process;
4. see workflow status in a Kanban tracker;
5. receive a packaged result with next steps, connectors, env, and implementation requirements.

## Autonomy Requirement

The workflow is designed for repeatability and autonomy. It should not rely on ad hoc manual reasoning. Each stage should be:

- defined;
- triggered;
- status-tracked;
- saveable;
- auditable;
- packageable.

## Frontend Requirements

Vizual-X should add a workflow template view with:

- form intake page;
- stage tracker;
- execute button;
- current workflow status;
- discovered benchmark summary;
- builder docs generated status;
- Vercel runtime spec status;
- sandbox package status;
- connectors/env summary;
- package download/save status.

## Implementation Rule

This template should be installed as a reusable workflow module inside Vizual-X. It should not be a one-off page or a single hardcoded prompt.
