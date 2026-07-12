import { supabase } from '../../../../lib/supabase'

export async function POST(request) {
  const login = await request.json();

  const email = login.email;
  const password = login.password;

  try {
    const user = await supabase.auth.signInWithPassword({ email, password });
    return Response.json({ user: user }, {status: 200});
  } catch (error) {
    return Response.json({ error: error }, {status: 400})
  }
}