export const VIZUAL_X_OPERATOR_CONTROL_CENTER = {
  id: 'vizual-x-operator-control-center-v1',
  name: 'Vizual-X Operator Control Center',
  purpose: 'Provide a visual workflow operating system for manually and programmatically controlling GitHub, storage, Vercel Cron, Vercel Workflow, Vercel Agents, Vercel Sandbox, and trigger execution from a unified Vizual-X interface.',
  target_route: '/intelligence-os/operator-control-center',
  release_gate: 'HOLD',
  external_actions_taken: false,
  primary_sections: [
    {
      id: 'visual_system_map',
      label: 'Visual System Map',
      purpose: 'Show connected systems, flows, status, and manual control buttons.',
      nodes: [
        'operator',
        'github',
        'storage',
        'vercel_cron',
        'vercel_workflow',
        'vercel_agents',
        'vercel_sandbox',
        'vizual_x_runtime'
      ]
    },
    {
      id: 'manual_button_os',
      label: 'Manual Button Interface OS',
      purpose: 'Offer operator-friendly buttons for controlled execution of safe workflow actions.',
      actions: [
        'create_workflow',
        'duplicate_workflow',
        'save_workflow',
        'run_workflow_now',
        'pause_workflow',
        'resume_workflow',
        'simulate_workflow',
        'package_workflow',
        'open_logs',
        'open_storage_folder'
      ]
    },
    {
      id: 'cron_scheduler',
      label: 'Programmable Cron Scheduler',
      purpose: 'Create and edit user-friendly scheduled triggers through dropdowns and presets.',
      presets: [
        'every_5_minutes',
        'every_10_minutes',
        'every_15_minutes',
        'every_30_minutes',
        'hourly',
        'daily',
        'weekdays',
        'weekly',
        'custom'
      ]
    },
    {
      id: 'trigger_builder',
      label: 'Trigger Builder',
      purpose: 'Create execution triggers tied to agents, workflows, sandboxes, storage, or system packages.',
      trigger_types: [
        'manual_button',
        'scheduled_cron',
        'workflow_completion',
        'document_saved',
        'folder_created',
        'package_ready',
        'agent_result_ready',
        'sandbox_status_changed'
      ]
    },
    {
      id: 'storage_manager',
      label: 'Storage Manager',
      purpose: 'Create, select, save, edit, move, duplicate, and archive files and folders from a friendly UI.',
      operations: [
        'create_folder',
        'select_folder',
        'create_file',
        'save_file',
        'edit_file',
        'duplicate_file',
        'move_file',
        'rename_file',
        'archive_file',
        'view_file_history'
      ]
    }
  ],
  linked_systems: [
    {
      id: 'github',
      label: 'GitHub',
      controls: ['select_repo', 'select_branch', 'create_branch', 'open_pr', 'read_issues', 'create_issue', 'package_repo_spec']
    },
    {
      id: 'storage',
      label: 'Storage System',
      controls: ['create_folder', 'select_folder', 'save_docs', 'edit_docs', 'package_outputs', 'archive_packages']
    },
    {
      id: 'vercel_cron',
      label: 'Vercel Cron',
      controls: ['create_schedule', 'edit_schedule', 'pause_schedule', 'resume_schedule', 'run_now', 'view_next_run']
    },
    {
      id: 'vercel_workflow',
      label: 'Vercel Workflow',
      controls: ['select_workflow', 'create_workflow_plan', 'run_workflow', 'pause_workflow', 'view_steps', 'retry_failed_step']
    },
    {
      id: 'vercel_agents',
      label: 'Vercel Agents',
      controls: ['select_agent', 'assign_agent', 'set_agent_goal', 'run_agent_task', 'view_agent_output']
    },
    {
      id: 'vercel_sandbox',
      label: 'Vercel Sandbox',
      controls: ['select_sandbox', 'create_sandbox_plan', 'run_sandbox_build', 'simulate_build', 'view_sandbox_status']
    }
  ],
  cron_form_schema: {
    fields: [
      { key: 'schedule_name', label: 'Schedule Name', type: 'text', required: true },
      { key: 'target_route', label: 'Target Route or Workflow', type: 'select_or_text', required: true },
      { key: 'cadence_preset', label: 'Cadence Preset', type: 'select', required: true },
      { key: 'custom_cron', label: 'Custom Cron Expression', type: 'text', required: false },
      { key: 'timezone', label: 'Timezone', type: 'select_or_text', required: false },
      { key: 'enabled', label: 'Enabled', type: 'boolean', required: true },
      { key: 'failure_policy', label: 'Failure Policy', type: 'select', required: true, options: ['log_only', 'retry_once', 'retry_then_alert', 'pause_and_alert'] },
      { key: 'run_mode', label: 'Run Mode', type: 'select', required: true, options: ['workflow', 'agent', 'sandbox', 'api_route'] }
    ]
  },
  trigger_form_schema: {
    fields: [
      { key: 'trigger_name', label: 'Trigger Name', type: 'text', required: true },
      { key: 'trigger_type', label: 'Trigger Type', type: 'select', required: true },
      { key: 'target_category', label: 'Target Category', type: 'select', required: true, options: ['agent', 'workflow', 'sandbox', 'storage', 'package', 'api_route'] },
      { key: 'target_id', label: 'Target ID', type: 'select_or_text', required: true },
      { key: 'execution_mode', label: 'Execution Mode', type: 'select', required: true, options: ['run_now', 'queue', 'simulate', 'prepare_only'] },
      { key: 'status_logging', label: 'Status Logging', type: 'boolean', required: true },
      { key: 'alert_on_failure', label: 'Alert on Failure', type: 'boolean', required: true }
    ]
  },
  storage_form_schema: {
    fields: [
      { key: 'storage_scope', label: 'Storage Scope', type: 'select', required: true, options: ['system_docs', 'packages', 'workflow_outputs', 'agent_outputs', 'operator_uploads'] },
      { key: 'folder_path', label: 'Folder Path', type: 'text', required: false },
      { key: 'folder_name', label: 'Folder Name', type: 'text', required: false },
      { key: 'file_name', label: 'File Name', type: 'text', required: false },
      { key: 'file_type', label: 'File Type', type: 'select', required: false, options: ['markdown', 'json', 'yaml', 'text', 'pdf_export_ready'] },
      { key: 'save_mode', label: 'Save Mode', type: 'select', required: true, options: ['create_new', 'overwrite_draft', 'save_copy', 'archive_previous'] }
    ]
  }
};

export function getVizualXOperatorControlCenter() {
  return VIZUAL_X_OPERATOR_CONTROL_CENTER;
}
