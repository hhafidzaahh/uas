// app/api/pendaftaran/[ukm]/route.js
import { supabase } from '@/lib/supabaseClient'

export async function GET(req, { params }) {
  const { ukm } = params

  const { data, error } = await supabase
    .from('pendaftaran')
    .select('*')
    .ilike('ukm', ukm) // Gunakan ilike agar tidak sensitif huruf besar/kecil
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}
