export default function AdminPage() {
  return (
    <main>
      <h1>Bronx Nourish Access Admin</h1>
      <p>Use the operational API endpoint below for launch verification.</p>
      <ul>
        <li>/api/admin/summary</li>
        <li>/api/health</li>
        <li>/api/launch-test</li>
        <li>/api/cron/content-draft</li>
        <li>/api/cron/proof-loop</li>
        <li>/api/cron/daily-report</li>
      </ul>
    </main>
  );
}
