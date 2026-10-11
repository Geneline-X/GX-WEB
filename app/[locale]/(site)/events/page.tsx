import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import { Container } from "@/components/ds/primitives"
import { Button } from "@/components/ds/button"
import { rich } from "@/components/ds/rich"
import { PageHero } from "@/components/pages/page-hero"
import { CONTACT } from "@/lib/site"
import styles from "@/components/pages/pages.module.scss"

export const metadata: Metadata = { title: "Events" }

export default function EventsPage() {
  const t = useTranslations("Pages.events")
  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t.rich("title", rich)} lead={t("lead")} />
      <section className={styles.block}>
        <Container>
          <div className={styles.emptyPanel}>
            <h2>{t("empty")}</h2>
            <p>{t("emptyBody")}</p>
            <Button href={`mailto:${CONTACT.email}?subject=Notify%20me%20about%20GenelineX%20events`} variant="outline">
              {t("notify")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
