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

  await sql`
    create table if not exists bna_autobuilder_commands (
      id bigserial primary key,
      created_at timestamptz default now(),
      command_type text not null,
      status text default 'draft',
      title text,
      prompt text,
      payload jsonb default '{}'::jsonb,
      output jsonb default '{}'::jsonb,
      approval_required boolean default true,
      approved_by text,
      approved_at timestamptz,
      executed_at timestamptz,
      github_issue_url text,
      github_pr_url text,
      notes text
    );
  `;

  return NextResponse.json({ ok: true, message: 'bna_autobuilder_commands table initialized' });
}