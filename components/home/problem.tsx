import { useTranslations } from "next-intl"
import { Container } from "@/components/ds/primitives"
import { rich } from "@/components/ds/rich"
import { Reveal } from "@/components/motion/reveal"
import { AmbientVideo } from "./ambient-video"
import styles from "./problem.module.scss"

export function Problem() {
  const t = useTranslations("Home.problem")
  return (
    <section className={styles.section} data-theme="dark" aria-labelledby="problem-title">
      {/* Footage: Pexels License, credits in public/videos/CREDITS.md. */}
      <div className={styles.media} aria-hidden="true">
        <AmbientVideo src="/videos/market.mp4" poster="/videos/market.jpg" className={styles.video} />
      </div>
      <Container className={styles.content}>
        <Reveal className={styles.head}>
          <h2 id="problem-title" className={`t-h1 ${styles.title}`} data-r-lines>
            {t.rich("title", rich)}
          </h2>
          <div className={styles.body}>
            <p data-r>{t("p1")}</p>
            <p data-r>{t("p2")}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
