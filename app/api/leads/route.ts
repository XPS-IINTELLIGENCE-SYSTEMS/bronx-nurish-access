import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

const VALID_ZIPS = new Set(["10451", "10452", "10453", "10454", "10455"]);

const LeadSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(7).max(30),
  zipCode: z.string().trim().regex(/^\d{5}$/),
  medicaidStatus: z.string().trim().min(1).max(120),
  foodNeed: z.string().trim().min(1).max(80),
  bestCallbackTime: z.string().trim().min(1).max(80),
  language: z.string().trim().min(1).max(20),
  consent: z.boolean(),
  website: z.string().trim().max(200).optional().default(""),
  utmSource: z.string().trim().max(120).optional().default("direct"),
  utmMedium: z.string().trim().max(120).optional().default("web"),
  utmCampaign: z.string().trim().max(120).optional().default("production_launch"),
  utmContent: z.string().trim().max(160).optional().default("homepage"),
  pageUrl: z.string().trim().max(500).optional().default("")
});

function normalizePhone(phone: string) {
  return phone.replace(/[^0-9+]/g, "").slice(0, 30);
}

function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) return null;
  return neon(databaseUrl);
}

export async function POST(req: NextRequest) {
  try {
    const parsed = LeadSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Please complete all required fields." }, { status: 400 });
    }

    const lead = parsed.data;

    if (lead.website) {
      return NextResponse.json({ ok: true, message: "Request received." });
    }

    if (!lead.consent) {
      return NextResponse.json({ ok: false, message: "Consent is required before we can contact you." }, { status: 400 });
    }

    if (!VALID_ZIPS.has(lead.zipCode)) {
      return NextResponse.json({ ok: false, message: "This launch is focused on Bronx ZIP codes 10451, 10452, 10453, 10454, and 10455." }, { status: 400 });
    }

    const sql = getDatabase();
    if (!sql) {
      return NextResponse.json({ ok: false, message: "Backend is not configured. Connect Neon/Vercel Postgres and set DATABASE_URL." }, { status: 503 });
    }

    const phone = normalizePhone(lead.phone);

    const recent = await sql`
      select id from bna_leads
      where phone = ${phone}
        and created_at >= now() - interval '24 hours'
        and status <> 'invalid'
      order by created_at desc
      limit 1
    `;

    if (recent.length > 0) {
      await sql`
        insert into bna_proof_log (loop_name, status, message, source_table, source_id, evidence)
        values ('lead-intake', 'duplicate', 'Duplicate phone submission blocked', 'bna_leads', ${recent[0].id}, ${JSON.stringify({ phone, utmSource: lead.utmSource })}::jsonb)
      `;
      return NextResponse.json({ ok: true, duplicate: true, message: "Your request was already received." });
    }

    const inserted = await sql`
      insert into bna_leads (
        first_name, phone, zip_code, medicaid_status, food_need, best_callback_time,
        preferred_language, consent_to_contact, utm_source, utm_medium, utm_campaign,
        utm_content, page_url, user_agent, status
      ) values (
        ${lead.firstName}, ${phone}, ${lead.zipCode}, ${lead.medicaidStatus}, ${lead.foodNeed}, ${lead.bestCallbackTime},
        ${lead.language}, ${lead.consent}, ${lead.utmSource}, ${lead.utmMedium}, ${lead.utmCampaign},
        ${lead.utmContent}, ${lead.pageUrl}, ${req.headers.get("user-agent") || ""}, 'new'
      ) returning id
    `;

    await sql`
      insert into bna_proof_log (loop_name, status, message, source_table, source_id, evidence)
      values ('lead-intake', 'success', 'Lead captured', 'bna_leads', ${inserted[0].id}, ${JSON.stringify({ zipCode: lead.zipCode, utmSource: lead.utmSource, utmCampaign: lead.utmCampaign })}::jsonb)
    `;

    return NextResponse.json({ ok: true, leadId: inserted[0].id });
  } catch (error) {
    console.error("Lead insert failed", error);
    return NextResponse.json({ ok: false, message: "Lead storage failed. Please call or try again." }, { status: 502 });
  }
}
