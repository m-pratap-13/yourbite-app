const envImport = {
  supabaseUrl: String(import.meta.env.VITE_SUPABASE_URL),
  supabaseAnonKey: String(import.meta.env.VITE_SUPABASE_ANON_KEY),
};

export default envImport;
