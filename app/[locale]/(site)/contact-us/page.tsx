import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import { Container } from "@/components/ds/primitives"
import { rich } from "@/components/ds/rich"
import { PageHero } from "@/components/pages/page-hero"
import { CalendlyEmbed } from "@/components/pages/calendly-embed"
import { CONTACT } from "@/lib/site"
import styles from "@/components/pages/pages.module.scss"

export const metadata: Metadata = { title: "Contact" }

type Reason = { title: string; body: string }

export default function ContactPage() {
  const t = useTranslations("Pages.contact")
  const reasons = t.raw("reasons") as Reason[]

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t.rich("title", rich)} lead={t("lead")} />
      <section className={styles.block}>
        <Container>
          <ul className={styles.trio}>
            {reasons.map((r) => (
              <li key={r.title}>
                <h2>{r.title}</h2>
                <p>{r.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className={styles.block} aria-labelledby="schedule-title">
        <Container>
          <h2 id="schedule-title" className={`t-h3 ${styles.blockTitle}`}>
            {t("schedule")}
          </h2>
          <CalendlyEmbed />
          <p className={styles.mail}>
            {t("email")} <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </Container>
      </section>
    </>
  )
}
