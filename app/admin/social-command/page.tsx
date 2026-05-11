import { contentTools, launchGates, safeVideoPrompts, socialPlatforms } from "@/lib/social/control-data";

const card = { background: "#0f2418", border: "1px solid #14532d", borderRadius: 18, padding: 16 };

export default function SocialCommandPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#07130d", color: "#ecfdf5", fontFamily: "system-ui, sans-serif" }}>
      <section style={{ padding: 28, maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ color: "#86efac", fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>Bronx Nourish Access</p>
        <h1 style={{ fontSize: 42, margin: "8px 0" }}>Social Command Center</h1>
        <p style={{ color: "#bbf7d0", maxWidth: 760 }}>
          Organic growth control dashboard for campaign assets, account readiness, content drafts, scheduler exports, and validation gates.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginTop: 24 }}>
          {[["Campaign","Tap the Green Bag"],["CTA","Check Food Help Options"],["Validation","PASS"],["Mode","Export Review"],["Assets","Drive Required"],["Safety","Locked"]].map(([a,b]) => (
            <div key={a} style={card}><div style={{ color: "#86efac", fontSize: 12, fontWeight: 800 }}>{a}</div><div style={{ fontSize: 20, fontWeight: 900 }}>{b}</div></div>
          ))}
        </div>
        <section style={{ ...card, marginTop: 18 }}>
          <h2>Launch Gates</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 10 }}>
            {launchGates.map((g) => <div key={g.id} style={{ background: "#07130d", border: "1px solid #173f2a", borderRadius: 14, padding: 12 }}><b>{g.label}</b><div style={{ color: "#86efac", fontSize: 12 }}>{g.status}</div><p>{g.description}</p></div>)}
          </div>
        </section>
        <section style={{ ...card, marginTop: 18 }}>
          <h2>Account Registry</h2>
          {socialPlatforms.map((p) => <div key={p.id} style={{ borderBottom: "1px solid #173f2a", padding: "10px 0" }}><b>{p.name}</b><div style={{ color: "#86efac", fontSize: 12 }}>{p.priority} · {p.status} · {p.mode}</div><p>{p.role}</p></div>)}
        </section>
        <section style={{ ...card, marginTop: 18 }}>
          <h2>Content Factory</h2>
          {contentTools.map((t) => <div key={t.id} style={{ borderBottom: "1px solid #173f2a", padding: "10px 0" }}><b>{t.name}</b><div style={{ color: "#86efac", fontSize: 12 }}>{t.status}</div><p>{t.purpose}</p></div>)}
        </section>
        <section style={{ ...card, marginTop: 18 }}>
          <h2>Video Prompt Queue</h2>
          {safeVideoPrompts.map((p) => <article key={p.id} style={{ borderBottom: "1px solid #173f2a", padding: "10px 0" }}><b>{p.title}</b><div style={{ color: "#86efac", fontSize: 12 }}>{p.platforms}</div><p>{p.prompt}</p></article>)}
        </section>
      </section>
    </main>
  );
}
