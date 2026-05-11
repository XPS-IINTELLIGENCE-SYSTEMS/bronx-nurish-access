import { NextRequest, NextResponse } from "next/server";
import { ensureContentCommandTables, getSql } from "@/lib/content-command/schema";
import { findBlockedClaims } from "@/lib/social/scheduler";

function authorized(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  return Boolean(secret && req.headers.get("authorization") === `Bearer ${secret}`);
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const sql = getSql();
    if (!sql) return NextResponse.json({ ok: false, message: "Database env missing" }, { status: 503 });
    await ensureContentCommandTables(sql);

    const body = await req.json().catch(() => ({}));
    const title = String(body.title || "Bronx content draft");
    const hook = String(body.hook || body.prompt || "Create safe Bronx food-help content draft.");
    const caption = String(body.caption || body.draft_body || body.draftBody || "Draft pending AI/operator expansion. No payment required to check. English / Español.");
    const script = String(body.script || "Draft script pending approval.");
    const blocked = findBlockedClaims([title, hook, caption, script].join("\n"));
    const claimStatus = blocked.length ? "blocked" : "pending_scan";
    const approvalStatus = blocked.length ? "blocked" : "draft";

    const [row] = await sql`
      insert into bna_content_items (title, platform, content_type, language, hook, caption, script, approval_status, claim_status, metadata)
      values (${title}, ${String(body.platform || "multi")}, ${String(body.content_type || body.contentType || "post")}, ${String(body.language || "en")}, ${hook}, ${caption}, ${script}, ${approvalStatus}, ${claimStatus}, ${JSON.stringify({ ...body, blocked_claims: blocked, mode: "draft_export_review_only" })}::jsonb)
      returning id, title, approval_status, claim_status, created_at
    `;

    await sql`
      insert into bna_approval_events (target_type, target_id, approval_type, status, approver, notes, evidence)
      values ('bna_content_items', ${String(row.id)}, 'draft_created', 'requested', 'content_command_os', 'Content draft created by Content Command OS.', ${JSON.stringify({ blocked_claims: blocked })}::jsonb)
    `;

    return NextResponse.json({ ok: true, item: row, blocked_claims: blocked, mode: "draft_export_review_only" });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error instanceof Error ? error.message : "Content generation failed" }, { status: 500 });
  }
}
