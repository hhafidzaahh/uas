// app/api/pendaftaran/validasi/route.js
import { supabase } from '@/lib/supabaseClient'

export async function POST(req) {
  const { id, status } = await req.json()

  const { error } = await supabase
    .from('pendaftaran')
    .update({ status })
    .eq('id', id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
