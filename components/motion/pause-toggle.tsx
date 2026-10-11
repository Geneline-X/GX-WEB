"use client"

import { useTranslations } from "next-intl"
import { Pause, Play } from "lucide-react"
import { setMotionPaused, useMotionPaused } from "@/lib/motion/pause"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import styles from "./pause-toggle.module.scss"

/** Lets anyone stop the looping background animation. */
export function PauseToggle({ className }: { className?: string }) {
  const t = useTranslations("Site.motion")
  const paused = useMotionPaused()
  const reduced = useReducedMotion()
  // Reduced motion already freezes the loops; nothing to pause.
  if (reduced) return null
  return (
    <button
      type="button"
      className={`${styles.toggle} ${className ?? ""}`}
      aria-pressed={paused}
      onClick={() => setMotionPaused(!paused)}
    >
      {paused ? <Play aria-hidden /> : <Pause aria-hidden />}
      {paused ? t("play") : t("pause")}
    </button>
  )
}
