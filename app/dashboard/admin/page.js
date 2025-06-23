'use client'
import { useEffect, useState } from 'react'
import NavbarAdmin from '@/components/NavbarAdmin'
import Footer from '@/components/Footer'
import styles from '@/styles/DashboardAdmin.module.css'
import Link from 'next/link'

// Chart.js setup
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function AdminDashboard() {
  const [data, setData] = useState({
    totalUKM: 0,
    totalMahasiswa: 0,
    totalKegiatan: 0,
    totalVoting: 0,
  })

  const [agenda, setAgenda] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/dashboard')
        if (!res.ok) throw new Error('Gagal mengambil data dashboard')
        const result = await res.json()
        setData(result)
      } catch (error) {
        console.error('Error dashboard:', error)
      }
    }

    const fetchAgenda = async () => {
      try {
        const res = await fetch('/api/admin/agenda')
        if (!res.ok) throw new Error('Gagal mengambil data agenda')
        const result = await res.json()
        setAgenda(result.slice(0, 5)) // hanya ambil 5 terbaru
      } catch (error) {
        console.error('Gagal ambil agenda:', error)
      }
    }

    fetchData()
    fetchAgenda()
  }, [])

  // Grafik dummy - nanti bisa dari API juga
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    datasets: [
      {
        label: 'Kegiatan UKM',
        data: [2, 5, 3, 6, 4, 7],
        backgroundColor: '#f43f5e',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Jumlah Kegiatan UKM per Bulan',
      },
    },
  }

  return (
    <div className={styles.layoutWrapper}>
      <NavbarAdmin />
      <main className={styles.container}>
        <h1 className={styles.title}>👩‍💼 Dashboard Admin</h1>
        <p className={styles.subheading}>Ringkasan aktivitas dan statistik UKM kampus</p>

        {/* Statistik */}
        <div className={styles.stats}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{data.totalUKM}</h2>
            <p className={styles.cardSubtitle}>UKM Terdaftar</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{data.totalMahasiswa}</h2>
            <p className={styles.cardSubtitle}>Mahasiswa Terdaftar</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{data.totalKegiatan}</h2>
            <p className={styles.cardSubtitle}>Kegiatan Bulan Ini</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{data.totalVoting}</h2>
            <p className={styles.cardSubtitle}>Voting Aktif</p>
          </div>
        </div>

        {/* Agenda Terbaru */}
        <section className={styles.agendaSection}>
          <h3 className={styles.sectionTitle}>📅 Agenda UKM Terbaru</h3>
          {agenda.length === 0 ? (
            <p>Belum ada agenda yang tersedia.</p>
          ) : (
            <table className={styles.agendaTable}>
              <thead>
                <tr>
                  <th>UKM</th>
                  <th>Judul</th>
                  <th>Tanggal</th>
                  <th>Tempat</th>
                </tr>
              </thead>
              <tbody>
                {agenda.map((item, i) => (
                  <tr key={i}>
                    <td>{item.ukm}</td>
                    <td>{item.judul}</td>
                    <td>{item.tanggal}</td>
                    <td>{item.tempat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Grafik Kegiatan */}
        <section className={styles.chartSection}>
          <h3 className={styles.sectionTitle}>📊 Grafik Kegiatan UKM</h3>
          <div className={styles.chartWrapper}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
