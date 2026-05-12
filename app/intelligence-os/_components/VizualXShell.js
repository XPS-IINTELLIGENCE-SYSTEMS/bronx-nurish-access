import Link from 'next/link';
import styles from '../vizualx.module.css';

const NAV = [
  ['Command Center', '/intelligence-os'],
  ['AutoBuild Workflow', '/intelligence-os/workflows/autobuild'],
  ['Operator Control', '/intelligence-os/operator-control-center'],
  ['Daily Brief API', '/api/intelligence/daily-command-brief'],
  ['Autopilot Cycle API', '/api/workflow/autopilot-cycle'],
  ['AutoBuild Template API', '/api/workflow/vizual-x-autobuild-template'],
  ['Operator Schema API', '/api/workflow/vizual-x-operator-control-center']
];

export default function VizualXShell({ title, subtitle, kicker = 'Vizual-X Intelligence OS', actions, children }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div>
          <div className={styles.brand}>Vizual-X</div>
          <div className={styles.brandSub}>Autonomous System Builder</div>
        </div>
        <nav className={styles.nav}>
          {NAV.map(([label, href]) => (
            <Link className={styles.navLink} href={href} key={href}>
              <span>{label}</span>
              <span>→</span>
            </Link>
          ))}
        </nav>
        <div className={styles.sideCard}>
          <div className={styles.label}>Current Operating State</div>
          <div className={styles.sideValue}>HOLD</div>
          <p className={styles.copy}>Sandbox-first build mode. Public homepage preserved. Vizual-X operates as an additive command layer.</p>
        </div>
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <div className={styles.kicker}>{kicker}</div>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </header>
        {children}
      </main>
    </div>
  );
}
