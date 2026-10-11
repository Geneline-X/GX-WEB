import { useTranslations } from "next-intl"
import { Container } from "@/components/ds/primitives"
import { rich } from "@/components/ds/rich"
import { Reveal } from "@/components/motion/reveal"
import { Journey } from "./journey"
import styles from "./problem.module.scss"

export function Problem() {
  const t = useTranslations("Home.problem")
  return (
    <section className={styles.section} data-theme="dark" aria-labelledby="problem-title">
      <Container>
        <Reveal className={styles.head}>
          <h2 id="problem-title" className={`t-h1 ${styles.title}`} data-r-lines>
            {t.rich("title", rich)}
          </h2>
          <div className={styles.body}>
            <p data-r>{t("p1")}</p>
            <p data-r>{t("p2")}</p>
          </div>
        </Reveal>

        <figure className={styles.figure}>
          <figcaption className="sr-only">{t("diagram")}</figcaption>
          <div className={styles.card}>
            <p className={`t-h4 ${styles.cardTitle}`}>{t.rich("without", rich)}</p>
            <Journey variant="mess" />
          </div>
          <div className={`${styles.card} ${styles.clean}`} data-theme="adire">
            <p className={`t-h4 ${styles.cardTitle}`}>{t.rich("with", rich)}</p>
            <Journey variant="clean" />
          </div>
        </figure>
      </Container>
    </section>
  )
}
