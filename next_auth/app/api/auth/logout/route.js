import { supabase } from '../../../../lib/supabase'

export async function POST(request) {
  try {
    const result = await supabase.auth.signOut();
    return Response.json({ result: result }, {status: 200});
  } catch (error) {
    return Response.json({ error: error }, {status: 400})
  }
}