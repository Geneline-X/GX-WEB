"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { useTranslations } from "next-intl"
import { LayoutGrid, Database, FlaskConical, AudioLines, ArrowLeft, Moon, Sun, Menu, X } from "lucide-react"
import { Link, usePathname } from "@/i18n/routing"
import { Logo } from "@/components/site/logo"
import { StatusDot } from "@/components/ds/primitives"
import styles from "./shell.module.scss"

type Theme = "light" | "dark"
const KEY = "gx-console-theme"

type NavItem = { href: string; key: "overview" | "datasets" | "runs" | "playground"; icon: typeof LayoutGrid }

const NAV: { group: "workspace" | "build"; items: NavItem[] }[] = [
  {
    group: "workspace",
    items: [
      { href: "/console", key: "overview", icon: LayoutGrid },
      { href: "/console/datasets", key: "datasets", icon: Database },
      { href: "/console/runs", key: "runs", icon: FlaskConical },
    ],
  },
  { group: "build", items: [{ href: "/console/playground", key: "playground", icon: AudioLines }] },
]

export function ConsoleShell({ children }: { children: ReactNode }) {
  const t = useTranslations("Console.shell")
  const pathname = usePathname()
  const [theme, setTheme] = useState<Theme>("light")
  const [open, setOpen] = useState(false)
  const menuBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved === "dark" || saved === "light") setTheme(saved)
    } catch {}
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const sidebar = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    sidebar.current?.querySelector<HTMLElement>("nav a")?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {}
  }

  const current = NAV.flatMap((g) => g.items).find((i) => i.href === pathname)

  return (
    <div className={styles.shell} data-theme={theme}>
      <aside ref={sidebar} className={styles.sidebar} data-open={open || undefined} aria-label={t("nav")}>
        <div className={styles.brand}>
          <Link href="/" aria-label={t("back")}>
            <Logo />
          </Link>
          <button type="button" className={styles.close} onClick={() => setOpen(false)}>
            <X aria-hidden />
            <span className="sr-only">{t("close")}</span>
          </button>
        </div>

        <nav className={styles.nav}>
          {NAV.map((g) => (
            <div key={g.group} className={styles.group}>
              <p className={`t-mono ${styles.groupLabel}`}>{t(g.group)}</p>
              <ul>
                {g.items.map(({ href, key, icon: Icon }) => (
                  <li key={href}>
                    <Link href={href} className={styles.navLink} aria-current={pathname === href ? "page" : undefined}>
                      <Icon aria-hidden />
                      {t(key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className={styles.foot}>
          <button type="button" className={styles.navLink} onClick={toggleTheme}>
            {theme === "light" ? <Moon aria-hidden /> : <Sun aria-hidden />}
            {theme === "light" ? t("dark") : t("light")}
          </button>
          <Link href="/" className={styles.navLink}>
            <ArrowLeft aria-hidden />
            {t("back")}
          </Link>
        </div>
      </aside>
      {open && <div className={styles.scrim} onClick={() => setOpen(false)} aria-hidden="true" />}

      <div className={styles.main}>
        <header className={styles.topbar}>
          <button
            ref={menuBtn}
            type="button"
            className={styles.menu}
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden />
            <span className="sr-only">{t("menu")}</span>
          </button>
          <p className={styles.crumbs}>
            <span className="dim">{t("workspace")}</span>
            <span className="dim" aria-hidden="true">/</span>
            <span>{current ? t(current.key) : t("overview")}</span>
          </p>
          <p className={`t-mono ${styles.status}`}>
            <StatusDot tone="idle" />
            {t("sample")}
          </p>
        </header>
        <main id="main" tabIndex={-1} className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  )
}
