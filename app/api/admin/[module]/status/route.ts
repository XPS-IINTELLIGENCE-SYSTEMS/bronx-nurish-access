import { NextRequest, NextResponse } from "next/server";
import { moduleStatus } from "@/lib/content-command/api";

const allowed = new Set(["content", "assets", "video", "images", "chat", "scheduler", "proof", "automation"]);

type RouteContext = {
  params: Promise<{ module: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  const params = await context.params;
  if (!allowed.has(params.module)) {
    return NextResponse.json({ ok: false, message: "Unknown module" }, { status: 404 });
  }

  return moduleStatus(req, params.module);
}
