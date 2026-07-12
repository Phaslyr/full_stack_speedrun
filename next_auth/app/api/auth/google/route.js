import { supabase } from '../../../../lib/supabase'
import { redirect } from 'next/navigation'

export async function GET(request) {
  // TODO: Call supabase.auth.signInWithOAuth({ provider: 'google' })
  // This returns a URL - redirect the user to it
  try {
    const url = await supabase.auth.signInWithOAuth({ provider: 'google' });
    redirect(url);
  } catch (error) {
    return Response.json({ error: error }, {status: 400})
  }
}