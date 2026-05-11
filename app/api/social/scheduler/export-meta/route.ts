import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { findBlockedClaims, normalizeContentRow, toCsv } from "@/lib/social/scheduler";

function authorized(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function db() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
}

function isMetaPlatform(value: unknown) {
  const platform = String(value || "").toLowerCase();
  return ["multi", "facebook", "instagram"].includes(platform);
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const sql = db();
  if (!sql) return NextResponse.json({ ok: false, message: "Database env missing" }, { status: 503 });

  const rows = await sql`
    select id, platform, language, content_type, hook, caption, script, cta, approval_status, compliance_status, utm_source, utm_campaign
    from bna_content_queue
    where approval_status = 'approved'
      and compliance_status = 'passed_scan'
    order by created_at desc
    limit 100
  `;

  const exported = [];
  const blocked = [];

  for (const [index, row] of (rows as Array<Record<string, unknown>>).filter((row) => isMetaPlatform(row.platform)).entries()) {
    const body = `${row.hook || ""} ${row.caption || ""} ${row.script || ""} ${row.cta || ""}`;
    const found = findBlockedClaims(body);
    if (found.length) {
      blocked.push({ id: row.id, found });
      continue;
    }
    const normalized = normalizeContentRow(row, index, "meta");
    exported.push({
      ...normalized,
      platform: normalized.platform === "instagram" ? "instagram" : "facebook",
      notes: `${normalized.notes} Import manually into Meta Business Suite. No Graph API posting performed.`
    });
  }

  const csv = toCsv(exported);

  await sql`
    insert into bna_proof_log (loop_name, status, message, evidence)
    values ('scheduler-export-meta', 'success', 'Meta Business Suite scheduler export generated; no live posting performed', ${JSON.stringify({ exported: exported.length, blocked: blocked.length, autoPublishAllowed: false })}::jsonb)
  `;

  return NextResponse.json({
    ok: true,
    destination: "meta_business_suite",
    mode: "manual_scheduler_export_only",
    autoPublishAllowed: false,
    livePostingPerformed: false,
    exported: exported.length,
    blockedDuringExport: blocked,
    items: exported,
    csv
  });
}
