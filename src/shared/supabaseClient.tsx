import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rjpcrqerxdlvygqvywam.supabase.co"; // Project URL
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqcGNycWVyeGRsdnlncXZ5d2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5ODIxMTEsImV4cCI6MjA0ODU1ODExMX0.twwfhWKIIwz2O0b0flXDkFJw7aqNqF06c7DuXiEmh0U"; // API Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
