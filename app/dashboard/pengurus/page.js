'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import NavbarPengurus from '@/components/NavbarPengurus'
import Footer from '@/components/Footer'
import styles from '@/styles/DashboardPengurus.module.css'
import ukmData from '@/data/ukmData'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function PengurusDashboard() {
  const [user, setUser] = useState(null)
  const [ukmDetail, setUkmDetail] = useState(null)
  const [jumlahHadirMingguIni, setJumlahHadirMingguIni] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return router.push('/')
    const parsedUser = JSON.parse(storedUser)
    setUser(parsedUser)

    const detail = ukmData[parsedUser.ukm?.toLowerCase()]
    setUkmDetail(detail)
  }, [])

  useEffect(() => {
    if (user?.ukm) {
      const kehadiranData = localStorage.getItem(`kehadiran-${user.ukm}`)
      if (kehadiranData) {
        const parsed = JSON.parse(kehadiranData)
        const pertemuanKe = 5 // bisa diganti ke pertemuan terakhir
        let totalHadir = 0
        for (const id in parsed) {
          if (parsed[id][pertemuanKe]) totalHadir++
        }
        setJumlahHadirMingguIni(totalHadir)
      }
    }
  }, [user])

  if (!user || !ukmDetail) return null

  const statistikData = [
    { name: 'Anggota', jumlah: ukmDetail.anggota.length },
    { name: 'Pengurus', jumlah: ukmDetail.pengurus.length },
    { name: 'Hadir Minggu Ini', jumlah: jumlahHadirMingguIni }
  ]

  return (
    <>
      <NavbarPengurus />
      <main className={styles.container}>
        <h1 className={styles.heading}>Dashboard Pengurus - {user.ukm}</h1>
        <p className={styles.subheading}>
          Halo, kamu login sebagai <strong>{user.role}</strong> UKM {user.ukm}
        </p>

        <div className={styles.section}>
          <h2>👑 Ketua UKM</h2>
          <p>{ukmDetail.ketua}</p>
        </div>

        <div className={styles.section}>
          <h2>📌 Daftar Pengurus</h2>
          <ul className={styles.memberList}>
            {ukmDetail.pengurus.map((nama, i) => (
              <li key={i} className={styles.memberItem}>{nama}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h2>📊 Statistik UKM</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Jumlah Anggota</p>
              <h2 className={styles.statValue}>{ukmDetail.anggota.length}</h2>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Jumlah Pengurus</p>
              <h2 className={styles.statValue}>{ukmDetail.pengurus.length}</h2>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Hadir Minggu Ini</p>
              <h2 className={styles.statValue}>{jumlahHadirMingguIni}</h2>
            </div>
          </div>

          <div style={{ height: 300, marginTop: '1.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={statistikData}>
                <defs>
                  <linearGradient id="colorStat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="jumlah"
                  stroke="#4f46e5"
                  fillOpacity={1}
                  fill="url(#colorStat)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
