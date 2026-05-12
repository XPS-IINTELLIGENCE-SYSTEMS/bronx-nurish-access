import { generateDailyCommandBrief } from '../../../src/intelligence/dailyCommandBrief.js';

export default async function DailyCommandBriefPage() {
  const brief = await generateDailyCommandBrief();
  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: 32, lineHeight: 1.5 }}>
      <h1>Daily Wealth + Intelligence Command Brief</h1>
      <p>Mode: autopilot exception-only. Release gate: {brief.release_gate}. External actions: disabled.</p>

      <section>
        <h2>Operator Goal</h2>
        <p>{brief.operator_goal}</p>
        <h3>Doubled Stretch Goal</h3>
        <p>{brief.doubled_stretch_goal}</p>
      </section>

      <section>
        <h2>Top Opportunities</h2>
        <ol>
          {brief.ranked_opportunities.map(item => <li key={item.id}><strong>{item.name}</strong> — Score {item.score}: {item.path}</li>)}
        </ol>
      </section>

      <section>
        <h2>System Upgrades</h2>
        <ol>
          {brief.system_upgrades.map(item => <li key={item.title}><strong>{item.title}</strong> — {item.impact} ({item.status})</li>)}
        </ol>
      </section>

      <section>
        <h2>Content Ideas</h2>
        <ol>
          {brief.content_ideas.map(item => <li key={item.title}><strong>{item.title}</strong> — {item.format}</li>)}
        </ol>
      </section>

      <section>
        <h2>Digital Asset Ideas</h2>
        <ol>
          {brief.digital_asset_ideas.map(item => <li key={item.title}>{item.title}</li>)}
        </ol>
      </section>

      <section>
        <h2>Market Data Sandbox</h2>
        <p>Real trading enabled: false. Financial advice: false.</p>
        <p>Source attempts: {brief.market_snapshot.data_source_attempts.length}</p>
        <p>Observations: {brief.market_snapshot.observations.length}</p>
      </section>

      <section>
        <h2>Approval Requests</h2>
        <ul>
          {brief.approval_requests.map(item => <li key={item.id}><strong>{item.trigger_phrase}</strong> — {item.reason}</li>)}
        </ul>
      </section>
    </main>
  );
}
