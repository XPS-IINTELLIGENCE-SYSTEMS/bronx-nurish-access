import { NextRequest, NextResponse } from "next/server";
import { ensureContentCommandTables, moduleStatus, requireAdmin, ModuleKey } from "../../../../../lib/admin/content-command";

const allowed = new Set(["content", "assets", "video", "images", "chat", "scheduler", "proof", "automation"]);

type RouteContext = {
  params: Promise<{ module: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const params = await context.params;
  if (!allowed.has(params.module)) return NextResponse.json({ ok: false, message: "Unknown module" }, { status: 404 });

  try {
    await ensureContentCommandTables();
    const status = await moduleStatus(params.module as ModuleKey);
    return NextResponse.json({ ok: true, ...status });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error instanceof Error ? error.message : "Status failed" }, { status: 503 });
  }
}
