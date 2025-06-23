'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ukmData from '@/data/ukmData'
import styles from '@/styles/UKMDetail.module.css'
import NavbarPengurus from '@/components/NavbarPengurus'
import Footer from '@/components/Footer'

export default function KelolaProfilUKM() {
  const params = useParams()
  const router = useRouter()
  const ukm = params.ukm?.toLowerCase()

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('Param UKM:', ukm)

    const user = JSON.parse(localStorage.getItem('user'))

    // Validasi user login dan cocok UKM-nya
    if (!user) {
      setError('Kamu belum login.')
      router.push('/')
      return
    }

    if (user.ukm?.toLowerCase() !== ukm) {
      setError('Kamu tidak memiliki akses ke halaman ini.')
      router.push('/')
      return
    }

    // Ambil data dari ukmData berdasarkan slug
    const detail = ukmData[ukm]
    if (!detail) {
      setError(`UKM '${ukm}' tidak ditemukan di database.`)
      return
    }

    setData({ ...detail })
  }, [ukm, router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Data disimpan:', data)
    alert('Profil UKM berhasil disimpan (simulasi)')
  }

  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>
  if (!data) return <p style={{ padding: '2rem' }}>Loading...</p>

  return (
    <>
      <NavbarPengurus />
      <main className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.heading}>Kelola Profil UKM {data.nama}</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <label className={styles.label}>Ketua UKM</label>
              <input
                className={styles.formInput}
                value={data.ketua}
                name="ketua"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className={styles.label}>Deskripsi</label>
              <textarea
                className={`${styles.formInput} ${styles.textareaField}`}
                value={data.deskripsi || ''}
                name="deskripsi"
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div>
              <label className={styles.label}>Kontak</label>
              <input
                className={styles.formInput}
                value={data.kontak || ''}
                name="kontak"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className={styles.label}>Instagram</label>
              <input
                className={styles.formInput}
                value={data.instagram || ''}
                name="instagram"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className={styles.submitButton}>Simpan</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
