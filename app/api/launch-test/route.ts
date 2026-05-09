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
  if (!authorized(req)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const sql = db();
  if (!sql) return NextResponse.json({ ok: false, message: "Database env missing" }, { status: 503 });

  try {
    const stamp = new Date().toISOString();

    await sql`create table if not exists bna_leads (id bigserial primary key, created_at timestamptz not null default now(), first_name text not null, phone text not null, zip_code text not null, medicaid_status text not null, food_need text not null, best_callback_time text not null, preferred_language text not null, consent_to_contact boolean not null, utm_source text, utm_medium text, utm_campaign text, utm_content text, page_url text, user_agent text, status text not null default 'new', notes text)`;
    await sql`create table if not exists bna_content_queue (id bigserial primary key, created_at timestamptz not null default now(), platform text not null default 'multi', language text not null default 'en', content_type text not null default 'short_video', hook text not null, caption text not null, script text not null, cta text not null default 'Check Food Help Options', compliance_status text not null default 'pending_scan', approval_status text not null default 'draft', utm_source text not null default 'organic_social', utm_campaign text not null default 'bna_organic_poc', notes text)`;
    await sql`create table if not exists bna_proof_log (id bigserial primary key, created_at timestamptz not null default now(), loop_name text not null, status text not null, message text not null, source_table text, source_id bigint, evidence jsonb default '{}'::jsonb)`;

    const lead = await sql`
      insert into bna_leads (
        first_name, phone, zip_code, medicaid_status, food_need, best_callback_time,
        preferred_language, consent_to_contact, utm_source, utm_medium, utm_campaign,
        utm_content, page_url, user_agent, status, notes
      ) values (
        'System Test', '0000000000', '10451', 'Not sure', 'Yes', 'Morning',
        'en', true, 'launch_test', 'api', 'production_verification',
        'self_test', '/api/launch-test', ${req.headers.get("user-agent") || ""}, 'test', ${stamp}
      ) returning id
    `;

    const content = await sql`
      insert into bna_content_queue (
        platform, language, content_type, hook, caption, script, cta,
        compliance_status, approval_status, utm_source, utm_campaign, notes
      ) values (
        'multi', 'en', 'short_video', 'Bronx food help may be available.',
        'Bronx Food Help May Be Available. Check Options in 60 Seconds. No payment required to check.',
        'Show groceries, phone screen, and QR code.', 'Check Food Help Options',
        'passed_scan', 'needs_human_approval', 'launch_test', 'production_verification', ${stamp}
      ) returning id
    `;

    const proof = { leadId: lead[0]?.id, contentId: content[0]?.id, checkedAt: stamp };

    await sql`
      insert into bna_proof_log (loop_name, status, message, source_table, evidence)
      values ('launch-test', 'success', 'Production launch test completed', 'bna_leads', ${JSON.stringify(proof)}::jsonb)
    `;

    return NextResponse.json({ ok: true, backend: "neon_postgres_configured", proof });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, backend: "neon_postgres_configured", message: "Launch test failed", error: message.slice(0, 500) }, { status: 500 });
  }
}
