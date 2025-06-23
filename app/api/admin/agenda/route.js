// app/api/admin/agenda/route.js

export async function GET() {
  const data = [
    {
      id: 1,
      ukm: 'voli',
      judul: 'Latihan Perdana',
      tanggal: '2025-07-01',
      tempat: 'Lapangan Kampus A',
    },
    {
      id: 2,
      ukm: 'futsal',
      judul: 'Pertandingan Persahabatan',
      tanggal: '2025-07-03',
      tempat: 'Gor Futsal Kampus',
    },
    {
      id: 3,
      ukm: 'basket',
      judul: 'Turnamen Internal',
      tanggal: '2025-07-05',
      tempat: 'Lapangan Basket Kampus',
    },
  ]

  return Response.json(data)
}
