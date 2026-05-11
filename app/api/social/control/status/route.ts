import { NextRequest, NextResponse } from "next/server";
import { getSocialControlData } from "@/lib/social/control-data";

function authorized(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function setMissing(name: string) {
  return process.env[name] ? "set" : "missing";
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const data = getSocialControlData();

  return NextResponse.json({
    ok: true,
    mode: "connection_ready_export_only",
    livePublishing: false,
    directPublishingRoutes: false,
    secrets: {
      ADMIN_SECRET: setMissing("ADMIN_SECRET"),
      CRON_SECRET: setMissing("CRON_SECRET"),
      DATABASE_URL: setMissing("DATABASE_URL"),
      POSTGRES_URL: setMissing("POSTGRES_URL"),
      BUFFER_ACCESS_TOKEN: setMissing("BUFFER_ACCESS_TOKEN"),
      FACEBOOK_PAGE_ID: setMissing("FACEBOOK_PAGE_ID"),
      FACEBOOK_ACCESS_TOKEN: setMissing("FACEBOOK_ACCESS_TOKEN"),
      INSTAGRAM_BUSINESS_ACCOUNT_ID: setMissing("INSTAGRAM_BUSINESS_ACCOUNT_ID"),
      AI_GATEWAY_API_KEY: setMissing("AI_GATEWAY_API_KEY")
    },
    data
  });
}
