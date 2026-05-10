import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

function authorized(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET || process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function db() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  const sql = db();
  if (!sql) return NextResponse.json({ ok: false, message: "Database env missing" }, { status: 503 });

  const [leadStats] = await sql`
    select
      count(*)::int as total_leads,
      count(*) filter (where created_at >= now() - interval '24 hours')::int as leads_24h,
      count(*) filter (where status = 'new')::int as new_leads,
      count(*) filter (where status = 'contacted')::int as contacted,
      count(*) filter (where status = 'qualified')::int as qualified,
      count(*) filter (where status = 'routed')::int as routed,
      count(*) filter (where status = 'invalid')::int as invalid
    from bna_leads
  ` as Array<Record<string, number>>;

  const bySource = await sql`
    select coalesce(utm_source, 'direct') as source, count(*)::int as leads
    from bna_leads
    group by coalesce(utm_source, 'direct')
    order by leads desc
    limit 20
  `;

  const [contentStats] = await sql`
    select
      count(*)::int as total_content,
      count(*) filter (where approval_status = 'draft')::int as drafts,
      count(*) filter (where approval_status = 'needs_human_approval')::int as needs_approval,
      count(*) filter (where approval_status = 'approved')::int as approved,
      count(*) filter (where approval_status = 'blocked')::int as blocked
    from bna_content_queue
  ` as Array<Record<string, number>>;

  const recentProof = await sql`
    select id, created_at, loop_name, status, message, evidence
    from bna_proof_log
    order by created_at desc
    limit 10
  `;

  return NextResponse.json({ ok: true, leadStats, bySource, contentStats, recentProof });
}
