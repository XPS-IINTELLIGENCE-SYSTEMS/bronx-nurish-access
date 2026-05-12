import { COMPANY_AGENT_BLUEPRINTS } from './companyAgents.js';
import { createLeadershipBoard } from './leadershipBoard.js';

export function createAgentInvocation(agent) {
  return {
    invocation_id: `invoke-${agent.id}-${crypto.randomUUID()}`,
    agent_id: agent.id,
    name: agent.name,
    role: agent.role,
    mission: agent.mission,
    memory_context: {
      identity: `${agent.name} operates as ${agent.role}.`,
      mission: agent.mission,
      metrics: agent.success_metrics
    },
    workflow_skills: agent.capabilities,
    goals: {
      minute: 'Produce one clear next action.',
      hour: 'Complete one safe scored workflow improvement.',
      day: 'Contribute to the daily command brief.',
      system: 'Increase usefulness, accuracy, resilience, and operator leverage.'
    },
    launch_prompt: `You are ${agent.name}. Operate as a sandbox company agent. Be proactive, accurate, useful, and evidence-aware. Produce scored outputs, next actions, risks, and memory reflections. Keep release gate HOLD.`
  };
}

export function createCompanyLaunchInvocation() {
  const leadership = createLeadershipBoard();
  const invocations = COMPANY_AGENT_BLUEPRINTS.map(createAgentInvocation);
  return {
    launch_id: `company-launch-${crypto.randomUUID()}`,
    company: 'AI in Action Sandbox Company',
    mode: 'multi_agent_autopilot_sandbox',
    release_gate: 'HOLD',
    external_actions_taken: false,
    leadership_board: leadership,
    invocations,
    multi_agent_thread_seed: {
      thread_title: 'AI in Action Daily Operator Thread',
      participants: invocations.map(agent => ({ id: agent.agent_id, name: agent.name, role: agent.role })),
      opening_instruction: 'Each agent posts one useful update, one risk, one next action, and one escalation only when required.'
    }
  };
}
