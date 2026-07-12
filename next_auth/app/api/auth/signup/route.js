import { supabase } from '../../../../lib/supabase'

export async function POST(request) {
  const signup = await request.json();

  const email = signup.email;
  const password = signup.password;

  try {
    const user = await supabase.auth.signUp({ email, password });
    return Response.json({ user: user }, {status: 201});
  } catch (error) {
    return Response.json({ error: error }, {status: 400})
  }
}