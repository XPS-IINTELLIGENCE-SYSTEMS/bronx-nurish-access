import { NextResponse } from "next/server";

export async function GET() {
  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
  const hasCronSecret = Boolean(process.env.CRON_SECRET);
  const hasAiGateway = Boolean(process.env.AI_GATEWAY_API_KEY);

  return NextResponse.json({
    ok: hasDatabaseUrl,
    app: "bronx-nourish-access",
    backend: hasDatabaseUrl ? "neon_postgres_configured" : "missing_database_env",
    automation: {
      cronSecret: hasCronSecret ? "set" : "optional_missing",
      aiGateway: hasAiGateway ? "set" : "optional_missing_fallback_content_enabled"
    },
    requiredEnv: {
      DATABASE_URL: process.env.DATABASE_URL ? "set" : "missing",
      POSTGRES_URL: process.env.POSTGRES_URL ? "set" : "missing_optional_fallback"
    }
  }, { status: hasDatabaseUrl ? 200 : 503 });
}
