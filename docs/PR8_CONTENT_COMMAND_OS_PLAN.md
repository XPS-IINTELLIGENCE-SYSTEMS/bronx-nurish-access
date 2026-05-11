# PR #8 Plan — Content Command OS

## Base
Built from validated PR #7 branch/head. PR #7 remains the safety foundation: no live posting route, no Buffer API posting route, no command execution engine, no publishing, no spend, no merge automation.

## Benchmarks
- Payload CMS: content admin, drafts, versions, scheduled publishing, jobs queue.
- Vercel Admin Dashboard: Next.js App Router, auth-protected dashboard layout, Postgres-backed admin modules, shadcn-style organization.
- Vercel AI Chatbot: AI chat, thread/message persistence, tool-call pattern, prompt history.
- Vercel AI SDK Image Generator: image job workflow and review lifecycle.
- Bronx PR #7: scheduler exports, proof logs, route protection, automation bridge, approval gates.

## Modules
- /admin/content
- /admin/assets
- /admin/video
- /admin/images
- /admin/chat
- /admin/scheduler
- /admin/proof
- /admin/automation

## APIs
Protected by ADMIN_SECRET:
- GET /api/admin/content/status
- GET /api/admin/assets/status
- GET /api/admin/video/status
- GET /api/admin/images/status
- GET /api/admin/chat/status
- GET /api/admin/scheduler/status
- GET /api/admin/proof/status
- GET /api/admin/automation/status

Queue APIs:
- POST /api/admin/content/generate
- POST /api/admin/video/create-job
- POST /api/admin/images/create-job
- POST /api/admin/proof/run-scan
- POST /api/admin/scheduler/create-package

## Tables
- bna_content_items
- bna_asset_registry
- bna_video_jobs
- bna_image_jobs
- bna_chat_threads
- bna_chat_messages
- bna_scheduler_packages
- bna_proof_checks
- bna_automation_runs
- bna_approval_events

## Output mode
Draft/export/review only. Live posting, live publishing, merging, or paid HeyGen/InVideo credit spend remains blocked unless a later explicit approval-gated implementation changes that safely.
