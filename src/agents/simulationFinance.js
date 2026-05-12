import { COMPANY_AGENT_BLUEPRINTS } from './companyAgents.js';

export const SIMULATED_ACCOUNTS = [
  ...COMPANY_AGENT_BLUEPRINTS.map(agent => ({
    id: `paper-${agent.id}`,
    owner_agent_id: agent.id,
    owner_name: agent.name,
    account_type: 'agent_paper_trading_account',
    starting_balance: 10000,
    current_balance: 10000,
    currency: 'USD_SIMULATED',
    real_money: false,
    live_trading_enabled: false,
    monthly_simulated_pay: agent.monthly_simulated_pay,
    strategy_policy: 'education_and_research_only'
  })),
  {
    id: 'paper-jeremy-operator',
    owner_agent_id: 'jeremy-operator',
    owner_name: 'Jeremy Operator Simulation Account',
    account_type: 'operator_paper_trading_account',
    starting_balance: 100000,
    current_balance: 100000,
    currency: 'USD_SIMULATED',
    real_money: false,
    live_trading_enabled: false,
    strategy_policy: 'education_and_research_only'
  },
  {
    id: 'paper-business-treasury',
    owner_agent_id: 'business-treasury',
    owner_name: 'Business Treasury Simulation Account',
    account_type: 'business_paper_trading_account',
    starting_balance: 100000,
    current_balance: 100000,
    currency: 'USD_SIMULATED',
    real_money: false,
    live_trading_enabled: false,
    strategy_policy: 'education_and_research_only'
  }
];

export const DIVERSIFIED_SIMULATION_STRATEGIES = [
  {
    id: 'balanced-risk-education',
    name: 'Balanced Risk Education Portfolio',
    simulated_allocation: { cash: 20, broad_market: 35, bonds_or_cashlike: 20, ai_sector_watchlist: 10, crypto_watchlist: 5, business_reinvestment: 10 },
    rule: 'No real trades. Simulate allocation drift, drawdown, and opportunity cost.'
  },
  {
    id: 'business-first-capital',
    name: 'Business First Capital Strategy',
    simulated_allocation: { cash: 30, business_assets: 40, tools_and_software: 10, education: 10, market_research: 5, crypto_watchlist: 5 },
    rule: 'Prioritize business-building assets over speculative exposure.'
  },
  {
    id: 'high-learning-watchlist',
    name: 'High Learning Watchlist Strategy',
    simulated_allocation: { cash: 50, ai_watchlist: 15, crypto_watchlist: 10, public_equity_watchlist: 15, business_tests: 10 },
    rule: 'Track ideas without live execution. Require thesis, risk, catalyst, and invalidation criteria.'
  }
];

export function runPortfolioSimulation() {
  return {
    mode: 'paper_simulation_only',
    real_money: false,
    live_trading_enabled: false,
    personalized_financial_advice: false,
    accounts: SIMULATED_ACCOUNTS,
    strategies: DIVERSIFIED_SIMULATION_STRATEGIES,
    rules: [
      'No live trades.',
      'No personalized investment advice.',
      'No return guarantees.',
      'Every strategy requires risk notes, thesis, invalidation, and drawdown tracking.',
      'Company wealth growth prioritizes products, services, leads, training, and repeatable revenue before market speculation.'
    ]
  };
}
