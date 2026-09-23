// Supabase Client Singleton for Anime Pack Opening TCG
// Uses public ANON KEY only. Never uses service_role key in frontend.

import { createClient } from "@supabase/supabase-js";

// Read environment variables
const rawUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.SUPABASE_URL || 
  import.meta.env.EXPO_PUBLIC_SUPABASE_URL || "";

const rawKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.SUPABASE_ANON_KEY || 
  import.meta.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

const isValidUrl = (url) => {
  if (!url || typeof url !== "string") return false;
  if (url.includes("[") || url.includes("]") || url.includes("PLACEHOLDER")) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isSupabaseConfigured = isValidUrl(rawUrl) && Boolean(rawKey) && !rawKey.includes("PLACEHOLDER");

// Use a syntactically valid fallback URL for demo mode to prevent initialization crash
const safeUrl = isSupabaseConfigured ? rawUrl : "https://demo-project.supabase.co";
const safeKey = isSupabaseConfigured ? rawKey : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.dummyKey";

export const supabase = createClient(safeUrl, safeKey, {
  auth: {
    persistSession: isSupabaseConfigured,
    autoRefreshToken: isSupabaseConfigured,
    detectSessionInUrl: isSupabaseConfigured,
  }
});
