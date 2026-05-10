export type SystemModule = {
  id: string;
  name: string;
  sourceWorkbook: string;
  purpose: string;
  productionUse: string;
  status: "active" | "draft" | "blocked" | "disconnected" | "manual";
  blocker?: string;
  releaseGate: string;
};

export type ChecklistItem = {
  id: string;
  area: string;
  item: string;
  status: "pass" | "warn" | "blocked" | "manual";
  severity: "P0" | "P1" | "P2";
  nextAction: string;
};

export const WORKBOOK_SOURCES = [
  {
    file: "SWF_Universal_AutoBuild_Workbook_OS_Content_Media_Integrated.xlsx",
    role: "Master AutoBuild command OS for project control, workflow, GitHub, Vercel, Drive, Apps Script, agents, command queue, content, media, QA, and production gates."
  },
  {
    file: "ultimate_universal_digital_asset_workbook_os_PIXEL_LOCK_CEILING_FINAL.xlsx",
    role: "Pixel-lock digital asset OS for source rights, client normalization, prompt library, asset manifest, platform dimensions, approval matrix, export tree, and QA release firewall."
  },
  {
    file: "universal_digital_asset_workbook_os_v2_discovery_first.xlsx",
    role: "Discovery-first asset workbook requiring source ingestion before operator questions, asset manifest, GPT bridge commands, and regulated commerce firewall."
  },
  {
    file: "universal_digital_asset_workbook_os.xlsx",
    role: "Base universal digital asset workbook for logo, social, Shopify, Google Workspace, GitHub/Vercel/Supabase, prompts, QA, and handoff packets."
  },
  {
    file: "universal_ai_video_creation_workbook_os_FINAL.xlsx",
    role: "AI video creation OS for discovery, rights ledger, mode routing, prompt library, storyboard, voiceover, captions, export specs, automation bridge, approval, QA, and handoff."
  }
];

export const SAFE_CLAIMS = [
  "Bronx Food Help May Be Available",
  "Check available food help options",
  "No payment required to check",
  "A team member may follow up with available next steps",
  "We do not ask for SSNs, Medicaid IDs, case numbers, immigration status, diagnoses, or private documents"
];

export const BLOCKED_CLAIMS = [
  "3 meals per day",
  "federal government pays",
  "guaranteed approval",
  "guaranteed free meals",
  "official government program",
  "84 days",
  "90 days",
  "everyone qualifies",
  "Medicaid approval guaranteed",
  "CORR proof numbers",
  "approval rates",
  "testimonials"
];

export const SYSTEM_MODULES: SystemModule[] = [
  {
    id: "source-ledger",
    name: "Source Rights Ledger",
    sourceWorkbook: "Digital Asset OS + Video OS",
    purpose: "Track every external site, asset, image, logo, testimonial, claim, and generated asset source.",
    productionUse: "Blocks protected or unverified materials from being used in Bronx public assets.",
    status: "active",
    releaseGate: "Every source must be owned, licensed, generated, public-domain, or marked Could not verify."
  },
  {
    id: "discovery-first-control",
    name: "Discovery-First Control",
    sourceWorkbook: "universal_digital_asset_workbook_os_v2_discovery_first.xlsx",
    purpose: "Require source inspection before asking the operator repeated questions.",
    productionUse: "Uses Drive, GitHub, Vercel, uploaded workbooks, repo docs, and live app status as first evidence.",
    status: "active",
    releaseGate: "Missing facts must be marked Could not verify."
  },
  {
    id: "autobuild-command-os",
    name: "AutoBuild Command OS",
    sourceWorkbook: "SWF_Universal_AutoBuild_Workbook_OS_Content_Media_Integrated.xlsx",
    purpose: "Coordinate project checklist, workflow, accounts, tools, GitHub, Vercel, Drive, Apps Script, tasks, calendar, Gmail, agents, and command queue.",
    productionUse: "Turns Bronx into a controlled build system rather than a one-off page.",
    status: "active",
    releaseGate: "No publish, merge, send, deploy, or automation without explicit approval and QA gates."
  },
  {
    id: "asset-manifest",
    name: "Digital Asset Manifest",
    sourceWorkbook: "ultimate_universal_digital_asset_workbook_os_PIXEL_LOCK_CEILING_FINAL.xlsx",
    purpose: "Define logo, brand, Shopify, social, print, video, QR, open graph, icon, and handoff assets.",
    productionUse: "Creates upload-ready Bronx asset requirements without claiming assets already exist.",
    status: "manual",
    blocker: "Actual final image/video asset files require operator approval or generation.",
    releaseGate: "Each asset needs filename, format, size, owner/source, alt text, approval, and QA result."
  },
  {
    id: "video-os",
    name: "AI Video Creation OS",
    sourceWorkbook: "universal_ai_video_creation_workbook_os_FINAL.xlsx",
    purpose: "Generate storyboard, script, shot list, caption, platform specs, and video prompt packs.",
    productionUse: "Supports vertical social clips, QR campaign videos, community outreach videos, and shareable WhatsApp/SMS scripts.",
    status: "draft",
    blocker: "No connected social account and no auto-publish approval.",
    releaseGate: "Video drafts require rights check, claim scan, human approval, and platform export specs."
  },
  {
    id: "social-growth-os",
    name: "Social Growth OS",
    sourceWorkbook: "SWF Social Media + Video OS",
    purpose: "Plan 90-day content, captions, hooks, UTM links, approval queue, and blocked-claim scans.",
    productionUse: "Can generate drafts and campaign packages, but not post automatically.",
    status: "disconnected",
    blocker: "No connected social media account confirmed by operator.",
    releaseGate: "Manual posting or account connection required. Auto-publish remains disabled."
  },
  {
    id: "approval-decision-matrix",
    name: "Approval Decision Matrix",
    sourceWorkbook: "Pixel Lock Workbook",
    purpose: "Lock visual directions, asset concepts, platform packages, source rights, and release decisions.",
    productionUse: "Prevents design drift and unauthorized launch changes.",
    status: "active",
    releaseGate: "Jeremy approval required before final release, publishing, paid ads, or automated posting."
  },
  {
    id: "qa-release-firewall",
    name: "QA Release Firewall",
    sourceWorkbook: "All uploaded workbook systems",
    purpose: "Score source rights, claims, form behavior, accessibility, platform specs, social readiness, and rollback path.",
    productionUse: "Separates draft/demo state from production-safe launch state.",
    status: "active",
    releaseGate: "Critical blockers must equal zero before scale."
  }
];

export const PRODUCTION_CHECKLIST: ChecklistItem[] = [
  {
    id: "P0-001",
    area: "Security",
    item: "Admin summary endpoint deny-by-default",
    status: "pass",
    severity: "P0",
    nextAction: "Keep ADMIN_SECRET set before using protected operational endpoints."
  },
  {
    id: "P0-002",
    area: "Security",
    item: "Cron endpoints deny-by-default",
    status: "blocked",
    severity: "P0",
    nextAction: "Set CRON_SECRET in Vercel so scheduled content/proof/report routes can run securely."
  },
  {
    id: "P0-003",
    area: "Social",
    item: "Social media accounts connected",
    status: "blocked",
    severity: "P0",
    nextAction: "Use manual posting/export queue until Facebook/Instagram/TikTok/YouTube accounts are connected and approved."
  },
  {
    id: "P0-004",
    area: "Compliance",
    item: "Blocked claims excluded from public copy",
    status: "pass",
    severity: "P0",
    nextAction: "Continue using may-qualify language only."
  },
  {
    id: "P0-005",
    area: "Compliance",
    item: "Sponsor, payer, meal quantity, and program name verified",
    status: "blocked",
    severity: "P0",
    nextAction: "Do not claim 3 meals/day, 84 days, 90 days, federal payment, or guaranteed approval until written source is approved."
  },
  {
    id: "P1-001",
    area: "Content",
    item: "Video/storyboard/content prompt packs integrated",
    status: "pass",
    severity: "P1",
    nextAction: "Generate drafts only; route through proof loop and human approval."
  },
  {
    id: "P1-002",
    area: "Assets",
    item: "Digital asset manifest integrated",
    status: "manual",
    severity: "P1",
    nextAction: "Generate or upload actual approved assets; assign source rights and approval status."
  },
  {
    id: "P1-003",
    area: "Privacy",
    item: "Privacy policy and consent language verified",
    status: "blocked",
    severity: "P0",
    nextAction: "Add or verify privacy policy before traffic scale."
  },
  {
    id: "P1-004",
    area: "Operations",
    item: "Manual QR/flyer/partner outreach path ready",
    status: "pass",
    severity: "P1",
    nextAction: "Use UTM-tagged direct links while social accounts are disconnected."
  }
];

export function getSystemRegistry() {
  return {
    ok: true,
    project: "Bronx Nourish Access",
    operatingMode: "draft-controlled-production-system",
    socialAccounts: "disconnected",
    autoPublishAllowed: false,
    publishAllowed: false,
    workbookSources: WORKBOOK_SOURCES,
    modules: SYSTEM_MODULES,
    safeClaims: SAFE_CLAIMS,
    blockedClaims: BLOCKED_CLAIMS,
    checklist: PRODUCTION_CHECKLIST
  };
}
