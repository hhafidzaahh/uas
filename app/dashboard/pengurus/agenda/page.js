'use client'

import { useEffect, useState } from 'react'
import styles from '@/styles/DashboardPengurus.module.css'
import NavbarPengurus from '@/components/NavbarPengurus'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function AgendaKegiatan() {
  const [user, setUser] = useState(null)
  const [agendaList, setAgendaList] = useState([])
  const [agendaForm, setAgendaForm] = useState({ judul: '', tanggal: '', tempat: '' })
  const [agendaEditIndex, setAgendaEditIndex] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUser(parsed)

      const saved = localStorage.getItem(`agenda-${parsed.ukm?.toLowerCase()}`)
      if (saved) {
        setAgendaList(JSON.parse(saved))
      }
    }
  }, [])

  useEffect(() => {
    if (user?.ukm) {
      localStorage.setItem(`agenda-${user.ukm.toLowerCase()}`, JSON.stringify(agendaList))
    }
  }, [agendaList, user])

  const handleSubmit = (e) => {
    e.preventDefault()
    const updated = [...agendaList]
    if (agendaEditIndex !== null) {
      updated[agendaEditIndex] = agendaForm
    } else {
      updated.push(agendaForm)
    }
    setAgendaList(updated)
    setAgendaForm({ judul: '', tanggal: '', tempat: '' })
    setAgendaEditIndex(null)
  }

  const handleDelete = (i) => {
    const filtered = agendaList.filter((_, index) => index !== i)
    setAgendaList(filtered)
    setAgendaEditIndex(null)
  }

  if (!user) return null

  return (
    <>
      <NavbarPengurus/>
      <main className={styles.container}>
        <h1 className={styles.heading}>📅 Agenda Kegiatan</h1>
        <p className={styles.subheading}>Kelola agenda kegiatan UKM {user.ukm}</p>

        <ul className={styles.agendaList}>
          {agendaList.map((agenda, i) => (
            <li key={i} className={styles.agendaItem}>
              📌 <strong>{agenda.judul}</strong> - {agenda.tanggal} @ {agenda.tempat}
              <div>
                <button
                  className={styles.editButton}
                  onClick={() => {
                    setAgendaForm(agenda)
                    setAgendaEditIndex(i)
                  }}
                >
                  Edit
                </button>
                <button className={styles.deleteButton} onClick={() => handleDelete(i)}>
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className={styles.agendaForm}>
          <input
            type="text"
            placeholder="Judul Kegiatan"
            value={agendaForm.judul}
            onChange={(e) => setAgendaForm({ ...agendaForm, judul: e.target.value })}
            required
          />
          <input
            type="date"
            value={agendaForm.tanggal}
            onChange={(e) => setAgendaForm({ ...agendaForm, tanggal: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Tempat Pelaksanaan"
            value={agendaForm.tempat}
            onChange={(e) => setAgendaForm({ ...agendaForm, tempat: e.target.value })}
            required
          />
          <div className={styles.formActions}>
            <button type="submit" className={styles.button}>
              {agendaEditIndex !== null ? 'Update Agenda' : 'Simpan Agenda'}
            </button>
            {agendaEditIndex !== null && (
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => {
                  setAgendaForm({ judul: '', tanggal: '', tempat: '' })
                  setAgendaEditIndex(null)
                }}
              >
                Batal
              </button>
            )}
          </div>
        </form>

        {/* Tombol kembali */}
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
