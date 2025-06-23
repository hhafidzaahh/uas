'use client'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FaUniversity, FaHome, FaSignInAlt } from 'react-icons/fa'
import styles from '@/styles/Navbar.module.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <FaUniversity className={styles.logoIcon} />
        <span>UKM Info System</span>
      </div>
      <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <ul className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
        <li className={pathname === '/' ? styles.active : ''}>
          <Link href="/">
            <FaHome style={{ marginRight: '0.5rem' }} /> Home
          </Link>
        </li>
        <li className={pathname === '/login' ? styles.active : ''}>
          <Link href="/login">
            <FaSignInAlt style={{ marginRight: '0.5rem' }} /> Login
          </Link>
        </li>
      </ul>
    </nav>
  )
}
