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

  const result = await sql`select count(*)::int as total_commands from bna_autobuilder_commands`;
  return NextResponse.json({ ok: true, totalCommands: result[0]?.total_commands || 0 });
}