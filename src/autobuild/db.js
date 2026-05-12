function getSupabaseUrlValue() {
  return process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || null;
}

function getSupabaseServiceKeyValue() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || null;
}

export function getEnvStatus() {
  return {
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    SUPABASE_SERVICE_KEY: Boolean(process.env.SUPABASE_SERVICE_KEY),
    SUPABASE_ANON_KEY: Boolean(process.env.SUPABASE_ANON_KEY),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    POSTGRES_URL: false,
    POSTGRES_PRISMA_URL: false,
    POSTGRES_URL_NON_POOLING: false
  };
}

export function getSupabaseConfig() {
  const url = getSupabaseUrlValue();
  const key = getSupabaseServiceKeyValue();
  const status = getEnvStatus();
  return {
    hasUrl: Boolean(url),
    hasKey: Boolean(key),
    persistence_ready: Boolean(url && key),
    persistence_mode: url && key ? 'supabase' : 'memory_fallback',
    status,
    env_names_present: status,
    values_exposed: false
  };
}

export function getSupabaseEnvStatus() {
  return getEnvStatus();
}

export function persistenceMode() {
  return getSupabaseConfig().persistence_mode;
}

export function getDatabaseConfig() {
  return getSupabaseConfig();
}

export function getSupabaseRestConfig() {
  const url = getSupabaseUrlValue();
  const key = getSupabaseServiceKeyValue();
  if (!url || !key) return null;
  return {
    url: `${url.replace(/\/$/, '')}/rest/v1`,
    key
  };
}

export function getDb() {
  return getSupabaseRestConfig();
}

function buildQuery(query = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query || {})) {
    if (value === undefined || value === null || value === '') continue;
    params.set(key, String(value));
  }
  const suffix = params.toString();
  return suffix ? `?${suffix}` : '';
}

async function request(table, { method = 'GET', query = {}, body, prefer, headers = {} } = {}) {
  const config = getSupabaseRestConfig();
  if (!config) throw new Error('Supabase server persistence is not configured.');
  const response = await fetch(`${config.url}/${table}${buildQuery(query)}`, {
    method,
    cache: 'no-store',
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(prefer ? { Prefer: prefer } : {}),
      ...headers
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {})
  });
  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }
  if (!response.ok) {
    const message = typeof data === 'object' && data?.message ? data.message : `${response.status} ${response.statusText}`;
    throw new Error(`Supabase ${table} ${method} failed: ${message}`);
  }
  return Array.isArray(data) ? data : data ? [data] : [];
}

export async function supabaseSelect(table, query = {}) {
  return request(table, { method: 'GET', query: { select: '*', ...query } });
}

export async function supabaseInsert(table, rows, { returning = true } = {}) {
  return request(table, {
    method: 'POST',
    body: Array.isArray(rows) ? rows : [rows],
    prefer: returning ? 'return=representation' : 'return=minimal'
  });
}

export async function supabaseUpsert(table, rows, { onConflict = 'id', returning = true } = {}) {
  return request(table, {
    method: 'POST',
    query: { on_conflict: onConflict },
    body: Array.isArray(rows) ? rows : [rows],
    prefer: `resolution=merge-duplicates,${returning ? 'return=representation' : 'return=minimal'}`
  });
}

export async function supabasePatch(table, query, payload, { returning = true } = {}) {
  return request(table, {
    method: 'PATCH',
    query,
    body: payload,
    prefer: returning ? 'return=representation' : 'return=minimal'
  });
}
