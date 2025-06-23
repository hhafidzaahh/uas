'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AiOutlineLogin } from 'react-icons/ai' // <- ikon login
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from '@/styles/Login.module.css'

const ukmOptions = [
  'computer-club',
  'basket',
  'badminton',
  'protokol',
  'tema-holic',
  'voli',
  'futsal',
  'himpunan-pengusaha-muda-indonesia',
  'kelompok-studi-islam',
  'paduan-suara-mahasiswa',
]

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('mahasiswa')
  const [ukm, setUkm] = useState('')
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()

    const userData = { username, role }
    if (role === 'pengurus') userData.ukm = ukm

    localStorage.setItem('user', JSON.stringify(userData))
    document.cookie = `user=${JSON.stringify(userData)}; path=/;`

    router.push(`/dashboard/${role}`)
  }

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <form onSubmit={handleLogin} className={styles.form}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
            <AiOutlineLogin size={28} /> Login Akun UKM
          </h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="mahasiswa">Mahasiswa</option>
            <option value="pengurus">Pengurus UKM</option>
            <option value="admin">Admin Kemahasiswaan</option>
          </select>

          {role === 'pengurus' && (
            <select value={ukm} onChange={(e) => setUkm(e.target.value)} required>
              <option value="">Pilih UKM</option>
              {ukmOptions.map((ukmId) => (
                <option key={ukmId} value={ukmId}>
                  {ukmId.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </select>
          )}

          <button type="submit">Login</button>
        </form>
      </main>
      <Footer />
    </>
  )
}
