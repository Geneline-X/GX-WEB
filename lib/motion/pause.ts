"use client"

import { useSyncExternalStore } from "react"

// Site-wide "pause motion" switch for looping ambient animation (WCAG 2.2.2).
// Persisted per viewer; scroll-linked and one-off entrances are unaffected.
const KEY = "gx-motion-paused"
const listeners = new Set<() => void>()
let paused = false

if (typeof window !== "undefined") {
  try {
    paused = localStorage.getItem(KEY) === "1"
  } catch {}
}

export function setMotionPaused(next: boolean) {
  paused = next
  try {
    localStorage.setItem(KEY, next ? "1" : "0")
  } catch {}
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useMotionPaused() {
  return useSyncExternalStore(subscribe, () => paused, () => false)
}
