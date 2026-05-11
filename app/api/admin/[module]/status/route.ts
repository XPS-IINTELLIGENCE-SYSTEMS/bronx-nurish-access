import { NextRequest, NextResponse } from "next/server";
import { ensureContentCommandTables, moduleStatus, requireAdmin, ModuleKey } from "../../../../lib/admin/content-command";

const allowed = new Set(["content", "assets", "video", "images", "chat", "scheduler", "proof", "automation"]);

export async function GET(req: NextRequest, { params }: { params: { module: string } }) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  if (!allowed.has(params.module)) return NextResponse.json({ ok: false, message: "Unknown module" }, { status: 404 });

  try {
    await ensureContentCommandTables();
    const status = await moduleStatus(params.module as ModuleKey);
    return NextResponse.json({ ok: true, ...status });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error instanceof Error ? error.message : "Status failed" }, { status: 503 });
  }
}
