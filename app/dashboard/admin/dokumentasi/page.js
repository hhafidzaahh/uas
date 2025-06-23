'use client'

import { useEffect, useState } from 'react'
import NavbarAdmin from '@/components/NavbarAdmin'
import Footer from '@/components/Footer'
import styles from '@/styles/KelolaMahasiswa.module.css' // Pakai styling yang rapi & sudah konsisten

export default function KelolaDokumentasiAdminPage() {
  const [dokumentasiUKM, setDokumentasiUKM] = useState({})

  useEffect(() => {
    const ukmList = ['Himatif', 'Himasi', 'Himakom', 'LPM', 'UKKI'] // Bisa kamu ganti sesuai daftar UKM nyata
    const allDocs = {}

    ukmList.forEach((ukm) => {
      const saved = localStorage.getItem(`dokumentasi-${ukm.toLowerCase()}`)
      if (saved) {
        allDocs[ukm] = JSON.parse(saved)
      }
    })

    setDokumentasiUKM(allDocs)
  }, [])

  return (
    <div className={styles.layoutWrapper}>
      <NavbarAdmin />
      <main className={styles.container}>
        <h1 className={styles.title}>📸 Dokumentasi Semua UKM</h1>

        {Object.keys(dokumentasiUKM).length === 0 ? (
          <p style={{ textAlign: 'center' }}>Belum ada dokumentasi dari UKM manapun.</p>
        ) : (
          Object.entries(dokumentasiUKM).map(([ukm, doks], idx) => (
            <div key={idx} style={{ marginBottom: '3rem' }}>
              <h2 style={{ color: '#7a0026', marginBottom: '1rem' }}>{ukm}</h2>
              {doks.length === 0 ? (
                <p style={{ color: '#6b7280' }}>Belum ada dokumentasi diunggah.</p>
              ) : (
                <ul className={styles.memberList}>
                  {doks.map((item, i) => (
                    <li key={i} className={styles.memberItem}>
                      <img
                        src={item.src}
                        alt={item.name}
                        style={{ maxWidth: '120px', borderRadius: '6px', marginRight: '1rem' }}
                      />
                      <div>
                        <p><strong>{item.name}</strong></p>
                        <p>{item.deskripsi}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </main>
      <Footer />
    </div>
  )
}
