import Link from 'next/link';
import VizualXShell from '../_components/VizualXShell.js';
import { getVizualXOperatorControlCenter } from '../../../src/workflow/vizualXOperatorControlCenter.js';
import styles from '../vizualx.module.css';

const SYSTEM_COPY = {
  operator: 'Manual operator actions and system approvals',
  github: 'Repositories, branches, issues, PR planning',
  storage: 'Folders, files, packages, archives',
  vercel_cron: 'Scheduled triggers and cadence presets',
  vercel_workflow: 'Durable multi-step execution plans',
  vercel_agents: 'Agent assignment and role execution',
  vercel_sandbox: 'Isolated build and simulation lanes',
  vizual_x_runtime: 'Vizual-X command and workflow layer'
};

function Field({ field }) {
  if (field.type === 'boolean') {
    return (
      <label className={styles.field}>
        <span className={styles.fieldLabel}>{field.label}</span>
        <select className={styles.select} defaultValue="">
          <option value="" disabled>Select</option>
          <option value="true">Enabled</option>
          <option value="false">Disabled</option>
        </select>
      </label>
    );
  }
  if (field.type === 'select' || field.type === 'select_or_text') {
    return (
      <label className={styles.field}>
        <span className={styles.fieldLabel}>{field.label}</span>
        <select className={styles.select} defaultValue="">
          <option value="" disabled>Select {field.label}</option>
          {(field.options || []).map(option => <option key={option} value={option}>{option}</option>)}
          {field.type === 'select_or_text' ? <option value="custom">Custom</option> : null}
        </select>
      </label>
    );
  }
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{field.label}</span>
      <input className={styles.input} placeholder={field.label} />
    </label>
  );
}

function ControlPanel({ title, copy, fields, actionLabel }) {
  return (
    <div className={styles.panel}>
      <div className={styles.sectionHead}>
        <div><div className={styles.label}>Operator Tool</div><h2 className={styles.sectionTitle}>{title}</h2></div>
      </div>
      <p className={styles.copy}>{copy}</p>
      <div className={styles.formGrid} style={{ marginTop: 16 }}>
        {fields.map(field => <Field field={field} key={field.key} />)}
      </div>
      <div className={styles.actions} style={{ marginTop: 16 }}>
        <button className={styles.button} type="button">{actionLabel}</button>
        <button className={styles.secondary} type="button">Save Draft</button>
      </div>
    </div>
  );
}

export default function VizualXOperatorControlCenterPage() {
  const control = getVizualXOperatorControlCenter();
  const manualButtons = control.primary_sections.find(section => section.id === 'manual_button_os')?.actions || [];
  const systemMap = control.primary_sections.find(section => section.id === 'visual_system_map')?.nodes || [];

  return (
    <VizualXShell
      kicker="Vizual-X Manual Operating System"
      title="Operator Control Center"
      subtitle="A visual manual-button interface for GitHub, storage, Vercel Cron, Vercel Workflow, Vercel Agents, Vercel Sandbox, trigger design, and operator-controlled system operations."
      actions={<><Link className={styles.secondary} href="/api/workflow/vizual-x-operator-control-center">Open Control Schema API</Link><Link className={styles.button} href="/intelligence-os/workflows/autobuild">Open AutoBuild Intake</Link></>}
    >
      <section className={styles.statusStrip}>
        <div className={styles.statusCard}><div className={styles.label}>Control Systems</div><div className={`${styles.statusValue} ${styles.good}`}>{control.linked_systems.length}</div></div>
        <div className={styles.statusCard}><div className={styles.label}>Manual Buttons</div><div className={`${styles.statusValue} ${styles.gold}`}>{manualButtons.length}</div></div>
        <div className={styles.statusCard}><div className={styles.label}>Trigger Types</div><div className={styles.statusValue}>{control.primary_sections.find(section => section.id === 'trigger_builder')?.trigger_types.length || 0}</div></div>
        <div className={styles.statusCard}><div className={styles.label}>Cron Presets</div><div className={styles.statusValue}>{control.primary_sections.find(section => section.id === 'cron_scheduler')?.presets.length || 0}</div></div>
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHead}>
          <div><div className={styles.label}>Visual Workflow System</div><h2 className={styles.sectionTitle}>Connected Systems Map</h2></div>
          <span className={`${styles.tag} ${styles.tagGold}`}>Manual control + programmatic routing</span>
        </div>
        <div className={styles.workflowMap}>
          {systemMap.map(node => (
            <div className={styles.node} key={node}>
              <div className={styles.nodeTitle}>{node.replaceAll('_', ' ')}</div>
              <p className={styles.copy}>{SYSTEM_COPY[node] || 'Connected operating system node.'}</p>
              <div className={styles.tags}><span className={styles.tag}>Connected</span><span className={`${styles.tag} ${styles.tagGold}`}>Vizual-X</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.grid2}>
        <div className={styles.panel}>
          <div className={styles.sectionHead}><div><div className={styles.label}>Manual Button OS</div><h2 className={styles.sectionTitle}>Operator Actions</h2></div></div>
          <div className={styles.grid2}>
            {manualButtons.map(action => (
              <button className={styles.secondary} key={action} type="button">{action.replaceAll('_', ' ')}</button>
            ))}
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.sectionHead}><div><div className={styles.label}>System Controls</div><h2 className={styles.sectionTitle}>Linked Runtime Capabilities</h2></div></div>
          <ul className={styles.list}>
            {control.linked_systems.map(system => (
              <li className={styles.item} key={system.id}>
                <div className={styles.itemTitle}>{system.label}</div>
                <div className={styles.tags}>{system.controls.slice(0, 4).map(item => <span className={styles.tag} key={item}>{item.replaceAll('_', ' ')}</span>)}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.controlGrid}>
        <ControlPanel
          title="Programmable Cron Scheduler"
          copy="Create or edit schedule drafts using cadence presets, custom cron expressions, run modes, enabled state, failure policy, and target route selection."
          fields={control.cron_form_schema.fields}
          actionLabel="Prepare Cron Schedule"
        />
        <ControlPanel
          title="Trigger Builder"
          copy="Create operator-friendly triggers that target agents, workflows, sandboxes, storage, packages, or API routes."
          fields={control.trigger_form_schema.fields}
          actionLabel="Prepare Trigger"
        />
      </section>

      <section className={styles.grid2}>
        <ControlPanel
          title="Storage Manager"
          copy="Create, select, save, edit, duplicate, move, rename, archive, and version files and folders through a friendly storage-control form."
          fields={control.storage_form_schema.fields}
          actionLabel="Prepare Storage Operation"
        />
        <div className={styles.panel}>
          <div className={styles.sectionHead}><div><div className={styles.label}>Operator UX Rules</div><h2 className={styles.sectionTitle}>Control Center Intent</h2></div></div>
          <ul className={styles.list}>
            {[
              'Dropdown-first cron editing instead of raw-only cron text.',
              'Manual run buttons for workflow, sandbox, and package operations.',
              'Trigger targeting across agent, workflow, sandbox, storage, and API routes.',
              'Storage operations shown as clear form actions, not hidden file paths.',
              'Safety state remains visible: release gate HOLD and no production mutation.'
            ].map(item => <li className={styles.item} key={item}><div className={styles.itemTitle}>{item}</div></li>)}
          </ul>
        </div>
      </section>

      <section className={styles.footerNote}>
        The visual Operator Control Center is now installed as an additive Vizual-X UI page. It is schema-driven from `vizualXOperatorControlCenter.js`. The next execution pass wires these forms/buttons to persistent storage and live workflow-editing APIs.
      </section>
    </VizualXShell>
  );
}
