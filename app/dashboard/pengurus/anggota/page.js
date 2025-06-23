'use client'

import { useEffect, useState } from 'react'
import styles from '@/styles/DashboardPengurus.module.css'
import NavbarPengurus from '@/components/NavbarPengurus'
import ukmData from '@/data/ukmData'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function KelolaAnggota() {
  const [user, setUser] = useState(null)
  const [anggota, setAnggota] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newAnggota, setNewAnggota] = useState({ nama: '', nim: '', semester: '' })
  const [isEditMode, setIsEditMode] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  // Ambil user dan gabungkan data dari ukmData + localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUser(parsed)

      const ukmKey = parsed.ukm?.toLowerCase()
      const defaultAnggota = ukmData[ukmKey]?.anggota || []
      const saved = localStorage.getItem(`anggota-${ukmKey}`)
      const addedAnggota = saved ? JSON.parse(saved) : []

      setAnggota([...defaultAnggota, ...addedAnggota])
    }
  }, [])

  // Simpan ke localStorage hanya data tambahan, bukan seluruh data gabungan
  const saveToLocal = (list) => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      const ukmKey = parsed.ukm?.toLowerCase()
      const defaultAnggota = ukmData[ukmKey]?.anggota || []

      // Hanya simpan anggota yang bukan default (baru ditambahkan)
      const customAnggota = list.filter(
        (a) => !defaultAnggota.some(
          (d) => d.nama === a.nama && d.nim === a.nim && d.semester === a.semester
        )
      )

      localStorage.setItem(`anggota-${ukmKey}`, JSON.stringify(customAnggota))
    }
  }

  const handleAddAnggota = (e) => {
    e.preventDefault()
    const updated = [...anggota]

    if (isEditMode) {
      updated[editIndex] = newAnggota
    } else {
      updated.push(newAnggota)
    }

    setAnggota(updated)
    saveToLocal(updated)

    setNewAnggota({ nama: '', nim: '', semester: '' })
    setIsModalOpen(false)
    setIsEditMode(false)
    setEditIndex(null)
  }

  const handleDeleteAnggota = (i) => {
    const updated = anggota.filter((_, index) => index !== i)
    setAnggota(updated)
    saveToLocal(updated)
  }

  if (!user) return null

  return (
    <>
      <NavbarPengurus/>
      <main className={styles.container}>
        <h1 className={styles.heading}>👥 Kelola Anggota</h1>
        <p className={styles.subheading}>Manajemen data anggota UKM {user.ukm}</p>

        <div className={styles.section}>
          <ul className={styles.memberList}>
            {anggota.map((a, i) => (
              <li key={i} className={styles.memberItem}>
                👤 {a.nama} - {a.nim} (Semester {a.semester})
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className={styles.editButton} onClick={() => {
                    setNewAnggota(a)
                    setIsEditMode(true)
                    setEditIndex(i)
                    setIsModalOpen(true)
                  }}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteAnggota(i)}>Hapus</button>
                </div>
              </li>
            ))}
          </ul>

          <button
            className={styles.button}
            onClick={() => {
              setNewAnggota({ nama: '', nim: '', semester: '' })
              setIsEditMode(false)
              setIsModalOpen(true)
            }}
          >
            + Tambah Anggota
          </button>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Link href="/dashboard/pengurus">
            <button className={styles.button}>← Kembali ke Dashboard</button>
          </Link>
        </div>

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>{isEditMode ? 'Edit Anggota' : 'Tambah Anggota Baru'}</h3>
              <form onSubmit={handleAddAnggota} className={styles.form}>
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={newAnggota.nama}
                  onChange={(e) => setNewAnggota({ ...newAnggota, nama: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="NIM"
                  value={newAnggota.nim}
                  onChange={(e) => setNewAnggota({ ...newAnggota, nim: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Semester"
                  value={newAnggota.semester}
                  onChange={(e) => setNewAnggota({ ...newAnggota, semester: e.target.value })}
                  required
                />
                <div className={styles.formActions}>
                  <button type="submit" className={styles.button}>
                    {isEditMode ? 'Update' : 'Simpan'}
                  </button>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => {
                      setIsModalOpen(false)
                      setIsEditMode(false)
                      setEditIndex(null)
                      setNewAnggota({ nama: '', nim: '', semester: '' })
                    }}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer/>
    </>
  )
}
