'use client'
import { useEffect, useState } from 'react'
import styles from '@/styles/DashboardAdminUKM.module.css'
import NavbarAdmin from '@/components/NavbarAdmin'
import Footer from '@/components/Footer'

export default function KelolaVotingPage() {
  const [votes, setVotes] = useState({})

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch('/api/voting')
        const data = await res.json()
        setVotes(data)
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
        <h1 className={styles.title}>📊 Hasil Voting Mahasiswa</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nama UKM</th>
              <th>Jumlah Suara</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(votes).length === 0 ? (
              <tr><td colSpan="2">Belum ada voting.</td></tr>
            ) : (
              Object.entries(votes).map(([ukm, count], i) => (
                <tr key={i}>
                  <td>{ukm}</td>
                  <td>{count} suara</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  )
}
