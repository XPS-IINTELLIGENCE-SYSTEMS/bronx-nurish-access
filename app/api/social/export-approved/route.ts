import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const BLOCKED = [
  "3 meals per day",
  "federal government pays",
  "guaranteed approval",
  "guaranteed free meals",
  "official government program",
  "84 days",
  "90 days",
  "everyone qualifies",
  "Medicaid approval guaranteed",
  "CORR proof numbers",
  "approval rates",
  "testimonials"
];

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

function findBlockedPhrases(text: string) {
  const lower = text.toLowerCase();
  return BLOCKED.filter((phrase) => lower.includes(phrase.toLowerCase()));
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const sql = db();
  if (!sql) {
    return NextResponse.json({ ok: false, message: "Database env missing" }, { status: 503 });
  }

  const rows = await sql`
    select id, created_at, platform, language, content_type, hook, caption, script, cta, utm_source, utm_campaign
    from bna_content_queue
    where approval_status = 'approved'
      and compliance_status = 'passed_scan'
    order by created_at desc
    limit 100
  `;

  const exportRows = [];
  const blockedRows = [];

  for (const row of rows as Array<Record<string, unknown>>) {
    const body = `${row.hook || ""} ${row.caption || ""} ${row.script || ""} ${row.cta || ""}`;
    const found = findBlockedPhrases(body);
    if (found.length) {
      blockedRows.push({ id: row.id, found });
      continue;
    }
    exportRows.push({
      id: row.id,
      platform: row.platform,
      language: row.language,
      contentType: row.content_type,
      hook: row.hook,
      caption: row.caption,
      script: row.script,
      cta: row.cta,
      utmSource: row.utm_source,
      utmCampaign: row.utm_campaign,
      destination: "manual_export_only",
      readyForManualPosting: true
    });
  }

  await sql`
    insert into bna_proof_log (loop_name, status, message, evidence)
    values ('social-export', 'success', 'Approved social content exported for manual posting only', ${JSON.stringify({ exported: exportRows.length, blockedDuringExport: blockedRows.length })}::jsonb)
  `;

  return NextResponse.json({
    ok: true,
    mode: "manual_export_only",
    autoPublishAllowed: false,
    livePostingPerformed: false,
    exported: exportRows.length,
    blockedDuringExport: blockedRows,
    items: exportRows
  });
}
