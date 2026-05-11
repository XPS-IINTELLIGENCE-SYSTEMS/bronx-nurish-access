import { listAgentSystem } from '../../src/intelligence/agents.js';
import { runIntelligenceSimulation, generateUpgradeTasks, generatePromptLibrary } from '../../src/intelligence/simulation.js';

export default function IntelligencePage() {
  const agentSystem = listAgentSystem();
  const simulation = runIntelligenceSimulation({ passes: 5 });
  const tasks = generateUpgradeTasks();
  const prompts = generatePromptLibrary();

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: 32, lineHeight: 1.5 }}>
      <h1>Intelligence Warp Speed Dashboard</h1>
      <p>Mode: bounded sandbox. Release gate: HOLD. Real external actions: disabled.</p>

      <section>
        <h2>Simulation Score</h2>
        <p>Score: {simulation.score}/100</p>
        <p>Executions: {simulation.scenario_executions}</p>
        <p>Passes: {simulation.passes_completed}</p>
        <p>Agents Enabled: {simulation.agents_enabled}</p>
      </section>

      <section>
        <h2>Agent System</h2>
        <ul>
          {agentSystem.agents.map(agent => (
            <li key={agent.id}><strong>{agent.name}</strong> — {agent.phase}: {agent.purpose}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Drafted Upgrade Tasks</h2>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.id}: {task.title}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Prompt Library</h2>
        <ul>
          {prompts.map(prompt => (
            <li key={prompt.id}><strong>{prompt.title}</strong>: {prompt.prompt}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Bounded Rules</h2>
        <ul>
          {agentSystem.bounded_rules.map(rule => <li key={rule}>{rule}</li>)}
        </ul>
      </section>
    </main>
  );
}
