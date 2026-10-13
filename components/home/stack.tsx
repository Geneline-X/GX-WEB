"use client"

import { useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { ArrowUpRight } from "lucide-react"
import { Container, Eyebrow } from "@/components/ds/primitives"
import { rich } from "@/components/ds/rich"
import { Reveal } from "@/components/motion/reveal"
import { PRODUCTS } from "@/lib/site"
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap"
import styles from "./stack.module.scss"

const LAYERS = ["apps", "models", "data", "infra"] as const
type Layer = (typeof LAYERS)[number]

export function Stack() {
  const t = useTranslations("Home.stack")
  const tp = useTranslations("Site.products")
  const root = useRef<HTMLElement>(null)
  const [focus, setFocus] = useState<Layer | null>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // Layers start pressed together and lift apart as the section scrolls in.
      gsap.fromTo(
        "[data-plane]",
        { "--lift": 0 },
        {
          "--lift": 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-iso]", start: "top 85%", end: "center 45%", scrub: 0.8 },
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} className={styles.section} aria-labelledby="stack-title">
      <Container>
        <Reveal className={styles.head}>
          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 id="stack-title" className={`t-h2 ${styles.title}`} data-r-lines>
              {t.rich("title", rich)}
            </h2>
          </div>
          <p className="t-lead" data-r>
            {t("intro")}
          </p>
        </Reveal>

        <div className={styles.body}>
          <div className={styles.iso} data-iso aria-hidden="true">
            {LAYERS.map((layer, i) => (
              <div
                key={layer}
                className={styles.plane}
                data-plane
                data-layer={layer}
                data-focus={focus === layer || undefined}
                data-dim={(focus && focus !== layer) || undefined}
                style={{ "--i": LAYERS.length - 1 - i } as React.CSSProperties}
              >
                <span className={styles.planeLabel}>{t(`layers.${layer}`)}</span>
                <div className={styles.chips}>
                  {PRODUCTS.filter((p) => p.layer === layer).map((p) => (
                    <span key={p.key} className={styles.chip}>
                      {tp(`${p.key}.name`)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.list}>
            <p className={`t-mono ${styles.label}`}>{t("label")}</p>
            {LAYERS.map((layer) => (
              <div
                key={layer}
                className={styles.group}
                onPointerEnter={() => setFocus(layer)}
                onPointerLeave={() => setFocus(null)}
                onFocus={() => setFocus(layer)}
                onBlur={() => setFocus(null)}
              >
                <h3 className={styles.layerName}>
                  <span className={styles.square} data-layer={layer} aria-hidden="true" />
                  {t(`layers.${layer}`)}
                </h3>
                <ul>
                  {PRODUCTS.filter((p) => p.layer === layer).map((p) => (
                    <li key={p.key}>
                      <a href={p.href} target="_blank" rel="noreferrer" className={styles.product}>
                        <span className={styles.productName}>
                          {tp(`${p.key}.name`)}
                          <ArrowUpRight aria-hidden className={styles.arrow} />
                        </span>
                        <span className={styles.productDesc}>{tp(`${p.key}.desc`)}</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
