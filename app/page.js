import Navbar from '@/components/Navbar'
import FeatureCard from '@/components/FeatureCard'
import styles from '@/styles/Landing.module.css'
import PeringkatPreview from '@/components/PeringkatPreview'
import Footer from '@/components/Footer'
import { FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Sistem Informasi UKM</h1>
          <p>Platform digital untuk mengelola informasi dan kegiatan UKM di kampus.</p>
          <a href="/login" className={styles.cta}>Login untuk Memulai</a>
        </section>

        <section className={styles.features}>
          <h2>Fitur Utama</h2>
          <p>Kemudahan dalam mengelola UKM kampus</p>
          <div className={styles.grid}>
            <FeatureCard
              title="Profil UKM"
              desc="Lihat informasi dan visi misi setiap UKM kampus."
              icon="📘"
            />
            <FeatureCard
              title="Pendaftaran Anggota"
              desc="Daftar menjadi bagian dari UKM secara online."
              icon="📝"
            />
            <FeatureCard
              title="Agenda Kegiatan"
              desc="Cek dan ikuti agenda kegiatan UKM terbaru."
              icon="📅"
            />
          </div>
        </section>
        <section className={styles.ukmRoles}>
  <h2>Untuk Siapa Aplikasi Ini?</h2>
  <p>Dirancang untuk mendukung kegiatan dan manajemen UKM di kampus</p>
  <div className={styles.ukmRolesGrid}>
    <div className={styles.ukmRoleCard}>
      <div>👨‍🎓</div>
      <h4>Mahasiswa</h4>
      <p>Ikut serta dan daftarkan diri ke UKM favorit kamu</p>
    </div>
    <div className={styles.ukmRoleCard}>
      <div>👥</div>
      <h4>Pengurus UKM</h4>
      <p>Kelola keanggotaan, agenda, dan dokumentasi kegiatan</p>
    </div>
    <div className={styles.ukmRoleCard}>
      <div>🏛️</div>
      <h4>Admin Kemahasiswaan</h4>
      <p>Monitoring UKM aktif dan laporan kegiatan kampus</p>
    </div>
  </div>
</section>
<PeringkatPreview />
<section className={styles.ukmStats}>
  <div className={styles.ukmStatsGrid}>
    <div className={styles.ukmStatsItem}>20+<span>Unit Kegiatan Mahasiswa</span></div>
    <div className={styles.ukmStatsItem}>500+<span>Mahasiswa Terdaftar</span></div>
    <div className={styles.ukmStatsItem}>24/7<span>Akses Pendaftaran</span></div>
    <div className={styles.ukmStatsItem}>100%<span>Online</span></div>
  </div>
</section>

<section className={styles.ukmProfile}>
  <h3>👩‍💻 Dibuat Oleh</h3>

  <div className={styles.profileCard}>
    <img src="/images/profile.jpeg" alt="Foto Husnul Hapidah" className={styles.profileImage} />
    
    <div className={styles.profileText}>
      <h4 className={styles.profileName}>Husnul Hapidah</h4>
      <p>👩‍🎓 Mahasiswa Komputerisasi Akuntansi - Semester IV</p>
      <p>🏛️ Ma'soem Uniwersity</p>
      <p>🌐 Antusias dalam pengembangan Web dan Sistem Informasi, dengan fokus membangun solusi digital yang efisien, interaktif, dan bermanfaat bagi pengguna.</p>
    </div>
  </div>
  <div className={styles.socialIcons}>
  <a href="https://instagram.com/hhafidzaahh" target="_blank" rel="noopener noreferrer">
    <FaInstagram />
  </a>
  <a href="https://github.com/hhafidzaahh" target="_blank" rel="noopener noreferrer">
    <FaGithub />
  </a>
  <a href="mailto:hafidahhusnul@gmail.com"><FaEnvelope /></a>
</div>
 <hr className={styles.profileDivider} />
  <div className={styles.profileBio}>
    <p>
      Saya membangun sistem informasi ini sebagai solusi digital untuk membantu mahasiswa, pengurus UKM, dan admin kampus dalam mengelola kegiatan, pendaftaran, dan pelaporan UKM secara efisien. Dengan tampilan yang modern dan fitur yang mudah diakses, saya berharap platform ini dapat meningkatkan partisipasi dan transparansi antar seluruh civitas kampus.
    </p>
    <p>
      Teknologi yang digunakan antara lain <strong>Next.js</strong> untuk frontend, <strong>API route</strong> untuk integrasi data, serta <strong>Chart.js</strong> untuk visualisasi grafik. Sistem ini dirancang untuk 100% online dan mobile-friendly.
    </p>
  </div>
</section>
      </main>
      <Footer/>
    </>
  )
}
