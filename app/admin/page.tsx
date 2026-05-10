const modules = [
  ["Source Rights Ledger", "Active", "Blocks unverified assets, protected logos, copied claims, testimonials, and unapproved source material."],
  ["Discovery-First Control", "Active", "Use Drive, GitHub, Vercel, uploaded workbooks, and live app state before asking repeated intake questions."],
  ["AutoBuild Command OS", "Active", "Coordinates project control, workflow, GitHub, Vercel, Drive, Apps Script, command queue, agents, QA, and launch gates."],
  ["Digital Asset Manifest", "Manual", "Defines logo, brand, Shopify, social, print, video, QR, open graph, icon, and handoff assets."],
  ["AI Video Creation OS", "Draft", "Creates storyboard, scripts, captions, shot lists, video prompts, export specs, and approval gates."],
  ["Social Growth OS", "Disconnected", "Drafts content and campaign packages only. No social account is connected and auto-publish is disabled."],
  ["Approval Decision Matrix", "Active", "Locks directions and release decisions so the system does not drift or publish without Jeremy approval."],
  ["QA Release Firewall", "Active", "Critical blockers must be zero before scale, publishing, paid traffic, or automated posting."]
];

const checklist = [
  ["Admin summary deny-by-default", "PASS", "Fixed. Endpoint returns 401 without authorization."],
  ["Cron routes deny-by-default", "PASS", "Fixed in code. Requires CRON_SECRET in Vercel for scheduled execution."],
  ["Social account connection", "BLOCKED", "No connected social accounts. Use manual posting/export queue only."],
  ["Privacy policy", "BLOCKED", "Must be verified before traffic scale."],
  ["Sponsor/payer/meal quantity", "BLOCKED", "Could not verify. Keep may-qualify language only."],
  ["Manual QR/flyer/partner outreach", "READY", "Use UTM-tagged direct links while social remains disconnected."],
  ["Video/content generation", "DRAFT", "Generate drafts only; proof-loop and human approval required."],
  ["Digital asset package", "MANUAL", "Actual asset files require generation/upload, rights status, alt text, and approval."]
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

      <section style={{ marginTop: "28px" }}>
        <h2>Integrated workbook systems</h2>
        <ul>
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
        <h2>Operational API endpoints</h2>
        <ul>
          <li>/api/health</li>
          <li>/api/admin/summary — requires Authorization bearer secret</li>
          <li>/api/cron/content-draft — requires CRON_SECRET</li>
          <li>/api/cron/proof-loop — requires CRON_SECRET</li>
          <li>/api/cron/daily-report — requires CRON_SECRET</li>
          <li>/api/leads</li>
        </ul>
      </section>

      <section style={{ marginTop: "28px", padding: "16px", background: "#f7fee7", border: "1px solid #bbf7d0", borderRadius: "12px" }}>
        <h2>Release firewall</h2>
        <p>
          Auto-publish is disabled. Social media accounts are disconnected. Public campaign copy must not claim 3 meals per day,
          federal payment, guaranteed free meals, guaranteed approval, 84 days, 90 days, official government program, proof numbers,
          approval rates, or testimonials unless verified and approved.
        </p>
      </section>
    </main>
  );
}
