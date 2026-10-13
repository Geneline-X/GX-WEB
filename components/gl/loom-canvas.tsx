"use client"

import { useEffect, useRef, useState } from "react"
import { Loom, type LoomFit, type LoomShape } from "@/lib/gl/loom"
import { gsap } from "@/lib/motion/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import styles from "./loom-canvas.module.scss"

type Props = {
  shape?: LoomShape
  fit?: LoomFit
  interactive?: boolean
  /** Weave the threads in on first view. */
  intro?: boolean
  className?: string
  onReady?: (loom: Loom) => void
}

export function LoomCanvas({ shape = "africa", fit, interactive = false, intro = true, className, onReady }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const loomRef = useRef<Loom | null>(null)
  const [failed, setFailed] = useState(false)
  const reduced = useReducedMotion()
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  useEffect(() => {
    const el = canvas.current
    const box = wrap.current
    if (!el || !box) return
    let loom: Loom
    try {
      loom = new Loom(el, shape)
    } catch {
      setFailed(true)
      return
    }
    loomRef.current = loom
    if (fit) loom.fit = fit
    loom.still = reduced

    loom.resize()
    const ro = new ResizeObserver(() => loom.resize())
    ro.observe(box)

    // Only render while on screen and the tab is visible.
    let visible = false
    const sync = () => (visible && !document.hidden ? loom.start() : loom.stop())
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      sync()
    })
    io.observe(box)
    document.addEventListener("visibilitychange", sync)

    if (intro && !reduced) {
      gsap.to(loom.state, { intro: 1, duration: 2.4, ease: "power3.out", delay: 0.15 })
    } else {
      loom.state.intro = 1
    }

    const onLost = (e: Event) => {
      e.preventDefault()
      setFailed(true)
    }
    el.addEventListener("webglcontextlost", onLost)

    onReadyRef.current?.(loom)

    return () => {
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", sync)
      el.removeEventListener("webglcontextlost", onLost)
      gsap.killTweensOf(loom.state)
      loom.destroy()
      loomRef.current = null
    }
    // fit is read once; layout changes go through ResizeObserver.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, intro, shape])

  // Listen on the window: content often sits on top of the canvas.
  useEffect(() => {
    if (!interactive || reduced) return
    const box = wrap.current
    if (!box) return
    let inside = false
    const move = (e: PointerEvent) => {
      const loom = loomRef.current
      if (!loom || e.pointerType !== "mouse") return
      const r = box.getBoundingClientRect()
      const now = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      if (now) loom.setPointer(e.clientX, e.clientY)
      if (now !== inside) {
        inside = now
        gsap.to(loom.state, { pointerOn: now ? 1 : 0, duration: now ? 0.4 : 0.8, overwrite: "auto" })
      }
    }
    window.addEventListener("pointermove", move, { passive: true })
    return () => window.removeEventListener("pointermove", move)
  }, [interactive, reduced])

  return (
    <div ref={wrap} className={`${styles.wrap} ${className ?? ""}`} data-failed={failed || undefined} data-shape={shape}>
      <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
    </div>
  )
}
