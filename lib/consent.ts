"use client"

import { useSyncExternalStore } from "react"

// Cookie consent. Essential cookies (the language preference) are always on;
// "all" also allows third-party embeds that set their own cookies (Calendly).
// Vercel Web Analytics is cookieless, so it needs no consent.
export type Consent = "all" | "essential"

const KEY = "gx-cookie-consent"
const listeners = new Set<() => void>()
let consent: Consent | null = null
let reopened = false

if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === "all" || saved === "essential") consent = saved
  } catch {}
}

const emit = () => listeners.forEach((l) => l())

export function setConsent(next: Consent) {
  consent = next
  reopened = false
  try {
    localStorage.setItem(KEY, next)
  } catch {}
  emit()
}

/** Show the banner again so the visitor can change their choice. */
export function reopenConsent() {
  reopened = true
  emit()
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useConsent() {
  return useSyncExternalStore(subscribe, () => consent, () => null)
}

/** True when the banner should be on screen. Always false on the server. */
export function useConsentOpen() {
  return useSyncExternalStore(subscribe, () => consent === null || reopened, () => false)
}
