export const contentCommandModules = [
  { key: "content", title: "Content Queue", path: "/admin/content", api: "/api/admin/content/status", purpose: "Draft, scan, approve, package, and track campaign content." },
  { key: "assets", title: "Asset Registry", path: "/admin/assets", api: "/api/admin/assets/status", purpose: "Control Drive assets, rights status, platform fit, and public URLs." },
  { key: "video", title: "AI Video Studio", path: "/admin/video", api: "/api/admin/video/status", purpose: "Queue HeyGen/InVideo video drafts, scripts, shot lists, and outputs." },
  { key: "images", title: "Image Studio", path: "/admin/images", api: "/api/admin/images/status", purpose: "Queue image prompts, platform ratios, generated assets, and approvals." },
  { key: "chat", title: "AI Chat Cockpit", path: "/admin/chat", api: "/api/admin/chat/status", purpose: "Operator chat, prompt history, command planning, and tool-routing records." },
  { key: "scheduler", title: "Scheduler Packages", path: "/admin/scheduler", api: "/api/admin/scheduler/status", purpose: "Create Buffer, Meta, YouTube, TikTok, Reddit, LinkedIn, and share-copy packages." },
  { key: "proof", title: "Proof Loop", path: "/admin/proof", api: "/api/admin/proof/status", purpose: "Scan claims, rights, links, approval evidence, and performance proof." },
  { key: "automation", title: "Automation Bridge", path: "/admin/automation", api: "/api/admin/automation/status", purpose: "Track GitHub/Vercel runs, cron checks, queues, and release gates." }
];

export const contentCommandKPIs = [
  { label: "Daily target", value: "2,178", note: "Ceiling outreach goal from Bronx workbook." },
  { label: "Weekly target", value: "15,244", note: "Reverse-engineered execution pressure." },
  { label: "Primary CTA", value: "Check Food Help Options", note: "Conversion action." },
  { label: "Campaign", value: "Tap the Green Bag", note: "Organic + QR + social theme." },
  { label: "Mode", value: "Connection Ready", note: "Designed to connect accounts and schedulers." },
  { label: "Validation", value: "Recursive", note: "GitHub/Vercel loop already exists." }
];

export const commandBoardLanes = [
  "Draft",
  "Pending Scan",
  "Blocked",
  "Needs Approval",
  "Approved",
  "Packaged",
  "Scheduled",
  "Reported"
];

export const productionTools = [
  { name: "Payload CMS benchmark", status: "benchmark", use: "Drafts, versions, custom admin, jobs queue model." },
  { name: "Vercel Admin benchmark", status: "benchmark", use: "Auth/Postgres/shadcn dashboard structure." },
  { name: "Vercel AI Chatbot benchmark", status: "benchmark", use: "Chat, persistence, files, tool history." },
  { name: "Vercel AI Image benchmark", status: "benchmark", use: "Image prompt and generation job structure." },
  { name: "HeyGen", status: "connected", use: "Approved video draft jobs." },
  { name: "InVideo", status: "connected", use: "Approved video draft jobs." },
  { name: "Proof Loops", status: "drive_active", use: "Evidence, claims, rights, and growth verification." },
  { name: "Buffer / Meta", status: "connection_ready", use: "Scheduler package export." }
];

export function moduleFromKey(key: string) {
  return contentCommandModules.find((module) => module.key === key);
}
