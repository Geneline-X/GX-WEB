"use client"

import { useEffect, useId, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react"
import { Link, usePathname } from "@/i18n/routing"
import { Button } from "@/components/ds/button"
import { PRODUCTS } from "@/lib/site"
import { Logo } from "./logo"
import { LocaleSelect } from "./locale-select"
import styles from "./nav.module.scss"

export function Nav() {
  const t = useTranslations("Site")
  const pathname = usePathname()
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const productsRef = useRef<HTMLLIElement>(null)
  const productsBtn = useRef<HTMLButtonElement>(null)
  const menuBtn = useRef<HTMLButtonElement>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const panelId = useId()
  const mobileId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menus on navigation.
  useEffect(() => {
    setProductsOpen(false)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!productsOpen && !mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      if (productsOpen) {
        setProductsOpen(false)
        productsBtn.current?.focus()
      }
      if (mobileOpen) {
        setMobileOpen(false)
        menuBtn.current?.focus()
      }
    }
    const onClick = (e: MouseEvent) => {
      if (productsOpen && !productsRef.current?.contains(e.target as Node)) setProductsOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("click", onClick)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("click", onClick)
    }
  }, [productsOpen, mobileOpen])

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [mobileOpen])

  const hover = (open: boolean) => {
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setProductsOpen(open), open ? 60 : 180)
  }

  const links = [
    { href: "/#pipeline", label: t("nav.pipeline") },
    { href: "/blog", label: t("nav.research") },
    { href: "/company", label: t("nav.company") },
    { href: "/developers", label: t("nav.developers") },
  ]

  const productList = (
    <ul className={styles.products}>
      {PRODUCTS.map((p) => (
        <li key={p.key}>
          <a href={p.href} target="_blank" rel="noreferrer" className={styles.product}>
            <span className={styles.productName}>
              {t(`products.${p.key}.name`)}
              <ArrowUpRight aria-hidden className={styles.productIcon} />
            </span>
            <span className={styles.productDesc}>{t(`products.${p.key}.desc`)}</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined} data-open={mobileOpen || undefined}>
      <nav className={styles.bar} aria-label={t("nav.primary")}>
        <Link href="/" className={styles.home} aria-label={t("nav.home")}>
          <Logo />
        </Link>

        <ul className={styles.links}>
          <li
            ref={productsRef}
            className={styles.dropdown}
            onPointerEnter={(e) => e.pointerType === "mouse" && hover(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && hover(false)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setProductsOpen(false)
            }}
          >
            <button
              ref={productsBtn}
              type="button"
              className={styles.link}
              aria-expanded={productsOpen}
              aria-controls={panelId}
              onClick={() => setProductsOpen((o) => !o)}
            >
              {t("nav.products")}
              <ChevronDown aria-hidden className={styles.chev} />
            </button>
            <div id={panelId} className={styles.panel} hidden={!productsOpen}>
              {productList}
            </div>
          </li>
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={styles.link}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <LocaleSelect className={styles.locale} />
          <Button href="/contact-us" variant="outline" size="sm" className={styles.contact}>
            {t("nav.contact")}
          </Button>
          <Button href="/console" size="sm">
            {t("nav.console")}
          </Button>
          <button
            ref={menuBtn}
            type="button"
            className={styles.menuBtn}
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X aria-hidden /> : <Menu aria-hidden />}
            <span className="sr-only">{mobileOpen ? t("nav.close") : t("nav.menu")}</span>
          </button>
        </div>
      </nav>

      <div id={mobileId} className={styles.mobile} hidden={!mobileOpen}>
        <p className="t-mono dim">{t("nav.products")}</p>
        {productList}
        <ul className={styles.mobileLinks}>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/contact-us">{t("nav.contact")}</Link>
          </li>
        </ul>
        <LocaleSelect placement="inline" />
      </div>
    </header>
  )
}
