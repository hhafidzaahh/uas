// featurecard.js
import styles from '@/styles/FeatureCard.module.css'

export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>
    </div>
  )
}
