import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Used client-side (and in server components) for read-only / anon-key-safe
// operations such as fetching published projects or certificates, and for
// inserting a row into "messages" if you choose to log contact form
// submissions in Supabase in addition to sending them via EmailJS.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ContactMessage = {
  id?: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
};
