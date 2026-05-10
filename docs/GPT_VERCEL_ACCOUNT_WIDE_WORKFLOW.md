# Strategic Minds Advisory — GPT/Vercel Account-Wide Workflow

Status: master operating model for controlled autonomous building.

Purpose: allow GPT/Codex/automation agents to freely create, iterate, test, preview, and validate projects without damaging production front ends, production data, client assets, domains, secrets, or live social channels.

## Core principle

GPT may freely operate in sandbox, development, and preview lanes. GPT may not alter production, publish, merge, send, post, delete, rotate secrets, or change account-wide settings without explicit operator authorization.

## Verified account context

- Vercel team: Strategic Minds Advisory
- Vercel team ID: team_aFdds8lsbHMwe2ip4aQdbQ3d
- Current technical client project: Bronx Nourish Access
- Current production repo pattern: GitHub branch -> Vercel preview -> protected validation -> manual merge -> production deployment

## Environment lanes

| Lane | Purpose | GPT autonomy | Vercel target | GitHub branch pattern | Data access | Public access |
|---|---|---|---|---|---|---|
| Sandbox | Free invention, experiments, prototypes, throwaway builds | High | Preview/custom sandbox project | sandbox/* | Fake/demo only | Protected |
| Development | Feature implementation, refactors, controlled builds | High | Preview | feature/*, fix/* | Dev DB only | Protected |
| Preview | Client/operator review, QA, PR validation | Medium-high | Preview | PR branches | Staging DB only | Protected with bypass |
| Production | Live client/public system | Low | Production | main only | Production DB | Public or client-approved protected |

## Global rules

1. GPT can create branches, files, docs, issues, and PRs.
2. GPT can inspect Vercel deployments, build logs, and preview URLs.
3. GPT can validate protected preview deployments with automation bypass.
4. GPT can create and queue commands in app databases when routes are protected.
5. GPT cannot merge to main without explicit authorization.
6. GPT cannot disable deployment protection without explicit authorization.
7. GPT cannot alter production environment variables without explicit authorization.
8. GPT cannot delete projects, databases, deployments, domains, repos, branches, or secrets.
9. GPT cannot publish social media, send emails, launch paid ads, or contact leads without explicit authorization.
10. GPT must write proof logs for automation actions whenever the app supports proof logging.

## Required account-wide secrets

Store in GitHub Organization or repository Actions secrets, not in chat.

```text
VERCEL_TOKEN
VERCEL_TEAM_ID
VERCEL_AUTOMATION_BYPASS_SECRET
GPT_AUTOMATION_MODE=sandbox_preview_only
```

Per project, store:

```text
VERCEL_PROJECT_ID
ADMIN_SECRET
CRON_SECRET
DATABASE_URL_DEV
DATABASE_URL_PREVIEW
DATABASE_URL_PRODUCTION
POSTGRES_URL_DEV
POSTGRES_URL_PREVIEW
POSTGRES_URL_PRODUCTION
```

Social automation secrets must be per project only:

```text
FACEBOOK_PAGE_ID
FACEBOOK_ACCESS_TOKEN
SOCIAL_AUTO_PUBLISH_ALLOWED=false
FACEBOOK_POSTING_MODE=draft
```

## Vercel project naming standard

Use this naming structure:

```text
sma-[client-or-brand]-[system]
```

Examples:

```text
sma-bronx-nourish-access
sma-xps-contractor-success
sma-shopify-autobuilder
sma-ai-in-action-funnel
```

## GitHub repository standard

Use this naming structure:

```text
[client-or-brand]-[system]
```

Required branches:

```text
main
feature/*
fix/*
sandbox/*
release/*
```

Protected branches:

```text
main
release/*
```

## Required repo folders

```text
app/
components/
lib/
docs/
scripts/
.github/workflows/
prompts/
ops/
```

## Required docs per project

```text
docs/PROJECT_BRIEF.md
docs/DEPLOYMENT_POLICY.md
docs/ENVIRONMENT_MATRIX.md
docs/AUTOMATION_GATES.md
docs/SOCIAL_AUTOMATION_POLICY.md
docs/QA_CHECKLIST.md
docs/ROLLBACK_PLAN.md
```

## Required GitHub workflows

```text
.github/workflows/preview-validation.yml
.github/workflows/security-claim-scan.yml
.github/workflows/production-release-gate.yml
```

## Preview validation workflow requirements

Every PR must validate:

1. preview deployment exists
2. preview deployment is READY
3. critical public pages load
4. protected API routes return 401 without app auth
5. protected API routes work with app auth
6. production-only routes are absent or blocked
7. no blocked claims appear as active promises
8. no live social posting route exists unless explicitly approved
9. no secrets are present in code
10. app reports automation mode correctly

## Production release gate

Production deployment requires:

1. PR validation passed
2. human review complete
3. no P0 blockers
4. privacy/consent verified if lead data is collected
5. legal/compliance claims verified if regulated/public-benefit claims are involved
6. rollback plan documented
7. explicit operator approval phrase recorded

Required approval phrase:

```text
Jeremy approves merge and production deployment for [PROJECT_NAME].
```

## Social automation gate

Default:

```text
SOCIAL_AUTO_PUBLISH_ALLOWED=false
FACEBOOK_POSTING_MODE=draft
```

Allowed without approval:

- generate drafts
- scan claims
- export approved post packages
- create QR copy
- create video scripts
- create captions
- create UTM plans

Not allowed without approval:

- post to Facebook
- schedule posts
- send DMs
- send SMS
- send emails
- launch paid ads
- modify ad budgets

Required approval phrase:

```text
Jeremy approves live social publishing for [PROJECT_NAME] on [CHANNEL].
```

## Autonomous AutoBuilder gates

Allowed command states:

```text
draft
pending_review
approved
blocked
executing
executed
failed
```

Default behavior:

```text
execution_enabled=false
publishing_enabled=false
production_write_enabled=false
```

Commands may be queued freely in sandbox/preview.

Commands may execute only when:

1. command status is approved
2. execution route is protected
3. environment is sandbox, development, or preview
4. production write flag is false
5. proof logging is enabled

## Production firewall

Any route that writes to production must require:

1. ADMIN_SECRET or stronger auth
2. environment check
3. explicit production write flag
4. proof log
5. rollback path
6. operator approval reference

## Database separation

Never use production DB for sandbox or preview.

Recommended setup:

```text
DATABASE_URL_DEV
DATABASE_URL_PREVIEW
DATABASE_URL_PRODUCTION
```

Preview deployments must use preview/staging DB.

Production deployment must use production DB.

## Domain safety

GPT may not alter production domains.

Allowed:

- inspect domains
- propose domain mappings
- create docs for domain setup

Not allowed without approval:

- add domain
- remove domain
- promote preview alias to production
- redirect production traffic

## Account-wide role model

| Role | Capability |
|---|---|
| Operator | full approval authority |
| GPT Builder | branch/PR/docs/code/preview validation |
| GPT Auditor | read-only audit/reporting |
| GPT Social Draft Agent | content draft/export only |
| GPT Release Agent | checklist only; no merge/publish |
| Human Reviewer | approve claims/privacy/social/merge |

## Reusable project creation checklist

For every new client/project:

1. Create GitHub repo.
2. Add required docs folders.
3. Add preview validation workflow.
4. Create Vercel project under Strategic Minds Advisory.
5. Connect repo to Vercel.
6. Enable deployment protection for previews.
7. Generate automation bypass secret.
8. Add GitHub Actions secrets.
9. Add Vercel env vars per environment.
10. Create sandbox branch.
11. Create initial PR.
12. Run preview validation.
13. Keep production unmerged until explicit approval.

## Account-wide forbidden actions

GPT may never perform these without explicit command:

```text
merge main
delete repo
delete project
delete database
delete env vars
rotate secrets
disable deployment protection
publish production
post to social
send outreach
launch paid ads
change production domains
change billing settings
```

## Bronx current next step

Implement the reusable GitHub Actions preview validation workflow in PR #7, using:

```text
VERCEL_AUTOMATION_BYPASS_SECRET
ADMIN_SECRET
```

Then validate PR #7 without manual share links.
