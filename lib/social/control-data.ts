export const socialPlatforms = [
  {
    id: "facebook_page",
    name: "Facebook Page",
    priority: "P0",
    status: "user_confirmed_live",
    role: "Immediate Bronx launch channel for feed posts, Reels, community sharing, and Meta Business Suite scheduling.",
    scheduler: "Meta Business Suite export",
    mode: "export_only",
    notes: "API automation requires later credential verification and explicit publishing approval."
  },
  {
    id: "instagram_business",
    name: "Instagram Business",
    priority: "P0",
    status: "needs_connection_verification",
    role: "Reels, Stories, carousel posts, bilingual short-form hooks, and Meta cross-posting.",
    scheduler: "Meta Business Suite or Buffer export",
    mode: "export_only",
    notes: "Connect Instagram Professional/Business account to the Facebook Page."
  },
  {
    id: "tiktok",
    name: "TikTok",
    priority: "P1",
    status: "planned",
    role: "High-volume vertical video testing using food-help hooks, street-level share prompts, and neighborhood ZIP targeting.",
    scheduler: "Buffer export",
    mode: "export_only",
    notes: "Direct TikTok posting remains later-phase only."
  },
  {
    id: "youtube_shorts",
    name: "YouTube Shorts",
    priority: "P1",
    status: "planned",
    role: "Evergreen Bronx food-help explainer clips and bilingual shareable videos.",
    scheduler: "Buffer export or manual upload package",
    mode: "export_only",
    notes: "Use Drive-exported video files, captions, and safe CTAs."
  },
  {
    id: "reddit",
    name: "Reddit",
    priority: "P2",
    status: "manual_review_only",
    role: "Community listening and careful non-spam posting only where rules permit.",
    scheduler: "Manual community queue",
    mode: "manual_only",
    notes: "Use subreddit rules and community-value posts."
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    priority: "P2",
    status: "planned",
    role: "Partner outreach and healthcare-adjacent community credibility posts.",
    scheduler: "Buffer export",
    mode: "export_only",
    notes: "Use for partner visibility, not recipient pressure."
  }
];

export const contentTools = [
  {
    id: "drive_assets",
    name: "Google Drive Assets",
    status: "user_confirmed_assets_uploaded",
    purpose: "Use Bronx photos, logos, icons, QR/flyer assets, and digital asset workbooks as the source library."
  },
  {
    id: "invideo",
    name: "InVideo",
    status: "connector_available",
    purpose: "Generate approved vertical video drafts from safe Bronx scripts and Drive asset references."
  },
  {
    id: "heygen",
    name: "HeyGen",
    status: "connected_verified",
    purpose: "Create bilingual explainer/avatar/video-agent drafts for Bronx food-help campaign."
  },
  {
    id: "proof_loops",
    name: "Proof Loops",
    status: "planned_for_integration",
    purpose: "Scan claims, approvals, source rights, links, scheduler output, and performance evidence."
  },
  {
    id: "buffer",
    name: "Buffer Scheduler",
    status: "optional_next_connection",
    purpose: "One scheduler layer for Facebook, Instagram, TikTok, YouTube Shorts, LinkedIn, and other channels."
  }
];

export const safeVideoPrompts = [
  {
    id: "bronx-bodega-bag-reel",
    title: "Bronx Bodega Bag Reel",
    platforms: "Instagram, TikTok, YouTube Shorts",
    prompt: "Create a 15-second vertical draft for Bronx Nourish Access. Use Tap the Green Bag. Safe claims only: Bronx Food Help May Be Available; Check available food help options; No payment required to check; English / Español. CTA: Check Food Help Options. Visual direction: Bronx Bodega Bag icon, groceries, phone screen, Bronx neighborhood feel."
  },
  {
    id: "stoop-sunrise-trust",
    title: "Stoop Sunrise Trust Clip",
    platforms: "Facebook, Instagram",
    prompt: "Create a warm 20-second social draft for Bronx residents. Visual direction: Stoop Sunrise, neighbor-to-neighbor help, mobile-first text overlays. Message: Food help may be available in the Bronx. Check options in 60 seconds. No payment required to check. English / Español."
  },
  {
    id: "north-star-grocery-share",
    title: "North Star Grocery Share Prompt",
    platforms: "Facebook, Community Posts, WhatsApp/SMS",
    prompt: "Create a shareable Bronx community post and short video draft using North Star Grocery creative direction. Focus on sharing with neighbors in 10451, 10452, 10453, 10454, and 10455. Safe CTA: Tap the Green Bag. No guarantees. No sensitive data requested."
  }
];

export const launchGates = [
  { id: "recursive-validation", label: "Recursive validation", status: "pass", description: "Bronx PR7 validation passed non-mutating checks." },
  { id: "scheduler-export", label: "Scheduler export", status: "pass", description: "Buffer and Meta export routes exist and are protected." },
  { id: "claim-firewall", label: "Claim firewall", status: "pass", description: "Blocked claims are scanned during generation/export." },
  { id: "live-publishing", label: "Live publishing", status: "blocked", description: "Live publishing remains disabled until explicit approval." },
  { id: "asset-urls", label: "Public asset URLs", status: "warn", description: "Drive assets need approved public/exportable URLs before scheduler upload." },
  { id: "facebook-api", label: "Facebook API verification", status: "warn", description: "Facebook Page is user-confirmed live; API details are not verified yet." }
];

export function getSocialControlData() {
  return {
    project: "Bronx Nourish Access",
    campaign: "Tap the Green Bag",
    primaryIcon: "Bronx Bodega Bag",
    creativeVariants: ["Stoop Sunrise", "North Star Grocery"],
    socialPlatforms,
    contentTools,
    safeVideoPrompts,
    launchGates
  };
}
