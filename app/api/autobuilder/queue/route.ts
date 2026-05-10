import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

function authorized(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return NextResponse.json({ ok: false, message: "Database env missing" }, { status: 503 });
  const sql = neon(url);

  const rows = await sql`
    select id, created_at, command_type, status, title, payload, approval_required, approved_by, approved_at, executed_at, github_issue_url, github_pr_url, notes
    from bna_autobuilder_commands
    order by created_at desc
    limit 100
  `;

  return NextResponse.json({ ok: true, items: rows });
}