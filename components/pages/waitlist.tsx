"use client"

import { useId, useRef, type ReactNode } from "react"
import { useTranslations } from "next-intl"
import { X } from "lucide-react"
import { Button } from "@/components/ds/button"
import { CONTACT } from "@/lib/site"
import styles from "./waitlist.module.scss"

/**
 * Button that opens the developer API waitlist in a modal. Native <dialog>
 * gives focus trapping, Escape to close and an inert page behind it.
 * There is no sign-up backend yet, so submitting opens the visitor's email
 * app addressed to the team with their details.
 */
export function WaitlistButton({
  children,
  size,
  variant,
}: {
  children: ReactNode
  size?: "sm" | "md" | "lg"
  variant?: "solid" | "outline" | "accent"
}) {
  const t = useTranslations("Pages.developers.waitlist")
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const close = () => dialog.current?.close()

  return (
    <>
      <Button size={size} variant={variant} arrow aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>
        {children}
      </Button>

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby={titleId}
        data-lenis-prevent
        // Clicking the backdrop (the dialog element itself) closes it.
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            const body = `Email: ${data.get("email")}\n\n${data.get("project") || ""}`.trim()
            window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(t("subject"))}&body=${encodeURIComponent(body)}`
            close()
          }}
        >
          <button type="button" className={styles.close} onClick={close}>
            <X aria-hidden />
            <span className="sr-only">{t("close")}</span>
          </button>
          <h2 id={titleId}>{t("title")}</h2>
          <p>{t("body")}</p>
          <label className={styles.field}>
            <span>{t("email")}</span>
            {/* Focus lands on the first field when the dialog opens. */}
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <input type="email" name="email" required autoFocus autoComplete="email" spellCheck={false} placeholder={t("emailHint")} />
          </label>
          <label className={styles.field}>
            <span>{t("project")}</span>
            <textarea name="project" rows={3} placeholder={t("projectHint")} />
          </label>
          <div className={styles.actions}>
            <Button type="submit" arrow>
              {t("submit")}
            </Button>
            <span className={styles.note}>{t("note")}</span>
          </div>
        </form>
      </dialog>
    </>
  )
}
