const moduleCopy: Record<string, { title: string; benchmark: string; purpose: string; actions: string[] }> = {
  content: {
    title: "Content Command",
    benchmark: "Payload CMS drafts, versions, scheduled publishing, jobs queue",
    purpose: "Draft, version, scan, approve, and export Bronx content without live publishing.",
    actions: ["Generate draft", "Version item", "Run claim scan", "Export for scheduler"]
  },
  assets: {
    title: "Asset Registry",
    benchmark: "Payload media library + release firewall",
    purpose: "Register images, video exports, Drive assets, rights status, and approval state.",
    actions: ["Register asset", "Review rights", "Attach to package", "Block unsafe asset"]
  },
  video: {
    title: "Video Jobs",
    benchmark: "HeyGen/InVideo job queue pattern, spend approval blocked",
    purpose: "Create video job drafts, scripts, shot lists, provider payloads, and approval events.",
    actions: ["Create job draft", "Attach script", "Export prompt pack", "Hold spend"]
  },
  images: {
    title: "Image Jobs",
    benchmark: "Vercel AI SDK Image Generator workflow",
    purpose: "Create image generation prompts, output placeholders, review gates, and manifest links.",
    actions: ["Create prompt", "Queue draft", "Review output", "Attach to scheduler"]
  },
  chat: {
    title: "AI Chat Command",
    benchmark: "Vercel AI Chatbot threads, messages, persistence, tool calls",
    purpose: "Persist AI command threads, prompt history, tool-call intent, and admin notes.",
    actions: ["Start thread", "Save prompt", "Record tool call", "Route to queue"]
  },
  scheduler: {
    title: "Scheduler Packages",
    benchmark: "PR #7 Buffer/Meta export engine",
    purpose: "Create export packages for approved/passed-scan content only.",
    actions: ["Create package", "Export Buffer CSV", "Export Meta CSV", "Log proof"]
  },
  proof: {
    title: "Proof Scanner",
    benchmark: "PR #7 proof logs + Payload review gates",
    purpose: "Run claim scans, release checks, and evidence logging before export.",
    actions: ["Run scan", "Record findings", "Block claims", "Approve for export"]
  },
  automation: {
    title: "Automation Sandbox",
    benchmark: "Vercel workflow/agent sandbox with inert execution",
    purpose: "Queue automation runs as sandbox records only. No posting, publishing, merging, or spend.",
    actions: ["Queue sandbox", "Record agent plan", "Export draft", "Block execution"]
  }
};

export default function ContentCommandModulePage({ moduleKey }: { moduleKey: string }) {
  const item = moduleCopy[moduleKey] || moduleCopy.content;
  return (
    <main style={{ padding: "32px", maxWidth: "1100px", margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
      <p style={{ fontSize: 12, textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.08em", color: "#0f766e" }}>Content Command OS / Bronx Nourish Access</p>
      <h1>{item.title}</h1>
      <p style={{ fontSize: 18, lineHeight: 1.6 }}>{item.purpose}</p>
      <section style={{ marginTop: 24, padding: 16, border: "1px solid #bfdbfe", borderRadius: 12, background: "#eff6ff" }}>
        <h2>Benchmark model</h2>
        <p>{item.benchmark}</p>
      </section>
      <section style={{ marginTop: 24 }}>
        <h2>Allowed actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {item.actions.map((action) => (
            <div key={action} style={{ padding: 14, border: "1px solid #ddd", borderRadius: 10, background: "#fff" }}>
              <strong>{action}</strong>
              <p style={{ margin: "8px 0 0", color: "#444" }}>Draft/export/review only. Requires protected API and approval state.</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ marginTop: 24, padding: 16, border: "1px solid #fed7aa", borderRadius: 12, background: "#fff7ed" }}>
        <h2>Safety gate</h2>
        <p>No live posting, live publishing, merge automation, command execution, or HeyGen/InVideo credit spend is implemented in PR #8.</p>
      </section>
      <section style={{ marginTop: 24 }}>
        <h2>Status API</h2>
        <code>/api/admin/{moduleKey}/status</code>
      </section>
    </main>
  );
}
