import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import { Container } from "@/components/ds/primitives"
import { rich } from "@/components/ds/rich"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/pages/page-hero"
import styles from "@/components/pages/pages.module.scss"

export const metadata: Metadata = { title: "Company" }

type Milestone = { year: string; title: string; body: string }
const PRINCIPLES = ["mission", "vision", "approach"] as const
const NUMBERS = ["products", "languages", "clients", "team"] as const

export default function CompanyPage() {
  const t = useTranslations("Pages.company")
  const empty = useTranslations("Console.empty")
  const timeline = t.raw("timeline") as Milestone[]

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t.rich("title", rich)} lead={t("lead")} />

      <section className={styles.block}>
        <Container>
          <Reveal as="ul" className={styles.trio}>
            {PRINCIPLES.map((k) => (
              <li key={k} data-r>
                <h2>{t(`principles.${k}.title`)}</h2>
                <p>{t(`principles.${k}.body`)}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className={styles.block} aria-labelledby="timeline-title">
        <Container>
          <h2 id="timeline-title" className={`t-h2 ${styles.blockTitle}`}>
            {t.rich("timelineTitle", rich)}
          </h2>
          <Reveal as="ol" className={styles.timeline}>
            {timeline.map((m) => (
              <li key={m.title} data-r>
                <span className={`t-num ${styles.year}`}>{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className={styles.block} aria-labelledby="numbers-title">
        <Container>
          <h2 id="numbers-title" className={`t-h3 ${styles.blockTitle}`}>
            {t("numbersTitle")}
          </h2>
          <ul className={styles.numbers}>
            {NUMBERS.map((k) => (
              <li key={k} className={styles.number}>
                <div className={styles.numberEmpty} aria-hidden="true" />
                <p>
                  {t(`numbers.${k}`)}
                  <span className="sr-only">: {empty("title")}</span>
                </p>
              </li>
            ))}
          </ul>
          <p className={styles.note}>{empty("needs", { what: t("numbersNeeds") })}</p>
        </Container>
      </section>
    </>
  )
}
