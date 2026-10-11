"use client"

import { useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Container, Eyebrow } from "@/components/ds/primitives"
import { rich } from "@/components/ds/rich"
import { LoomCanvas } from "@/components/gl/loom-canvas"
import type { Loom } from "@/lib/gl/loom"
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap"
import styles from "./pipeline.module.scss"

const STEPS = ["collect", "curate", "train", "deploy"] as const

export function Pipeline() {
  const t = useTranslations("Home.pipeline")
  const root = useRef<HTMLElement>(null)
  const loom = useRef<Loom | null>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]")
      const reduced = prefersReducedMotion()
      // Each step owns one shape; the loom morphs while you scroll between them.
      const triggers = steps.map((el, i) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => self.isActive && setActive(i),
        }),
      )
      const progress = ScrollTrigger.create({
        trigger: "[data-steps]",
        start: "top 60%",
        end: "bottom 60%",
        scrub: reduced ? false : 0.6,
        onUpdate: (self) => {
          const l = loom.current
          if (!l) return
          const m = gsap.utils.clamp(0, 3, self.progress * 3.5 - 0.25)
          l.state.morph = reduced ? Math.round(m) : m
          l.state.lit = gsap.utils.clamp(0, 1, (l.state.morph - 2.3) / 0.7)
        },
      })
      return () => {
        triggers.forEach((tr) => tr.kill())
        progress.kill()
      }
    },
    { scope: root },
  )

  return (
    <section ref={root} id="pipeline" className={styles.section} data-theme="dark" aria-labelledby="pipeline-title">
      <Container>
        <header className={styles.head}>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="pipeline-title" className="t-h2">
            {t.rich("title", rich)}
          </h2>
        </header>
      </Container>
      <Container className={styles.grid}>
        <div className={styles.text}>
          <ol className={styles.steps} data-steps>
            {STEPS.map((s, i) => (
              <li key={s} className={styles.step} data-step data-active={active === i || undefined}>
                <span className={`t-num ${styles.index}`} aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="t-h3">{t(`steps.${s}.title`)}</h3>
                <p className={styles.body}>{t(`steps.${s}.body`)}</p>
                <p className={`t-mono ${styles.meta}`}>{t(`steps.${s}.meta`)}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.sticky} aria-hidden="true">
          <div className={styles.canvasBox}>
            <LoomCanvas intro={false} fit={{ x: 0.06, y: 0.06, w: 0.88, h: 0.88 }} onReady={(l) => (loom.current = l)} />
            <ol className={styles.rail}>
              {STEPS.map((s, i) => (
                <li key={s} data-on={i <= active || undefined} className="t-mono">
                  {t(`steps.${s}.title`)}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
