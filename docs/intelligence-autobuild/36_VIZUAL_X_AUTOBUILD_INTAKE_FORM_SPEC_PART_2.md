# Vizual-X AutoBuild Intake Form Specification — Part 2

## Section 6 — Discovery and Browser Research

| Field Key | Label | Type | Required |
|---|---|---|---|
| `competitors_or_benchmarks` | Systems / Competitors to Benchmark | textarea | no |
| `source_domains` | Preferred Source Domains | textarea | no |
| `industry_research_topics` | Research Topics | textarea | yes |
| `must_verify_facts` | Facts That Must Be Verified | textarea | no |

## Section 7 — Vercel Runtime Requirements

| Field Key | Label | Type | Required |
|---|---|---|---|
| `workflow_required` | Use Vercel Workflow | boolean | yes |
| `sandbox_required` | Use Vercel Sandbox | boolean | yes |
| `agents_required` | Use Vercel-Agent-Compatible Architecture | boolean | yes |
| `cron_required` | Use Vercel Cron | boolean | yes |
| `ai_gateway_required` | Use Vercel AI Gateway | boolean | yes |

## Section 8 — Connectors, APIs, and Environment Variables

| Field Key | Label | Type | Required |
|---|---|---|---|
| `required_connectors` | Required Connectors | textarea | no |
| `external_apis` | External APIs | textarea | no |
| `database_requirements` | Database / Persistence Requirements | textarea | no |
| `env_requirements` | Expected Environment Variables | textarea | no |
| `safety_constraints` | Safety / Release Constraints | textarea | yes |

## Section 9 — Packaging and Handoff

| Field Key | Label | Type | Required |
|---|---|---|---|
| `package_type` | Package Type | select | yes |
| `documentation_depth` | Documentation Depth | select | yes |
| `handoff_expectations` | Handoff Expectations | textarea | no |

Allowed `package_type` values:

```text
repo_package
client_spec_package
deployment_package
all
```

Allowed `documentation_depth` values:

```text
standard
enterprise
faang_grade
```

## Required Validation Rules

### Required Inputs

The workflow must block execution if any required field is empty.

### Recommended Minimum Text Lengths

- `core_goal`: 25 characters
- `success_definition`: 25 characters
- `primary_users`: 10 characters
- `operator_problem`: 25 characters
- `revenue_paths`: 10 characters
- `workflow_phases`: 10 characters
- `automation_scope`: 10 characters
- `dashboard_requirements`: 10 characters
- `agent_roles`: 10 characters
- `simulation_requirements`: 10 characters
- `industry_research_topics`: 10 characters
- `safety_constraints`: 10 characters

## Submission Object Shape

```json
{
  "template_id": "vizual-x-autobuild-template-v1",
  "submitted_at": "ISO_TIMESTAMP",
  "operator_identity": {},
  "system_goal": {},
  "business_and_revenue": {},
  "workflow_and_autonomy": {},
  "ai_and_agents": {},
  "research_and_discovery": {},
  "vercel_and_runtime": {},
  "connectors_and_environment": {},
  "packaging_and_handoff": {}
}
```

## Form-to-Output Mapping

| Form Section | Downstream Output |
|---|---|
| identity | project header, package metadata |
| goal | system objective, spec summary |
| business | value path, revenue path, investor sections |
| workflow | process map, Kanban, crons |
| AI/agents | agent matrix, Gateway spec, memory system |
| discovery | browser discovery plan, benchmark brief |
| Vercel | workflow/sandbox/agents/cron spec |
| connectors/env | connector map, secrets checklist, env table |
| packaging | package manifest, handoff report |

## Vizual-X UX Requirements

The form should appear as a premium workflow-start experience, not a raw HTML page. Required UI elements:

- section progress indicator;
- validation state badges;
- completion percentage;
- required-field markers;
- side summary of completed sections;
- bottom execute area with the Execute AutoBuild Workflow button;
- pre-execution summary card.
