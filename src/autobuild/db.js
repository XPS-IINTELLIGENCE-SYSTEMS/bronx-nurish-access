import { createClient } from '@supabase/supabase-js';

export function getDb() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export function persistenceMode() {
  return getDb() ? 'supabase' : 'memory_fallback';
}
