# Autopilot Daily Command Brief System

## Objective

Transform Jeremy's method into a repeatable, triggered, programmatic 24/7 workflow that does not rely on AI as the system itself. AI can be used as a worker later, but this layer is coded, scheduled, scored, stored, and gated.

## Operator Method

Goal -> Doubled Stretch Goal -> Benchmark -> Simulate -> Score -> Reflect -> Queue Next Step -> Alert Only on Exception

## Installed Files

- `src/workflow/autonomyPolicy.js`
- `src/workflow/orchestrator.js`
- `src/intelligence/dailyCommandBrief.js`
- `src/intelligence/dailyBriefStore.js`
- `src/intelligence/financialDataSources.js`
- `app/api/workflow/autopilot-cycle/route.js`
- `app/api/intelligence/daily-command-brief/route.js`
- `app/intelligence/daily-command-brief/page.js`

## Postgres Tables Created By Runtime

- `daily_briefs`
- `opportunity_scores`
- `benchmark_results`
- `memory_reflections`
- `approval_requests`

## Triggers

`vercel.json` schedules:

```json
[
  {
    "path": "/api/intelligence/coding-autonomy-benchmark",
    "schedule": "*/10 * * * *"
  },
  {
    "path": "/api/workflow/autopilot-cycle",
    "schedule": "*/10 * * * *"
  },
  {
    "path": "/api/intelligence/daily-command-brief",
    "schedule": "0 5 * * *"
  }
]
```

## Autopilot Behavior

Auto-runs safe internal work:

- benchmark systems
- run simulations
- score opportunities
- write memory reflections
- generate daily briefs
- rank ideas
- paper-trade simulation
- draft internal tasks

Escalates only high-risk exceptions:

- production release
- public publishing
- real outreach
- paid campaigns
- live financial execution
- regulated claims
- credential or secret changes
- destructive repo changes

## Financial Data Sandbox

`financialDataSources.js` defines free/public data sources for agents:

- CoinGecko Simple Price API
- Stooq public CSV quotes
- FRED public economic data plan
- SEC Company Facts public API plan

Rules:

- sandbox research only
- no live trading
- no personalized financial advice
- no return guarantees
- sources and timestamps must be recorded

## Release State

- `release_gate`: `HOLD`
- `external_actions_taken`: `false`
- no public publishing
- no production mutation
- no live trading

## Verification Plan

1. Verify latest Vercel deployment after commit `22e6255aba7f325b9eda60a35aae212777e31741`.
2. Test `/api/workflow/autopilot-cycle`.
3. Test `/api/intelligence/daily-command-brief`.
4. Test `/intelligence/daily-command-brief`.
5. Confirm Postgres persistence.
6. Confirm `release_gate: HOLD`.
7. Confirm `external_actions_taken: false`.
8. Confirm financial data is sandbox-labeled.
