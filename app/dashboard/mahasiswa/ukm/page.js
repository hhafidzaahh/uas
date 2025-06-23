'use client'
import Link from 'next/link'
import styles from '@/styles/ProfilUKM.module.css'
import NavbarDashboard from '@/components/NavbarDashboard'
import Footer from '@/components/Footer'

const colors = [
  '#fef3c7', // kuning pastel
  '#e0f2fe', // biru muda
  '#ede9fe', // ungu muda
  '#d1fae5', // hijau mint
  '#ffc7dbdb', // pink muda
  '#fce7f3', // merah muda
  '#f0fdf4', // hijau pucat
  '#f3e8ff', // ungu pastel
  '#e0f7fa', // cyan muda
  '#fff7ed', // peach muda
]

const ukmList = [
  { name: 'Voli', icon: '🏐', desc: 'UKM olahraga yang fokus pada pembinaan dan pertandingan bola voli.' },
  { name: 'Futsal', icon: '⚽', desc: 'Tempat berkumpulnya pecinta futsal untuk latihan dan kompetisi.' },
  { name: 'Himpunan Pengusaha Muda Indonesia', icon: '💼', desc: 'UKM kewirausahaan yang membina jiwa bisnis mahasiswa.' },
  { name: 'Badminton', icon: '🏸', desc: 'UKM olahraga bulu tangkis dengan kegiatan rutin dan turnamen.' },
  { name: 'Computer Club', icon: '💻', desc: 'Membuat aplikasi, website, dan dokumentasi video kegiatan.' },
  { name: 'Basket', icon: '🏀', desc: 'Komunitas pecinta basket untuk latihan dan berkompetisi.' },
  { name: 'Protokol', icon: '🎤', desc: 'UKM pelatihan dan praktik keprotokolan untuk acara resmi kampus.' },
  { name: 'Kelompok Studi Islam', icon: '📖', desc: 'UKM keislaman yang memfasilitasi kajian, diskusi, dan dakwah kampus.' },
  { name: 'Tema Holic', icon: '🎭', desc: 'UKM seni dan desain, tempat mahasiswa menyalurkan kreativitas visual.' },
  { name: 'Paduan Suara Mahasiswa', icon: '🎶', desc: 'UKM seni vokal untuk melatih dan tampil dalam event kampus.' },
]

export default function UKMPage() {
  return (
    <>
      <NavbarDashboard />
      <main className={styles.container}>
        <h1 className={styles.title}>📘 Daftar UKM Kampus</h1>
        <div className={styles.ukmGrid}>
  {ukmList.map((ukm, index) => (
    <div
      key={index}
      className={styles.card}
      style={{ backgroundColor: colors[index % colors.length] }}
    >
      <div className={styles.icon}>{ukm.icon}</div>
      <h3>{ukm.name}</h3>
      {ukm.desc && <p className={styles.desc}>{ukm.desc}</p>}
      <Link href={`/dashboard/mahasiswa/ukm/${ukm.name.toLowerCase().replace(/\s+/g, '-')}`}>
        <button className={styles.button}>Lihat Selengkapnya</button>
      </Link>
    </div>
  ))}
</div>
      </main>
      <Footer/>
    </>
  )
}
