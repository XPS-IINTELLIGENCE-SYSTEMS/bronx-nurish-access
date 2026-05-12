# Mock Connector Folder Map

## Purpose
Define the future implementation folder structure for the mock connector layer and Vercel sandbox without adding runtime code.

This is documentation only.

## Current Documentation Folder

```text
docs/intelligence-autobuild/
  00_README.md
  01_SYSTEM_ARCHITECTURE.md
  02_AGENT_MATRIX.md
  03_WORKFLOW_PLAYBOOKS.md
  04_TEST_HARNESS_SPEC.md
  05_SIMULATION_SCENARIOS.json
  06_BENCHMARK_SCORECARD.md
  07_TOOL_TEMPLATE_CATALOG.md
  08_RELEASE_GATE_CHECKLIST.md
  09_VERCEL_WORKFLOW_CRON_SANDBOX_SPEC.md
  10_SUPABASE_SCHEMA_SPEC.sql
  11_AGENT_RUNTIME_BUILD_CHECKLIST.md
  12_VERCEL_WORKFLOW_IMPLEMENTATION_TASKS.md
  13_MOCK_CONNECTOR_SPECIFICATIONS.md
  14_API_CONTRACTS.yaml
  15_ENDPOINT_SCHEMAS_AND_FIXTURES.md
  16_MOCK_CONNECTOR_IMPLEMENTATION_PLAN.md
  17_MOCK_CONNECTOR_FOLDER_MAP.md
```

## Future Runtime Folder Map

Runtime folders must not be created until implementation is approved.

```text
src/
  connectors/
    mock/
      GitHubMockConnector
      VercelMockConnector
      SupabaseMockConnector
      ShopifyMockConnector
      GoogleDriveMockConnector
      GPTProviderMockConnector
      EmailMockConnector
      SocialSchedulerMockConnector
    real/
      README_REAL_CONNECTORS_REQUIRE_APPROVAL
    shared/
      ConnectorContract
      ConnectorResponseEnvelope
      RefusalPolicy
      AuditEventFactory

  dispatcher/
    DispatcherContract
    QueueSelector
    SafetyGuard
    AgentRouter

  agents/
    CommandCenterAgent
    RefactorAgent
    BuildPacketAgent
    GPTBridgeAgent
    TemplateAgent
    ShopifyWorkflowAgent
    SocialMediaAgent
    LeadGenAgent
    GitHubAgent
    VercelSandboxAgent
    SupabaseStateAgent
    ValidationAgent
    SimulationAgent
    PredictiveAgent
    HumanBehaviorAgent
    ReleaseGateAgent

  simulation/
    scenarios/
    fixtures/
    scoring/
    reports/

  validation/
    profiles/
    rules/
    scorecards/

  release/
    gates/
    approvals/
    rollback/

api/
  health
  autobuild/
    status
    dispatch
    simulate
    validate
  release/
    evaluate
```

## Fixture Folder Map

```text
fixtures/
  source-ledger/
    source-ledger.valid.json
    source-ledger.missing-proof.json
  build-queue/
    queue.ready.json
    queue.blocked-live-publish.json
  connectors/
    github.issue-plan.json
    github.pr-plan.json
    vercel.preview-ready.json
    supabase.queue-read.json
    shopify.draft-page.json
    shopify.blocked-publish.json
    drive.asset-manifest.json
    gpt.draft-output.json
    email.draft-only.json
    social.draft-post.json
  simulations/
    sim-001.mobile-owner-command.json
    sim-002.shopify-draft-workflow.json
    sim-003.social-draft-routing.json
    sim-004.missing-source-proof.json
    sim-005.release-gate-dry-run.json
```

## Documentation to Runtime Traceability

| Runtime Area | Source Docs |
|---|---|
| connectors/mock | 13, 15, 16, 17 |
| api endpoints | 09, 14, 15 |
| dispatcher | 09, 11, 12 |
| Supabase state | 10, 14, 15 |
| simulations | 04, 05, 06, 15 |
| release gate | 06, 08, 10, 15 |
| agent registry | 02, 11 |

## Naming Rules

- Use explicit connector names.
- Use mock-first naming.
- Keep real connectors isolated.
- Every fixture must include mode, dry_run, draft_only, and audit event.
- No file names may include secret values, tokens, keys, or private customer data.

## Approval Gate

Folders under `src/`, `api/`, or `fixtures/` should only be created after:
- PR #22 docs are reviewed;
- mock connector plan is approved;
- implementation issue is assigned;
- release gate remains HOLD.
