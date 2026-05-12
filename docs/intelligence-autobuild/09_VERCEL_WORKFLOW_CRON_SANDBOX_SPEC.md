# Vercel Workflow, Cron, and Sandbox Specification

## Purpose
Define the implementation-ready Vercel workflow for the Intelligence OS + AutoBuild OS system without adding production runtime code.

This specification extends PR #22 and must be treated as the source document for the future Vercel implementation.

## Current Vercel Workflow Observation

The GitHub branch workflow is already connected to Vercel. PR preview deployments are created from the `autonomous-gpt-bridge` branch.

Required implementation pattern:
1. Commit docs/specs to branch.
2. Vercel creates preview deployment.
3. Review preview and PR status.
4. Only after approval, implement sandbox endpoints and cron schedule.
5. Production promotion remains gated.

## Vercel Roles

| Vercel Feature | Required Role |
|---|---|
| Preview Deployments | Validate branch changes before merge |
| Serverless / Route Handlers | Future sandbox execution surface |
| Cron Jobs | Future recurring trigger for agent dispatcher |
| Environment Variables | Secret delivery without committing credentials |
| Deployment Logs | Runtime observability and failure triage |
| Vercel Bot PR Comment | Human-visible deployment status and preview link |

## Environments

| Environment | Purpose | Publish Risk | Required Gate |
|---|---|---:|---|
| Local / mock | Developer-only simulation | low | none |
| PR Preview | Branch validation and UI/document preview | low | PR review |
| Vercel Sandbox | Dry-run agent orchestration | medium | docs approved |
| Staging | Controlled integration with draft connectors | high | release gate |
| Production | Live user-facing system | critical | owner approval |

## Future Cron Design

Recommended build cycle:

```text
*/5 * * * * -> /api/autobuild/dispatch
```

The cron endpoint must not execute destructive production actions. It must call a dispatcher that checks system state before selecting work.

## Dispatcher Responsibilities

1. Verify environment mode.
2. Confirm release firewall state.
3. Load queue from Supabase.
4. Select eligible agent task.
5. Execute in dry-run or draft mode.
6. Write log event.
7. Run validation.
8. Store results.
9. Exit within provider limits.

## Required Endpoint Specifications

| Endpoint | Method | Purpose | Mode |
|---|---|---|---|
| `/api/health` | GET | Confirm deployment health | read-only |
| `/api/autobuild/dispatch` | GET/POST | Cron entrypoint for queued work | dry-run first |
| `/api/autobuild/simulate` | POST | Run simulation scenario set | sandbox |
| `/api/autobuild/validate` | POST | Validate staged outputs | sandbox |
| `/api/autobuild/status` | GET | Read current system state | read-only |
| `/api/release/evaluate` | POST | Evaluate release gate | approval-gated |

## Required Environment Variables

No secret values may be committed.

| Variable | Purpose | Required For |
|---|---|---|
| `SYSTEM_MODE` | `docs`, `dry_run`, `sandbox`, `staging`, `production` | all |
| `RELEASE_FIREWALL` | `closed` by default | all |
| `SUPABASE_URL` | state backend URL | sandbox+ |
| `SUPABASE_SERVICE_ROLE_KEY` | server-only state write access | sandbox+ |
| `OPENAI_API_KEY` | GPT bridge provider | sandbox+ |
| `ANTHROPIC_API_KEY` | benchmark/model routing provider | optional sandbox+ |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Drive/Sheets access | staging+ |
| `SHOPIFY_ADMIN_TOKEN` | Shopify draft staging | staging+ |
| `SHOPIFY_SHOP_DOMAIN` | Shopify store domain | staging+ |
| `GITHUB_APP_TOKEN` | issue/PR automation | staging+ |
| `CRON_SECRET` | protects cron endpoint | sandbox+ |

## Vercel Cron Safety Rules

The cron dispatcher must reject execution when:
- `RELEASE_FIREWALL` is missing or not `closed` during pre-production.
- `SYSTEM_MODE` is missing.
- request lacks the expected cron secret in protected environments.
- queue task requests live publish, live email send, charge, ad publish, or main branch merge.
- task lacks a source record.

## Workflow States

| State | Meaning | Next Step |
|---|---|---|
| `queued` | task exists but not claimed | dispatcher can claim |
| `claimed` | agent has selected task | execute sandbox work |
| `drafted` | output created in draft form | validate |
| `validating` | QA checks running | score |
| `blocked` | cannot proceed safely | create blocker |
| `ready_for_review` | human review needed | owner action |
| `approved_for_staging` | safe to stage | staging deploy |
| `approved_for_production` | owner approved production | release plan |

## Non-Blocking Behavior

If one agent fails:
- write failure event;
- mark task `blocked` or `retry_pending`;
- continue with unrelated eligible tasks;
- never loop indefinitely inside one request.

## Vercel Preview Deployment Use

Every future PR must keep Vercel preview deployment enabled. Preview should be used for:
- documentation review;
- dashboard UI review;
- sandbox page review;
- simulation result review;
- release gate review.

## Implementation Checklist

- [ ] Keep this file documentation-only until approved.
- [ ] Add API route specs before route code.
- [ ] Add Supabase schema before state writes.
- [ ] Add mock connector specs before real connectors.
- [ ] Add cron only after dry-run endpoint is validated.
- [ ] Confirm Vercel preview deploys before staging.
- [ ] Confirm logs do not expose secrets.
- [ ] Confirm Shopify actions are draft-only.
- [ ] Confirm release gate defaults to closed.
