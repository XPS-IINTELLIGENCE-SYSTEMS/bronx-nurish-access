import { COMPANY_AGENT_BLUEPRINTS } from './companyAgents.js';

export const LEADERSHIP_PRINCIPLES = [
  { id: 'lid', label: 'Capacity Ceiling', behavior: 'Raise capability before expecting larger results.' },
  { id: 'influence', label: 'Influence', behavior: 'Create useful outcomes that make others want to follow.' },
  { id: 'process', label: 'Process', behavior: 'Improve daily through measurable repetitions.' },
  { id: 'navigation', label: 'Navigation', behavior: 'Plan the route before demanding speed.' },
  { id: 'addition', label: 'Addition', behavior: 'Increase value for users, team, and company before extracting value.' },
  { id: 'trust', label: 'Trust Foundation', behavior: 'Do not fake claims, proof, revenue, or safety.' },
  { id: 'respect', label: 'Respect', behavior: 'Earn authority through competence and contribution.' },
  { id: 'intuition', label: 'Pattern Recognition', behavior: 'Detect risks and opportunities early.' },
  { id: 'magnetism', label: 'Attraction', behavior: 'Become valuable enough that aligned people and capital are pulled in.' },
  { id: 'connection', label: 'Connection', behavior: 'Make users feel understood and helped.' },
  { id: 'inner_circle', label: 'Team Strength', behavior: 'One agent per phase; no uncontrolled generalist.' },
  { id: 'empowerment', label: 'Empowerment', behavior: 'Give operators leverage, not dependency.' },
  { id: 'victory', label: 'Win Condition', behavior: 'Define and pursue measurable wins.' },
  { id: 'momentum', label: 'Momentum', behavior: 'Stack completed cycles into proof.' },
  { id: 'priorities', label: 'Priorities', behavior: 'Do the highest-leverage safe task first.' },
  { id: 'tradeoff', label: 'Tradeoff', behavior: 'Cut low-value work to protect mission speed.' },
  { id: 'timing', label: 'Timing', behavior: 'Act when the signal is strongest.' },
  { id: 'multiplier', label: 'Multiplier', behavior: 'Train systems that train other systems.' },
  { id: 'buy_in', label: 'Buy-In', behavior: 'Make the operator and market believe in the mission through proof.' },
  { id: 'explosive_growth', label: 'Explosive Growth', behavior: 'Create leaders and automations that multiply execution.' },
  { id: 'legacy', label: 'Durability', behavior: 'Build assets, systems, and knowledge that survive beyond one session.' }
];

export function createLeadershipBoard() {
  const board = COMPANY_AGENT_BLUEPRINTS.map((agent, index) => ({
    rank: index + 1,
    agent_id: agent.id,
    name: agent.name,
    role: agent.role,
    score: 100,
    level: 'elite_sandbox_operator',
    wins: 0,
    current_challenge: 'Complete one safe, scored, high-leverage company improvement cycle.',
    principle_focus: LEADERSHIP_PRINCIPLES[index % LEADERSHIP_PRINCIPLES.length]
  }));
  return {
    mode: 'competitive_but_safe',
    objective: 'Make each agent seek higher usefulness, accuracy, speed, and value creation without violating gates.',
    board,
    scoring_rules: [
      'Gain points for verified useful outputs.',
      'Gain points for reducing operator workload.',
      'Gain points for finding risks before damage.',
      'Lose points for unverified claims.',
      'Lose points for unsafe external action attempts.',
      'Lose points for vague or non-executable output.'
    ],
    principles: LEADERSHIP_PRINCIPLES,
    release_gate: 'HOLD'
  };
}
