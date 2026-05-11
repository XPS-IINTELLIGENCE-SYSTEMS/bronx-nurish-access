# GPT Autonomous System Bridge

Repo: `XPS-IINTELLIGENCE-SYSTEMS/bronx-nourish-access`
Branch: `feature/content-command-os`
Project: `https://github.com/orgs/XPS-IINTELLIGENCE-SYSTEMS/projects/2`
Workflow: `.github/workflows/gpt-autonomous-system-bridge.yml`

## Purpose

This bridge gives the Bronx system a repo-native automation runner for GitHub Project sync, issue reporting, Vercel preview checks, Neon protected route checks, Drive documentation handoff, Shopify workflow handoff, and AI media queue readiness.

## Bridge tasks

- `system-scan`
- `project-sync`
- `vercel-check`
- `neon-check`
- `issue-report`
- `full-cycle`

## Required secrets

- `PROJECT_V2_TOKEN`
- `ADMIN_SECRET`
- `VERCEL_AUTOMATION_BYPASS_SECRET`

## Later connection secrets

- `VERCEL_TOKEN`
- `AI_GATEWAY_API_KEY`
- `HEYGEN_API_KEY`
- `INVIDEO_API_KEY`
- `SHOPIFY_ADMIN_ACCESS_TOKEN`
- `SHOPIFY_STORE_DOMAIN`
- `BUFFER_ACCESS_TOKEN`
- `FACEBOOK_PAGE_ID`
- `FACEBOOK_ACCESS_TOKEN`
- `INSTAGRAM_BUSINESS_ACCOUNT_ID`

## Operating loop

1. Sync phase issues #9-#18 into Project #2.
2. Check Vercel preview pages.
3. Check protected admin status routes.
4. Write bridge status to Issue #15.
5. Surface blockers as GitHub issues and dashboard actions.
6. Continue implementation through PRs.

## Control rule

The bridge operates the system through GitHub Actions, issues, PRs, Vercel previews, Neon status routes, and Drive docs. It is designed to reduce operator typing to credential setup, approval of high-risk switches, and final launch decisions.
