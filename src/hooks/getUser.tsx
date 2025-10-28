import { supabase } from "@/supabaseClient";

export const {
  data: { user },
} = await supabase.auth.getUser();
