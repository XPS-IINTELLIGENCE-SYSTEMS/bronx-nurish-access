# Vizual-X AI Gateway Chat Specification

## Product Name

**Vizual-X**

## Purpose

Define the chat layer for the v0-benchmarked Vizual-X frontend while preserving the existing Intelligence OS and AutoBuild OS runtime already present on the `autonomous-gpt-bridge` branch.

## Operator Direction

- Use the v0.app frontend benchmark system as the design standard.
- Name the frontend **Vizual-X**.
- Use a **white-font Vizual-X logo** at the top-left of the app shell.
- Do not replace the existing public homepage.
- Do not rebuild the backend architecture.
- Use **Vercel AI Gateway** as the model access layer for chat.

## Chat Role in Vizual-X

The Vizual-X chat surface is not a standalone chatbot. It is the conversational command layer for:

- Intelligence OS;
- AutoBuild OS;
- autonomous-gpt-bridge branch system;
- agent launch invocations;
- daily command briefs;
- workflow state;
- benchmark results;
- simulation results;
- exception alerts.

## Required Chat Modes

| Mode | Purpose |
|---|---|
| `operator` | Jeremy directly commands the system |
| `executive_assistant` | Executive assistant mode |
| `agent_room` | Multi-agent collaboration thread |
| `workflow` | Chat in context of a workflow card or phase |
| `briefing` | Chat with daily command brief context |
| `diagnostic` | System health, release gate, cron, logs |

## Frontend Chat Features

The v0 frontend must provide:

- thread sidebar;
- active conversation title;
- selected mode or agent pill;
- context capsule;
- streaming-compatible message list;
- tool/result card areas;
- benchmark summary cards;
- workflow card embeds;
- approval or exception cards;
- prompt composer;
- attachment placeholder area;
- starter prompts;
- empty, loading, error, and retry states.

## Recommended Server Route

```text
/api/chat/vizual-x
```

## Request Contract

```json
{
  "threadId": "thread-id",
  "mode": "operator",
  "agentId": "optional-agent-id",
  "messages": [],
  "context": {
    "briefId": "optional-brief-id",
    "workflowId": "optional-workflow-id",
    "taskId": "optional-task-id",
    "simulationId": "optional-simulation-id"
  }
}
```

## Response Contract

The route should be streaming-compatible and support:

- assistant text chunks;
- structured tool-result blocks;
- structured task cards;
- benchmark cards;
- exception cards;
- metadata envelope;
- retry-safe errors.

## AI Gateway Requirement

Use Vercel AI Gateway as the model abstraction layer so Vizual-X can route across approved models without hardcoding a single provider path in the frontend.

## Environment Contract

The implementation should support an approved server-side gateway credential pattern and must not expose secrets client-side.

Recommended naming:

```text
AI_GATEWAY_API_KEY
```

Any alternate Vercel-managed gateway auth path must remain server-side.

## Model Routing Intent

| Route | Use |
|---|---|
| fast | summaries, triage, brief clarification |
| deep | complex synthesis and planning |
| code | repo and implementation discussions |
| research | source-aware analysis where enabled |
| media | content/video workflow assistance where enabled |

## Context Sources to Inject Server-Side

- `/api/workflow/autopilot-cycle` results;
- `/api/intelligence/daily-command-brief` results;
- `/api/intelligence/coding-autonomy-benchmark` results;
- `/api/intelligence/frontier-benchmark` results;
- `/api/agents/launch` results;
- `/api/autobuild/status` results;
- `/api/release/evaluate` results.

## Safety and Runtime Preservation

The chat layer must preserve:

- `release_gate: HOLD` where applicable;
- exception-only operator review logic;
- no public homepage override;
- no fabricated metrics;
- no secret exposure;
- no unauthorized production mutation.

## Acceptance Criteria

This spec is complete only when:

1. Vizual-X chat is defined as the system command layer.
2. Vercel AI Gateway is the model-access standard.
3. Existing Intelligence OS and AutoBuild OS routes remain the system data sources.
4. The app shell retains the v0 benchmark design standard.
5. The white-font Vizual-X brand placement is explicit.
