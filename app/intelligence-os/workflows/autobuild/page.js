import Link from 'next/link';
import VizualXShell from '../../_components/VizualXShell.js';
import { getVizualXAutobuildTemplate } from '../../../../src/workflow/vizualXAutobuildTemplate.js';
import styles from '../../vizualx.module.css';

const PHASE_BADGES = {
  intake_form_validation: 'Validate intake',
  browser_discovery_plan: 'Plan discovery',
  source_research_and_benchmarking: 'Benchmark',
  builder_docs_generation: 'Generate docs',
  sandbox_build_plan: 'Sandbox plan',
  final_package_and_archive: 'Package archive'
};

function Field({ field }) {
  const full = field.type === 'textarea' || field.key.includes('requirements') || field.key.includes('goal') || field.key.includes('scope') || field.key.includes('topics') || field.key.includes('paths');
  return (
    <label className={`${styles.field} ${full ? styles.fieldFull : ''}`}>
      <span className={styles.fieldLabel}>{field.label}{field.required ? ' *' : ''}</span>
      {field.type === 'textarea' ? <textarea className={styles.textarea} placeholder={field.label} /> : field.type === 'select' ? (
        <select className={styles.select} defaultValue="">
          <option value="" disabled>Select {field.label}</option>
          {(field.options || []).map(option => <option value={option} key={option}>{option}</option>)}
        </select>
      ) : field.type === 'boolean' ? (
        <select className={styles.select} defaultValue="">
          <option value="" disabled>Select yes or no</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      ) : <input className={styles.input} placeholder={field.label} type={field.type === 'email' ? 'email' : 'text'} />}
    </label>
  );
}

export default function VizualXAutobuildPage() {
  const template = getVizualXAutobuildTemplate();
  return (
    <VizualXShell
      kicker="Vizual-X Workflow Builder"
      title="AutoBuild System Intake"
      subtitle="This operator/client workflow begins with the exact structured form required to generate discovery research, builder docs, Vercel Workflow/Sandbox/Agent specs, connector/env packages, and a reusable AutoBuild system package."
      actions={<><Link className={styles.secondary} href="/api/workflow/vizual-x-autobuild-template">Open Template API</Link><button className={styles.button} type="button">Execute AutoBuild Workflow</button></>}
    >
      <section className={styles.statusStrip}>
        <div className={styles.statusCard}><div className={styles.label}>Template ID</div><div className={styles.statusValue}>v1</div></div>
        <div className={styles.statusCard}><div className={styles.label}>Form Sections</div><div className={`${styles.statusValue} ${styles.gold}`}>{template.intake_form_sections.length}</div></div>
        <div className={styles.statusCard}><div className={styles.label}>Workflow Phases</div><div className={`${styles.statusValue} ${styles.good}`}>{template.workflow_phases.length}</div></div>
        <div className={styles.statusCard}><div className={styles.label}>Outputs</div><div className={styles.statusValue}>{template.outputs.length}</div></div>
      </section>

      <section className={styles.grid2}>
        <div className={styles.panel}>
          <div className={styles.sectionHead}>
            <div><div className={styles.label}>Form Progress</div><h2 className={styles.sectionTitle}>Submission Control</h2></div>
          </div>
          <ul className={styles.list}>
            <li className={styles.item}><div className={styles.itemTitle}>Required form fields</div><p className={styles.copy}>The docs define exact required and optional fields. This page installs the frontend form shell before the intake persistence APIs are wired.</p></li>
            <li className={styles.item}><div className={styles.itemTitle}>Execute button</div><p className={styles.copy}>The visual execute button is present. The next backend pass wires it to intake storage, run creation, and the 5-minute AutoBuild cycle.</p></li>
            <li className={styles.item}><div className={styles.itemTitle}>System package output</div><p className={styles.copy}>Generated outputs include builder docs, Vercel specs, connector/env specs, package manifest, and archive-ready system records.</p></li>
          </ul>
        </div>
        <div className={styles.panel}>
          <div className={styles.sectionHead}>
            <div><div className={styles.label}>Workflow Stages</div><h2 className={styles.sectionTitle}>AutoBuild Progress Model</h2></div>
          </div>
          <div className={styles.list}>
            {template.workflow_phases.slice(0, 6).map((phase, index) => (
              <div className={styles.item} key={phase}>
                <div className={styles.itemTitle}>{index + 1}. {PHASE_BADGES[phase] || phase.replaceAll('_', ' ')}</div>
                <div className={styles.tags}><span className={styles.tag}>Defined</span><span className={`${styles.tag} ${styles.tagGold}`}>Workflow</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHead}>
          <div><div className={styles.label}>Exact Intake Form</div><h2 className={styles.sectionTitle}>AutoBuild Requirements Capture</h2></div>
          <span className={`${styles.tag} ${styles.tagGold}`}>Docs 35–36 Implemented as UI</span>
        </div>
        <div className={styles.list}>
          {template.intake_form_sections.map(section => (
            <section className={styles.formSection} key={section.id}>
              <div>
                <div className={styles.label}>{section.id.replaceAll('_', ' ')}</div>
                <h3 className={styles.sectionTitle}>{section.label}</h3>
              </div>
              <div className={styles.formGrid}>
                {section.fields.map(field => <Field field={field} key={field.key} />)}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.grid2}>
        <div className={styles.panel}>
          <div className={styles.sectionHead}><div><div className={styles.label}>Generated Output Family</div><h2 className={styles.sectionTitle}>What This Workflow Produces</h2></div></div>
          <div className={styles.grid2}>
            {template.outputs.map(output => (
              <div className={styles.package} key={output}>
                <div className={styles.packageTitle}>{output.replaceAll('_', ' ')}</div>
                <div className={styles.packageMeta}>Stored in the workflow package plan and prepared for the implementation backend pass.</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.sectionHead}><div><div className={styles.label}>Next Programmed Step</div><h2 className={styles.sectionTitle}>Pipeline Wiring</h2></div></div>
          <div className={styles.footerNote}>
            The form shell is now visible inside Vizual-X. The next implementation step is the persisted intake/execute/status API layer, Postgres AutoBuild tables, and the `/api/workflow/autobuild-template-cycle` 5-minute advancement route.
          </div>
        </div>
      </section>
    </VizualXShell>
  );
}
