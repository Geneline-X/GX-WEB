"use client"

import { useRef } from "react"
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap"
import styles from "./languages-field.module.scss"

// One thread per language: 2,000 spoken in Africa, 100 heard by most speech AI.
const TOTAL = 2000
const HEARD = 100
const COLS = 80
const ROWS = TOTAL / COLS
const PITCH_X = 14
const PITCH_Y = 9

// Deterministic scatter so server and client pick the same threads.
function pick() {
  let seed = 41
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  const chosen = new Set<number>()
  while (chosen.size < HEARD) chosen.add(Math.floor(rand() * TOTAL))
  return chosen
}

const HEARD_SET = pick()
const thread = (i: number) => ({ x: (i % COLS) * PITCH_X, y: Math.floor(i / COLS) * PITCH_Y })

export function LanguagesField() {
  const ref = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return
      // The 100 heard threads light up once, scattered, as the field scrolls in.
      gsap.from(ref.current.querySelectorAll("[data-heard]"), {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: { each: 0.012, from: "random" },
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      })
    },
    { scope: ref },
  )

  const all = Array.from({ length: TOTAL }, (_, i) => i)

  return (
    <svg
      ref={ref}
      className={styles.field}
      viewBox={`0 0 ${COLS * PITCH_X} ${ROWS * PITCH_Y}`}
      aria-hidden="true"
    >
      <g className={styles.spoken}>
        {all.map((i) => {
          const { x, y } = thread(i)
          return <rect key={i} x={x} y={y} width={10} height={2.4} rx={1} />
        })}
      </g>
      <g className={styles.heard}>
        {[...HEARD_SET].map((i) => {
          const { x, y } = thread(i)
          return <rect key={i} data-heard x={x} y={y} width={10} height={2.4} rx={1} />
        })}
      </g>
    </svg>
  )
}
