import { createClient } from '@supabase/supabase-js';

export function useSupabaseClient() {
  const config = useRuntimeConfig();
  const supabase = createClient(config.public.SUPABASE_URL as string, config.public.SUPABASE_KEY as string)
  return { supabase };
}