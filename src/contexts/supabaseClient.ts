import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hmasexzrdrhyfzbhragr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtYXNleHpyZHJoeWZ6YmhyYWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4OTU2MzYsImV4cCI6MjA2ODQ3MTYzNn0.-x9QKdQ019ybsR23RHP4oaamMjbfuEgL5OlP7j6fAto';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
