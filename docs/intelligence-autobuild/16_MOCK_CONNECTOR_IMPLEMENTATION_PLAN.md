# Mock Connector Implementation Plan

## Purpose
Define the documentation-only implementation plan for the mock connector layer required by the Vercel sandbox.

Source of truth:
- PR #22
- `13_MOCK_CONNECTOR_SPECIFICATIONS.md`
- `14_API_CONTRACTS.yaml`
- `15_ENDPOINT_SCHEMAS_AND_FIXTURES.md`

This plan does not add runtime code, secrets, or production actions.

## Implementation Principle

All real connectors must be preceded by mock connectors. Mock connectors provide deterministic, safe outputs for simulations and validation before external APIs are used.

## Required Mock Connectors

| Connector | First Purpose | Future Real System | Default Mode |
|---|---|---|---|
| GitHubMockConnector | simulate issues, PRs, file manifests | GitHub API | mock |
| VercelMockConnector | simulate previews, cron, logs | Vercel API / deployment state | mock |
| SupabaseMockConnector | simulate queue, ledger, audit log | Supabase Postgres | mock |
| ShopifyMockConnector | simulate draft pages/products/collections | Shopify Admin API | mock |
| GoogleDriveMockConnector | simulate source and asset manifests | Google Drive API | mock |
| GPTProviderMockConnector | simulate LLM responses | OpenAI / Anthropic / others | mock |
| EmailMockConnector | simulate email drafts | Gmail / ESP | mock |
| SocialSchedulerMockConnector | simulate content scheduling drafts | Buffer / Hootsuite / Later / native APIs | mock |

## Build Sequence

### Step 1: Define Shared Connector Contract

Required connector fields:
- `name`
- `mode`
- `capabilities`
- `health_contract`
- `read_contract`
- `write_draft_contract`
- `refusal_contract`
- `audit_contract`

Definition of done:
- Every mock connector uses the same response envelope.
- Every mock connector returns `dry_run: true` and `draft_only: true`.
- Every mock connector supports refusal responses.

### Step 2: Create Deterministic Fixtures

Required fixture groups:
- source ledger fixture
- build queue fixture
- agent registry fixture
- validation result fixture
- simulation result fixture
- release gate fixture
- Shopify draft fixture
- GitHub issue/PR plan fixture
- Vercel preview fixture

Definition of done:
- Fixtures contain no secrets.
- Fixtures are stable across repeated runs.
- Fixtures cover happy path and blocked path.

### Step 3: Map Connectors to Endpoints

| Endpoint | Mock Connectors Used |
|---|---|
| `/api/health` | VercelMockConnector, SupabaseMockConnector |
| `/api/autobuild/status` | SupabaseMockConnector, VercelMockConnector |
| `/api/autobuild/dispatch` | SupabaseMockConnector, agent-specific connector |
| `/api/autobuild/simulate` | all mock connectors as needed |
| `/api/autobuild/validate` | SupabaseMockConnector, Validation mock layer |
| `/api/release/evaluate` | SupabaseMockConnector, ReleaseGate mock layer |

### Step 4: Enforce Refusal Policy

Mock connectors must refuse:
- live Shopify publish;
- real email/SMS send;
- paid ad publish;
- GitHub PR merge;
- branch delete;
- secret display;
- production database mutation;
- unverified claim approval.

Definition of done:
- Each refusal produces P0/P1 blocker with safe next action.

### Step 5: Integrate with Simulation Specs

Each simulation scenario must identify:
- required connectors;
- expected connector outputs;
- expected blockers;
- expected audit events;
- score contribution.

Definition of done:
- SIM-001 through SIM-005 can be executed fully with mock connectors.

## Connector Acceptance Checklist

- [ ] Uses standard response shape.
- [ ] Uses standard refusal shape.
- [ ] Supports mock mode.
- [ ] Supports dry-run behavior.
- [ ] Blocks destructive operations.
- [ ] Emits audit event.
- [ ] Produces deterministic fixtures.
- [ ] Supports at least one happy-path scenario.
- [ ] Supports at least one refusal-path scenario.
- [ ] Does not contain secrets.

## Exit Criteria

Mock connector layer is implementation-ready when:
- all connectors are specified;
- fixture map exists;
- endpoint map exists;
- refusal policy is complete;
- simulation scenarios can reference connector outputs;
- no production system is touched.
