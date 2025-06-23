// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ilvgiddvdnbrhhvgkylc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsdmdpZGR2ZG5icmhodmdreWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MTg1MTMsImV4cCI6MjA2NTk5NDUxM30.Tprf-0pgWgOtW6qhmS2QoPYoYfy_5oYVTjCwQyn1xjY' // dari dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
