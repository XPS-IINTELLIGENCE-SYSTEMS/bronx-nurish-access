export default function PrivacyPage() {
  return (
    <main style={{ padding: "32px", maxWidth: "900px", margin: "0 auto", fontFamily: "system-ui, sans-serif", lineHeight: 1.55 }}>
      <p style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0b5f2a" }}>Bronx Nourish Access</p>
      <h1>Privacy and Contact Notice</h1>
      <p>
        Bronx Nourish Access is a food-support routing and callback funnel. This page explains what information may be collected
        when a person submits the food help check form.
      </p>

      <section style={{ marginTop: "24px" }}>
        <h2>Information we may collect</h2>
        <ul>
          <li>First name</li>
          <li>Phone number</li>
          <li>Bronx ZIP code</li>
          <li>Medicaid or health-plan status selection</li>
          <li>Food-support need selection</li>
          <li>Best callback time</li>
          <li>Preferred language</li>
          <li>Consent to be contacted</li>
          <li>Page URL, UTM campaign fields, and basic browser/user-agent data for campaign tracking and fraud prevention</li>
        </ul>
      </section>

      <section style={{ marginTop: "24px" }}>
        <h2>Information we do not ask for</h2>
        <ul>
          <li>Social Security number</li>
          <li>Medicaid ID number</li>
          <li>Case number</li>
          <li>Immigration status</li>
          <li>Medical diagnosis</li>
          <li>Private documents</li>
          <li>Children’s private details</li>
        </ul>
      </section>

      <section style={{ marginTop: "24px" }}>
        <h2>How information may be used</h2>
        <p>
          Submitted information may be used to review the food-support screening request, route the person to available options,
          contact the person by phone or text, track campaign performance, prevent duplicate submissions, and maintain internal proof logs.
        </p>
      </section>

      <section style={{ marginTop: "24px" }}>
        <h2>No guarantee</h2>
        <p>
          Submitting the form does not guarantee eligibility, enrollment, approval, delivery, meal quantity, duration, Medicaid approval,
          SNAP approval, government benefits, or any specific service. No payment is required to check available options.
        </p>
      </section>

      <section style={{ marginTop: "24px" }}>
        <h2>Contact and removal requests</h2>
        <p>
          A person who submitted the form may ask not to be contacted again. Until a verified contact mailbox or phone line is published,
          removal and correction requests should be handled by the Bronx Nourish Access callback operator.
        </p>
      </section>

      <section style={{ marginTop: "24px", padding: "16px", background: "#f7fee7", border: "1px solid #bbf7d0", borderRadius: "12px" }}>
        <h2>Important claim notice</h2>
        <p>
          Bronx Nourish Access uses may-qualify language only. It does not claim guaranteed free meals, guaranteed approval, federal payment,
          official government program status, 84 days, 90 days, or three meals per day unless those details are verified and approved.
        </p>
      </section>
    </main>
  );
}
