# Vercel Workflow Implementation Tasks

## Purpose
Create the Vercel-specific implementation task map that follows the existing GitHub-to-Vercel preview workflow visible on PR #22.

This file is documentation only.

## Existing Workflow Pattern

Current observed flow:

```text
GitHub branch update
  -> Vercel preview deployment
  -> Vercel bot comments on PR
  -> Preview link available for review
  -> PR remains draft until approved
```

This is the required workflow foundation for the future autonomous bridge.

## Task Group 1: Preview Deployment Discipline

- [ ] Every implementation PR must receive a Vercel preview.
- [ ] Preview must be reviewed before merge.
- [ ] Preview comments must be treated as deployment evidence.
- [ ] Failed preview deployment creates a blocker issue.
- [ ] Draft PR remains draft until validation passes.

## Task Group 2: Sandbox Endpoint Specification

Before adding endpoint code, each endpoint must have:
- [ ] request schema;
- [ ] response schema;
- [ ] allowed methods;
- [ ] auth requirement;
- [ ] side-effect rating;
- [ ] dry-run behavior;
- [ ] failure response;
- [ ] logging requirement.

## Task Group 3: Cron Design

Cron must:
- [ ] run every 5 minutes only in sandbox after approval;
- [ ] call dispatcher endpoint only;
- [ ] avoid direct calls to individual agents;
- [ ] include cron secret protection;
- [ ] be disabled if release firewall is not configured;
- [ ] process bounded work per invocation;
- [ ] log every invocation.

## Task Group 4: Environment Variable Registry

Create an environment variable registry before implementation.

Required columns:
- variable name
- environment
- required/optional
- used by endpoint
- used by agent
- secret class
- fallback behavior
- rotation owner

## Task Group 5: Vercel Logs and Observability

Required log event types:
- `cron.invoked`
- `dispatcher.started`
- `dispatcher.completed`
- `dispatcher.blocked`
- `agent.started`
- `agent.completed`
- `agent.failed`
- `validation.passed`
- `validation.failed`
- `simulation.passed`
- `simulation.failed`
- `release.blocked`
- `release.approved`

## Task Group 6: Rollback Rules

Rollback required when:
- preview deployment fails;
- cron creates duplicate work;
- endpoint exposes sensitive error;
- agent attempts disallowed action;
- validation drops below 100 in final simulation;
- release gate opens without human approval.

## Implementation Exit Criteria

The Vercel workflow is implementation-ready when:
- [ ] specs exist for all endpoints;
- [ ] environment registry is complete;
- [ ] sandbox schema is ready;
- [ ] cron behavior is approved;
- [ ] logging spec is complete;
- [ ] PR preview workflow is confirmed;
- [ ] release gate remains closed.
