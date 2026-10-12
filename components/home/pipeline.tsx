import Image from "next/image"
import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/ds/primitives"
import { Button } from "@/components/ds/button"
import { rich } from "@/components/ds/rich"
import { Reveal } from "@/components/motion/reveal"
import { EXTERNAL } from "@/lib/site"
import styles from "./pipeline.module.scss"

// Photos: Unsplash License, credits in public/images/pipeline/CREDITS.md.
const STEPS = [
  { key: "collect", href: EXTERNAL.kaccp },
  { key: "curate", href: "/console/datasets" },
  { key: "train", href: "/blog" },
  { key: "deploy", href: EXTERNAL.kayx },
] as const

type StepKey = (typeof STEPS)[number]["key"]

function Overlay({ step }: { step: StepKey }) {
  const t = useTranslations("Home.pipeline.visual")

  if (step === "collect") {
    return (
      <>
        <span className={styles.chip} style={{ bottom: "34%", left: "8%" }}>
          {t("voiceNotes")}
        </span>
        <span className={styles.chip} style={{ bottom: "8%", right: "8%" }} translate="no">
          Krio · kri
        </span>
      </>
    )
  }

  if (step === "curate") {
    return (
      <div className={styles.note}>
        <p className={styles.noteLabel}>
          <span aria-hidden="true" />
          {t("review")}
        </p>
        <p className={styles.krio} lang="kri">
          Wetin na yu nem?
        </p>
        <p className={styles.english}>
          <mark>{t("english")}</mark>
        </p>
        <span className={styles.chip} data-solid>
          {t("reviewOn")}
        </span>
      </div>
    )
  }

  if (step === "train") {
    return (
      <pre className={styles.code} translate="no">
        <code>{`{
  "language": "kri",
  "method": "LoRA",
  "trainable_weights": "< 2%",
  "metric": "WER"
}`}</code>
      </pre>
    )
  }

  return (
    <div className={styles.ships}>
      <p className={styles.noteLabel}>
        <span aria-hidden="true" />
        {t("shipsTo")}
      </p>
      <ul>
        {["Kay-X API", "Xplain", "GeneStudio"].map((name) => (
          <li key={name} translate="no">
            {name}
            <ArrowRight aria-hidden className={styles.shipArrow} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Pipeline() {
  const t = useTranslations("Home.pipeline")

  return (
    <section id="pipeline" className={styles.section} aria-labelledby="pipeline-title">
      <Container>
        <Reveal className={styles.head}>
          <p className="t-mono" data-r>
            {t("eyebrow")}
          </p>
          <h2 id="pipeline-title" className="t-h2" data-r-lines>
            {t.rich("title", rich)}
          </h2>
        </Reveal>

        <Reveal as="ol" className={styles.grid}>
          {STEPS.map((s) => (
            <li key={s.key} className={styles.card} data-r>
              <div className={styles.visual} aria-hidden="true">
                <Image
                  src={`/images/pipeline/${s.key}.webp`}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className={styles.photo}
                />
                <Overlay step={s.key} />
              </div>
              <h3 className={styles.title}>{t(`steps.${s.key}.title`)}</h3>
              <p className={styles.body}>{t(`steps.${s.key}.body`)}</p>
              <Button href={s.href} variant="soft" size="sm" arrow className={styles.cta}>
                {t(`steps.${s.key}.cta`)}
              </Button>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
