# Vizual-X AutoBuild Intake Form Specification — Part 1

## Purpose

Define the exact intake form required to start the Vizual-X AutoBuild workflow. This form gathers the structured information needed to generate builder documents, discovery research, workflow specs, sandbox plans, connector requirements, and packaging instructions.

## Route Target

```text
/intelligence-os/workflows/autobuild
```

## Execute Button

```text
Execute AutoBuild Workflow
```

## Form Completion Rule

The execute button remains disabled until required fields are complete and local validation passes.

## Section 1 — Operator / Client Identity

| Field Key | Label | Type | Required |
|---|---|---|---|
| `project_name` | Project or System Name | text | yes |
| `operator_name` | Operator / Client Name | text | yes |
| `business_name` | Business / Brand Name | text | no |
| `primary_email` | Primary Email | email | no |
| `timezone` | Timezone | text | no |

## Section 2 — System Goal and Outcome

| Field Key | Label | Type | Required |
|---|---|---|---|
| `core_goal` | Exact Goal | textarea | yes |
| `doubled_goal` | Doubled Stretch Goal | textarea | no |
| `success_definition` | Definition of Success | textarea | yes |
| `primary_users` | Primary Users | textarea | yes |
| `operator_problem` | Problem the System Must Solve | textarea | yes |

## Section 3 — Business Model and Value Path

| Field Key | Label | Type | Required |
|---|---|---|---|
| `revenue_paths` | Revenue Paths | textarea | yes |
| `lead_capture_path` | Lead Capture Path | textarea | no |
| `offer_ladder` | Offer / Product Ladder | textarea | no |
| `investor_goal` | Investor or Capital Goal | textarea | no |
| `cost_constraints` | Cost Constraints | textarea | no |

## Section 4 — Workflow and Autonomy Requirements

| Field Key | Label | Type | Required |
|---|---|---|---|
| `workflow_phases` | Required Workflow Phases | textarea | yes |
| `automation_scope` | What Must Run Automatically | textarea | yes |
| `approval_scope` | What Requires Approval | textarea | no |
| `trigger_cadence` | Desired Trigger Cadence | select | yes |
| `dashboard_requirements` | Required Dashboard Modules | textarea | yes |

Allowed trigger cadence values:

```text
5_minutes
10_minutes
hourly
daily
mixed
```

## Section 5 — AI, Agents, and Intelligence Requirements

| Field Key | Label | Type | Required |
|---|---|---|---|
| `agent_roles` | Agent Roles Needed | textarea | yes |
| `chat_requirements` | Chat / Copilot Requirements | textarea | no |
| `ai_gateway_modes` | AI Gateway Modes Needed | textarea | no |
| `memory_requirements` | Memory / Reflection Requirements | textarea | no |
| `simulation_requirements` | Simulation / Test Harness Requirements | textarea | yes |
