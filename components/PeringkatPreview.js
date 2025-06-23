'use client'
import { useEffect, useState } from 'react'
import styles from './PeringkatPreview.module.css' // kamu bisa custom css-nya

export default function PeringkatPreview() {
  const [votes, setVotes] = useState([])

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch('/api/voting')
        const data = await res.json()
        const sorted = Object.entries(data)
          .map(([ukm, count]) => ({ ukm, count }))
          .sort((a, b) => b.count - a.count)
        setVotes(sorted.slice(0, 3)) // tampilkan top 3 aja
      } catch (err) {
        console.error('Gagal ambil voting:', err)
      }
    }

    fetchVotes()
  }, [])

  if (votes.length === 0) return null

  return (
    <section className={styles.previewSection}>
      <h2>🏆 Peringkat UKM Favorit</h2>
      <ul className={styles.rankingList}>
        {votes.map((v, i) => (
          <li key={i}>
            <span className={styles.rank}>
              {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
            </span>
            <span className={styles.ukmName}>{v.ukm}</span>
            <span className={styles.count}>{v.count} suara</span>
          </li>
        ))}
      </ul>
      <a href="/dashboard/admin/peringkat" className={styles.linkLihat}>Lihat Semua &rarr;</a>
    </section>
  )
}
