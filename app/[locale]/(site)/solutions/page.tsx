import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import { Container, Tag } from "@/components/ds/primitives"
import { Button } from "@/components/ds/button"
import { rich } from "@/components/ds/rich"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/pages/page-hero"
import styles from "@/components/pages/pages.module.scss"

export const metadata: Metadata = { title: "Solutions" }

type UseCase = { category: string; title: string; body: string; product: string; features: string[] }

export default function SolutionsPage() {
  const t = useTranslations("Pages.solutions")
  const items = t.raw("items") as UseCase[]

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t.rich("title", rich)} lead={t("lead")} />
      <section className={styles.block}>
        <Container>
          <Reveal as="ul" className={styles.cases}>
            {items.map((c) => (
              <li key={c.title} data-r>
                <article className={styles.case}>
                  <div className={styles.caseHead}>
                    <span className="t-mono">{c.category}</span>
                    <span className="t-small">
                      {t("uses")} {c.product}
                    </span>
                  </div>
                  <h2>{c.title}</h2>
                  <p>{c.body}</p>
                  <ul>
                    {c.features.map((f) => (
                      <li key={f}>
                        <Tag done>{f}</Tag>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </Reveal>
          <div className={styles.custom}>
            <p>{t("custom")}</p>
            <Button href="/contact-us" arrow>
              {t("customCta")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
