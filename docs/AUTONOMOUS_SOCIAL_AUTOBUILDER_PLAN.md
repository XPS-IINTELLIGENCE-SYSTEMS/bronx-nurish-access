# Bronx Nourish Access — Autonomous Social + AutoBuilder Plan

Status: draft implementation track. Do not merge until secrets, privacy, compliance, and approval gates are complete.

## Objective

Create a controlled autonomous operating layer for Bronx Nourish Access that can generate, scan, queue, export, and optionally post approved social content while maintaining compliance, source-rights, and launch-governance controls.

## User-confirmed state

- CRON_SECRET: done.
- Facebook: live.
- Vercel: connected.
- GitHub: connected.

## Could not verify

- Facebook Page ID.
- Facebook access token.
- Facebook Graph API permission scope.
- Facebook posting destination.
- Social auto-publish approval.
- Privacy policy page.
- Program sponsor, payer, meal quantity, official program status.

## Required Vercel environment variables

```text
CRON_SECRET=required
ADMIN_SECRET=required
SOCIAL_AUTO_PUBLISH_ALLOWED=false
FACEBOOK_PAGE_ID=required_for_facebook_posting
FACEBOOK_ACCESS_TOKEN=required_for_facebook_posting
FACEBOOK_POSTING_MODE=draft
AI_GATEWAY_API_KEY=optional_for_ai_content
AI_GATEWAY_MODEL=optional
```

## Posting modes

| Mode | Behavior |
|---|---|
| draft | Generate content only. No posting. |
| export | Export approved content for manual posting. |
| scheduled | Queue approved content for later review; no live posting unless explicitly enabled. |
| live | Post only approved content when SOCIAL_AUTO_PUBLISH_ALLOWED=true and Facebook secrets exist. |

Default must remain `draft`.

## AutoBuilder command types

- generate_content
- generate_video_script
- generate_asset_prompt
- create_qr_package
- create_partner_pack
- export_social
- run_claim_scan
- run_launch_audit
- build_daily_report
- create_github_issue
- create_github_pr_plan

## Command states

- draft
- pending_review
- approved
- blocked
- executing
- executed
- failed

## Hard release gates

1. No publishing unless Jeremy explicitly approves.
2. No social auto-posting unless `SOCIAL_AUTO_PUBLISH_ALLOWED=true`.
3. No post can publish unless `approval_status=approved`.
4. No blocked claims can appear in generated, exported, or posted content.
5. No unverified sponsor, payer, meal quantity, federal payment, or guaranteed approval claims.
6. All automated actions must write to `bna_proof_log`.
7. Facebook tokens must never be committed to GitHub.
8. All public copy must keep may-qualify language until program claims are verified.

## Implementation phases

### Phase 1 — Safe export system

Build approved-content export route:

```text
GET /api/social/export-approved
```

Requirements:
- Requires ADMIN_SECRET.
- Reads only approved content.
- Returns JSON/CSV-friendly payload.
- Does not post.
- Logs export to proof log.

### Phase 2 — Facebook configuration check

Build protected route:

```text
GET /api/social/facebook/status
```

Requirements:
- Requires ADMIN_SECRET.
- Checks env variables only.
- Does not expose token values.
- Returns configured/missing statuses.

### Phase 3 — Facebook draft/live post route

Build protected route:

```text
POST /api/social/facebook/post
```

Requirements:
- Requires ADMIN_SECRET.
- Requires SOCIAL_AUTO_PUBLISH_ALLOWED=true.
- Requires FACEBOOK_POSTING_MODE=live.
- Requires content approval_status=approved.
- Runs blocked-claim scan again before posting.
- Posts to Facebook only if all gates pass.
- Logs success/failure to proof log.

### Phase 4 — AutoBuilder queue

Add database table:

```sql
create table if not exists bna_autobuilder_commands (
  id bigserial primary key,
  created_at timestamptz default now(),
  command_type text not null,
  status text default 'draft',
  title text,
  prompt text,
  payload jsonb default '{}'::jsonb,
  output jsonb default '{}'::jsonb,
  approval_required boolean default true,
  approved_by text,
  approved_at timestamptz,
  executed_at timestamptz,
  github_issue_url text,
  github_pr_url text,
  notes text
);
```

### Phase 5 — Admin UI update

Update `/admin` to show:
- latest deployment status copy
- Facebook connection status
- AutoBuilder queue status
- content queue counts
- proof loop counts
- launch blockers
- GitHub issue links

## GitHub issues created

- #4 P0: Connect Facebook live account to safe social automation queue
- #5 P0: Build AutoBuilder command queue and execution firewall
- #6 P1: Add privacy policy and public consent page

## Definition of done

- Vercel deployment READY.
- `/admin` loads.
- `/api/health` healthy.
- Admin and cron routes block unauthenticated requests.
- Facebook status route returns configured/missing without exposing secrets.
- Export route works before live posting exists.
- Privacy page exists.
- Proof logs record every automation action.
- Social auto-posting remains off until explicit approval.
