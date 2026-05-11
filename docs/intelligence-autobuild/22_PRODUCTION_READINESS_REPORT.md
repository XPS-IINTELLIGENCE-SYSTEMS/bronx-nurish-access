# Production Readiness Report

## Scope

This report covers PR #22 / branch `autonomous-gpt-bridge` for the Intelligence OS + AutoBuild OS sandbox runtime.

## Latest Verified Preview Deployment

Deployment ID: `dpl_7HGfKkYfzrw2vMx69S2H7mx1pPCG`

Branch: `autonomous-gpt-bridge`

Commit previously verified: `f6d45f353afb2ff845bb48476bc189fd48cddbf0`

State: `READY`

## Runtime Mode

The runtime remains sandbox-safe:

- `system_mode`: `mock`
- `dry_run`: `true`
- `draft_only`: `true`
- `release_gate`: `HOLD`
- `real_external_actions`: `false`

## Endpoint Verification

| Endpoint | Result |
|---|---|
| `/api/autobuild/status` | 200, persistence `postgres`, release gate `HOLD` |
| `/api/autobuild/dispatch` | 200, persistence `postgres`, external actions `false` |
| `/api/autobuild/validate` | 200, score `100`, persistence `postgres`, P0 `0`, P1 `0` |
| `/api/autobuild/simulate` | 200, 25 executions, 5 passes, score `100`, persistence `postgres` |
| `/api/release/evaluate` | 200, release gate `HOLD`, can_open `false`, persistence `postgres` |

## Cron Safety Review

`vercel.json` was updated to allow only the AutoBuild sandbox dispatcher cron:

```json
{
  "path": "/api/autobuild/dispatch",
  "schedule": "*/5 * * * *"
}
```

Removed from production cron configuration:

- `/api/cron/content-draft`
- `/api/cron/proof-loop`
- `/api/cron/daily-report`

## Dependency / Audit Status

Vercel build logs reported:

```text
2 moderate severity vulnerabilities
```

Current package state:

- `package.json` exists.
- `package-lock.json` was not found in the branch at verification time.
- Dependencies use `latest` ranges.
- Because no lockfile is committed, the audit result is not reproducible from repository state alone.
- Production promotion should not treat the audit as resolved until either:
  1. a lockfile is committed and `npm audit` is reviewed, or
  2. the vulnerabilities are explicitly accepted as a documented risk.

Attempted cleanup:

- The runtime now uses `@neondatabase/serverless` for Postgres persistence.
- The older Supabase REST dependency appears unused by code search.
- A package cleanup commit was attempted but blocked by platform safety tooling.

## Production Environment Gate

Preview runtime has verified Postgres persistence.

Production runtime still requires verification that Production environment exposes:

- `POSTGRES_URL`, or
- `POSTGRES_PRISMA_URL`, or
- `POSTGRES_URL_NON_POOLING`

The current available Vercel tool surface does not expose production environment variable listing.

## Release Gate

Current release gate behavior:

- State: `HOLD`
- `can_open`: `false`
- Owner approval required before production promotion.

## Production Decision

Do not promote production unless the owner explicitly approves and accepts the unresolved audit/env limitations.

Required owner phrase:

```text
APPROVE PRODUCTION
```

## Current Recommendation

`READY_FOR_OWNER_RISK_DECISION`, not automatic production promotion.

Recommended before production:

1. Commit a lockfile.
2. Run or review `npm audit`.
3. Remove unused dependencies.
4. Verify production environment variables directly in Vercel.
5. Promote only after explicit owner approval.
