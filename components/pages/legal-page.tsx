import type { ReactNode } from "react"
import { useTranslations } from "next-intl"
import { Container } from "@/components/ds/primitives"
import { PageHero } from "./page-hero"
import styles from "./pages.module.scss"

export function LegalPage({
  kind,
  date,
  sections,
  children,
}: {
  kind: "privacy" | "terms"
  date: string
  sections: { label: string; id: string }[]
  children: ReactNode
}) {
  const t = useTranslations("Pages.legal")
  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t(`${kind}.title`)} lead={t(`${kind}.lead`)}>
        <p className={`t-mono ${styles.meta}`}>
          <span>{t("version")}</span>
          <span>{t("effective", { date })}</span>
        </p>
      </PageHero>
      <section className={styles.block}>
        <Container className={styles.legal}>
          <nav className={styles.toc} aria-labelledby="toc-title">
            <p id="toc-title" className="t-mono">
              {t("sections")}
            </p>
            <ol>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.label}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className={styles.prose}>{children}</div>
        </Container>
      </section>
    </>
  )
}
