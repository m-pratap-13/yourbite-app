import { createClient } from "@supabase/supabase-js";
import envImport from "../env/envImport";

const supabase = createClient(envImport.supabaseUrl, envImport.supabaseAnonKey);

export default supabase;
