// components/Footer.js
import styles from '@/styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Husnul Hapidah — Sistem Informasi UKM</p>
    </footer>
  )
}
