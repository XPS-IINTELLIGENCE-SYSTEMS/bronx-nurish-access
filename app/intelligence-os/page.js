import Link from 'next/link';
import VizualXShell from './_components/VizualXShell.js';
import styles from './vizualx.module.css';

const statusCards = [
  ['Release Gate', 'HOLD', 'gold'],
  ['System Mode', 'Autopilot', 'good'],
  ['Build Loop', '5 Min', 'good'],
  ['Daily Brief', '5 AM', 'gold']
];

const commandMetrics = [
  ['System Layers', '6', 'Intelligence, AutoBuild, Autopilot, Benchmarks, Vizual-X, Workflow Templates'],
  ['Builder Docs', '14+', 'Vizual-X frontend, AutoBuild form, discovery, execution, packaging, env/connectors'],
  ['Workflow APIs', '5+', 'Autopilot, Vizual-X build loop, AutoBuild template, operator schema, intelligence endpoints'],
  ['Primary Route', '/intelligence-os', 'Frontend command layer added without replacing the existing homepage']
];

const workflowColumns = [
  ['Goal Intake', 'Operator/client intake captured'],
  ['Doubled Target', 'Stretch objective translated'],
  ['Benchmark', 'Systems and source facts compared'],
  ['Builder Docs', 'Docs/package requirements generated'],
  ['Sandbox Plan', 'Vercel workflow/sandbox/agents staged'],
  ['Package', 'Connectors, env, and handoff prepared']
];

const agents = [
  ['Executive Assistant', 'Operator clarity and prioritization'],
  ['Benchmark Agent', 'Source-led system comparison'],
  ['AutoBuild Agent', 'Workflow package preparation'],
  ['Simulation Agent', 'Run scoring and readiness checks']
];

export default function IntelligenceOSPage() {
  return (
    <VizualXShell
      title="Vizual-X Command Center"
      subtitle="The v0-benchmarked frontend command layer for Intelligence OS and AutoBuild OS. It preserves the public homepage while exposing the system builder, workflow templates, operator controls, and runtime entry points."
      actions={<><Link className={styles.button} href="/intelligence-os/workflows/autobuild">Open AutoBuild Workflow</Link><Link className={styles.secondary} href="/intelligence-os/operator-control-center">Open Operator Control</Link></>}
    >
      <section className={styles.statusStrip}>
        {statusCards.map(([label, value, tone]) => (
          <div className={styles.statusCard} key={label}>
            <div className={styles.label}>{label}</div>
            <div className={`${styles.statusValue} ${tone === 'good' ? styles.good : styles.gold}`}>{value}</div>
          </div>
        ))}
      </section>

      <section className={styles.grid4}>
        {commandMetrics.map(([label, value, copy]) => (
          <div className={styles.card} key={label}>
            <div className={styles.label}>{label}</div>
            <div className={styles.metric}>{value}</div>
            <p className={styles.copy}>{copy}</p>
          </div>
        ))}
      </section>

      <section className={styles.grid2}>
        <div className={styles.panel}>
          <div className={styles.sectionHead}>
            <div><div className={styles.label}>AI Gateway Workbench</div><h2 className={styles.sectionTitle}>Vizual-X Chat Shell</h2></div>
            <span className={`${styles.tag} ${styles.tagGold}`}>Gateway Spec Ready</span>
          </div>
          <div className={styles.chat}>
            <aside className={styles.chatSide}>
              <div className={styles.label}>Rooms</div>
              <ul className={styles.list}>
                <li className={styles.item}><div className={styles.itemTitle}>Operator</div><div className={styles.copy}>Direct command mode</div></li>
                <li className={styles.item}><div className={styles.itemTitle}>Agent Room</div><div className={styles.copy}>Multi-agent thread</div></li>
                <li className={styles.item}><div className={styles.itemTitle}>Workflow</div><div className={styles.copy}>Task-context chat</div></li>
              </ul>
            </aside>
            <div className={styles.chatMain}>
              <div className={styles.chatBand}><strong>Intelligence OS context capsule</strong><p className={styles.copy}>Daily brief, workflow state, benchmark outputs, and agent launch data are specified as server-side context sources.</p></div>
              <div className={styles.messages}>
                <div className={styles.bubble}><strong>Vizual-X</strong><p className={styles.copy}>Chat workspace shell is installed visually. The `/api/chat/vizual-x` Gateway implementation is the next integration route.</p></div>
                <div className={styles.bubble}><strong>System</strong><p className={styles.copy}>Existing APIs remain the source of truth: autopilot cycle, daily brief, agent launch, benchmark, release gate.</p></div>
              </div>
              <div className={styles.composer}><span className={styles.secondary}>Attach Context</span><span className={styles.secondary}>Select Agent</span><span className={styles.button}>Gateway Chat Ready</span></div>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.sectionHead}>
            <div><div className={styles.label}>Runtime API Targets</div><h2 className={styles.sectionTitle}>Connected System Entry Points</h2></div>
          </div>
          <ul className={styles.list}>
            {[
              ['/api/workflow/autopilot-cycle', 'Autopilot cycle'],
              ['/api/intelligence/daily-command-brief', 'Daily command brief'],
              ['/api/workflow/vizual-x-build-loop', 'Vizual-X build loop'],
              ['/api/workflow/vizual-x-autobuild-template', 'AutoBuild workflow template'],
              ['/api/workflow/vizual-x-operator-control-center', 'Operator control-center schema']
            ].map(([href, label]) => (
              <li className={styles.item} key={href}>
                <div className={styles.itemTitle}>{label}</div>
                <p className={styles.copy}>{href}</p>
                <div className={styles.tags}><Link className={`${styles.tag} ${styles.tagGold}`} href={href}>Open API</Link></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHead}>
          <div><div className={styles.label}>Workflow Tracker</div><h2 className={styles.sectionTitle}>Vizual-X Build / AutoBuild Pipeline</h2></div>
          <Link className={styles.secondary} href="/intelligence-os/workflows/autobuild">Start Workflow</Link>
        </div>
        <div className={styles.kanban}>
          {workflowColumns.map(([title, copy], index) => (
            <div className={styles.column} key={title}>
              <div className={styles.columnTitle}><span>{title}</span><span className={styles.gold}>{index + 1}</span></div>
              <div className={styles.task} style={{ marginTop: 14 }}>
                <div className={styles.taskTitle}>{copy}</div>
                <div className={styles.meta}>Status: defined in the AutoBuild template and ready for implementation cycle wiring.</div>
                <div className={styles.tags}><span className={styles.tag}>Template</span><span className={`${styles.tag} ${styles.tagGold}`}>Vizual-X</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.grid2}>
        <div className={styles.panel}>
          <div className={styles.sectionHead}><div><div className={styles.label}>Agent Board</div><h2 className={styles.sectionTitle}>Operating Roles</h2></div></div>
          <div className={styles.grid2}>
            {agents.map(([title, copy]) => (
              <div className={styles.agent} key={title}>
                <div className={styles.agentTitle}>{title}</div>
                <div className={styles.meta}>{copy}</div>
                <div className={styles.tags}><span className={`${styles.tag} ${styles.tagGold}`}>Autopilot-safe</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.sectionHead}><div><div className={styles.label}>Readiness</div><h2 className={styles.sectionTitle}>What Is Built vs Next</h2></div></div>
          <div className={styles.checks}>
            {[['Builder docs package', 'Complete'], ['Workflow schemas', 'Complete'], ['Visual shell', 'Installed'], ['AI Gateway route', 'Next'], ['Postgres execution tables', 'Next']].map(([label, value]) => (
              <div className={styles.checkRow} key={label}><span>{label}</span><strong className={value === 'Complete' || value === 'Installed' ? styles.good : styles.gold}>{value}</strong></div>
            ))}
          </div>
        </div>
      </section>
    </VizualXShell>
  );
}
