'use client'

import { useEffect, useState } from 'react'
import styles from '@/styles/KelolaMahasiswa.module.css'
import NavbarAdmin from '@/components/NavbarAdmin'
import Footer from '@/components/Footer'

export default function KelolaAgendaAdminPage() {
  const [agendaList, setAgendaList] = useState([])
  const [editAgenda, setEditAgenda] = useState(null)
  const [formData, setFormData] = useState({
    ukm: '',
    judul: '',
    tanggal: '',
    tempat: ''
  })

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const res = await fetch('/api/admin/agenda')
        if (!res.ok) throw new Error('Gagal mengambil data agenda')
        const data = await res.json()
        setAgendaList(data)
      } catch (error) {
        console.error('Gagal ambil agenda:', error)
      }
    }

    fetchAgenda()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus agenda ini?')) return
    try {
      const res = await fetch(`/api/admin/agenda/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal hapus')
      setAgendaList(agendaList.filter(item => item.id !== id))
    } catch (error) {
      console.error('Gagal hapus agenda:', error)
    }
  }

  const handleEditClick = (agenda) => {
    setEditAgenda(agenda)
    setFormData({
      ukm: agenda.ukm || '',
      judul: agenda.judul || '',
      tanggal: agenda.tanggal || '',
      tempat: agenda.tempat || ''
    })
  }

  const handleEditSubmit = () => {
    setAgendaList(prev =>
      prev.map(item => item.id === editAgenda.id ? { ...item, ...formData } : item)
    )
    setEditAgenda(null)
  }

  return (
    <div className={styles.layoutWrapper}>
      <NavbarAdmin />
      <main className={`${styles.container} ${styles.mainContent}`}>
        <h1 className={styles.title}>Kelola Agenda Semua UKM</h1>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>UKM</th>
                <th>Judul</th>
                <th>Tanggal</th>
                <th>Tempat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {agendaList.length === 0 ? (
                <tr>
                  <td colSpan="5">Belum ada agenda yang terdaftar.</td>
                </tr>
              ) : (
                agendaList.map((agenda, i) => (
                  <tr key={i}>
                    <td>{agenda.ukm}</td>
                    <td>{agenda.judul}</td>
                    <td>{agenda.tanggal}</td>
                    <td>{agenda.tempat}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={`${styles.button} ${styles.edit}`}
                          onClick={() => handleEditClick(agenda)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className={`${styles.button} ${styles.delete}`}
                          onClick={() => handleDelete(agenda.id)}
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

        {/* Modal Edit */}
        {editAgenda && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Edit Agenda</h2>
              <label>UKM</label>
              <input
                type="text"
                value={formData.ukm}
                onChange={(e) => setFormData({ ...formData, ukm: e.target.value })}
              />
              <label>Judul</label>
              <input
                type="text"
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
              />
              <label>Tanggal</label>
              <input
                type="date"
                value={formData.tanggal}
                onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
              />
              <label>Tempat</label>
              <input
                type="text"
                value={formData.tempat}
                onChange={(e) => setFormData({ ...formData, tempat: e.target.value })}
              />

              <div className={styles.modalButtons}>
                <button className={styles.save} onClick={handleEditSubmit}>✔️ Simpan</button>
                <button className={styles.cancel} onClick={() => setEditAgenda(null)}>❌ Batal</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
