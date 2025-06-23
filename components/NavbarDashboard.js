'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  FaUniversity, FaHome, FaClipboardCheck, FaPenFancy,
  FaPoll, FaSignOutAlt, FaBars
} from 'react-icons/fa'
import styles from '@/styles/NavbarDashboard.module.css'

export default function NavbarMahasiswa() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <FaUniversity className={styles.logoIcon} />
        <span>Dashboard Mahasiswa</span>
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <FaBars />
      </div>

      <ul className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
        <li className={pathname === '/dashboard/mahasiswa' ? styles.active : ''}>
          <Link href="/dashboard/mahasiswa" onClick={() => setIsOpen(false)}>
            <FaHome /> Home
          </Link>
        </li>
        <li className={pathname === '/dashboard/mahasiswa/ukm' ? styles.active : ''}>
          <Link href="/dashboard/mahasiswa/ukm" onClick={() => setIsOpen(false)}>
            <FaClipboardCheck /> Profil UKM
          </Link>
        </li>
        <li className={pathname === '/dashboard/mahasiswa/pendaftaran' ? styles.active : ''}>
          <Link href="/dashboard/mahasiswa/pendaftaran" onClick={() => setIsOpen(false)}>
            <FaPenFancy /> Pendaftaran UKM
          </Link>
        </li>
        <li className={pathname === '/dashboard/mahasiswa/voting' ? styles.active : ''}>
          <Link href="/dashboard/mahasiswa/voting" onClick={() => setIsOpen(false)}>
            <FaPoll /> Voting Kegiatan
          </Link>
        </li>
        <li>
          <Link href="/" onClick={() => setIsOpen(false)}>
            <FaSignOutAlt /> Logout
          </Link>
        </li>
      </ul>
    </nav>
  )
}
