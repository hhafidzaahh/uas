'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  FaUniversity, FaHome, FaUsers, FaCalendarAlt,
  FaChartBar, FaThumbsUp, FaSignOutAlt, FaBars
} from 'react-icons/fa'
import styles from '@/styles/NavbarPengurus.module.css' // Reuse CSS dari pengurus

export default function NavbarAdmin() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <FaUniversity className={styles.logoIcon} />
        <span>Admin Kemahasiswaan</span>
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <FaBars />
      </div>

      <ul className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
  <li className={pathname === '/dashboard/admin' ? styles.active : ''}>
    <Link href="/dashboard/admin" onClick={() => setIsOpen(false)}>
      <FaHome /> Home
    </Link>
  </li>
  <li className={pathname === '/dashboard/admin/ukm' ? styles.active : ''}>
    <Link href="/dashboard/admin/ukm" onClick={() => setIsOpen(false)}>
      <FaUsers /> Kelola UKM
    </Link>
  </li>
  <li className={pathname === '/dashboard/admin/mahasiswa' ? styles.active : ''}>
    <Link href="/dashboard/admin/mahasiswa" onClick={() => setIsOpen(false)}>
      <FaUsers /> Kelola Mahasiswa
    </Link>
  </li>
  <li className={pathname === '/dashboard/admin/agenda' ? styles.active : ''}>
    <Link href="/dashboard/admin/agenda" onClick={() => setIsOpen(false)}>
      <FaCalendarAlt /> Kelola Agenda
    </Link>
  </li>
  <li className={pathname === '/dashboard/admin/dokumentasi' ? styles.active : ''}>
    <Link href="/dashboard/admin/dokumentasi" onClick={() => setIsOpen(false)}>
      <FaCalendarAlt /> Dokumentasi
    </Link>
  </li>
  <li className={pathname === '/dashboard/admin/voting' ? styles.active : ''}>
    <Link href="/dashboard/admin/voting" onClick={() => setIsOpen(false)}>
      <FaThumbsUp /> Kelola Voting
    </Link>
  </li>
  <li className={pathname === '/dashboard/admin/peringkat' ? styles.active : ''}>
    <Link href="/dashboard/admin/peringkat" onClick={() => setIsOpen(false)}>
      <FaChartBar /> Peringkat UKM
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
