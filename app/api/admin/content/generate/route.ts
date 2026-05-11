import { NextRequest, NextResponse } from "next/server";
import { db, ensureContentCommandTables, logApprovalEvent, requireAdmin } from "../../../../../lib/admin/content-command";
import { findBlockedClaims } from "../../../../../lib/social/scheduler";

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    await ensureContentCommandTables();
    const sql = db();
    if (!sql) return NextResponse.json({ ok: false, message: "Database env missing" }, { status: 503 });

    const body = await req.json().catch(() => ({}));
    const title = String(body.title || "Bronx content draft");
    const prompt = String(body.prompt || "Create safe Bronx food-help content draft.");
    const draftBody = String(body.draft_body || body.draftBody || "Draft pending AI/operator expansion. No payment required to check. English / Español.");
    const blocked = findBlockedClaims([title, prompt, draftBody].join("\n"));
    const complianceStatus = blocked.length ? "blocked" : "pending_scan";
    const approvalStatus = blocked.length ? "blocked" : "draft";

    const [row] = await sql`
      insert into bna_content_items (title, platform, content_type, draft_body, prompt, approval_status, compliance_status, payload)
      values (${title}, ${String(body.platform || "multi")}, ${String(body.content_type || body.contentType || "post")}, ${draftBody}, ${prompt}, ${approvalStatus}, ${complianceStatus}, ${JSON.stringify({ ...body, blocked_claims: blocked, mode: "draft_export_review_only" })}::jsonb)
      returning id, title, approval_status, compliance_status, created_at
    ` as Array<{ id: number; title: string; approval_status: string; compliance_status: string; created_at: string }>;

    await logApprovalEvent("bna_content_items", row.id, "draft_created", "Content draft created by Content Command OS.", { blocked_claims: blocked });

    return NextResponse.json({ ok: true, item: row, blocked_claims: blocked, mode: "draft_export_review_only" });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error instanceof Error ? error.message : "Content generation failed" }, { status: 500 });
  }
}
