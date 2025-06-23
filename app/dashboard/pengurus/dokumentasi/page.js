'use client'

import { useEffect, useState } from 'react'
import styles from '@/styles/DashboardPengurus.module.css'
import NavbarPengurus from '@/components/NavbarPengurus'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function UploadDokumentasi() {
  const [user, setUser] = useState(null)
  const [files, setFiles] = useState([])
  const [deskripsi, setDeskripsi] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUser(parsed)

      const saved = localStorage.getItem(`dokumentasi-${parsed.ukm?.toLowerCase()}`)
      if (saved) {
        setFiles(JSON.parse(saved))
      }
    }
  }, [])

  useEffect(() => {
    if (user?.ukm) {
      localStorage.setItem(`dokumentasi-${user.ukm.toLowerCase()}`, JSON.stringify(files))
    }
  }, [files, user])

  const handleUpload = (e) => {
    e.preventDefault()
    const fileInput = document.getElementById('uploadInput')
    const file = fileInput.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setFiles([
          ...files,
          { src: reader.result, name: file.name, deskripsi }
        ])
        setDeskripsi('')
        fileInput.value = ''
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDelete = (index) => {
    const updated = files.filter((_, i) => i !== index)
    setFiles(updated)
  }

  if (!user) return null

  return (
    <>
      <NavbarPengurus/>
      <main className={styles.container}>
        <h1 className={styles.heading}>📸 Upload Dokumentasi</h1>
        <p className={styles.subheading}>Unggah dokumentasi kegiatan UKM {user.ukm}</p>

        <form onSubmit={handleUpload} className={styles.uploadBox}>
          <input
            type="file"
            id="uploadInput"
            className={styles.uploadInput}
            accept="image/*"
            required
          />
          <input
            type="text"
            placeholder="Deskripsi singkat"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>Upload</button>
        </form>

        {/* Tambahkan margin top */}
        <div className={styles.section} style={{ marginTop: '3rem' }}>
            <h3 className={styles.sectionTitle}>📂 Daftar Dokumentasi</h3>
            {files.length === 0 ? (
                <p style={{ color: '#6b7280' }}>Belum ada dokumentasi yang diunggah.</p>
            ) : (
            <ul className={styles.memberList}>
                {files.map((f, i) => (
                    <li key={i} className={styles.memberItem}>
                        <img src={f.src} alt={f.name} style={{ maxWidth: '100px', borderRadius: '6px' }} />
                        <div>
                            <p><strong>{f.name}</strong></p>
                            <p>{f.deskripsi}</p>
                        </div>
                        <button className={styles.deleteButton} onClick={() => handleDelete(i)}>Hapus</button>
                    </li>
                ))}
                </ul>
            )}
        </div>

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
