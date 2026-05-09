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
