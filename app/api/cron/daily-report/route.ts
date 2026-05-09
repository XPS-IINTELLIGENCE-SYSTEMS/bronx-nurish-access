import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

function authorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function db() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const sql = db();
  if (!sql) {
    return NextResponse.json({ ok: false, message: "Database env missing" }, { status: 503 });
  }

  const leadRows = await sql`select count(*)::int as total_leads, count(*) filter (where created_at >= now() - interval '1 day')::int as leads_24h from bna_leads`;
  const contentRows = await sql`select count(*)::int as total_content, count(*) filter (where approval_status = 'draft')::int as draft_count, count(*) filter (where approval_status = 'needs_human_approval')::int as needs_approval, count(*) filter (where compliance_status = 'blocked')::int as blocked_count from bna_content_queue`;

  const report = {
    totalLeads: leadRows[0]?.total_leads || 0,
    leads24h: leadRows[0]?.leads_24h || 0,
    totalContent: contentRows[0]?.total_content || 0,
    draftCount: contentRows[0]?.draft_count || 0,
    needsApproval: contentRows[0]?.needs_approval || 0,
    blockedCount: contentRows[0]?.blocked_count || 0
  };

  await sql`insert into bna_proof_log (loop_name, status, message, evidence) values ('daily-report', 'success', 'Daily report generated', ${JSON.stringify(report)}::jsonb)`;

  return NextResponse.json({ ok: true, report });
}
