export const FREE_FINANCIAL_DATA_SOURCES = [
  {
    id: 'coingecko-simple-price',
    name: 'CoinGecko Simple Price API',
    category: 'crypto_market_data',
    base_url: 'https://api.coingecko.com/api/v3/simple/price',
    auth_required: false,
    sandbox_use: 'Fetch public crypto prices for educational paper simulations.',
    example_query: '?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true',
    risk_note: 'Market data can be delayed or unavailable. No live trading.'
  },
  {
    id: 'stooq-daily-csv',
    name: 'Stooq CSV Market Data',
    category: 'equity_index_fx_public_csv',
    base_url: 'https://stooq.com/q/l/',
    auth_required: false,
    sandbox_use: 'Fetch public CSV quotes for watchlist and paper simulation inputs.',
    example_query: '?s=aapl.us&f=sd2t2ohlcv&h&e=csv',
    risk_note: 'Use for educational research only; verify before any real-world decision.'
  },
  {
    id: 'federal-reserve-fred-public',
    name: 'FRED public economic data',
    category: 'macro_research',
    base_url: 'https://fred.stlouisfed.org/',
    auth_required: 'api_key_required_for_api; public pages available',
    sandbox_use: 'Track macro indicators in research briefs; prefer configured API key if added later.',
    example_query: 'series observations through FRED API when key exists',
    risk_note: 'Macro data is educational context, not financial advice.'
  },
  {
    id: 'sec-companyfacts',
    name: 'SEC Company Facts API',
    category: 'public_company_fundamentals',
    base_url: 'https://data.sec.gov/api/xbrl/companyfacts/',
    auth_required: false,
    sandbox_use: 'Research public company facts with proper user-agent compliance when implemented.',
    example_query: 'CIK-based company facts endpoint',
    risk_note: 'Requires source compliance and careful interpretation.'
  }
];

export function getFinancialDataSourcePlan() {
  return {
    mode: 'sandbox_research_only',
    real_trading_enabled: false,
    personalized_financial_advice: false,
    sources: FREE_FINANCIAL_DATA_SOURCES,
    agent_rules: [
      'Use free/public data sources only unless owner adds approved paid API credentials.',
      'Record source id, timestamp, symbol, and data freshness.',
      'Use data only for paper simulations and educational market intelligence.',
      'Never execute live trades.',
      'Never present simulated returns as actual returns.',
      'Always label outputs as research, paper simulation, or hypothesis.'
    ]
  };
}

export async function fetchSandboxMarketSnapshot() {
  const snapshot = {
    mode: 'sandbox_market_snapshot',
    timestamp: new Date().toISOString(),
    real_trading_enabled: false,
    personalized_financial_advice: false,
    data_source_attempts: [],
    observations: [],
    warnings: []
  };

  try {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true';
    const response = await fetch(url, { headers: { accept: 'application/json' }, cache: 'no-store' });
    snapshot.data_source_attempts.push({ source: 'coingecko-simple-price', ok: response.ok, status: response.status });
    if (response.ok) {
      const data = await response.json();
      snapshot.observations.push({ source: 'coingecko-simple-price', data });
    }
  } catch (error) {
    snapshot.data_source_attempts.push({ source: 'coingecko-simple-price', ok: false, error: error.message });
  }

  if (!snapshot.observations.length) {
    snapshot.warnings.push('No live market data was retrieved during this sandbox cycle. Continue with source plan only.');
  }

  return snapshot;
}
