import { createClient } from '@supabase/supabase-js'

// These NEXT_PUBLIC_ variables work here because this file
// can be imported by client components
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabasePublicKey);