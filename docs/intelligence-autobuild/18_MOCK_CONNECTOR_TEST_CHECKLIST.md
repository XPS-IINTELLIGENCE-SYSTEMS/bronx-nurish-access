# Mock Connector Test Checklist

## Purpose
Define the test checklist required before mock connectors can be used by the Vercel sandbox.

This is documentation only. No runtime code, secrets, or production actions are included.

## Global Connector Tests

Every mock connector must pass these checks:

- [ ] Returns standard response shape.
- [ ] Returns standard refusal shape.
- [ ] Includes connector name.
- [ ] Includes mode.
- [ ] Includes operation.
- [ ] Includes `dry_run: true`.
- [ ] Includes `draft_only: true`.
- [ ] Includes audit event.
- [ ] Includes warnings array.
- [ ] Includes blockers array.
- [ ] Refuses destructive actions.
- [ ] Does not expose secret values.
- [ ] Handles missing proof.
- [ ] Provides safe next action on refusal.
- [ ] Produces deterministic output.

## GitHubMockConnector Tests

Happy path:
- [ ] Reads repo metadata fixture.
- [ ] Reads branch metadata fixture.
- [ ] Creates issue plan fixture.
- [ ] Creates PR plan fixture.

Blocked path:
- [ ] Refuses merge.
- [ ] Refuses force push.
- [ ] Refuses branch delete.
- [ ] Refuses overwrite without source proof.

## VercelMockConnector Tests

Happy path:
- [ ] Reads preview deployment fixture.
- [ ] Validates cron expression fixture.
- [ ] Simulates health endpoint.
- [ ] Simulates status endpoint.

Blocked path:
- [ ] Refuses production promotion.
- [ ] Refuses cron activation without approval.
- [ ] Refuses environment variable value display.

## SupabaseMockConnector Tests

Happy path:
- [ ] Reads source ledger fixture.
- [ ] Reads build queue fixture.
- [ ] Creates audit event preview.
- [ ] Creates validation result preview.
- [ ] Reads release gate HOLD state.

Blocked path:
- [ ] Refuses production mutation.
- [ ] Refuses public write policy.
- [ ] Refuses service role key display.
- [ ] Refuses release gate open without approval.

## ShopifyMockConnector Tests

Happy path:
- [ ] Creates draft page spec.
- [ ] Creates draft collection spec.
- [ ] Creates draft product CSV row.
- [ ] Creates Shopify Flow blueprint.
- [ ] Validates missing product fields.

Blocked path:
- [ ] Refuses live product publish.
- [ ] Refuses price update.
- [ ] Refuses inventory update.
- [ ] Refuses theme publish.
- [ ] Refuses customer email send.

## GoogleDriveMockConnector Tests

Happy path:
- [ ] Lists source manifest fixture.
- [ ] Reads approved source placeholder.
- [ ] Classifies asset type.
- [ ] Creates refactor map preview.

Blocked path:
- [ ] Refuses file delete.
- [ ] Refuses approved source move without record.
- [ ] Refuses private file exposure.

## GPTProviderMockConnector Tests

Happy path:
- [ ] Selects mock model route.
- [ ] Returns deterministic draft output.
- [ ] Returns validation explanation.
- [ ] Marks `Could not verify` fields.

Blocked path:
- [ ] Refuses external call in mock mode.
- [ ] Refuses unsupported claim generation.
- [ ] Refuses approval bypass.
- [ ] Refuses secret display.

## EmailMockConnector Tests

Happy path:
- [ ] Creates draft email spec.
- [ ] Validates subject line.
- [ ] Validates body fields.
- [ ] Creates follow-up sequence plan.

Blocked path:
- [ ] Refuses email send.
- [ ] Refuses SMS send.
- [ ] Refuses marketing blast.
- [ ] Refuses contact import without source proof.

## SocialSchedulerMockConnector Tests

Happy path:
- [ ] Creates post draft.
- [ ] Creates content calendar row.
- [ ] Creates platform checklist.
- [ ] Validates CTA destination.

Blocked path:
- [ ] Refuses publish post.
- [ ] Refuses paid ad launch.
- [ ] Refuses automated direct messaging.
- [ ] Refuses unsupported income or safety claims.

## Endpoint Integration Tests

- [ ] `/api/health` can use Vercel and Supabase mocks.
- [ ] `/api/autobuild/status` can read queue and release gate mocks.
- [ ] `/api/autobuild/dispatch` can select one task and route to mock connector.
- [ ] `/api/autobuild/simulate` can run SIM-001 through SIM-005 using mocks.
- [ ] `/api/autobuild/validate` can score mock output.
- [ ] `/api/release/evaluate` keeps release gate closed without approval.

## Completion Rule

Mock connector layer is test-ready only when every connector has:
- one happy-path fixture;
- one blocked-path fixture;
- one endpoint integration test;
- one audit-event fixture;
- one safe-next-action refusal.
