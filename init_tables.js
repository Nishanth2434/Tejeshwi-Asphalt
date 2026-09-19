const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dhhfpwxnuczxkmjibviz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoaGZwd3hudWN6eGttamlidml6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTczNzUxMSwiZXhwIjoyMTA1MzEzNTExfQ._O4auHsfahmzmdm6uOcSpnRiTzZBaabY60kugx27OiE',
  { auth: { persistSession: false } }
);

async function init() {
  console.log("Creating tables if they don't exist...");
  
  // Create site_content table
  const { error: e1 } = await supabase.rpc('exec_sql', {
    sql_string: `
      CREATE TABLE IF NOT EXISTS site_content (
        key text primary key,
        page text,
        section text,
        type text,
        label text,
        value jsonb
      );
    `
  });
  console.log("site_content:", e1 ? e1.message : "Success");

  const { error: e2 } = await supabase.rpc('exec_sql', {
    sql_string: `
      CREATE TABLE IF NOT EXISTS inquiries (
        id uuid default gen_random_uuid() primary key,
        created_at timestamp with time zone default timezone('utc'::text, now()),
        name text not null,
        company text,
        email text not null,
        phone text not null,
        location text,
        type text not null,
        size text,
        message text not null,
        status text default 'new'
      );
    `
  });
  console.log("inquiries:", e2 ? e2.message : "Success");
}

init();
