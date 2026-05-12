# Pre-Production Launch Index

## Purpose
Finalize the documentation-only Intelligence OS + AutoBuild OS pre-production package in PR #22.

This file is the navigation index for the next build phase. No runtime code, secrets, or production actions are included.

## Branch

`autonomous-gpt-bridge`

## Pull Request

PR #22: Pre-production Intelligence + AutoBuild docs

## Documentation Package

| File | Purpose |
|---|---|
| `00_README.md` | Package scope and safety boundary |
| `01_SYSTEM_ARCHITECTURE.md` | System architecture |
| `02_AGENT_MATRIX.md` | Agent phases and responsibilities |
| `03_WORKFLOW_PLAYBOOKS.md` | Operating workflows |
| `04_TEST_HARNESS_SPEC.md` | Test harness specification |
| `05_SIMULATION_SCENARIOS.json` | Scenario catalog |
| `06_BENCHMARK_SCORECARD.md` | Benchmark and scoring model |
| `07_TOOL_TEMPLATE_CATALOG.md` | Tool and template categories |
| `08_RELEASE_GATE_CHECKLIST.md` | Release gate rules |
| `09_VERCEL_WORKFLOW_CRON_SANDBOX_SPEC.md` | Vercel workflow, cron, sandbox spec |
| `10_SUPABASE_SCHEMA_SPEC.sql` | Supabase state schema spec |
| `11_AGENT_RUNTIME_BUILD_CHECKLIST.md` | Agent runtime checklist |
| `12_VERCEL_WORKFLOW_IMPLEMENTATION_TASKS.md` | Vercel implementation tasks |
| `13_MOCK_CONNECTOR_SPECIFICATIONS.md` | Mock connector behavior specs |
| `14_API_CONTRACTS.yaml` | OpenAPI-style API contracts |
| `15_ENDPOINT_SCHEMAS_AND_FIXTURES.md` | Endpoint examples and fixtures |
| `16_MOCK_CONNECTOR_IMPLEMENTATION_PLAN.md` | Mock connector implementation plan |
| `17_MOCK_CONNECTOR_FOLDER_MAP.md` | Future folder map |
| `18_MOCK_CONNECTOR_TEST_CHECKLIST.md` | Mock connector test checklist |
| `19_SIMULATION_PASS_CRITERIA.md` | Simulation pass criteria |
| `20_PRE_PRODUCTION_LAUNCH_INDEX.md` | This launch index |

## GitHub Issues Created

### Mock Connectors

| Issue | Area |
|---|---|
| #24 | GitHubMockConnector |
| #25 | VercelMockConnector |
| #26 | SupabaseMockConnector |
| #27 | ShopifyMockConnector |
| #28 | GoogleDriveMockConnector |
| #29 | GPTProviderMockConnector |
| #30 | EmailMockConnector |
| #31 | SocialSchedulerMockConnector |

### Vercel Endpoints

| Issue | Endpoint |
|---|---|
| #32 | GET `/api/health` |
| #33 | GET `/api/autobuild/status` |
| #34 | POST autobuild dispatch endpoint |
| #35 | POST `/api/autobuild/simulate` |
| #36 | POST `/api/autobuild/validate` |
| #37 | POST `/api/release/evaluate` |

### Simulation Harness

| Issue | Area |
|---|---|
| #38 | Scenario runner |
| #39 | Scoring engine |
| #40 | Final 5-pass validation report |

## Safety State

| Area | State |
|---|---|
| Runtime code | Not added |
| Secrets | Not added |
| Production actions | Not added |
| Shopify live publish | Blocked by spec |
| Email/SMS send | Blocked by spec |
| Paid ads | Blocked by spec |
| GitHub merge automation | Blocked by spec |
| Release gate | HOLD |

## Next Build Phase

The next phase may begin only after owner review:

1. Approve PR #22 documentation.
2. Keep release gate HOLD.
3. Create mock connector fixtures.
4. Create endpoint skeletons in sandbox only.
5. Create simulation runner in mock mode.
6. Run SIM-001 through SIM-005.
7. Record five consecutive 100/100 passes.
8. Request owner approval before any staging or production action.

## Non-Negotiable Controls

- Mock connectors before real connectors.
- API contracts before runtime endpoints.
- Fixtures before external writes.
- Simulation before staging.
- Owner approval before release.
- No source proof means `Could not verify`.
