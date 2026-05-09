import { NextResponse } from "next/server";

export async function GET() {
  const hasSupabaseUrl = Boolean(process.env.SUPABASE_URL);
  const hasServiceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return NextResponse.json({
    ok: hasSupabaseUrl && hasServiceRole,
    app: "bronx-nourish-access",
    backend: hasSupabaseUrl && hasServiceRole ? "configured" : "missing_env",
    requiredEnv: {
      SUPABASE_URL: hasSupabaseUrl ? "set" : "missing",
      SUPABASE_SERVICE_ROLE_KEY: hasServiceRole ? "set" : "missing"
    }
  }, { status: hasSupabaseUrl && hasServiceRole ? 200 : 503 });
}
