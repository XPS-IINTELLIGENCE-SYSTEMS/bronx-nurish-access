# Simulation Pass Criteria

## Purpose
Define how mock connector simulations must pass before the Vercel sandbox can move from documentation to implementation.

This is documentation only. No runtime code, secrets, or production actions are included.

## Required Simulation Runs

The system must pass these scenarios:

| Scenario | Name | Required Score |
|---|---|---:|
| SIM-001 | Mobile owner command creates build packet | 100 |
| SIM-002 | Shopify workflow draft without publish | 100 |
| SIM-003 | Social media queue draft generation | 100 |
| SIM-004 | Missing source proof fallback | 100 |
| SIM-005 | Full release gate dry run | 100 |

Required total:
- 5 scenarios
- 5 consecutive full-suite passes
- 25 successful scenario executions
- zero P0 blockers
- zero P1 blockers

## Universal Pass Criteria

Each scenario must satisfy:

- [ ] Source proof exists or missing proof is marked `Could not verify`.
- [ ] Correct agent is selected.
- [ ] Correct mock connector is used.
- [ ] Standard response shape is returned.
- [ ] Audit event is produced.
- [ ] Destructive actions are refused.
- [ ] Release gate remains closed.
- [ ] Safe next action is provided for blockers.
- [ ] No secrets appear in output.
- [ ] User-facing status is mobile-readable.

## Scoring Model

Each scenario is scored out of 100:

| Category | Points |
|---|---:|
| Source integrity | 15 |
| Agent routing | 15 |
| Mock connector response | 15 |
| Draft-only safety | 20 |
| Logging and audit event | 10 |
| Recovery and blocker handling | 15 |
| UX clarity | 10 |

A score below 100 fails the scenario.

## SIM-001 Pass Criteria

Mobile owner command creates build packet.

Must prove:
- owner mobile command is accepted as request context;
- task is converted into build packet;
- CommandCenterAgent or BuildPacketAgent is selected;
- no production code is generated;
- audit event exists;
- release remains HOLD.

Automatic fail if:
- a live write is attempted;
- missing proof is ignored;
- secret appears;
- no build packet is produced.

## SIM-002 Pass Criteria

Shopify workflow draft without publish.

Must prove:
- ShopifyWorkflowAgent is selected;
- ShopifyMockConnector is used;
- page/product/collection output is draft-only;
- live publish is refused;
- unverified product fields are marked `Could not verify`.

Automatic fail if:
- product is marked live;
- pricing/specs are approved without source proof;
- Shopify publish appears as allowed.

## SIM-003 Pass Criteria

Social media queue draft generation.

Must prove:
- SocialMediaAgent and LeadGenAgent are selected;
- SocialSchedulerMockConnector is used;
- posts are drafts only;
- CTA route exists;
- publishing and paid ads are refused.

Automatic fail if:
- social post is published;
- paid ad is launched;
- automated direct messaging is allowed;
- income or safety claim is unsupported.

## SIM-004 Pass Criteria

Missing source proof fallback.

Must prove:
- ValidationAgent identifies missing proof;
- `Could not verify` marker is applied;
- blocker record is created;
- safe next action is present;
- release gate remains closed.

Automatic fail if:
- missing proof is treated as approved;
- release gate opens;
- product or claim is allowed live.

## SIM-005 Pass Criteria

Full release gate dry run.

Must prove:
- SimulationAgent runs all scenarios;
- PredictiveAgent summarizes risks;
- HumanBehaviorAgent checks UX clarity;
- ReleaseGateAgent evaluates but does not open release;
- 5 of 5 passes are recorded.

Automatic fail if:
- release opens without owner approval;
- any P0/P1 blocker remains;
- simulation count is less than required;
- status is unclear for mobile user.

## Final Report Shape

```json
{
  "suite": "mock_connector_vercel_sandbox",
  "passes_required": 5,
  "passes_completed": 5,
  "scenario_executions": 25,
  "all_scores": 100,
  "p0_blockers": 0,
  "p1_blockers": 0,
  "release_gate": "HOLD",
  "recommendation": "APPROVED_FOR_IMPLEMENTATION_AFTER_OWNER_REVIEW"
}
```

## Approval Rule

Passing simulations does not equal production approval.

Passing simulations only allows:
- implementation of mock connector layer;
- implementation of sandbox endpoint skeleton;
- implementation of validation runner;
- implementation of simulation runner.

Production deployment remains blocked until separate owner approval.
