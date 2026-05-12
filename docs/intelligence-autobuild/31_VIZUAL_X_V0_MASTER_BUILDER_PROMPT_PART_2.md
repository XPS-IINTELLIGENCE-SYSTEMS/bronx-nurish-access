# Vizual-X v0 Master Builder Prompt — Part 2

## v0 Builder Prompt — Part 2

```text
DASHBOARD MODULES:

A. Daily Wealth + Intelligence Command Brief
Create a premium panel showing:
- operator goal
- doubled stretch goal
- highest ranked opportunities
- top system upgrades
- best content idea
- best digital asset idea
- risks
- next best action
- timestamp of most recent brief

B. Multi-Agent Chat Workspace
Create a large AI operations chat area designed for later wiring to Vercel AI Gateway.
Include:
- thread/history sidebar
- active room header
- selected mode pill: operator / executive assistant / agent room / workflow / briefing / diagnostic
- selected agent area
- context capsule showing active workflow, active brief, and memory source
- streaming-compatible messages
- tool result cards
- task cards
- benchmark cards
- exception cards
- composer with placeholder actions
- starter command chips

C. Horizontal Kanban Workflow Tracker
Build a high-quality horizontally scrollable Kanban board with columns:
1. Goal Intake
2. Doubled Target
3. Reverse Engineer
4. Benchmark
5. Opportunity Score
6. Asset Draft
7. Simulation
8. Validation
9. Autopilot Execute
10. Memory Archive

Each task card must show:
- title
- assigned agent
- status
- priority
- score
- risk level
- last update
- next trigger
- category badges

The Kanban should be central to the interface and visually feel operational, not decorative.

D. Agent Team Board
Show the autonomous agent team with:
- agent name
- role
- mission
- current work
- daily goal
- score
- memory focus
- status badge
- leadership ranking badge

E. Leadership / Gamification Board
Create a competitive safe leadership panel showing:
- agent ranking
- operating score
- wins
- current challenge
- leadership principle focus
- trend arrow or momentum signal

F. Opportunity Radar
Create a structured opportunity table or panel with:
- opportunity name
- score
- upside category
- revenue path
- confidence
- cost/risk
- status

G. Simulation Lab
Show:
- latest simulation score
- scenarios executed
- passes completed
- blockers
- risk warnings
- last run timestamp
- compact scenario list

H. AI in Action Media Studio
Create a workflow panel for the media sandbox with stages:
- idea
- script
- storyboard
- assets
- video
- social draft
- validation
- queue

This must look like a real media production pipeline without claiming live publishing.

I. Investor Readiness Panel
Show:
- traction proof score
- systems maturity score
- defensibility score
- capital readiness score
- missing proof checklist
- data room readiness

J. Memory & Reflection Timeline
Show a chronological feed with:
- reflection title
- what was learned
- what changed
- next system action
- time marker

K. Exception Alerts
Only show high-risk exception items:
- production release
- external publishing
- live outreach
- paid campaign
- sensitive state change
Use high clarity, low noise.

L. Trigger Monitor
Show scheduled system triggers:
- coding autonomy benchmark
- autopilot cycle
- daily command brief
- build loop trigger
Display:
- schedule
- last run
- next run
- health

M. System Health
Show:
- release gate status
- external actions status
- persistence status
- API health
- workflow health
- recent warnings

DATA BINDING READINESS:
Prepare the frontend so mock data can later be replaced by real data from these existing routes:
- /api/workflow/autopilot-cycle
- /api/intelligence/daily-command-brief
- /api/intelligence/coding-autonomy-benchmark
- /api/intelligence/frontier-benchmark
- /api/intelligence/warp-speed
- /api/agents/launch
- /api/autobuild/status
- /api/release/evaluate

COMPONENT OUTPUT REQUIREMENT:
Return a clean component structure including:
- IntelligenceOSPage
- VizualXSidebar
- RuntimeStatusStrip
- ExecutiveSummaryGrid
- DailyBriefPanel
- VizualXChatWorkspace
- WorkflowKanbanBoard
- AgentTeamBoard
- LeadershipBoard
- OpportunityRadar
- SimulationLab
- MediaStudioPanel
- InvestorReadinessPanel
- ReflectionTimeline
- ExceptionAlertsPanel
- TriggerMonitorPanel
- SystemHealthPanel
- mock data constants

FINAL QUALITY RULE:
Make this the best possible v0-generated product command center on first pass. Do not simplify. Do not reduce sections. Do not redirect to a landing page. Build the app interface.
```

## Acceptance Criteria

The v0 output is accepted only if:

1. Vizual-X appears as the white-font app wordmark in the top-left sidebar.
2. The frontend is clearly v0-quality, premium, and production-grade.
3. The interface is an operational command center, not a marketing homepage.
4. The Kanban tracker is visually central.
5. The AI Gateway-ready chat workspace is prominent.
6. The existing Intelligence OS/AutoBuild OS data contracts are preserved.
7. The output is installable into `/intelligence-os` without modifying `app/page.js`.
