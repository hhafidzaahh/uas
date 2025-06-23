'use client'

import { useEffect, useState } from 'react'
import styles from '@/styles/DashboardPengurus.module.css'
import NavbarPengurus from '@/components/NavbarPengurus'
import ukmData from '@/data/ukmData'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function KehadiranPage() {
  const [user, setUser] = useState(null)
  const [kehadiran, setKehadiran] = useState({})
  const [jumlahPertemuan, setJumlahPertemuan] = useState(5)
  const [notif, setNotif] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUser(parsed)

      const saved = localStorage.getItem(`kehadiran-${parsed.ukm}`)
      if (saved) {
        setKehadiran(JSON.parse(saved))
      }
    }
  }, [])

  const handleToggle = (id, pertemuan) => {
    const copy = { ...kehadiran }
    copy[id] = copy[id] || {}
    copy[id][pertemuan] = !copy[id][pertemuan]
    setKehadiran(copy)
  }

  const handleSimpan = () => {
    if (user?.ukm) {
      localStorage.setItem(`kehadiran-${user.ukm}`, JSON.stringify(kehadiran))
      setNotif(true)
      setTimeout(() => setNotif(false), 2000)
    }
  }

  if (!user) return null
  const ukmKey = user.ukm?.toLowerCase()
  const anggota = ukmData[ukmKey]?.anggota || []

  return (
    <>
      <NavbarPengurus />
      <main className={styles.container}>
        <h1 className={styles.heading}>✅ Verifikasi Kehadiran</h1>
        <p className={styles.subheading}>Daftar kehadiran UKM {user.ukm}</p>

        <div className={styles.section}>
          <table className={styles.attendanceTable}>
            <thead>
              <tr>
                <th>Nama</th>
                {[...Array(jumlahPertemuan)].map((_, i) => (
                  <th key={i}>P{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {anggota.map((a) => (
                <tr key={a.id}>
                  <td>{a.nama}</td>
                  {[...Array(jumlahPertemuan)].map((_, i) => (
                    <td key={i}>
                      <input
                        type="checkbox"
                        checked={kehadiran[a.id]?.[i + 1] || false}
                        onChange={() => handleToggle(a.id, i + 1)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className={styles.button}
            style={{ marginTop: '1.5rem' }}
            onClick={handleSimpan}
          >
            💾 Simpan Kehadiran
          </button>

          {notif && (
            <p style={{ marginTop: '1rem', color: 'green' }}>✅ Kehadiran berhasil disimpan!</p>
          )}
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Link href="/dashboard/pengurus">
            <button className={styles.button}>← Kembali ke Dashboard</button>
          </Link>
        </div>
      </main>
      <Footer/>
    </>
  )
}
