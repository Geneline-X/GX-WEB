"use client"

import { useId, useState } from "react"
import { useTranslations } from "next-intl"
import { Cookie } from "lucide-react"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ds/button"
import { setConsent, useConsent, useConsentOpen } from "@/lib/consent"
import styles from "./cookie-banner.module.scss"

/** Slim bar at the bottom of the screen, with an optional settings panel. */
export function CookieBanner() {
  const t = useTranslations("Site.cookies")
  const open = useConsentOpen()
  const consent = useConsent()
  const [showSettings, setShowSettings] = useState(false)
  const [calendar, setCalendar] = useState(consent === "all")
  const panelId = useId()
  const textId = useId()

  if (!open) return null

  const choose = (all: boolean) => {
    setShowSettings(false)
    setConsent(all ? "all" : "essential")
  }

  return (
    <section className={styles.wrap} aria-label={t("region")} data-theme="light">
      {showSettings && (
        <div id={panelId} className={styles.panel}>
          <h2 className={styles.panelTitle}>{t("settings")}</h2>
          <div className={styles.row}>
            <div>
              <p className={styles.rowTitle}>{t("essentialTitle")}</p>
              <p className={styles.rowBody}>{t("essentialBody")}</p>
            </div>
            <button type="button" role="switch" aria-checked="true" aria-label={t("essentialTitle")} className={styles.switch} disabled />
          </div>
          <div className={styles.row}>
            <div>
              <p className={styles.rowTitle}>{t("calendarTitle")}</p>
              <p className={styles.rowBody}>{t("calendarBody")}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={calendar}
              aria-label={t("calendarTitle")}
              className={styles.switch}
              onClick={() => setCalendar((c) => !c)}
            />
          </div>
          <div className={styles.panelFoot}>
            <Link href="/privacy" className={styles.link}>
              {t("policy")}
            </Link>
            <Button size="sm" onClick={() => choose(calendar)}>
              {t("save")}
            </Button>
          </div>
        </div>
      )}

      <div className={styles.bar} role="group" aria-labelledby={textId}>
        <Cookie aria-hidden className={styles.icon} />
        <p id={textId} className={styles.text}>
          {t("text")}
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.link}
            aria-expanded={showSettings}
            aria-controls={panelId}
            onClick={() => setShowSettings((s) => !s)}
          >
            {t("settings")}
          </button>
          <Button size="sm" variant="outline" onClick={() => choose(false)}>
            {t("reject")}
          </Button>
          <Button size="sm" onClick={() => choose(true)}>
            {t("accept")}
          </Button>
        </div>
      </div>
    </section>
  )
}
