import { createClient } from '@supabase/supabase-js'

// This uses the secret service role key, only works on server!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey);