const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dhhfpwxnuczxkmjibviz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoaGZwd3hudWN6eGttamlidml6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTczNzUxMSwiZXhwIjoyMTA1MzEzNTExfQ._O4auHsfahmzmdm6uOcSpnRiTzZBaabY60kugx27OiE',
  { auth: { persistSession: false } }
);

async function checkUsers() {
  console.log("Fetching users...");
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error("Error fetching users:", error.message);
    return;
  }
  
  if (data.users.length === 0) {
    console.log("No users found in this project.");
  } else {
    data.users.forEach(u => {
      console.log(`Email: ${u.email}`);
      console.log(`  Confirmed At: ${u.email_confirmed_at || 'NOT CONFIRMED'}`);
      console.log(`  Last Sign In: ${u.last_sign_in_at || 'Never'}`);
    });
  }
}

checkUsers();
