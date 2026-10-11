import Image from "next/image"
import styles from "./logo.module.scss"

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={styles.logo}>
      <Image src="/logo-mark.png" alt="" width={305} height={305} className={styles.mark} priority />
      {!compact && (
        <span className={styles.word} translate="no">
          Geneline<span className={styles.x}>X</span>
        </span>
      )}
    </span>
  )
}
