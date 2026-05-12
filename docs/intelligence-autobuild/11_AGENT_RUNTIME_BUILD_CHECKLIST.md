# Agent Runtime Build Checklist

## Purpose
Translate PR #22 pre-production docs into an implementation-ready build checklist for the future Intelligence OS + AutoBuild OS runtime.

This file is a checklist only. It does not add production code.

## Phase 0: Approval and Safety Lock

- [ ] PR #22 reviewed.
- [ ] Documentation package approved.
- [ ] Release gate remains `HOLD`.
- [ ] `DRY_RUN=true` requirement accepted.
- [ ] `DRAFT_ONLY=true` requirement accepted.
- [ ] No secrets committed.
- [ ] No live Shopify publish enabled.
- [ ] No GitHub main merge automation enabled.

## Phase 1: Repository Structure

Future implementation folders:

```text
/src/agents
/src/connectors
/src/dispatcher
/src/validation
/src/simulation
/src/release
/src/types
/api
/docs/intelligence-autobuild
```

Acceptance criteria:
- [ ] runtime files are separate from docs;
- [ ] docs remain source-of-truth;
- [ ] every agent has a matching spec in `02_AGENT_MATRIX.md`;
- [ ] every connector has a mock mode before real credentials are used.

## Phase 2: Vercel Sandbox Runtime

Required future endpoints:
- [ ] `/api/health`
- [ ] `/api/autobuild/status`
- [ ] `/api/autobuild/dispatch`
- [ ] `/api/autobuild/simulate`
- [ ] `/api/autobuild/validate`
- [ ] `/api/release/evaluate`

Acceptance criteria:
- [ ] endpoint returns structured JSON;
- [ ] endpoint never exposes secrets;
- [ ] endpoint exits quickly;
- [ ] endpoint logs every result;
- [ ] endpoint blocks publish/send/merge/charge actions.

## Phase 3: Supabase State Layer

Required tables from `10_SUPABASE_SCHEMA_SPEC.sql`:
- [ ] `source_ledger`
- [ ] `agent_registry`
- [ ] `build_queue`
- [ ] `agent_runs`
- [ ] `validation_results`
- [ ] `simulation_runs`
- [ ] `predictive_reports`
- [ ] `release_gates`
- [ ] `audit_log`

Acceptance criteria:
- [ ] migrations tested in non-production database;
- [ ] RLS policy drafted before production;
- [ ] release gate defaults to `HOLD`;
- [ ] audit log is append-only by convention;
- [ ] no public write access.

## Phase 4: Dispatcher

Dispatcher responsibilities:
- [ ] verify environment mode;
- [ ] verify release firewall;
- [ ] load next eligible queue item;
- [ ] claim one task safely;
- [ ] route task to correct agent;
- [ ] enforce timeout and retry limits;
- [ ] write audit event;
- [ ] return result summary.

Acceptance criteria:
- [ ] idempotent;
- [ ] queue-aware;
- [ ] non-blocking;
- [ ] no infinite loops;
- [ ] one task or bounded batch per cron invocation.

## Phase 5: Agent Runtime

Minimum agent interfaces:

```text
Agent.name
Agent.phase
Agent.canHandle(task)
Agent.run(task, context)
Agent.validate(output)
Agent.fallback(error, task)
```

Agents to implement:
- [ ] CommandCenterAgent
- [ ] RefactorAgent
- [ ] BuildPacketAgent
- [ ] GPTBridgeAgent
- [ ] TemplateAgent
- [ ] ShopifyWorkflowAgent
- [ ] SocialMediaAgent
- [ ] LeadGenAgent
- [ ] GitHubAgent
- [ ] VercelSandboxAgent
- [ ] SupabaseStateAgent
- [ ] ValidationAgent
- [ ] SimulationAgent
- [ ] PredictiveAgent
- [ ] HumanBehaviorAgent
- [ ] ReleaseGateAgent

Acceptance criteria:
- [ ] each agent has mock tests;
- [ ] each agent logs start and finish;
- [ ] each agent handles missing input;
- [ ] each agent returns structured output;
- [ ] high-risk agents are draft-only.

## Phase 6: Connector Layer

Connectors to design:
- [ ] GitHub connector
- [ ] Vercel connector
- [ ] Supabase connector
- [ ] Shopify connector
- [ ] Google Drive connector
- [ ] GPT provider connector
- [ ] Email connector
- [ ] Social scheduler connector

Acceptance criteria:
- [ ] mock connector exists first;
- [ ] real connector uses environment variables only;
- [ ] connector supports dry-run;
- [ ] connector refuses destructive actions by default;
- [ ] connector errors are normalized.

## Phase 7: Simulation Harness

Required tests:
- [ ] SIM-001 mobile owner command;
- [ ] SIM-002 Shopify draft workflow;
- [ ] SIM-003 social media queue draft;
- [ ] SIM-004 missing source proof fallback;
- [ ] SIM-005 full release gate dry run.

Acceptance criteria:
- [ ] all five scenarios pass at 100/100;
- [ ] five consecutive full passes recorded;
- [ ] zero P0 blockers;
- [ ] zero P1 blockers;
- [ ] report stored in `simulation_runs`.

## Phase 8: Vercel Cron Activation

Preconditions:
- [ ] `/api/health` passes;
- [ ] `/api/autobuild/status` passes;
- [ ] `/api/autobuild/dispatch` passes in dry-run;
- [ ] Supabase schema installed in sandbox;
- [ ] simulation harness passes;
- [ ] release gate remains closed.

Cron rule:

```text
*/5 * * * *
```

Acceptance criteria:
- [ ] cron can run without overlapping dangerous writes;
- [ ] repeated cron calls do not duplicate outputs;
- [ ] failures create retry records;
- [ ] logs are visible in Vercel and Supabase.

## Phase 9: Shopify Workflow Integration

Allowed actions before approval:
- [ ] draft page spec;
- [ ] draft collection spec;
- [ ] draft product CSV;
- [ ] draft Shopify Flow blueprint;
- [ ] draft metaobject spec.

Blocked before approval:
- [ ] live product publish;
- [ ] price changes;
- [ ] inventory changes;
- [ ] email blasts;
- [ ] paid ads;
- [ ] unverified product/spec claims.

## Phase 10: Release Gate

Release gate may open only when:
- [ ] docs approved;
- [ ] sandbox implementation passes;
- [ ] 5 simulation passes at 100/100;
- [ ] zero P0/P1 blockers;
- [ ] owner approval recorded;
- [ ] rollback plan documented.

## Build Order Recommendation

1. Docs approval
2. Supabase sandbox schema
3. mock connectors
4. dispatcher skeleton
5. agent registry
6. validation engine
7. simulation runner
8. Vercel preview endpoints
9. Vercel cron dry-run
10. Shopify draft workflow
11. release gate evaluator
12. staging approval
