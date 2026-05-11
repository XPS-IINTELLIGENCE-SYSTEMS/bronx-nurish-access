# GPT Automation Bridge Runbook

## Current branch
`feature/content-command-os`

## Purpose
Run controlled recursive audits and validations for Bronx Nourish Access. This bridge coordinates GitHub, Vercel, database status APIs, Drive documentation, and reporting.

## Start here
1. Add required GitHub Actions secrets.
2. Run workflow: `Bronx GPT Automation Bridge`.
3. Review artifacts.
4. Review/update the tracking issue created by the workflow.
5. Apply the recommended safe patch manually or through a draft PR.
6. Repeat until launch score is 10/10.

## Required GitHub Actions secrets
```text
ADMIN_SECRET
VERCEL_AUTOMATION_BYPASS_SECRET
DATABASE_URL or POSTGRES_URL
RESULTS_EMAIL_TO optional
RESULTS_EMAIL_FROM optional
RESEND_API_KEY optional
```

## Required Vercel env vars
```text
ADMIN_SECRET
CRON_SECRET
DATABASE_URL or POSTGRES_URL
VERCEL_AUTOMATION_BYPASS_SECRET
AI_GATEWAY_API_KEY or VERCEL_AI_GATEWAY_API_KEY
GOOGLE_APPS_SCRIPT_BRIDGE_URL optional
GOOGLE_WORKSPACE_BRIDGE_SECRET optional
SHOPIFY_STORE_DOMAIN optional
SHOPIFY_ADMIN_ACCESS_TOKEN optional
```

## GitHub Project integration
Project URL:
https://github.com/orgs/XPS-IINTELLIGENCE-SYSTEMS/projects/5/settings

Use project fields for:
- Phase
- Status
- Risk
- System
- Owner
- Launch Gate

Recommended issue labels:
```text
autobuild
bronx
content-command-os
validation
blocker
safe-automation
```

## Workflow modes

### audit_only
Non-mutating. Scans repo, build, unsafe patterns, claims, and docs.

### validate_preview
Uses latest Vercel preview URL if available and validates public/admin routes.

### db_status
Checks protected APIs when `ADMIN_SECRET` and database env exist.

### email_report
Emails markdown result if `RESEND_API_KEY` and recipients are configured.

## Safety locks
The workflow must fail if it finds active route/file patterns for:
```text
live-post
publish-live
auto-comment
auto-send
spend-credits
merge-auto
facebook/post
buffer/post
shopify/publish
```

## Manual approval required for
- production deployment
- PR merge
- live publishing
- social posting
- external email send
- provider credit spend
- Shopify publish
- privacy/legal changes

## Expected artifacts
```text
autobuild-audit.json
autobuild-report.md
unsafe-patterns.json
claim-scan.json
route-checks.json
next-actions.md
```

## Launch score
The system launches only when all checks pass:
1. Build ready
2. Vercel preview ready
3. Admin routes load
4. Protected APIs gated
5. DB schema initialized
6. Drive index connected
7. Approved assets available
8. Claims clean
9. Privacy reviewed
10. Scheduler export dry run passed
