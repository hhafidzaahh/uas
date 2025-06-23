'use client'
import { useEffect, useState } from 'react'
import styles from '@/styles/DashboardAdminUKM.module.css'
import NavbarAdmin from '@/components/NavbarAdmin'
import Footer from '@/components/Footer'

export default function PeringkatUKMPage() {
  const [votes, setVotes] = useState([])

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch('/api/voting')
        const data = await res.json()

        // Konversi dan urutkan berdasarkan suara terbanyak
        const sorted = Object.entries(data)
          .map(([ukm, count]) => ({ ukm, count }))
          .sort((a, b) => b.count - a.count)

        setVotes(sorted)
      } catch (err) {
        console.error('Gagal ambil data voting:', err)
      }
    }

    fetchVotes()
  }, [])

  return (
    <div className={styles.layoutWrapper}>
      <NavbarAdmin />
      <main className={`${styles.container} ${styles.mainContent}`}>
        <h1 className={styles.title}>🏆 Peringkat UKM Berdasarkan Voting</h1>
        {votes.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Belum ada data voting.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>🏅 Peringkat</th>
                <th>UKM</th>
                <th>Jumlah Suara</th>
              </tr>
            </thead>
            <tbody>
              {votes.map((item, index) => (
                <tr key={index}>
                  <td><strong>{index + 1}</strong></td>
                  <td>{item.ukm}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <Footer />
    </div>
  )
}
