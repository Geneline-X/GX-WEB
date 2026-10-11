"use client"

import { useRef, type ComponentProps, type ElementType } from "react"
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap"

type Props<T extends ElementType> = { as?: T } & ComponentProps<T>

/**
 * Scroll-triggered entrance for everything marked inside it:
 *   [data-r]       rises and fades in, staggered in DOM order
 *   [data-r-lines] headline revealed line by line behind a mask
 */
export function Reveal<T extends ElementType = "div">({ as, children, ...props }: Props<T>) {
  const Tag = (as ?? "div") as ElementType
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const items = el.querySelectorAll("[data-r]")
      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1 })
        return
      }
      gsap.set(items, { opacity: 1 })
      const splits = Array.from(el.querySelectorAll<HTMLElement>("[data-r-lines]")).map((h) =>
        SplitText.create(h, { type: "lines", mask: "lines" }),
      )
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
        defaults: { ease: "expo.out", duration: 1.1 },
      })
      splits.forEach((s, i) => tl.from(s.lines, { yPercent: 105, stagger: 0.08 }, i * 0.1))
      tl.from(items, { y: 28, opacity: 0, stagger: 0.07 }, 0.15)
      return () => {
        splits.forEach((s) => s.revert())
        tl.scrollTrigger?.kill()
      }
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  )
}


