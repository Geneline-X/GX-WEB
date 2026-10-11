"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/motion/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { usePathname } from "@/i18n/routing"

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  const reduced = useReducedMotion()
  const pathname = usePathname()

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 })
    lenis.on("scroll", ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [reduced])

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [pathname])

  return null
}
