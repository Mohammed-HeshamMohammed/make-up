import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wfwjucnncbctfxflmjzk.supabase.co'; // Fixed URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmd2p1Y25uY2JjdGZ4ZmxtanprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNzE5MTMsImV4cCI6MjA2Mzk0NzkxM30.69qJX6Bk_Oi62IXJdGA134DR3zQyFmkcRLtf-LSOZx8'; // Fixed key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
