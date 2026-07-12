import { supabase } from '../../../../lib/supabase'

export async function GET(request) {
  try {
    const result = await supabase.auth.getUser();
    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }
}