import ukmData from '@/data/ukmData'

export async function GET() {
  try {
    // Ubah object jadi array kalau perlu
    const dataArray = Object.entries(ukmData).map(([key, value]) => ({
      id: key,
      ...value,
    }))
    return new Response(JSON.stringify(dataArray), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal mengambil data UKM' }), { status: 500 })
  }
}
