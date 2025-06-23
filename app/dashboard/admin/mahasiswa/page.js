'use client'
import { useEffect, useState } from 'react'
import ukmData from '@/data/ukmData'
import styles from '@/styles/KelolaMahasiswa.module.css'
import NavbarAdmin from '@/components/NavbarAdmin'
import Footer from '@/components/Footer'

export default function KelolaMahasiswa() {
  const [mahasiswaList, setMahasiswaList] = useState([])
  const [editMhs, setEditMhs] = useState(null)
  const [deleteMhs, setDeleteMhs] = useState(null)
  const [formData, setFormData] = useState({ nama: '', nim: '', semester: '' })

  useEffect(() => {
    const allMahasiswa = []
    Object.entries(ukmData).forEach(([ukmKey, ukm]) => {
      ukm.anggota.forEach((mhs) => {
        allMahasiswa.push({ ...mhs, ukm: ukm.nama, ukmKey })
      })
    })
    setMahasiswaList(allMahasiswa)
  }, [])

  const handleEditSubmit = () => {
    setMahasiswaList((prev) =>
      prev.map((m) => (m.nim === editMhs.nim ? { ...m, ...formData } : m))
    )
    setEditMhs(null)
  }

  const confirmDelete = () => {
    setMahasiswaList((prev) => prev.filter((m) => m.nim !== deleteMhs.nim))
    setDeleteMhs(null)
  }

  return (
    <>
      <NavbarAdmin />
      <main className={styles.container}>
        <h1 className={styles.title}>Kelola Mahasiswa</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nama</th>
              <th>NIM</th>
              <th>Semester</th>
              <th>UKM</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswaList.map((mhs) => (
              <tr key={mhs.nim}>
                <td>{mhs.nama}</td>
                <td>{mhs.nim}</td>
                <td>{mhs.semester}</td>
                <td>{mhs.ukm}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.edit}
                    onClick={() => {
                      setEditMhs(mhs)
                      setFormData({
                        nama: mhs.nama,
                        nim: mhs.nim,
                        semester: mhs.semester,
                      })
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className={styles.delete}
                    onClick={() => setDeleteMhs(mhs)}
                  >
                    🗑️ Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal Edit */}
        {editMhs && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Edit Mahasiswa</h2>
              <label>Nama</label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              />
              <label>NIM</label>
              <input
                type="text"
                value={formData.nim}
                onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
              />
              <label>Semester</label>
              <input
                type="number"
                value={formData.semester}
                onChange={(e) =>
                  setFormData({ ...formData, semester: e.target.value })
                }
              />
              <div style={{ marginTop: '1rem' }}>
                <button onClick={handleEditSubmit}>💾 Simpan</button>
                <button
                  className={styles.cancel}
                  onClick={() => setEditMhs(null)}
                  style={{ marginLeft: '1rem' }}
                >
                  ❌ Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Konfirmasi Hapus */}
        {deleteMhs && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3>Hapus Mahasiswa</h3>
              <p>
                Yakin ingin menghapus <strong>{deleteMhs.nama}</strong> dari daftar?
              </p>
              <div style={{ marginTop: '1rem' }}>
                <button onClick={confirmDelete} className={styles.delete}>
                  ✅ Ya, Hapus
                </button>
                <button
                  onClick={() => setDeleteMhs(null)}
                  style={{ marginLeft: '1rem' }}
                >
                  ❌ Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
