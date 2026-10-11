import type { ReactNode } from "react"
import { Container, Eyebrow } from "@/components/ds/primitives"
import { Reveal } from "@/components/motion/reveal"
import styles from "./pages.module.scss"

export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead?: string; children?: ReactNode }) {
  return (
    <header className={styles.hero}>
      <Container>
        <Reveal className={styles.heroInner}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className={`t-h1 ${styles.heroTitle}`} data-r-lines>
            {title}
          </h1>
          {lead && (
            <p className="t-lead" data-r>
              {lead}
            </p>
          )}
          {children}
        </Reveal>
      </Container>
    </header>
  )
}
