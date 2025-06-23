'use client'

import { useEffect, useState } from 'react'
import NavbarAdmin from '@/components/NavbarAdmin'
import Footer from '@/components/Footer'
import styles from '@/styles/DashboardAdminUKM.module.css'

export default function KelolaUKMPage() {
  const [ukms, setUkms] = useState([])
  const [editUkm, setEditUkm] = useState(null)
  const [formData, setFormData] = useState({
    nama: '',
    singkatan: '',
    deskripsi: '',
    ketua: '',
  })

  useEffect(() => {
    const fetchUKM = async () => {
      try {
        const res = await fetch('/api/admin/ukm')
        if (!res.ok) throw new Error('Gagal mengambil data UKM')
        const result = await res.json()
        setUkms(result)
      } catch (error) {
        console.error('Error mengambil UKM:', error)
      }
    }

    fetchUKM()
  }, [])

  const handleEditClick = (ukm) => {
    setEditUkm(ukm)
    setFormData({
      nama: ukm.nama,
      singkatan: ukm.singkatan || '',
      deskripsi: ukm.deskripsi || '',
      ketua: ukm.ketua || '',
    })
  }

  const handleDelete = (ukmId) => {
    const ukmToDelete = ukms.find((u) => u.id === ukmId)
    if (!ukmToDelete) return

    const konfirmasi = window.confirm(
      `⚠️ Yakin ingin menghapus UKM "${ukmToDelete.nama}"?\nTindakan ini tidak dapat dibatalkan.`
    )

    if (konfirmasi) {
      setUkms((prev) => prev.filter((u) => u.id !== ukmId))
      window.alert(`✅ UKM "${ukmToDelete.nama}" berhasil dihapus.`)
    }
  }

  const handleEditSubmit = () => {
    setUkms((prev) =>
      prev.map((u) => (u.id === editUkm.id ? { ...u, ...formData } : u))
    )
    setEditUkm(null)
  }

  return (
    <div className={styles.layoutWrapper}>
      <NavbarAdmin />
      <main className={`${styles.container} ${styles.mainContent}`}>
        <h1 className={styles.title}>Kelola UKM</h1>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nama UKM</th>
                <th>Ketua</th>
                <th>Jumlah Anggota</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {ukms.length === 0 ? (
                <tr>
                  <td colSpan="4">Belum ada data UKM.</td>
                </tr>
              ) : (
                ukms.map((ukm, index) => (
                  <tr key={index}>
                    <td>{ukm.nama}</td>
                    <td>{ukm.ketua}</td>
                    <td>{ukm.anggota?.length || 0}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={`${styles.button} ${styles.editButton}`}
                          onClick={() => handleEditClick(ukm)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className={`${styles.button} ${styles.deleteButton}`}
                          onClick={() => handleDelete(ukm.id)}
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Edit UKM */}
        {editUkm && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Edit UKM</h2>
              <label>Nama UKM</label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
              />
              <label>Singkatan</label>
              <input
                type="text"
                value={formData.singkatan}
                onChange={(e) =>
                  setFormData({ ...formData, singkatan: e.target.value })
                }
              />
              <label>Deskripsi</label>
              <textarea
                rows="3"
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
              />
              <label>Ketua</label>
              <input
                type="text"
                value={formData.ketua}
                onChange={(e) =>
                  setFormData({ ...formData, ketua: e.target.value })
                }
              />
              <div className={styles.modalButtons}>
                <button className="save" onClick={handleEditSubmit}>
                  ✏️ Simpan
                </button>
                <button className="cancel" onClick={() => setEditUkm(null)}>
                  ❌ Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
