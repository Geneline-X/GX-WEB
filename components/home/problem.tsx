import { useTranslations } from "next-intl"
import { Container } from "@/components/ds/primitives"
import { rich } from "@/components/ds/rich"
import { Reveal } from "@/components/motion/reveal"
import { LanguagesField } from "./languages-field"
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
          <LanguagesField />
          <figcaption className={styles.legend}>
            <span className={styles.key} data-heard>
              {t("legendHeard")}
            </span>
            <span className={styles.key}>{t("legendSpoken")}</span>
          </figcaption>
        </figure>
      </Container>
    </section>
  )
}
