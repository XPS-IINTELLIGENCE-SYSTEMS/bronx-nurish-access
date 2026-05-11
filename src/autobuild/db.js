import { neon } from '@neondatabase/serverless';

export function getEnvStatus() {
  return {
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    SUPABASE_SERVICE_KEY: Boolean(process.env.SUPABASE_SERVICE_KEY),
    SUPABASE_ANON_KEY: Boolean(process.env.SUPABASE_ANON_KEY),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    POSTGRES_URL: Boolean(process.env.POSTGRES_URL),
    POSTGRES_PRISMA_URL: Boolean(process.env.POSTGRES_PRISMA_URL),
    POSTGRES_URL_NON_POOLING: Boolean(process.env.POSTGRES_URL_NON_POOLING)
  };
}

export function getPostgresUrl() {
  return process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL_NON_POOLING || null;
}

export function getDb() {
  const url = getPostgresUrl();
  if (!url) return null;
  return neon(url);
}

export function persistenceMode() {
  return getDb() ? 'postgres' : 'memory_fallback';
}

export function getDatabaseConfig() {
  const url = getPostgresUrl();
  return {
    hasPostgresUrl: Boolean(url),
    persistence_ready: Boolean(url),
    persistence_mode: url ? 'postgres' : 'memory_fallback',
    env_names_present: getEnvStatus(),
    values_exposed: false
  };
}

export const getSupabaseEnvStatus = getEnvStatus;
export const getSupabaseConfig = getDatabaseConfig;
