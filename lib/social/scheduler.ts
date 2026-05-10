export type SchedulerExportRow = {
  content_id: string | number;
  campaign_id: string;
  platform: string;
  post_type: string;
  scheduled_date: string;
  scheduled_time: string;
  timezone: string;
  asset_url: string;
  thumbnail_url: string;
  caption: string;
  first_comment: string;
  hashtags: string;
  cta_url: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  approval_status: string;
  owner: string;
  notes: string;
};

export const TIMEZONE = "America/New_York";
export const CAMPAIGN_ID = "tap_the_green_bag_bronx_launch";
export const CTA_PATH = "/?utm_source={source}&utm_medium=social&utm_campaign=tap_the_green_bag_bronx_launch&utm_content={content}";
export const APP_URL = "https://bronx-nourish-access.vercel.app";

export const BLOCKED_CLAIMS = [
  "3 meals/day",
  "3 meals per day",
  "three meals per day",
  "federal-paid",
  "federal paid",
  "paid by the federal government",
  "guaranteed approval",
  "guaranteed free meals",
  "everyone qualifies",
  "84 days",
  "90 days",
  "official government program",
  "Medicaid approval guaranteed",
  "CORR proof numbers",
  "approval rates",
  "testimonials"
];

export const HASHTAGS = [
  "#BronxFoodHelp",
  "#BronxCommunity",
  "#FoodSupport",
  "#SouthBronx",
  "#BronxFamilies",
  "#TapTheGreenBag"
].join(" ");

export const BRONX_ASSET_MANIFEST = [
  {
    id: "bronx-bodega-bag",
    name: "Bronx Bodega Bag",
    campaign: "Tap the Green Bag",
    variant: "primary_icon",
    useCase: "Primary social and QR campaign icon",
    folder: "01_BRAND_ASSETS/Icons",
    folderUrl: "https://drive.google.com/drive/folders/1N0MIfGJtn1BfAY16ViAPlargaBIUUnYn",
    status: "drive_asset_required",
    assetUrl: "",
    thumbnailUrl: "",
    notes: "Use the approved Bronx Bodega Bag asset from Drive once a public/exportable URL is assigned."
  },
  {
    id: "stoop-sunrise",
    name: "Stoop Sunrise",
    campaign: "Tap the Green Bag",
    variant: "creative_variant_a",
    useCase: "Neighborhood/community trust visual for Reels, Stories, and Facebook posts",
    folder: "01_BRAND_ASSETS/Photography Direction",
    folderUrl: "https://drive.google.com/drive/folders/1WGbubLGEiTNJjoQvgwGtI56Azo6N09j4",
    status: "drive_asset_required",
    assetUrl: "",
    thumbnailUrl: "",
    notes: "Use approved or generated rights-cleared Stoop Sunrise asset only."
  },
  {
    id: "north-star-grocery",
    name: "North Star Grocery",
    campaign: "Tap the Green Bag",
    variant: "creative_variant_b",
    useCase: "Grocery/family-support visual for short-video hooks and paid ad tests",
    folder: "01_BRAND_ASSETS/Photography Direction",
    folderUrl: "https://drive.google.com/drive/folders/1WGbubLGEiTNJjoQvgwGtI56Azo6N09j4",
    status: "drive_asset_required",
    assetUrl: "",
    thumbnailUrl: "",
    notes: "Use approved or generated rights-cleared North Star Grocery asset only."
  }
];

export const PLATFORM_FOLDERS = [
  { platform: "facebook", folder: "06_SOCIAL_MEDIA_LAUNCH/Facebook", folderUrl: "https://drive.google.com/drive/folders/1rczJLYkMjBDf7ixDferI18KqJpjmOEbv" },
  { platform: "instagram", folder: "06_SOCIAL_MEDIA_LAUNCH/Instagram", folderUrl: "https://drive.google.com/drive/folders/1VnregQaeZ9ozmTDG8dMmBtM625z5721h" },
  { platform: "tiktok", folder: "06_SOCIAL_MEDIA_LAUNCH/TikTok", folderUrl: "https://drive.google.com/drive/folders/1VNCpQayG3h4M1wT6L5xUI0b2DWWR_0dj" },
  { platform: "youtube_shorts", folder: "06_SOCIAL_MEDIA_LAUNCH/YouTube Shorts", folderUrl: "https://drive.google.com/drive/folders/19ch84ryTVT_5ZszIsXFOc_0CHD2_6SjZ" },
  { platform: "linkedin", folder: "06_SOCIAL_MEDIA_LAUNCH/LinkedIn", folderUrl: "https://drive.google.com/drive/folders/1cgD6S5xdxLr96weVLZXpbUtztvhSeNvB" },
  { platform: "community_posts", folder: "06_SOCIAL_MEDIA_LAUNCH/Community Posts", folderUrl: "https://drive.google.com/drive/folders/1jdFgsMWJDvuHv3J4rmuLALUyinQp-3cx" },
  { platform: "paid_ads", folder: "06_SOCIAL_MEDIA_LAUNCH/Paid Ads", folderUrl: "https://drive.google.com/drive/folders/1VOp3yKiTt0C-6NaTZYhg_uA_oOtpLDL-" }
];

export function findBlockedClaims(text: string) {
  const lower = text.toLowerCase();
  return BLOCKED_CLAIMS.filter((claim) => lower.includes(claim.toLowerCase()));
}

export function makeCtaUrl(source: string, content: string) {
  return `${APP_URL}${CTA_PATH.replace("{source}", encodeURIComponent(source)).replace("{content}", encodeURIComponent(content))}`;
}

export function getAssetForContent(index: number) {
  return BRONX_ASSET_MANIFEST[index % BRONX_ASSET_MANIFEST.length];
}

export function scheduleSlot(index: number) {
  const today = new Date();
  const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + Math.floor(index / 6)));
  const slots = ["08:00", "10:00", "12:00", "15:00", "18:00", "20:30"];
  return {
    scheduledDate: date.toISOString().slice(0, 10),
    scheduledTime: slots[index % slots.length]
  };
}

export function platformForIndex(index: number) {
  return ["facebook", "instagram", "community_posts", "instagram", "tiktok", "facebook"][index % 6];
}

export function postTypeForPlatform(platform: string) {
  if (["instagram", "tiktok", "youtube_shorts"].includes(platform)) return "short_video";
  if (platform === "community_posts") return "community_post";
  return "feed_post";
}

export function normalizeContentRow(row: Record<string, unknown>, index: number, destination: "buffer" | "meta") : SchedulerExportRow {
  const platform = String(row.platform || platformForIndex(index)).toLowerCase() === "multi" ? platformForIndex(index) : String(row.platform || platformForIndex(index)).toLowerCase();
  const asset = getAssetForContent(index);
  const caption = String(row.caption || row.hook || "Bronx Food Help May Be Available — Check available options in 60 seconds. No payment required to check.");
  const contentId = row.id || `draft-${index + 1}`;
  const utmSource = destination === "buffer" ? platform : platform === "instagram" ? "meta_instagram" : "meta_facebook";
  const utmContent = `${asset.id}_${String(contentId)}`;
  const slot = scheduleSlot(index);

  return {
    content_id: contentId,
    campaign_id: CAMPAIGN_ID,
    platform,
    post_type: postTypeForPlatform(platform),
    scheduled_date: slot.scheduledDate,
    scheduled_time: slot.scheduledTime,
    timezone: TIMEZONE,
    asset_url: asset.assetUrl,
    thumbnail_url: asset.thumbnailUrl,
    caption,
    first_comment: "No payment required to check. English / Español. Tap the Green Bag.",
    hashtags: HASHTAGS,
    cta_url: makeCtaUrl(utmSource, utmContent),
    utm_source: utmSource,
    utm_medium: "social",
    utm_campaign: CAMPAIGN_ID,
    utm_content: utmContent,
    approval_status: String(row.approval_status || "approved"),
    owner: "Strategic Minds Advisory",
    notes: `Manual scheduler export only. Asset variant: ${asset.name}. Source folder: ${asset.folder}. No live posting performed.`
  };
}

export function toCsv(rows: SchedulerExportRow[]) {
  const headers: Array<keyof SchedulerExportRow> = [
    "content_id",
    "campaign_id",
    "platform",
    "post_type",
    "scheduled_date",
    "scheduled_time",
    "timezone",
    "asset_url",
    "thumbnail_url",
    "caption",
    "first_comment",
    "hashtags",
    "cta_url",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "approval_status",
    "owner",
    "notes"
  ];

  const escape = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [headers.join(","), ...rows.map((row) => headers.map((header) => escape(row[header])).join(","))].join("\n");
}

export const DRAFT_BATCH = [
  {
    platform: "facebook",
    language: "en",
    hook: "Tap the Green Bag: Bronx food help may be available.",
    caption: "Bronx Food Help May Be Available. Check available options in 60 seconds. No payment required to check. English / Español.",
    script: "Scene 1: Bronx bodega bag icon. Scene 2: A Bronx family kitchen moment. Scene 3: Text: Check Food Help Options. No payment required to check.",
    cta: "Check Food Help Options"
  },
  {
    platform: "instagram",
    language: "en",
    hook: "Bronx neighbors: check food help options fast.",
    caption: "Need help finding food support options in the Bronx? Check available options in 60 seconds. No payment required to check.",
    script: "Short Reel: Stoop Sunrise visual, quick text overlays, final CTA: Tap the Green Bag.",
    cta: "Tap the Green Bag"
  },
  {
    platform: "tiktok",
    language: "en",
    hook: "This Bronx food-help check takes about a minute.",
    caption: "Bronx food help may be available. Check options. No payment required to check. Share with a neighbor.",
    script: "Fast cut: groceries, phone screen, ZIP check, callback request, share prompt.",
    cta: "Check Options"
  },
  {
    platform: "facebook",
    language: "es",
    hook: "Ayuda de comida en el Bronx puede estar disponible.",
    caption: "Revise opciones disponibles de apoyo alimentario en 60 segundos. No se requiere pago para revisar. English / Español.",
    script: "Escena 1: Bolsa verde. Escena 2: Cocina familiar. Escena 3: Revisar opciones de comida.",
    cta: "Revisar opciones de comida"
  },
  {
    platform: "instagram",
    language: "es",
    hook: "Bronx: revise opciones de comida rápido.",
    caption: "Ayuda de comida en el Bronx puede estar disponible. No se requiere pago para revisar. Comparta con un vecino.",
    script: "Reel corto: visual Stoop Sunrise, texto bilingüe, CTA final: Tap the Green Bag.",
    cta: "Tap the Green Bag"
  },
  {
    platform: "community_posts",
    language: "en",
    hook: "Share this with Bronx neighbors in 10451, 10452, 10453, 10454, or 10455.",
    caption: "Bronx Food Help May Be Available. Check available options in 60 seconds. No payment required to check. Please share with neighbors who may need help finding food support options.",
    script: "Community post copy only. Use Bronx Bodega Bag primary visual.",
    cta: "Share the link"
  }
];
