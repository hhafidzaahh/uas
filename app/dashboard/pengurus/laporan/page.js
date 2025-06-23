"use client"

import { useEffect, useState } from "react"
import NavbarPengurus from '@/components/NavbarPengurus'
import styles from "@/styles/DashboardPengurus.module.css"
import Footer from '@/components/Footer'
import Link from "next/link"

export default function LaporanKegiatan() {
  const [user, setUser] = useState(null)
  const [laporanList, setLaporanList] = useState([])
  const [form, setForm] = useState({ judul: "", deskripsi: "", tanggal: "" })
  const [editIndex, setEditIndex] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUser(parsed)

      const saved = localStorage.getItem(`laporan-${parsed.ukm?.toLowerCase()}`)
      if (saved) setLaporanList(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (user?.ukm) {
      localStorage.setItem(`laporan-${user.ukm.toLowerCase()}`, JSON.stringify(laporanList))
    }
  }, [laporanList, user])

  const handleSubmit = (e) => {
    e.preventDefault()
    const updated = [...laporanList]
    if (editIndex !== null) {
      updated[editIndex] = form
    } else {
      updated.push(form)
    }
    setLaporanList(updated)
    setForm({ judul: "", deskripsi: "", tanggal: "" })
    setEditIndex(null)
  }

  const handleDelete = (index) => {
    const filtered = laporanList.filter((_, i) => i !== index)
    setLaporanList(filtered)
  }

  if (!user) return null

  return (
    <>
      <NavbarPengurus/>
      <main className={styles.container}>
        <h1 className={styles.heading}>📝 Laporan Kegiatan</h1>
        <p className={styles.subheading}>Catat dan dokumentasikan laporan kegiatan UKM</p>

        <form onSubmit={handleSubmit} className={styles.agendaForm}>
          <input
            type="text"
            placeholder="Judul Kegiatan"
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            required
          />
          <textarea
            placeholder="Deskripsi Kegiatan"
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            rows={4}
            required
            className={styles.textarea}
          ></textarea>
          <input
            type="date"
            value={form.tanggal}
            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
            required
          />
          <div className={styles.formActions}>
            <button type="submit" className={styles.button}>
              {editIndex !== null ? "Update Laporan" : "Simpan Laporan"}
            </button>
            {editIndex !== null && (
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => {
                  setForm({ judul: "", deskripsi: "", tanggal: "" })
                  setEditIndex(null)
                }}
              >
                Batal
              </button>
            )}
          </div>
        </form>

        <div className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.sectionSpacing}`}>📄 Daftar Laporan Kegiatan</h2>
          {laporanList.length === 0 ? (
            <p>Belum ada laporan kegiatan.</p>
          ) : (
            <ul className={styles.agendaList}>
              {laporanList.map((laporan, i) => (
                <li key={i} className={styles.agendaItem}>
                  <strong>{laporan.judul}</strong>
                  <span>{laporan.tanggal}</span>
                  <p>{laporan.deskripsi}</p>
                  <div>
                    <button className={styles.editButton} onClick={() => {
                      setForm(laporan)
                      setEditIndex(i)
                    }}>Edit</button>
                    <button className={styles.deleteButton} onClick={() => handleDelete(i)}>Hapus</button>
                  </div>
                </li>
              ))}
            </ul>
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
