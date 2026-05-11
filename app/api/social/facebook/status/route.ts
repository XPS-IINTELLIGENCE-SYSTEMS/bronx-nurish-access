import { NextRequest, NextResponse } from "next/server";

function authorized(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function boolStatus(value: string | undefined) {
  return value ? "set" : "missing";
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const autoPublishAllowed = process.env.SOCIAL_AUTO_PUBLISH_ALLOWED === "true";
  const postingMode = process.env.FACEBOOK_POSTING_MODE || "draft";
  const hasPageId = Boolean(process.env.FACEBOOK_PAGE_ID);
  const hasAccessToken = Boolean(process.env.FACEBOOK_ACCESS_TOKEN);

  return NextResponse.json({
    ok: true,
    channel: "facebook",
    userConfirmedStatus: "live",
    apiAutomationStatus: hasPageId && hasAccessToken ? "configured" : "not_verified",
    autoPublishAllowed,
    postingMode,
    livePostingAvailable: autoPublishAllowed && postingMode === "live" && hasPageId && hasAccessToken,
    secrets: {
      ADMIN_SECRET: boolStatus(process.env.ADMIN_SECRET),
      FACEBOOK_PAGE_ID: boolStatus(process.env.FACEBOOK_PAGE_ID),
      FACEBOOK_ACCESS_TOKEN: boolStatus(process.env.FACEBOOK_ACCESS_TOKEN),
      SOCIAL_AUTO_PUBLISH_ALLOWED: process.env.SOCIAL_AUTO_PUBLISH_ALLOWED || "false",
      FACEBOOK_POSTING_MODE: postingMode
    },
    safety: {
      exposesSecrets: false,
      livePostingRouteExists: false,
      exportOnly: true,
      note: "This endpoint reports configuration status only and never publishes to Facebook."
    }
  });
}
