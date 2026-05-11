# GPT Automation Bridge OS — Bronx Nourish Access

## Mission
Create a controlled bridge that allows GPT-assisted workflows to coordinate GitHub, Vercel, Supabase/Postgres, Shopify, Google Drive, Apps Script, AI image/video/voice job queues, validation, logging, and results reporting.

This system is designed to finish and harden Bronx Nourish Access end-to-end while preserving PR #7 safety gates and PR #8 Content Command OS scope.

## Operating boundary
The bridge is allowed to automate audit, read, draft, queue, validate, log, report, issue creation, PR creation, preview validation, and artifact generation.

The bridge is not allowed to automatically:
- merge PRs
- live publish social posts
- live comment/reply
- spend HeyGen/InVideo/voice/image credits
- send Gmail campaigns
- delete Drive files
- expose secrets
- bypass approval gates
- make unsupported benefit, payment, meal-count, sponsor, or government claims

## Connected systems

### GitHub
Use for:
- branches
- PRs
- issues
- Actions workflows
- validation artifacts
- audit reports
- project tracking reference

Project board reference:
https://github.com/orgs/XPS-IINTELLIGENCE-SYSTEMS/projects/5/settings

### Vercel
Use for:
- preview deployments
- production deployments after manual approval
- protected preview validation
- cron endpoints
- AI Gateway route layer
- Sandbox references for isolated code/test work

Vercel security notes:
- cron endpoints must verify `Authorization: Bearer $CRON_SECRET`
- protected previews require `VERCEL_AUTOMATION_BYPASS_SECRET`
- AI Gateway requires `AI_GATEWAY_API_KEY` or `VERCEL_AI_GATEWAY_API_KEY`

### Supabase/Postgres/Neon
Use for:
- source-of-truth queue tables
- content items
- asset registry
- image/video/chat jobs
- proof checks
- automation runs
- approval events
- audit state

### Shopify
Use for:
- draft page payloads
- validation funnel drafts
- offer/page exports
- storefront handoff

No live Shopify publish action is allowed until explicit approval gate is implemented and approved.

### Google Drive / Workspace
Use for:
- workflow folders
- Docs and Sheets packages
- proof logs
- handoff docs
- Apps Script bridge source
- scheduler exports

Current Bronx workflow folder:
`BNA - Bronx Nourish Access`

Workflow stages:
1. Intake / Source Read
2. Discovery / Research
3. Claims + Compliance Scan
4. Funnel / Offer Logic
5. Backend + Data Model
6. Content Drafting
7. Proof Loop Review
8. Human Approval
9. Scheduler / Export
10. Deployment / Publish Gate
11. Reporting / Analytics
12. Optimization / Repurpose

### AI media tools
Use for draft job creation only:
- AI image prompt jobs
- HeyGen/InVideo video job payload drafts
- AI voice/sound prompt drafts
- approval-gated provider calls later

## Required secrets

### GitHub Actions
```text
ADMIN_SECRET
CRON_SECRET
VERCEL_AUTOMATION_BYPASS_SECRET
DATABASE_URL or POSTGRES_URL
RESULTS_EMAIL_TO
RESULTS_EMAIL_FROM
RESEND_API_KEY optional for email results
BRIDGE_PROJECT_URL
```

### Vercel
```text
ADMIN_SECRET
CRON_SECRET
DATABASE_URL or POSTGRES_URL
AI_GATEWAY_API_KEY or VERCEL_AI_GATEWAY_API_KEY
GOOGLE_APPS_SCRIPT_BRIDGE_URL
GOOGLE_WORKSPACE_BRIDGE_SECRET
SHOPIFY_STORE_DOMAIN
SHOPIFY_ADMIN_ACCESS_TOKEN
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

### Later optional provider secrets
```text
HEYGEN_API_KEY
INVIDEO_API_KEY
ELEVENLABS_API_KEY
BUFFER_ACCESS_TOKEN
FACEBOOK_PAGE_ID
FACEBOOK_ACCESS_TOKEN
INSTAGRAM_BUSINESS_ACCOUNT_ID
```

Default for all optional provider routes must remain draft/export/review only.

## Automation loop
Every scheduled or manually dispatched bridge run should:
1. Check repository state.
2. Install dependencies.
3. Run build/type-check.
4. Scan unsafe route/file patterns.
5. Scan blocked Bronx claims.
6. Inspect latest Vercel deployment state.
7. Validate preview routes when URL is available.
8. Validate protected APIs reject unauthenticated requests.
9. Validate protected APIs work with `ADMIN_SECRET` when configured.
10. Generate JSON and Markdown reports.
11. Upload artifacts.
12. Create or update a GitHub issue.
13. Optionally email report using Resend.
14. Recommend next patch.

## Safe implementation files
- `.github/workflows/bronx-gpt-automation-bridge.yml`
- `scripts/bronx-gpt-automation-audit.mjs`
- `scripts/bronx-send-automation-email.mjs`
- `app/api/admin/automation/bridge-status/route.ts`
- `app/api/admin/automation/bridge-report/route.ts`
- `docs/GPT_AUTOMATION_BRIDGE_OS.md`
- `docs/GPT_AUTOMATION_BRIDGE_RUNBOOK.md`

## Launch gate
Launch only when all are true:
- Vercel build is READY
- `/`, `/privacy`, `/admin`, and all `/admin/*` module pages load
- protected APIs return 401 without token
- protected APIs return valid JSON with token
- DB schema is initialized and non-conflicting
- Drive workflow index exists
- approved assets have public/export URLs
- blocked claims scan passes
- privacy/consent language reviewed
- scheduler export dry run passes
- manual approval grants production launch
