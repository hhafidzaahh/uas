'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import NavbarDashboard from '@/components/NavbarDashboard'
import styles from '@/styles/UKMDetail.module.css'
import Footer from '@/components/Footer'

const ukmData = {
  voli: {
    icon: '🏐',
    title: 'Voli',
    desc: 'UKM olahraga yang fokus pada pembinaan dan pertandingan bola voli.',
    image: '/images/ukm/voli.jpeg',
    schedule: 'Senin & Rabu, pukul 16.00 WIB',
    location: 'Lapangan Kampus A',
    requirements: 'Aktif, memiliki sepatu olahraga, minat dalam voli',
    ketua: 'Hasby Yuda',
    pengurus: ['Hasby Yuda', 'Elvara Rahma'],
    anggota: [
      { id: 1, nama: 'Hana Fitri', nim: '220101', semester: 4 },
      { id: 2, nama: 'Andi Pratama', nim: '220102', semester: 3 },
      { id: 3, nama: 'Rizky Maulana', nim: '220103', semester: 2 }
    ]
  },
  futsal: {
    icon: '⚽',
    title: 'Futsal',
    desc: 'Tempat berkumpulnya pecinta futsal untuk latihan dan kompetisi.',
    image: '/images/ukm/futsal.jpg',
    schedule: 'Selasa & Kamis, pukul 17.00 WIB',
    location: 'Lapangan Indoor Kampus B',
    requirements: 'Punya sepatu futsal dan komitmen hadir latihan',
    ketua: 'Yuda Dwi Efendi',
    pengurus: ['Yuda Dwi Efendi', 'Rezqina Andari S'],
    anggota: [
      { id: 1, nama: 'Widayanti', nim: '220201', semester: 4 },
      { id: 2, nama: 'Hendrik', nim: '220202', semester: 2 }
    ]
  },
  'himpunan-pengusaha-muda-indonesia': {
    icon: '💼',
    title: 'Himpunan Pengusaha Muda Indonesia',
    desc: 'UKM kewirausahaan yang membina jiwa bisnis mahasiswa.',
    image: '/images/ukm/hipmi.jpg',
    schedule: 'Jumat, pukul 13.00 WIB',
    location: 'Ruang Seminar Lt. 2',
    requirements: 'Minat pada dunia bisnis dan startup',
    ketua: 'Syifa Amaliah Zahra',
    pengurus: ['Syifa Amaliah Zahra', 'Syawal Asri Naila Ilmi'],
    anggota: [
      { id: 1, nama: 'Naufal', nim: '220203', semester: 4 },
      { id: 2, nama: 'Sherin', nim: '220204', semester: 4 }
    ]
  },
  badminton: {
    icon: '🏸',
    title: 'Badminton',
    desc: 'UKM olahraga bulu tangkis dengan kegiatan rutin dan turnamen.',
    image: '/images/ukm/badminton.jpg',
    schedule: 'Rabu & Sabtu, pukul 10.00 - 12.00 WIB',
    location: 'Gelanggang Olahraga',
    requirements: 'Terbuka untuk semua mahasiswa, wajib membawa raket.',
    ketua: 'Muhamad Zaenal Abidin',
    pengurus: ['Muhamad Zaenal Abidi', 'Cikal Rafa Pratama'],
    anggota: [
      { id: 1, nama: 'Cikal', nim: '220205', semester: 4 },
      { id: 2, nama: 'Nasir', nim: '220206', semester: 4 },
      { id: 3, nama: 'Rafli', nim: '220207', semester: 2 }
    ]
  },
  'computer-club': {
    icon: '💻',
    title: 'Computer Club',
    desc: 'Membuat aplikasi, website, dan dokumentasi video kegiatan.',
    image: '/images/ukm/computer-club.jpg',
    schedule: 'Setiap Jumat, pukul 15.00 WIB',
    location: 'Lab Komputer Gedung C',
    requirements: 'Minat di bidang teknologi, membawa laptop saat pertemuan.',
    ketua: 'Fallah Jihadil Fajri',
    pengurus: ['Fallah Jihadil Fajri', 'Adelia Novalianty'],
    anggota: [
      { id: 1, nama: 'Nisa Rahma', nim: '220301', semester: 4 },
      { id: 2, nama: 'Reza Hafizh', nim: '220302', semester: 3 }
    ]
  },
  basket: {
    icon: '🏀',
    title: 'Basket',
    desc: 'Komunitas pecinta basket untuk latihan dan berkompetisi.',
    image: '/images/ukm/basket.jpg',
    schedule: 'Senin & Kamis, pukul 16.30 WIB',
    location: 'Lapangan Basket Utama',
    requirements: 'Siapkan pakaian olahraga dan sepatu kets.',
    ketua: 'Muhammad Fauzan Andika',
    pengurus: ['Muhammad Fauzan Andika', 'Putri Fenny'],
    anggota: [
      { id: 1, nama: 'Nabila', nim: '220224', semester: 2 },
      { id: 2, nama: 'Dyah', nim: '220223', semester: 4 },
      { id: 3, nama: 'Shalsa', nim: '220225', semester: 2 }
    ]
  },
  protokol: {
    icon: '🎤',
    title: 'Protokol',
    desc: 'UKM pelatihan dan praktik keprotokolan untuk acara resmi kampus.',
    image: '/images/ukm/protokol.jpg',
    schedule: 'Sabtu, pukul 13.00 WIB',
    location: 'Ruang Serbaguna B1',
    requirements: 'Berpenampilan rapi dan tertarik pada kegiatan formal.',
    ketua: 'Deni Mulyana',
    pengurus: ['Rizky Albiansyah', 'Deva Try'],
    anggota: [
      { id: 1, nama: 'Arum', nim: '220222', semester: 4 },
      { id: 2, nama: 'Alina', nim: '220228', semester: 2 },
      { id: 3, nama: 'Vera', nim: '220227', semester: 2 }
    ]
  },
  'kelompok-studi-islam': {
    icon: '📖',
    title: 'Kelompok Studi Islam',
    desc: 'UKM keislaman yang memfasilitasi kajian, diskusi, dan dakwah kampus.',
    image: '/images/ukm/ksi.jpg',
    schedule: 'Jumat, pukul 16.00 WIB',
    location: 'Musholla Kampus',
    requirements: 'Terbuka untuk semua muslim mahasiswa.',
    ketua: 'Dzaky Anand',
    pengurus: ['Dzaky Anand', 'Azkia Nurlatipah'],
    anggota: [
      { id: 1, nama: 'Siti Fauziah', nim: '220221', semester: 4 },
      { id: 2, nama: 'Rasyaa', nim: '220229', semester: 2 },
      { id: 3, nama: 'Firda', nim: '220226', semester: 4 }
    ]
  },
  'tema-holic': {
    icon: '🎭',
    title: 'Tema Holic',
    desc: 'UKM seni dan desain, tempat mahasiswa menyalurkan kreativitas visual.',
    image: '/images/ukm/tema-holic.jpg',
    schedule: 'Kamis, pukul 14.00 WIB',
    location: 'Studio Seni Kampus',
    requirements: 'Membawa alat lukis atau sketchbook.',
    ketua: 'Muhammad Rijal Jaelani',
    pengurus: ['Muhammad Rijal Jaelani', 'Sanda Bintang'],
    anggota: [
      { id: 1, nama: 'Nenden', nim: '220322', semester: 4 },
      { id: 2, nama: 'Sri', nim: '220328', semester: 2 },
      { id: 3, nama: 'Putri', nim: '220327', semester: 2 }
    ]
  },
  'paduan-suara-mahasiswa': {
    icon: '🎶',
    title: 'Paduan Suara Mahasiswa',
    desc: 'UKM seni vokal untuk melatih dan tampil dalam event kampus.',
    image: '/images/ukm/paduan-suara.jpg',
    schedule: 'Selasa & Jumat, pukul 17.00 WIB',
    location: 'Ruang Musik Kampus',
    requirements: 'Mengikuti audisi awal, minat di bidang vokal.',
    ketua: 'Siti Nurjanah',
    pengurus: ['Siti Nurjanah', 'Cindy Sidqin'],
    anggota: [
      { id: 1, nama: 'Ratih', nim: '220242', semester: 4 },
      { id: 2, nama: 'Fitri', nim: '220248', semester: 2 },
      { id: 3, nama: 'Salma', nim: '220247', semester: 2 }
    ]
  }
}

export default function DetailUKM() {
  const { ukm } = useParams()
  const detail = ukmData[ukm]

  return (
    <>
      <NavbarDashboard />
      <main className={styles.container}>
        {detail ? (
          <div className={styles.card}>
            <div className={styles.icon}>{detail.icon}</div>
            <h1 className={styles.title}>{detail.title}</h1>
            <p className={styles.desc}>{detail.desc}</p>

            {detail.image && (
              <img src={detail.image} alt={detail.title} className={styles.image} />
            )}
            {detail.ketua && (
              <p className={styles.extra}>
                <strong>👑 Ketua UKM:</strong> {detail.ketua}
              </p>
            )}
            {detail.pengurus && (
              <div className={styles.extra}>
                <strong>👥 Pengurus:</strong>
                <ul className={styles.pengurusList}>
                  {detail.pengurus.map((p, i) => (
                    <li key={i}>📌 {p}</li>
                  ))}
                </ul>
                </div>
              )}
              {detail.anggota && (
  <div className={styles.extra}>
    <strong>🧑‍🤝‍🧑 Anggota:</strong>
    <ul className={styles.pengurusList}>
      {detail.anggota.map((a) => (
        <li key={a.id}>
          👤 {a.nama} – {a.nim}, Semester {a.semester}
        </li>
      ))}
    </ul>
  </div>
)}

            {detail.schedule && (
              <p className={styles.extra}><strong>📅 Jadwal:</strong> {detail.schedule}</p>
            )}

            {detail.location && (
              <p className={styles.extra}><strong>📍 Lokasi:</strong> {detail.location}</p>
            )}

            {detail.requirements && (
              <p className={styles.extra}><strong>📋 Persyaratan:</strong> {detail.requirements}</p>
            )}

            <div className={styles.actions}>
              <Link href="/dashboard/mahasiswa/ukm">
                <button className={styles.button}>← Kembali ke Daftar UKM</button>
              </Link>
              <Link href={`/dashboard/mahasiswa/pendaftaran?ukm=${ukm}`}>
                <button className={styles.buttonPrimary}>Daftar Sekarang</button>
              </Link>
            </div>
          </div>
        ) : (
          <p className={styles.notFound}>UKM tidak ditemukan</p>
        )}
      </main>
      <Footer/>
    </>
  )
}
