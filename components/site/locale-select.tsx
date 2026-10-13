"use client"

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react"
import { useLocale, useTranslations } from "next-intl"
import { ChevronDown, Check, Globe } from "lucide-react"
import { usePathname, useRouter } from "@/i18n/routing"
import { LOCALES } from "@/lib/site"
import styles from "./locale-select.module.scss"

type Placement = "bottom" | "top" | "inline"

/**
 * Language dropdown. A disclosure button reveals a card of languages; each
 * option is a button so it works with keyboard, touch and screen readers.
 * Opens on hover for mouse users, on click/tap/Enter for everyone.
 */
export function LocaleSelect({ className, placement = "bottom" }: { className?: string; placement?: Placement }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations("Site.nav")
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const listId = useId()
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", onDown)
    return () => document.removeEventListener("pointerdown", onDown)
  }, [open])

  const hover = (next: boolean) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(next), next ? 60 : 180)
  }

  const options = () => Array.from(root.current?.querySelectorAll<HTMLButtonElement>("[data-option]") ?? [])

  const focusOption = (index: number) => {
    const list = options()
    list[(index + list.length) % list.length]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    const list = options()
    const at = list.indexOf(document.activeElement as HTMLButtonElement)
    if (e.key === "Escape" && open) {
      e.preventDefault()
      setOpen(false)
      trigger.current?.focus()
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      const step = e.key === "ArrowDown" ? 1 : -1
      if (!open) {
        setOpen(true)
        // Wait for the list to render before moving focus into it.
        requestAnimationFrame(() => focusOption(step > 0 ? 0 : -1))
      } else {
        focusOption(at === -1 ? (step > 0 ? 0 : -1) : at + step)
      }
    } else if ((e.key === "Home" || e.key === "End") && open) {
      e.preventDefault()
      focusOption(e.key === "Home" ? 0 : -1)
    }
  }

  const choose = (code: string) => {
    setOpen(false)
    trigger.current?.focus()
    if (code !== locale) router.replace(pathname, { locale: code })
  }

  return (
    <div
      ref={root}
      className={`${styles.wrap} ${className ?? ""}`}
      data-placement={placement}
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => placement !== "inline" && e.pointerType === "mouse" && hover(true)}
      onPointerLeave={(e) => placement !== "inline" && e.pointerType === "mouse" && hover(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
      >
        <Globe aria-hidden className={styles.globe} />
        <span className="sr-only">{t("language")}: </span>
        <span lang={current.code}>{current.name}</span>
        <ChevronDown aria-hidden className={styles.chev} />
      </button>

      <ul id={listId} className={styles.menu} hidden={!open} aria-label={t("language")}>
        {LOCALES.map((l) => (
          <li key={l.code}>
            <button
              type="button"
              data-option
              lang={l.code}
              className={styles.option}
              aria-current={l.code === locale ? "true" : undefined}
              onClick={() => choose(l.code)}
            >
              {l.name}
              {l.code === locale && <Check aria-hidden className={styles.check} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
