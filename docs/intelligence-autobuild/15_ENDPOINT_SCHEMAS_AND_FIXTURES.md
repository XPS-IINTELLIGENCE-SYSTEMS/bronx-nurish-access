# Endpoint Schemas and Fixtures

## Purpose
Provide implementation-ready request and response examples for the future Vercel sandbox endpoints.

This document is documentation only. It adds no production runtime code or secrets.

## Global Headers

Required for protected endpoints in sandbox or higher:

```http
x-cron-secret: <configured in Vercel environment>
content-type: application/json
```

No secret values may appear in logs, responses, pull requests, issues, or docs.

## GET /api/health

Purpose: read-only deployment health.

Example response:

```json
{
  "ok": true,
  "meta": {
    "system_mode": "mock",
    "release_firewall": "closed",
    "dry_run": true,
    "draft_only": true,
    "request_id": "health-001"
  },
  "data": {
    "service": "intelligence-autobuild-sandbox",
    "status": "ready",
    "docs_version": "0.1.0"
  },
  "blockers": [],
  "warnings": [],
  "audit_event": {
    "event_type": "health.checked",
    "actor": "system",
    "message": "Health check completed."
  }
}
```

## GET /api/autobuild/status

Purpose: read current system state.

Example response:

```json
{
  "ok": true,
  "meta": {
    "system_mode": "mock",
    "release_firewall": "closed",
    "dry_run": true,
    "draft_only": true,
    "request_id": "status-001"
  },
  "data": {
    "queue": {
      "queued": 3,
      "claimed": 0,
      "blocked": 1,
      "ready_for_review": 0
    },
    "agents": {
      "enabled": 0,
      "mock_ready": 16
    },
    "release_gate": "HOLD"
  },
  "blockers": [],
  "warnings": ["Runtime not implemented. Documentation-only mode."],
  "audit_event": {
    "event_type": "status.read",
    "actor": "system",
    "message": "Sandbox status read completed."
  }
}
```

## POST /api/autobuild/dispatch

Purpose: cron-safe dispatcher entrypoint.

Example request:

```json
{
  "mode": "mock",
  "max_tasks": 1,
  "allow_writes": false,
  "source": "vercel_cron"
}
```

Required safety checks:
- release firewall must be closed during pre-production;
- mode must be mock, dry_run, or sandbox;
- `allow_writes` must be false until approved;
- task must have source proof;
- destructive actions must be refused.

Example accepted response:

```json
{
  "ok": true,
  "meta": {
    "system_mode": "mock",
    "release_firewall": "closed",
    "dry_run": true,
    "draft_only": true,
    "request_id": "dispatch-001"
  },
  "data": {
    "selected_task": {
      "id": "task-001",
      "task_title": "Prepare Shopify homepage draft spec",
      "task_type": "shopify_draft_spec",
      "assigned_agent": "ShopifyWorkflowAgent",
      "priority": 10,
      "status": "claimed",
      "payload": {
        "source_ledger_id": "source-001"
      }
    },
    "agent_name": "ShopifyWorkflowAgent",
    "result_status": "drafted",
    "validation_required": true
  },
  "blockers": [],
  "warnings": [],
  "audit_event": {
    "event_type": "dispatcher.completed",
    "actor": "vercel_cron",
    "message": "One mock task dispatched."
  }
}
```

Example refused response:

```json
{
  "ok": false,
  "meta": {
    "system_mode": "mock",
    "release_firewall": "closed",
    "dry_run": true,
    "draft_only": true,
    "request_id": "dispatch-002"
  },
  "data": {},
  "blockers": [
    {
      "code": "live_publish_blocked",
      "severity": "P0",
      "message": "Task requested a live Shopify publish action.",
      "safe_next_action": "Convert task to draft-only Shopify spec."
    }
  ],
  "warnings": [],
  "audit_event": {
    "event_type": "dispatcher.blocked",
    "actor": "vercel_cron",
    "message": "Unsafe task blocked."
  }
}
```

## POST /api/autobuild/simulate

Purpose: run documented simulation scenarios.

Example request:

```json
{
  "scenario_ids": ["SIM-001", "SIM-002", "SIM-003", "SIM-004", "SIM-005"],
  "passes": 5,
  "mode": "mock"
}
```

Example response:

```json
{
  "ok": true,
  "meta": {
    "system_mode": "mock",
    "release_firewall": "closed",
    "dry_run": true,
    "draft_only": true,
    "request_id": "simulate-001"
  },
  "data": {
    "results": [
      {
        "scenario_id": "SIM-001",
        "pass_number": 1,
        "score": 100,
        "passed": true,
        "blockers": []
      }
    ],
    "summary": {
      "passes_required": 5,
      "passes_completed": 5,
      "all_passed": true,
      "release_gate_recommendation": "HOLD_UNTIL_HUMAN_APPROVAL"
    }
  },
  "blockers": [],
  "warnings": [],
  "audit_event": {
    "event_type": "simulation.completed",
    "actor": "system",
    "message": "Mock simulation suite completed."
  }
}
```

## POST /api/autobuild/validate

Purpose: score a target output.

Example request:

```json
{
  "target_type": "agent_output",
  "target_id": "task-001",
  "validation_profile": "draft_safety"
}
```

Example response:

```json
{
  "ok": true,
  "meta": {
    "system_mode": "mock",
    "release_firewall": "closed",
    "dry_run": true,
    "draft_only": true,
    "request_id": "validate-001"
  },
  "data": {
    "score": 100,
    "passed": true,
    "p0_blockers": 0,
    "p1_blockers": 0,
    "findings": [
      {
        "check": "draft_only_policy",
        "result": "passed"
      },
      {
        "check": "secret_exposure",
        "result": "passed"
      }
    ]
  },
  "blockers": [],
  "warnings": [],
  "audit_event": {
    "event_type": "validation.passed",
    "actor": "ValidationAgent",
    "message": "Validation completed with score 100."
  }
}
```

## POST /api/release/evaluate

Purpose: evaluate the release gate without opening it by default.

Example request:

```json
{
  "gate_name": "main_release_gate",
  "requested_state": "APPROVED_FOR_IMPLEMENTATION",
  "approve": false
}
```

Example response:

```json
{
  "ok": true,
  "meta": {
    "system_mode": "mock",
    "release_firewall": "closed",
    "dry_run": true,
    "draft_only": true,
    "request_id": "release-001"
  },
  "data": {
    "current_state": "HOLD",
    "recommended_state": "APPROVED_FOR_IMPLEMENTATION",
    "can_open": false,
    "required_actions": [
      "Owner approval required",
      "Confirm 5 simulation passes",
      "Confirm zero P0/P1 blockers"
    ]
  },
  "blockers": [],
  "warnings": ["Release gate evaluation only. Gate not opened."],
  "audit_event": {
    "event_type": "release.evaluated",
    "actor": "ReleaseGateAgent",
    "message": "Release gate evaluated without approval state change."
  }
}
```

## Connector Fixture: Shopify Draft Spec

```json
{
  "connector": "ShopifyMockConnector",
  "operation": "writeDraft",
  "input": {
    "artifact_type": "page",
    "title": "Start Here",
    "handle": "start-here",
    "status": "draft"
  },
  "output": {
    "draft_id": "mock-shopify-page-start-here",
    "status": "drafted",
    "publish_blocked": true
  }
}
```

## Connector Fixture: GitHub Issue Plan

```json
{
  "connector": "GitHubMockConnector",
  "operation": "writeDraft",
  "input": {
    "artifact_type": "issue_plan",
    "title": "Implement dispatcher skeleton",
    "labels": ["implementation", "sandbox"]
  },
  "output": {
    "planned_issue": true,
    "live_issue_created": false,
    "reason": "Mock mode only"
  }
}
```

## Connector Fixture: Supabase Queue Read

```json
{
  "connector": "SupabaseMockConnector",
  "operation": "read",
  "input": {
    "table": "build_queue",
    "status": "queued",
    "limit": 1
  },
  "output": {
    "rows": [
      {
        "id": "task-001",
        "task_title": "Prepare Shopify homepage draft spec",
        "status": "queued"
      }
    ]
  }
}
```

## Endpoint Readiness Checklist

- [ ] Request schema documented.
- [ ] Response schema documented.
- [ ] Refusal behavior documented.
- [ ] Audit event included.
- [ ] No secret values in examples.
- [ ] Release gate remains closed.
- [ ] Draft-only behavior visible in fixtures.
