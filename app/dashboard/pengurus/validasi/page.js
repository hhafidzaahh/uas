'use client'
import { useEffect, useState } from 'react'
import styles from '@/styles/ValidasiPage.module.css'
import NavbarPengurus from '@/components/NavbarPengurus'
import Footer from '@/components/Footer'

export default function ValidasiPendaftaranPage() {
  const [pendaftar, setPendaftar] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [ukm, setUkm] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed)
      setUkm(parsed.ukm?.toLowerCase())
    }
  }, [])

  useEffect(() => {
    if (!ukm) return
    const fetchPendaftar = async () => {
      const res = await fetch(`/api/pendaftaran/${ukm}`)
      const data = await res.json()
      setPendaftar(data)
      setLoading(false)
    }
    fetchPendaftar()
  }, [ukm])

  const handleValidasi = async (id, status) => {
    const res = await fetch('/api/pendaftaran/validasi', {
      method: 'POST',
      body: JSON.stringify({ id, status }),
    })

    if (res.ok) {
      setPendaftar(prev =>
        prev.map(p => (p.id === id ? { ...p, status } : p))
      )
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <>
      <NavbarPengurus />
      <main className={styles.container}>
        <h1>Validasi Pendaftaran UKM</h1>
        <table className={styles.tabel}>
          <thead>
            <tr>
              <th>Nama</th>
              <th>NIM</th>
              <th>UKM</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pendaftar.map(p => (
              <tr key={p.id}>
                <td>{p.nama}</td>
                <td>{p.nim}</td>
                <td>{p.prodi}</td>
                <td>{p.status}</td>
                <td>
                  {p.status === 'pending' && (
                    <>
                      <button
                        className={`${styles.aksiBtn} ${styles.btnTerima}`}
                        onClick={() => handleValidasi(p.id, 'diterima')}
                      >
                        Terima
                      </button>
                      <button
                        className={`${styles.aksiBtn} ${styles.btnTolak}`}
                        onClick={() => handleValidasi(p.id, 'ditolak')}
                      >
                        Tolak
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer/>
    </>
  )
}
