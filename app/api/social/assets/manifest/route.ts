import { NextRequest, NextResponse } from "next/server";
import { BRONX_ASSET_MANIFEST, PLATFORM_FOLDERS } from "@/lib/social/scheduler";

function authorized(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    project: "Bronx Nourish Access",
    campaign: "Tap the Green Bag",
    primaryIcon: "Bronx Bodega Bag",
    creativeVariants: ["Stoop Sunrise", "North Star Grocery"],
    sourceMode: "drive_manifest_reference_only",
    exposesSecrets: false,
    assets: BRONX_ASSET_MANIFEST,
    platformFolders: PLATFORM_FOLDERS,
    nextAction: "Assign approved public/exportable asset URLs from Drive before scheduler upload."
  });
}
