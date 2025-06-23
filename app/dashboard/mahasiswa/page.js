'use client'
import { useEffect, useState } from 'react'
import NavbarDashboard from '@/components/NavbarDashboard'
import styles from '@/styles/DashboardMahasiswa.module.css'
import Footer from '@/components/Footer'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function DashboardMahasiswa() {
  const [user, setUser] = useState({ username: '', role: '' })
  const [agenda, setAgenda] = useState([])
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Agenda UKM per Bulan',
      data: [],
      backgroundColor: '#38bdf8',
      borderRadius: 6,
    }]
  })

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'))
    if (data) setUser(data)

    const fetchAgenda = async () => {
      try {
        const res = await fetch('/api/mahasiswa/agenda')
        if (!res.ok) throw new Error('Gagal mengambil agenda')
        const result = await res.json()
        setAgenda(result.slice(0, 3))

        // Hitung jumlah agenda per bulan
        const countPerMonth = {}
        result.forEach(item => {
          const bulan = new Date(item.tanggal).toLocaleString('id-ID', { month: 'short' })
          countPerMonth[bulan] = (countPerMonth[bulan] || 0) + 1
        })

        const labels = Object.keys(countPerMonth)
        const data = Object.values(countPerMonth)

        setChartData({
          labels,
          datasets: [{
            label: 'Agenda UKM per Bulan',
            data,
            backgroundColor: '#38bdf8',
            borderRadius: 6,
          }]
        })
      } catch (error) {
        console.error('Gagal ambil agenda:', error)
      }
    }

    fetchAgenda()
  }, [])

  return (
    <>
      <NavbarDashboard />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.welcome}>Selamat datang, {user.username || 'Mahasiswa'}!</h1>
          <p className={styles.userInfo}>Role: {user.role || 'mahasiswa'}</p>
        </div>

        {/* Quick Links */}
        <div className={styles.quickLinks}>
          <a href="/dashboard/mahasiswa/ukm" className={styles.card}>
            📘 <strong>Lihat Profil UKM</strong>
            <p>Info dan visi misi UKM</p>
          </a>
          <a href="/dashboard/mahasiswa/pendaftaran" className={styles.card}>
            📝 <strong>Pendaftaran UKM</strong>
            <p>Daftar langsung online</p>
          </a>
          <a href="/dashboard/mahasiswa/voting" className={styles.card}>
            📊 <strong>Voting Kegiatan</strong>
            <p>Pilih favoritmu</p>
          </a>
        </div>

        {/* Agenda Terbaru */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📅 Agenda Terbaru</h2>
          {agenda.length === 0 ? (
            <p>Belum ada agenda.</p>
          ) : (
            <ul className={styles.agendaList}>
              {agenda.map((item, index) => (
                <li key={index} className={styles.agendaItem}>
                  <strong>{item.judul}</strong> oleh {item.ukm} <br />
                  <span>{item.tanggal} @ {item.tempat}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Grafik */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📊 Grafik Agenda UKM</h2>
          <div className={styles.chartWrapper}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: 10 },
                plugins: {
                  legend: {
                    position: 'top',
                    labels: { boxWidth: 15 }
                  },
                  title: {
                    display: true,
                    text: 'Jumlah Agenda per Bulan',
                    font: { size: 16 },
                    padding: { top: 10, bottom: 20 },
                  },
                },
                scales: {
                  x: {
                    ticks: { font: { size: 14 } }
                  },
                  y: {
                    beginAtZero: true,
                    ticks: { font: { size: 14 } }
                  }
                }
              }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
