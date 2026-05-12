# v0 Benchmark and Frontend Adoption Rules

## Purpose

Use **v0.app** as the frontend benchmark system for the Intelligence OS interface. The frontend should be installed as an additive route layer and should absorb the existing Intelligence OS data without replacing the main site or rebuilding the backend.

## Operator Direction

- Benchmark v0 exactly as the frontend standard.
- Do not water it down into a generic dashboard.
- Do not overcomplicate with a custom frontend architecture.
- Do not overwrite the existing main frontend.
- Integrate existing Intelligence OS data into the v0-style interface seamlessly.
- Use Vercel AI Gateway for the chat layer.

## v0 Benchmark Characteristics to Preserve

1. Prompt-first app generation.
2. Premium product-grade interface quality.
3. Modern Next.js/App Router structure.
4. Clean composable components.
5. Strong SaaS/dashboard visual hierarchy.
6. Mobile-responsive command surfaces.
7. Real empty, loading, and error states.
8. UI that feels deployable, not placeholder.
9. Logical component reuse.
10. Easy export into a Vercel/Next.js workflow.

## Frontend Route Strategy

Install the Intelligence OS frontend as additive routes:

- `/intelligence-os`
- `/intelligence-os/chat`
- `/intelligence-os/workflow`
- `/intelligence-os/briefs`

Do **not** modify:

- `app/page.js`
- existing public homepage routes
- existing marketing pages

## Required Intelligence OS Frontend Modules

The v0-generated interface must include:

- Command sidebar
- Top runtime status strip
- Executive overview grid
- Daily Wealth + Intelligence Brief
- AI Gateway chat workspace
- Horizontal Kanban workflow tracker
- Autopilot cycle monitor
- Agent team board
- Leadership/gamification board
- Opportunity radar
- Simulation lab
- AI in Action media sandbox
- Investor readiness panel
- Memory/reflection timeline
- Exception alerts panel
- Cron/trigger monitor
- System health panel

## Required Existing API Bindings

Frontend should be designed to consume these existing routes:

- `/api/workflow/autopilot-cycle`
- `/api/intelligence/daily-command-brief`
- `/api/intelligence/coding-autonomy-benchmark`
- `/api/intelligence/frontier-benchmark`
- `/api/intelligence/warp-speed`
- `/api/agents/launch`
- `/api/autobuild/status`
- `/api/release/evaluate`

## Kanban Workflow Tracker Requirements

Columns:

1. Goal Intake
2. Doubled Target
3. Reverse Engineer
4. Benchmark
5. Opportunity Score
6. Asset Draft
7. Simulation
8. Validation
9. Autopilot Execute
10. Memory Archive

Each card should support:

- task title
- assigned agent
- priority
- workflow score
- risk level
- current status
- last update
- next trigger

## AI Chat Shell Requirements

The chat area should be prepared for Vercel AI Gateway integration and support:

- streaming-compatible messages
- model/agent selector region
- thread history sidebar
- system context banner
- tool/result cards
- task cards
- benchmark cards
- exception cards
- prompt composer

## Acceptance Criteria

This frontend adoption is acceptable only if:

1. It looks like a polished v0-grade product UI.
2. It preserves every required Intelligence OS module.
3. It is mobile-responsive.
4. It is additive and does not replace the public homepage.
5. It binds to the existing backend rather than inventing a new one.
6. It prepares chat for Vercel AI Gateway.
7. It contains a central Kanban workflow tracker.
8. It is installable with minimal repo disruption.
