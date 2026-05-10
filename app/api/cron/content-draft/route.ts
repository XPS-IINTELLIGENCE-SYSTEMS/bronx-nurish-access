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

async function aiDraft(language: "en" | "es") {
  const fallback = language === "es"
    ? {
        hook: "¿Necesita ayuda con comida en el Bronx?",
        caption: "Ayuda de comida en el Bronx puede estar disponible. Revise opciones disponibles en 60 segundos. No se requiere pago para revisar. English / Español.",
        script: "Escena 1: Texto grande: Ayuda de comida en el Bronx puede estar disponible. Escena 2: Muestre una familia o una bolsa de groceries. Escena 3: CTA: Revise opciones en 60 segundos. No se requiere pago para revisar.",
        cta: "Revisar opciones de comida"
      }
    : {
        hook: "Bronx food help may be available.",
        caption: "Bronx Food Help May Be Available — Check Options in 60 Seconds. No payment required to check. English / Español.",
        script: "Scene 1: Large text: Bronx Food Help May Be Available. Scene 2: Show groceries or a family kitchen moment. Scene 3: CTA: Check Options in 60 Seconds. No payment required to check.",
        cta: "Check Food Help Options"
      };

  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) return fallback;

  const prompt = `Create one compliance-safe Bronx Nourish Access organic social post in ${language === "es" ? "Spanish" : "English"}. Return strict JSON with keys hook, caption, script, cta. Use only safe claims: Bronx Food Help May Be Available; Check Options in 60 Seconds; No payment required to check; English / Español. Do not use: ${BLOCKED.join(", ")}.`;

  try {
    const res = await fetch("https://ai-gateway.vercel.sh/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.AI_GATEWAY_MODEL || "openai/gpt-5.2",
        messages: [
          { role: "system", content: "You create compliant direct-response public-benefit social content. Return JSON only." },
          { role: "user", content: prompt }
        ],
        temperature: 0.4
      })
    });
    if (!res.ok) return fallback;
    const json = await res.json();
    const text = json?.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(text);
    return {
      hook: String(parsed.hook || fallback.hook),
      caption: String(parsed.caption || fallback.caption),
      script: String(parsed.script || fallback.script),
      cta: String(parsed.cta || fallback.cta)
    };
  } catch {
    return fallback;
  }
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const sql = db();
  if (!sql) return NextResponse.json({ ok: false, message: "DATABASE_URL or POSTGRES_URL missing" }, { status: 503 });

  const drafts = [await aiDraft("en"), await aiDraft("es")];

  for (const draft of drafts) {
    await sql`
      insert into bna_content_queue (platform, language, content_type, hook, caption, script, cta, compliance_status, approval_status, utm_source, utm_campaign)
      values ('multi', ${draft.cta.includes("Revisar") ? "es" : "en"}, 'short_video', ${draft.hook}, ${draft.caption}, ${draft.script}, ${draft.cta}, 'pending_scan', 'draft', 'organic_social', 'bna_organic_poc')
    `;
  }

  await sql`insert into bna_proof_log (loop_name, status, message, evidence) values ('content-draft', 'success', 'Created bilingual content drafts', ${JSON.stringify({ count: drafts.length })}::jsonb)`;

  return NextResponse.json({ ok: true, created: drafts.length });
}
