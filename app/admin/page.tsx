const modules = [
  ["Source Rights Ledger", "Active", "Blocks unverified assets, protected logos, copied claims, testimonials, and unapproved source material."],
  ["Discovery-First Control", "Active", "Use Drive, GitHub, Vercel, uploaded workbooks, and live app state before asking repeated intake questions."],
  ["AutoBuild Command OS", "Queue built / execution disabled", "Coordinates project control, workflow, GitHub, Vercel, Drive, Apps Script, command queue, agents, QA, and launch gates."],
  ["Digital Asset Manifest", "Scheduler manifest ready", "Defines Bronx Bodega Bag, Stoop Sunrise, North Star Grocery, platform folders, and approval-required asset URLs."],
  ["AI Video Creation OS", "Draft batch ready", "Creates storyboard, scripts, captions, shot lists, video prompts, export specs, and approval gates."],
  ["Social Growth OS", "Scheduler export ready", "Facebook is user-confirmed live. Buffer is recommended for all-channel scheduling. Meta Business Suite is recommended for Facebook/Instagram immediate launch."],
  ["Approval Decision Matrix", "Active", "Locks directions and release decisions so the system does not drift or publish without Jeremy approval."],
  ["QA Release Firewall", "Active", "Critical blockers must be zero before scale, publishing, paid traffic, or automated posting."]
];

const checklist = [
  ["Admin summary deny-by-default", "PASS", "Fixed. Endpoint returns 401 without authorization."],
  ["Cron routes deny-by-default", "PASS", "Fixed in code. Requires CRON_SECRET in Vercel for scheduled execution."],
  ["Facebook Page", "USER-CONFIRMED LIVE", "API automation is not verified unless FACEBOOK_PAGE_ID and FACEBOOK_ACCESS_TOKEN are set in Vercel."],
  ["Buffer scheduler", "RECOMMENDED", "Best all-channel scheduling layer for Facebook, Instagram, TikTok, YouTube, LinkedIn, and other platforms."],
  ["Meta Business Suite", "RECOMMENDED NOW", "Best immediate route for Facebook and Instagram manual/scheduled launch."],
  ["Social auto-publish", "DISABLED", "Scheduler export only. No live posting route exists in this phase."],
  ["Scheduler export", "READY", "Protected Buffer and Meta export routes added. Exports approved content only."],
  ["Draft batch generation", "READY / DRAFT ONLY", "Protected generator creates draft rows only. Proof-loop and human approval required."],
  ["AutoBuilder queue", "BUILT / INERT", "Commands can be queued, but no automatic execution, publishing, sending, or posting occurs."],
  ["Privacy policy", "ADDED IN PR #7", "Review /privacy before merge and launch scale."],
  ["Sponsor/payer/meal quantity", "BLOCKED", "Could not verify. Keep may-qualify language only."],
  ["Digital asset URLs", "MANUAL", "Assign approved Drive/exportable URLs before scheduler upload."],
  ["Manual QR/flyer/partner outreach", "READY", "Use UTM-tagged direct links while social remains export/manual only."]
];

const commandTypes = [
  "generate_content",
  "generate_video_script",
  "generate_asset_prompt",
  "create_qr_package",
  "create_partner_pack",
  "export_social",
  "run_claim_scan",
  "run_launch_audit",
  "build_daily_report"
];

const commandStatuses = [
  "draft",
  "pending_review",
  "approved",
  "blocked",
  "executing",
  "executed",
  "failed"
];

const projectLinks = [
  ["Issue #4", "Connect Facebook live account to safe social automation queue", "https://github.com/XPS-IINTELLIGENCE-SYSTEMS/bronx-nourish-access/issues/4"],
  ["Issue #5", "Build AutoBuilder command queue and execution firewall", "https://github.com/XPS-IINTELLIGENCE-SYSTEMS/bronx-nourish-access/issues/5"],
  ["Issue #6", "Add privacy policy and public consent page", "https://github.com/XPS-IINTELLIGENCE-SYSTEMS/bronx-nourish-access/issues/6"],
  ["Draft PR #7", "Autonomous social + AutoBuilder control layer", "https://github.com/XPS-IINTELLIGENCE-SYSTEMS/bronx-nourish-access/pull/7"]
];

const schedulerRoutes = [
  ["/api/social/assets/manifest", "ADMIN_SECRET", "Drive asset manifest and platform folder references"],
  ["/api/social/content/generate-batch", "ADMIN_SECRET", "Draft-only content generation"],
  ["/api/social/scheduler/export-buffer", "ADMIN_SECRET", "Buffer-ready approved content export"],
  ["/api/social/scheduler/export-meta", "ADMIN_SECRET", "Meta Business Suite approved content export"],
];

export default function AdminPage() {
  return (
    <main style={{ padding: "32px", maxWidth: "1100px", margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
      <p style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0b5f2a" }}>Controlled production system</p>
      <h1>Bronx Nourish Access Admin</h1>
      <p>
        Workbook OS modules are integrated as a controlled registry. This page is informational only. It does not publish,
        send, merge, deploy, or auto-post anything.
      </p>

      <section style={{ marginTop: "28px", padding: "16px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px" }}>
        <h2>Social automation status</h2>
        <ul>
          <li>Facebook Page: live user-confirmed.</li>
          <li>Buffer: recommended for all-channel scheduling.</li>
          <li>Meta Business Suite: recommended for Facebook/Instagram immediate launch.</li>
          <li>Facebook API automation: not verified unless env values exist.</li>
          <li>Social auto-publish: disabled.</li>
          <li>Current output mode: approved-content scheduler export / manual upload only.</li>
          <li>No live Facebook posting route exists in this safe phase.</li>
        </ul>
      </section>

      <section style={{ marginTop: "28px", padding: "16px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "12px" }}>
        <h2>Scheduler export engine</h2>
        <ul>
          <li>Campaign: Tap the Green Bag.</li>
          <li>Primary icon: Bronx Bodega Bag.</li>
          <li>Creative variants: Stoop Sunrise and North Star Grocery.</li>
          <li>Export targets: Buffer and Meta Business Suite.</li>
          <li>Exports approved content only.</li>
          <li>Blocked-claim scan runs again at export.</li>
          <li>Proof log entries are created for generation and export.</li>
        </ul>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Route</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Auth</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {schedulerRoutes.map(([route, auth, purpose]) => (
              <tr key={route}>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px", fontWeight: 700 }}>{route}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{auth}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: "28px", padding: "16px", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "12px" }}>
        <h2>AutoBuilder queue status</h2>
        <ul>
          <li>Mode: queue-only.</li>
          <li>Execution: disabled.</li>
          <li>Publishing/sending/posting: disabled.</li>
          <li>Protected status route: /api/autobuilder/status.</li>
          <li>Protected queue route: /api/autobuilder/queue.</li>
          <li>Both routes require ADMIN_SECRET.</li>
        </ul>
        <p><strong>Allowed command types:</strong> {commandTypes.join(", ")}</p>
        <p><strong>Allowed statuses:</strong> {commandStatuses.join(", ")}</p>
      </section>

      <section style={{ marginTop: "28px" }}>
        <h2>Integrated workbook systems</h2>
        <ul>
          <li>Bronx Nourish Access AI Social Growth Workbook</li>
          <li>SWF Universal AutoBuild Workbook OS Content Media Integrated</li>
          <li>Ultimate Universal Digital Asset Workbook OS Pixel Lock Ceiling Final</li>
          <li>Universal Digital Asset Workbook OS v2 Discovery First</li>
          <li>Universal Digital Asset Workbook OS</li>
          <li>Universal AI Video Creation Workbook OS Final</li>
        </ul>
      </section>

      <section style={{ marginTop: "28px" }}>
        <h2>System modules</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Module</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Status</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Production use</th>
            </tr>
          </thead>
          <tbody>
            {modules.map(([name, status, use]) => (
              <tr key={name}>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px", fontWeight: 700 }}>{name}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{status}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: "28px" }}>
        <h2>Production checklist</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Item</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Status</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Next action</th>
            </tr>
          </thead>
          <tbody>
            {checklist.map(([item, status, action]) => (
              <tr key={item}>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px", fontWeight: 700 }}>{item}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{status}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: "28px" }}>
        <h2>GitHub execution system</h2>
        <ul>
          {projectLinks.map(([label, title, url]) => (
            <li key={label}><a href={url}>{label}</a> — {title}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: "28px" }}>
        <h2>Operational API endpoints</h2>
        <ul>
          <li>/api/health</li>
          <li>/api/admin/summary — requires Authorization bearer secret</li>
          <li>/api/social/facebook/status — requires ADMIN_SECRET; does not expose secrets</li>
          <li>/api/social/export-approved — requires ADMIN_SECRET; manual export only</li>
          <li>/api/social/assets/manifest — requires ADMIN_SECRET; asset manifest only</li>
          <li>/api/social/content/generate-batch — requires ADMIN_SECRET; draft-only generation</li>
          <li>/api/social/scheduler/export-buffer — requires ADMIN_SECRET; Buffer scheduler export</li>
          <li>/api/social/scheduler/export-meta — requires ADMIN_SECRET; Meta Business Suite export</li>
          <li>/api/autobuilder/status — requires ADMIN_SECRET; initializes table and returns queue counts</li>
          <li>/api/autobuilder/queue — requires ADMIN_SECRET; queues only, no execution</li>
          <li>/api/cron/content-draft — requires CRON_SECRET</li>
          <li>/api/cron/proof-loop — requires CRON_SECRET</li>
          <li>/api/cron/daily-report — requires CRON_SECRET</li>
          <li>/api/leads</li>
        </ul>
      </section>

      <section style={{ marginTop: "28px", padding: "16px", background: "#f7fee7", border: "1px solid #bbf7d0", borderRadius: "12px" }}>
        <h2>Release firewall</h2>
        <p>
          Scheduler export is enabled. AutoBuilder execution is disabled. Auto-publish is disabled. Public campaign copy must not claim 3 meals per day,
          federal payment, guaranteed free meals, guaranteed approval, 84 days, 90 days, official government program, proof numbers,
          approval rates, or testimonials unless verified and approved.
        </p>
      </section>
    </main>
  );
}
