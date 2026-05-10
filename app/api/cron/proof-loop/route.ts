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
  "Medicaid approval guaranteed"
];

function authorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
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
  if (!sql) return NextResponse.json({ ok: false, message: "DATABASE_URL or POSTGRES_URL missing" }, { status: 503 });

  const rows = await sql`select id, hook, caption, script from bna_content_queue where approval_status = 'draft' order by created_at desc limit 50`;
  let approved = 0;
  let blocked = 0;

  for (const row of rows as Array<{ id: number; hook: string; caption: string; script: string }>) {
    const body = `${row.hook} ${row.caption} ${row.script}`.toLowerCase();
    const found = BLOCKED.filter((phrase) => body.includes(phrase.toLowerCase()));

    if (found.length) {
      blocked++;
      await sql`update bna_content_queue set compliance_status = 'blocked', approval_status = 'needs_revision', notes = ${`Blocked phrases: ${found.join(", ")}`} where id = ${row.id}`;
      await sql`insert into bna_proof_log (loop_name, status, message, source_table, source_id, evidence) values ('proof-loop', 'blocked', 'Unsafe claim found', 'bna_content_queue', ${row.id}, ${JSON.stringify({ found })}::jsonb)`;
    } else {
      approved++;
      await sql`update bna_content_queue set compliance_status = 'passed_scan', approval_status = 'needs_human_approval' where id = ${row.id}`;
      await sql`insert into bna_proof_log (loop_name, status, message, source_table, source_id, evidence) values ('proof-loop', 'passed', 'Compliance scan passed; human approval required before posting', 'bna_content_queue', ${row.id}, '{}'::jsonb)`;
    }
  }

  return NextResponse.json({ ok: true, scanned: rows.length, approvedForHumanReview: approved, blocked });
}
