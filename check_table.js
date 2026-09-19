const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dhhfpwxnuczxkmjibviz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoaGZwd3hudWN6eGttamlidml6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTczNzUxMSwiZXhwIjoyMTA1MzEzNTExfQ._O4auHsfahmzmdm6uOcSpnRiTzZBaabY60kugx27OiE',
  { auth: { persistSession: false } }
);

async function check() {
  console.log("Checking site_content...");
  const { data, error } = await supabase.from('site_content').select('key').limit(1);
  console.log("Result:", data, error?.message);
}

check();
