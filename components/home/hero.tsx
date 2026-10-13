"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { rich } from "@/components/ds/rich"
import { LoomCanvas } from "@/components/gl/loom-canvas"
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap"
import { WaitlistButton } from "@/components/pages/waitlist"
import { TryKayX } from "./try-kayx"
import styles from "./hero.module.scss"

export function Hero() {
  const t = useTranslations("Home.hero")
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-in]", { opacity: 1 })
        return
      }
      const split = SplitText.create("[data-split]", { type: "lines", mask: "lines", linesClass: styles.line })
      // Un-hide first so each from() tween animates towards opacity 1.
      gsap.set("[data-in]", { opacity: 1 })
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } })
      tl.from(split.lines, { yPercent: 110, stagger: 0.09 })
        .from("[data-fade]", { y: 18, opacity: 0, stagger: 0.08 }, "-=0.95")
        .from("[data-try]", { y: 30, opacity: 0, duration: 1.3 }, "-=0.9")

      return () => split.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={`t-display ${styles.title}`} data-split data-in>
          {t.rich("title", rich)}
        </h1>
        <p className={`t-lead ${styles.sub}`} data-fade data-in>
          {t("subtitle")}
        </p>
        <div className={styles.ctas} data-fade data-in>
          <WaitlistButton>{t("primary")}</WaitlistButton>
        </div>
        <div className={styles.try} data-try data-in>
          <TryKayX />
        </div>
      </div>

      <div className={styles.stage} aria-hidden="true">
        <LoomCanvas shape="mosaic" interactive />
      </div>
    </section>
  )
}
