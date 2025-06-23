'use client'
import { useState } from 'react'
import styles from '@/styles/PendaftaranPage.module.css'
import NavbarDashboard from '@/components/NavbarDashboard'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabaseClient'

const ukmList = [
  { name: 'Voli', icon: '🏐' },
  { name: 'Futsal', icon: '⚽' },
  { name: 'Himpunan Pengusaha Muda Indonesia', icon: '💼' },
  { name: 'Badminton', icon: '🏸' },
  { name: 'Computer Club', icon: '💻' },
  { name: 'Basket', icon: '🏀' },
  { name: 'Protokol', icon: '🎤' },
  { name: 'Kelompok Studi Islam', icon: '📖' },
  { name: 'Tema Holic', icon: '🎭' },
  { name: 'Paduan Suara Mahasiswa', icon: '🎶' },
]

export default function PendaftaranPage() {
  const [selectedUKM, setSelectedUKM] = useState(null)
  const [formData, setFormData] = useState({ nama: '', nim: '', prodi: '', fakultas: '', semester: '' })

  const handleOpen = (ukm) => {
    setSelectedUKM(ukm)
    setFormData({ nama: '', nim: '', prodi: '', fakultas: '', semester: '' })
  }

  const handleClose = () => setSelectedUKM(null)

  const handleSubmit = async (e) => {
  e.preventDefault()

  const { data: insertData, error } = await supabase.from('pendaftaran').insert({
    ...formData,
    ukm: selectedUKM.name,
    status: 'pending',
  })

  if (error) {
    console.error('Insert error:', error)
    alert('❌ Gagal mendaftar. Coba lagi.')
    return
  }

  alert(`✅ Berhasil mendaftar ke ${selectedUKM.name}! Menunggu validasi.`)
  handleClose()
}

  return (
    <>
      <NavbarDashboard />
      <main className={styles.container}>
        <h1 className={styles.title}>📝 Pendaftaran UKM</h1>
        <p className={styles.subtitle}>Pilih UKM yang ingin kamu ikuti dan klik tombol daftar.</p>
        <ul className={styles.ukmList}>
          {ukmList.map((ukm, i) => (
            <li key={i} className={styles.ukmItem}>
              <span>{ukm.icon} {ukm.name}</span>
              <button onClick={() => handleOpen(ukm)} className={styles.button}>Daftar</button>
            </li>
          ))}
        </ul>

        {/* === Modal Form === */}
        {selectedUKM && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Formulir Pendaftaran - {selectedUKM.name}</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="NIM"
                  value={formData.nim}
                  onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Program Studi"
                  value={formData.prodi}
                  onChange={(e) => setFormData({ ...formData, prodi: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Fakultas"
                  value={formData.fakultas}
                  onChange={(e) => setFormData({ ...formData, fakultas: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Semester"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  required
                />
                <div className={styles.formActions}>
                  <button type="submit" className={styles.submitBtn}>Kirim</button>
                  <button type="button" onClick={handleClose} className={styles.cancelBtn}>Batal</button>
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
