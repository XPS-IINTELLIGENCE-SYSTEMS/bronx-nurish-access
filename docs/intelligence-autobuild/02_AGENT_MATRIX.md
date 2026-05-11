# Agent Execution Matrix

## Purpose
Define the pre-production agent system required for Intelligence OS + AutoBuild OS.

## Agent Table

| Agent | Phase | Purpose | Inputs | Outputs | Run Mode | Release Risk |
|---|---:|---|---|---|---|---|
| CommandCenterAgent | 1 | Load sources, verify dashboards, register system state | Drive manifest, repo docs, config | source ledger, readiness log | read/write draft | low |
| RefactorAgent | 2 | Normalize files, folders, templates, naming, duplicated systems | source ledger, legacy docs | refactor map, migration backlog | draft only | medium |
| BuildPacketAgent | 3 | Convert approved tasks into build packets | issue rows, docs, templates | build packet specs | draft only | medium |
| GPTBridgeAgent | 4 | Route prompts and context to approved model workflows | prompt library, source packets | generated draft outputs | draft only | high |
| TemplateAgent | 5 | Manage templates for Shopify, email, invoice, music, app creation, social | template catalog | reusable templates | draft only | medium |
| ShopifyWorkflowAgent | 6 | Prepare Shopify pages, product CSVs, collections, metaobject specs | product docs, templates | Shopify draft specs | draft only | high |
| SocialMediaAgent | 7 | Prepare posts, videos, captions, calendars, creative briefs | content prompts, assets | social queue specs | draft only | high |
| LeadGenAgent | 8 | Prepare free tools, forms, lead magnets, routing | forms, landing pages | lead flow specs | draft only | high |
| GitHubAgent | 9 | Manage issues, branches, PR documentation, change logs | GitHub issue specs | issue and PR plans | draft only | medium |
| VercelSandboxAgent | 10 | Define sandbox endpoints, cron schedules, dry-run behavior | deployment plan | Vercel implementation spec | doc only | medium |
| SupabaseStateAgent | 11 | Define tables, queue state, memory, logs | schema docs | state model | doc only | medium |
| ValidationAgent | 12 | Score completeness, safety, QA, source proof | all outputs | validation report | read only | low |
| SimulationAgent | 13 | Simulate user, agent, workflow, failure, recovery scenarios | scenario catalog | simulation reports | sandbox only | low |
| PredictiveAgent | 14 | Forecast bottlenecks, next best actions, launch risks | logs, metrics, simulations | predictive report | read only | medium |
| HumanBehaviorAgent | 15 | Model UX, satisfaction, clarity, accessibility, friction | user personas | usability scorecard | read only | medium |
| ReleaseGateAgent | 16 | Determine readiness to merge, publish, launch | validation, simulations, approvals | release decision | approval only | critical |

## Scheduling Model

Future implementation should use a 5-minute Vercel cron for build-cycle polling, but each agent must be idempotent and queue-aware.

## Dependency Order

```text
CommandCenterAgent
 -> RefactorAgent
 -> BuildPacketAgent
 -> GPTBridgeAgent
 -> TemplateAgent
 -> ShopifyWorkflowAgent / SocialMediaAgent / LeadGenAgent
 -> ValidationAgent
 -> SimulationAgent
 -> PredictiveAgent
 -> HumanBehaviorAgent
 -> ReleaseGateAgent
```

## Non-Blocking Rule
If an agent fails, it must write a blocker record and allow other independent agents to continue.
