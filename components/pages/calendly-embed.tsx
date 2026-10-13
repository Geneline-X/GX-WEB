"use client"

import Script from "next/script"
import { useTranslations } from "next-intl"
import { CalendarOff } from "lucide-react"
import { Button } from "@/components/ds/button"
import { setConsent, useConsent } from "@/lib/consent"
import { CONTACT } from "@/lib/site"
import styles from "./pages.module.scss"

/** Calendly sets third-party cookies, so it only loads after "Accept all". */
export function CalendlyEmbed() {
  const t = useTranslations("Pages.contact")
  const consent = useConsent()

  if (consent !== "all") {
    return (
      <div className={styles.calendarBlocked}>
        <CalendarOff aria-hidden className={styles.blockedIcon} />
        <h3>{t("blockedTitle")}</h3>
        <p>{t("blockedBody")}</p>
        <Button size="sm" onClick={() => setConsent("all")}>
          {t("allow")}
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.calendar}>
      <div className="calendly-inline-widget" data-url={CONTACT.calendly} title={t("calendar")} />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
    </div>
  )
}
