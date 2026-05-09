import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
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
  utmSource: z.string().trim().max(120).optional().default("direct"),
  utmMedium: z.string().trim().max(120).optional().default("web"),
  utmCampaign: z.string().trim().max(120).optional().default("production_launch"),
  utmContent: z.string().trim().max(160).optional().default("homepage"),
  pageUrl: z.string().trim().max(500).optional().default("")
});

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

export async function POST(req: NextRequest) {
  try {
    const parsed = LeadSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Please complete all required fields." }, { status: 400 });
    }

    const lead = parsed.data;
    if (!lead.consent) {
      return NextResponse.json({ ok: false, message: "Consent is required before we can contact you." }, { status: 400 });
    }

    if (!VALID_ZIPS.has(lead.zipCode)) {
      return NextResponse.json({ ok: false, message: "This launch is focused on Bronx ZIP codes 10451, 10452, 10453, 10454, and 10455." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ ok: false, message: "Backend is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel." }, { status: 503 });
    }

    const insertPayload = {
      first_name: lead.firstName,
      phone: lead.phone,
      zip_code: lead.zipCode,
      medicaid_status: lead.medicaidStatus,
      food_need: lead.foodNeed,
      best_callback_time: lead.bestCallbackTime,
      preferred_language: lead.language,
      consent_to_contact: lead.consent,
      utm_source: lead.utmSource,
      utm_medium: lead.utmMedium,
      utm_campaign: lead.utmCampaign,
      utm_content: lead.utmContent,
      page_url: lead.pageUrl,
      user_agent: req.headers.get("user-agent") || "",
      status: "new"
    };

    const { error } = await supabase.from("bna_leads").insert(insertPayload);
    if (error) {
      console.error("Supabase insert failed", error);
      return NextResponse.json({ ok: false, message: "Lead storage failed. Please call or try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }
}
