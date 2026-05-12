# Mock Connector Specifications

## Purpose
Define mock connector behavior for the Vercel sandbox before any real connector is implemented.

This document extends PR #22 files 09 through 12. It is documentation only and contains no production runtime code or secrets.

## Global Mock Connector Contract

Every connector must support the same minimum behavior before real integration:

| Method | Purpose |
|---|---|
| `name` | Connector identifier |
| `mode` | `mock`, `dry_run`, `sandbox`, `staging`, or `production` |
| `capabilities` | supported operations |
| `validateConfig()` | confirms required config shape without exposing secret values |
| `read(request)` | returns mock read result |
| `writeDraft(request)` | returns mock draft write result |
| `refuse(request)` | rejects disallowed action |
| `health()` | returns connector readiness |

## Global Safety Requirements

All mock connectors must:
- return deterministic data for simulations;
- refuse live publish, send, merge, charge, delete, or destructive actions;
- never log secret values;
- mark missing proof as `Could not verify`;
- produce audit-friendly request and response objects;
- include a fallback path.

## Standard Response Shape

```json
{
  "ok": true,
  "connector": "MockConnectorName",
  "mode": "mock",
  "operation": "read",
  "dry_run": true,
  "draft_only": true,
  "data": {},
  "warnings": [],
  "blockers": [],
  "audit_event": {
    "event_type": "connector.read.completed",
    "message": "Mock connector read completed."
  }
}
```

## Standard Refusal Shape

```json
{
  "ok": false,
  "connector": "MockConnectorName",
  "mode": "mock",
  "operation": "publish",
  "refused": true,
  "reason": "Operation blocked by draft-only policy.",
  "blockers": ["live_publish_blocked"],
  "audit_event": {
    "event_type": "connector.operation.refused",
    "message": "Unsafe operation refused."
  }
}
```

## Connector: GitHubMockConnector

Purpose: simulate GitHub issue, branch, file, and pull request workflows.

Allowed mock operations:
- read repository metadata;
- read branch metadata;
- create issue plan;
- create PR plan;
- create draft file plan;
- read PR status;
- read Vercel bot PR status comments.

Blocked operations:
- merge pull request;
- force push;
- delete branch;
- overwrite file without prior fetch proof;
- expose tokens.

Mock outputs:
- issue creation preview;
- PR creation preview;
- changed file manifest;
- review checklist.

## Connector: VercelMockConnector

Purpose: simulate Vercel preview, sandbox endpoint, cron, and deployment log behavior.

Allowed mock operations:
- read preview deployment state;
- validate cron expression;
- simulate `/api/health`;
- simulate `/api/autobuild/status`;
- simulate `/api/autobuild/dispatch`;
- simulate deployment logs.

Blocked operations:
- production promotion;
- environment variable value display;
- cron activation without approved release gate;
- live connector execution.

Mock outputs:
- preview URL placeholder;
- cron readiness report;
- endpoint response report;
- deployment health report.

## Connector: SupabaseMockConnector

Purpose: simulate state ledger and queue persistence.

Allowed mock operations:
- read source ledger;
- read build queue;
- insert audit event preview;
- insert simulation result preview;
- evaluate release gate state;
- validate schema presence.

Blocked operations:
- production database mutation;
- public write policy;
- service role key display;
- release gate opening without approval.

Mock outputs:
- queue item;
- audit event;
- validation row;
- release gate state.

## Connector: ShopifyMockConnector

Purpose: simulate Shopify draft workflows only.

Allowed mock operations:
- read store metadata placeholder;
- create draft page spec;
- create draft product CSV row;
- create draft collection spec;
- create Shopify Flow blueprint;
- validate missing product fields.

Blocked operations:
- live product publish;
- price update;
- inventory update;
- theme publish;
- customer email send;
- unverified product claim approval.

Mock outputs:
- draft product object;
- draft page object;
- missing-proof report;
- approval checklist.

## Connector: GoogleDriveMockConnector

Purpose: simulate Drive source-vault behavior.

Allowed mock operations:
- list source manifest;
- read approved source placeholder;
- stage output manifest;
- classify asset type;
- validate missing proof.

Blocked operations:
- delete source file;
- move approved source without reclassification record;
- expose private file content outside approved workflow.

Mock outputs:
- source ledger rows;
- asset manifest rows;
- refactor map rows.

## Connector: GPTProviderMockConnector

Purpose: simulate model/provider calls without consuming API or exposing prompts to external systems.

Allowed mock operations:
- select model route;
- return deterministic draft text;
- return validation explanation;
- return blocked-output result.

Blocked operations:
- external model call in mock mode;
- unsupported claim generation;
- secret display;
- approval bypass.

Mock outputs:
- generated draft placeholder;
- reasoning summary;
- confidence score;
- missing proof markers.

## Connector: EmailMockConnector

Purpose: simulate email draft creation.

Allowed mock operations:
- create draft email spec;
- validate subject/body;
- validate opt-in status;
- create follow-up sequence plan.

Blocked operations:
- send email;
- send SMS;
- import contacts without source proof;
- blast marketing sequence.

## Connector: SocialSchedulerMockConnector

Purpose: simulate social media scheduling and content queue behavior.

Allowed mock operations:
- create post draft;
- create content calendar row;
- create platform-specific checklist;
- validate CTA destination.

Blocked operations:
- publish post;
- run paid ad;
- scrape or message users automatically;
- make unsupported income or safety claims.

## Connector Readiness Checklist

A mock connector is ready when:
- [ ] response shape matches standard response;
- [ ] refusal shape matches standard refusal;
- [ ] missing proof is handled;
- [ ] destructive actions are blocked;
- [ ] logs are structured;
- [ ] fallback behavior is documented;
- [ ] simulation scenarios can use it.
