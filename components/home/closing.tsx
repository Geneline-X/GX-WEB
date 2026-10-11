import { useTranslations } from "next-intl"
import { Container } from "@/components/ds/primitives"
import { Button } from "@/components/ds/button"
import { rich } from "@/components/ds/rich"
import { Reveal } from "@/components/motion/reveal"
import { EXTERNAL } from "@/lib/site"
import styles from "./closing.module.scss"

export function Closing() {
  const t = useTranslations("Home.cta")
  return (
    <section className={styles.section} data-theme="dark" aria-labelledby="cta-title">
      <Container>
        <Reveal className={styles.inner}>
          <h2 id="cta-title" className={`t-display ${styles.title}`} data-r-lines>
            {t.rich("title", rich)}
          </h2>
          <p className="t-lead" data-r>
            {t("body")}
          </p>
          <div className={styles.ctas} data-r>
            <Button href="/contact-us" size="lg" variant="accent" arrow>
              {t("primary")}
            </Button>
            <Button href={EXTERNAL.kaccp} size="lg" variant="outline">
              {t("secondary")}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
