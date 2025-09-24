import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kgpqpuikwctixercdfzu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtncHFwdWlrd2N0aXhlcmNkZnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NzEwOTksImV4cCI6MjA3NDI0NzA5OX0.BiN5SGz7YffgovDw-mPvbOYYhnG68v0J4aEm4eBPRBI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
