# v0 Frontend Benchmark Adoption Spec

## Purpose

Use **v0.app** as the frontend benchmark system for the Intelligence OS dashboard. The frontend should be adopted as a **v0-grade generated product UI**, then wired into the existing Intelligence OS runtime without overwriting the current site homepage or rebuilding the backend architecture.

## Operator Instruction

> Benchmark v0 exactly. Do not water it down, do not redesign it into a generic dashboard, and do not overcomplicate the integration. Use the v0-generated frontend as the frontend system, then integrate existing Intelligence OS data and Vercel AI Gateway chat into it seamlessly.

## What “Benchmark v0 Exactly” Means

The builder must preserve the qualities that make v0 outputs effective:

1. **Prompt-first UI generation** — one clear product brief produces a coherent interface.
2. **Modern Next.js application structure** — App Router-compatible components and pages.
3. **High-density SaaS/dashboard composition** — premium cards, grids, status strips, command surfaces.
4. **Composable UI blocks** — navigation, chat, kanban, scorecards, charts, alerts, drawers, and detail panels.
5. **Excellent mobile responsiveness** — the dashboard must remain useful from a phone.
6. **Polished interaction states** — hover, selected, active, pending, blocked, completed, simulated.
7. **Strong visual hierarchy** — critical operator state is visible immediately.
8. **No placeholder ugliness** — output must feel shippable, not like a raw dev page.
9. **No custom design drift** — use the v0-generated system as the design authority.
10. **Seamless data binding** — existing Intelligence OS APIs populate the frontend without mutating the backend model.

## Non-Negotiable Frontend Rules

- Do **not** overwrite `app/page.js`.
- Do **not** replace the existing main frontend.
- Add the Intelligence OS frontend under a dedicated route such as:
  - `/intelligence-os`
  - `/intelligence-os/chat`
  - `/intelligence-os/workflow`
  - `/intelligence-os/briefs`
- Do **not** restyle the generated v0 frontend into a generic admin theme.
- Do **not** collapse the design into plain HTML lists.
- Do **not** rebuild the runtime APIs during the frontend pass.
- Do **not** invent new backend facts; bind to existing system APIs and use neutral empty states when data is absent.

## Frontend Source-of-Truth Layers

1. Operator instruction in the current session.
2. v0 benchmark design output and layout logic.
3. Existing Intelligence OS runtime/API contracts in this repo.
4. Existing ADMIN-COMMAND theme reference once inspected.
5. Vercel AI Gateway chat integration spec.
6. Safe implementation constraints: no homepage override, no production mutation.

## Required Frontend Shell

The v0 frontend should contain:

- **Command Sidebar**
- **Top Runtime Status Bar**
- **Executive Overview Grid**
- **AI Gateway Chat Workspace**
- **Horizontal Kanban Workflow Tracker**
- **Autopilot Cycle Monitor**
- **Daily Wealth + Intelligence Command Brief**
- **Agent Team / Leadership Board**
- **Opportunity Radar**
- **Simulation Lab**
- **AI in Action Media Sandbox**
- **Investor Readiness Panel**
- **Exception Alerts**
- **Memory / Reflection Timeline**
- **Cron / Trigger Health Panel**

## Required Data Integrations

Bind frontend cards and panels to existing or already planned endpoints:

- `/api/workflow/autopilot-cycle`
- `/api/intelligence/daily-command-brief`
- `/api/intelligence/coding-autonomy-benchmark`
- `/api/intelligence/frontier-benchmark`
- `/api/intelligence/warp-speed`
- `/api/agents/launch`
- `/api/autobuild/status`
- `/api/release/evaluate`

## Vercel AI Gateway Chat Requirement

The frontend must include a chat experience that is structurally compatible with Vercel AI SDK / AI Gateway integration. The UI should support:

- single chat composer;
- agent selector or mode selector;
- system context capsule;
- streaming messages;
- tool/result cards;
- memory-aware context banner;
- optional thread history pane;
- empty-state starter prompts.

The backend integration should be defined separately in `29_VERCEL_AI_GATEWAY_CHAT_INTEGRATION_SPEC.md`.

## Exact Benchmark Acceptance Criteria

The frontend adoption passes only if:

1. The result visibly looks like a polished v0-generated SaaS/dashboard product.
2. The Intelligence OS modules are present and navigable.
3. It is mobile responsive.
4. The existing site homepage remains untouched.
5. Existing runtime APIs are consumed rather than reimplemented.
6. The chat area is prepared for Vercel AI Gateway.
7. The Kanban workflow tracker is visually central and operationally useful.
8. Empty/loading/error states are designed, not ignored.
9. The frontend can be installed as a contained route layer.
10. A future implementation pass can wire it with minimal repo disruption.

## Current Repo Constraint

At the time of this document, the branch already contains the Intelligence OS backend/runtime modules and additive placeholder pages. The v0 frontend pass should replace or supersede only the placeholder Intelligence OS page surfaces, not the main frontend or backend runtime.

## Implementation Decision

This document establishes the builder contract:

```text
Use v0 as the exact frontend benchmark.
Preserve its product-grade UI standards.
Install it as the Intelligence OS frontend layer.
Bind existing system data into it.
Use Vercel AI Gateway for chat.
Do not replace the main site.
```
