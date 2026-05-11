import { NextRequest, NextResponse } from "next/server";
import { getContentCommandCounts, getSql, ensureContentCommandTables } from "./schema";
import { moduleFromKey } from "./control";

export function requireAdmin(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function moduleStatus(req: NextRequest, key: string) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const module = moduleFromKey(key);
  if (!module) {
    return NextResponse.json({ ok: false, message: "Unknown module" }, { status: 404 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ ok: false, module, message: "Database env missing" }, { status: 503 });
  }

  await ensureContentCommandTables(sql);
  const counts = await getContentCommandCounts(sql);

  return NextResponse.json({
    ok: true,
    module,
    initialized: true,
    mode: "content_command_os",
    counts,
    secrets: {
      ADMIN_SECRET: process.env.ADMIN_SECRET ? "set" : "missing",
      DATABASE_URL: process.env.DATABASE_URL ? "set" : "missing",
      POSTGRES_URL: process.env.POSTGRES_URL ? "set" : "missing",
      AI_GATEWAY_API_KEY: process.env.AI_GATEWAY_API_KEY ? "set" : "missing",
      BUFFER_ACCESS_TOKEN: process.env.BUFFER_ACCESS_TOKEN ? "set" : "missing",
      FACEBOOK_PAGE_ID: process.env.FACEBOOK_PAGE_ID ? "set" : "missing",
      INSTAGRAM_BUSINESS_ACCOUNT_ID: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID ? "set" : "missing"
    }
  });
}

export async function seedRun(req: NextRequest, runType: string, evidence: Record<string, unknown>) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  if (!sql) return NextResponse.json({ ok: false, message: "Database env missing" }, { status: 503 });
  await ensureContentCommandTables(sql);

  const runKey = `${runType}_${Date.now()}`;
  const inserted = await sql`
    insert into bna_automation_runs (run_key, run_type, status, evidence, notes)
    values (${runKey}, ${runType}, 'queued', ${JSON.stringify(evidence)}::jsonb, 'Queued by Content Command OS')
    returning id, run_key, run_type, status, created_at
  `;

  return NextResponse.json({ ok: true, run: inserted[0] }, { status: 201 });
}
