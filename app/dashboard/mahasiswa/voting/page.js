'use client'
import { useState } from 'react'
import styles from '@/styles/VotingPage.module.css'
import NavbarDashboard from '@/components/NavbarDashboard'
import Footer from '@/components/Footer'

const initialUKMs = [
  { name: 'Voli', icon: '🏐', votes: 4 },
  { name: 'Futsal', icon: '⚽', votes: 2 },
  { name: 'Computer Club', icon: '💻', votes: 5 },
  { name: 'Basket', icon: '🏀', votes: 1 },
  { name: 'Paduan Suara Mahasiswa', icon: '🎶', votes: 3 },
  { name: 'Tema Holic', icon: '🎭', votes: 1 },
  { name: 'Protokol', icon: '🎤', votes: 2 },
  { name: 'Badminton', icon: '🏸', votes: 2 },
  { name: 'Kelompok Studi Islam', icon: '📖', votes: 3 },
  { name: 'Himpunan Pengusaha Muda Indonesia', icon: '💼', votes: 0 },
]

export default function VotingPage() {
  const [ukmList, setUkmList] = useState(initialUKMs)
  const [voted, setVoted] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleVote = (name) => {
    if (!submitted) setVoted(name)
  }

  const handleSubmit = () => {
    if (!voted) return
    const updated = ukmList.map((ukm) =>
      ukm.name === voted ? { ...ukm, votes: ukm.votes + 1 } : ukm
    )
    setUkmList(updated)
    setSubmitted(true)
    alert(`Terima kasih! Kamu memilih: ${voted}`)
  }

  return (
    <>
      <NavbarDashboard />
      <main className={styles.container}>
        <h1 className={styles.title}>📊 Voting Kegiatan Favorit UKM</h1>
        <p className={styles.subtitle}>Klik salah satu UKM yang menurutmu paling aktif dan menarik.</p>

        <div className={styles.ukmGrid}>
          {ukmList.map((ukm, index) => (
            <div
              key={index}
              className={`${styles.card} ${voted === ukm.name ? styles.active : ''}`}
              onClick={() => handleVote(ukm.name)}
            >
              <div className={styles.icon}>{ukm.icon}</div>
              <p className={styles.name}>{ukm.name}</p>
              <p className={styles.voteCount}>{ukm.votes} suara</p>
            </div>
          ))}
        </div>

        {!submitted && voted && (
          <div className={styles.action}>
            <button className={styles.submitBtn} onClick={handleSubmit}>
              Kirim Pilihan
            </button>
          </div>
        )}
      </main>
      <Footer/>
    </>
  )
}
