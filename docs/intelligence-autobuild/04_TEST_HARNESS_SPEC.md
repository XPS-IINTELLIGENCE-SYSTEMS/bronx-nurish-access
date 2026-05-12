# Test Harness Specification

## Purpose
Define the pre-production test harness required before implementing Intelligence OS + AutoBuild OS runtime code.

## Harness Components

| Component | Purpose |
|---|---|
| Scenario Runner | Executes documented scenarios in sandbox mode |
| Agent Mock Layer | Simulates agent outputs without real external writes |
| Connector Mock Layer | Simulates Drive, GitHub, Shopify, Vercel, Supabase |
| Validation Engine | Scores outputs against pass/fail criteria |
| Report Generator | Produces simulation report and release decision |

## Test Categories

### 1. Source Integrity Tests
- Source folder is reachable.
- Source ledger is complete.
- Required source metadata exists.
- Unknown fields are marked `Could not verify`.

### 2. Agent Routing Tests
- Correct agent receives correct task type.
- Dependencies execute in order.
- Failed agent does not block unrelated agents.
- Every agent produces a log event.

### 3. Draft Safety Tests
- Shopify publish is blocked.
- GitHub main merge is blocked.
- Email send is blocked.
- Ads publish is blocked.
- Only draft outputs are allowed.

### 4. Template Coverage Tests
Required template libraries:
- Shopify pages
- Shopify collections
- product CSV
- email flows
- invoice templates
- music prompts
- social posts
- app builder prompts
- validation prompts
- simulation prompts

### 5. User Simulation Tests
- mobile user command
- owner approval path
- customer lead path
- contractor startup path
- social visitor path
- blocked product proof path

### 6. Recovery Tests
- missing secret
- missing source file
- broken link
- incomplete product row
- malformed prompt output
- failed validation
- duplicate task

## Scoring

Each simulation receives 100 points:
- Source integrity: 15
- Correct agent routing: 15
- Draft-only safety: 20
- Output completeness: 15
- Logging: 10
- Recovery/fallback: 15
- UX clarity: 10

Pass threshold: 100/100 for final readiness.

## Required Final Run
System must pass 5 consecutive simulations at 100/100 before release gate can open.

## Report Format

```json
{
  "simulation_id": "SIM-001",
  "score": 100,
  "passed": true,
  "blockers": [],
  "warnings": [],
  "agent_results": [],
  "release_recommendation": "hold_or_approve"
}
```
