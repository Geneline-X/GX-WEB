"use client"

import { useTranslations } from "next-intl"
import { reopenConsent } from "@/lib/consent"

/** Footer link that reopens the cookie banner. */
export function CookieSettings({ className }: { className?: string }) {
  const t = useTranslations("Site.cookies")
  return (
    <button type="button" className={className} onClick={reopenConsent}>
      {t("settings")}
    </button>
  )
}
