// /app/api/mahasiswa/agenda/route.js

export async function GET() {
  const data = [
    {
      judul: 'Pelatihan Desain Canva',
      ukm: 'Computer Club',
      tanggal: '2025-06-22',
      tempat: 'Lab Komputer 1',
    },
    {
      judul: 'Latihan Basket Mingguan',
      ukm: 'Basket',
      tanggal: '2025-06-25',
      tempat: 'Lapangan Basket',
    },
    {
      judul: 'Rapat UKM Tema Holic',
      ukm: 'Tema Holic',
      tanggal: '2025-07-01',
      tempat: 'Ruang BEM',
    },
  ]

  return Response.json(data)
}
