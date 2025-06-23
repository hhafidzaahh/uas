'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  FaUniversity, FaHome, FaUsers, FaCalendarAlt,
  FaCamera, FaCog, FaSignOutAlt, FaBars,
  FaClipboardList, FaCheckCircle, FaUserCheck
} from 'react-icons/fa'
import styles from '@/styles/NavbarPengurus.module.css'

export default function NavbarPengurus() {
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
        <span>UKM Mahasiswa</span>
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <FaBars />
      </div>

      <ul className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
        <li className={pathname === '/dashboard/pengurus' ? styles.active : ''}>
          <Link href="/dashboard/pengurus" onClick={() => setIsOpen(false)}>
            <FaHome /> Home
          </Link>
        </li>
        <li className={pathname === '/dashboard/pengurus/anggota' ? styles.active : ''}>
          <Link href="/dashboard/pengurus/anggota" onClick={() => setIsOpen(false)}>
            <FaUsers /> Kelola Anggota
          </Link>
        </li>
        <li className={pathname === '/dashboard/pengurus/agenda' ? styles.active : ''}>
          <Link href="/dashboard/pengurus/agenda" onClick={() => setIsOpen(false)}>
            <FaCalendarAlt /> Agenda
          </Link>
        </li>
        <li className={pathname === '/dashboard/pengurus/dokumentasi' ? styles.active : ''}>
          <Link href="/dashboard/pengurus/dokumentasi" onClick={() => setIsOpen(false)}>
            <FaCamera /> Dokumentasi
          </Link>
        </li>
        <li className={pathname === '/dashboard/pengurus/laporan' ? styles.active : ''}>
          <Link href="/dashboard/pengurus/laporan" onClick={() => setIsOpen(false)}>
            <FaClipboardList /> Laporan
          </Link>
        </li>
        <li className={pathname === '/dashboard/pengurus/kehadiran' ? styles.active : ''}>
          <Link href="/dashboard/pengurus/kehadiran" onClick={() => setIsOpen(false)}>
            <FaCheckCircle /> Kehadiran
          </Link>
        </li>
        <li className={pathname === '/dashboard/pengurus/validasi' ? styles.active : ''}>
          <Link href="/dashboard/pengurus/validasi" onClick={() => setIsOpen(false)}>
            <FaUserCheck /> Validasi Pendaftaran
          </Link>
        </li>

        {/* ✅ Perbaikan di sini */}
        {user?.ukm && (
          <li className={pathname.startsWith('/dashboard/pengurus/profil') ? styles.active : ''}>
            <Link href={`/dashboard/pengurus/profil/${user.ukm.toLowerCase()}`} onClick={() => setIsOpen(false)}>
              <FaCog /> Profil UKM
            </Link>
          </li>
        )}

        <li>
          <Link href="/" onClick={() => setIsOpen(false)}>
            <FaSignOutAlt /> Logout
          </Link>
        </li>
      </ul>
    </nav>
  )
}
