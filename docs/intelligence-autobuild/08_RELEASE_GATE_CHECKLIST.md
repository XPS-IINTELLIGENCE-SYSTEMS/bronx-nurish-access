# Release Gate Checklist

## Purpose
Define what must be true before the Intelligence OS + AutoBuild OS implementation can move from pre-production documentation into active build, staging deployment, or production release.

## Gate 1: Documentation Complete

Required files:
- 00_README.md
- 01_SYSTEM_ARCHITECTURE.md
- 02_AGENT_MATRIX.md
- 03_WORKFLOW_PLAYBOOKS.md
- 04_TEST_HARNESS_SPEC.md
- 05_SIMULATION_SCENARIOS.json
- 06_BENCHMARK_SCORECARD.md
- 07_TOOL_TEMPLATE_CATALOG.md
- 08_RELEASE_GATE_CHECKLIST.md

Pass rule: all required docs exist and are reviewed.

## Gate 2: Implementation Plan Approved

Required:
- agent build order approved
- Vercel cron behavior approved
- dry-run mode approved
- Shopify draft-only policy approved
- GitHub PR workflow approved
- Supabase schema approved

## Gate 3: Security Approved

Required:
- no secrets in source
- environment variable names documented separately
- write scopes limited
- release firewall defaults closed
- logging does not include tokens or private keys

## Gate 4: Simulation Passed

Required:
- SIM-001 through SIM-005 executed
- score: 100/100 each
- five consecutive passes completed
- no P0 or P1 blockers

## Gate 5: Human Approval

Required:
- owner approves staging implementation
- owner approves production release separately
- rollback path exists

## Final Decision Values

Allowed release states:
- HOLD
- APPROVED_FOR_IMPLEMENTATION
- APPROVED_FOR_STAGING
- APPROVED_FOR_PRODUCTION

Default state: HOLD
