"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { Menu, X, ChevronDown, Search, Github } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import { useTranslations } from "next-intl"

export function Navbar() {
  const t = useTranslations("Navbar")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isSearchClosing, setIsSearchClosing] = useState(false)

  const products = [
    { name: "KACCP", description: t("productsDesc.kaccp"), href: "https://kaccp.vercel.app" },
    { name: "Xplain AI", description: t("productsDesc.xplain"), href: "https://xplain-ai.net" },
    { name: "Genestudio", description: t("productsDesc.genestudio"), href: "https://genistud.io" },
    { name: "Kay-X", description: t("productsDesc.kayx"), href: "https://kay-x-entreprise.vercel.app" },
    { name: "AI Infrastructure", description: t("productsDesc.infra"), href: "https://gen-x-service-dashboard.vercel.app" }
  ]

  const companyLinks = [
    { name: t("about"), description: t("companyDesc.about"), href: "/company" },
    { name: t("events"), description: t("companyDesc.events"), href: "/events" },
    { name: t("contactUs"), description: t("companyDesc.contact"), href: "/contact-us" }
  ]

  const navLinks = [
    { name: t("products"), type: "dropdown" },
    { name: t("developers"), href: "/developers" },
    { name: t("solutions"), href: "/solutions" },
    { name: t("company"), type: "dropdown" },
  ]

  const handleMouseEnter = (name: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    setOpenDropdown(name)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null)
    }, 200)
    setHoverTimeout(timeout)
  }

  const handleCloseSearch = () => {
    setIsSearchClosing(true)
    setTimeout(() => {
      setSearchOpen(false)
      setIsSearchClosing(false)
    }, 300)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Handle navbar visibility
      if (currentScrollY < 10) {
        // Always show navbar at the top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)

      // Handle navbar styling
      setIsScrolled(currentScrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseSearch()
      }
    }

    if (searchOpen) {
      window.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [searchOpen])

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-background/95 backdrop-blur-xl h-20 transition-all duration-300",
      isVisible ? "translate-y-0" : "-translate-y-full"
    )}>
      <div className="mx-auto max-w-8xl px-6 lg:px-28 h-full">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.png"
              alt="GenelineX"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-extrabold tracking-tighter text-foreground flex items-center overflow-hidden">
              <span>G</span>
              <span className={cn(
                "transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap",
                isScrolled ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"
              )}>
                eneline
              </span>
              <span>-X</span>
            </span>
          </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden lg:flex lg:items-center lg:gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) =>
              link.type === "dropdown" ? (
                <div
                  key={link.name}
                  onMouseEnter={() => handleMouseEnter(link.name)}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <DropdownMenu
                    modal={false}
                    open={openDropdown === link.name}
                  >
                    <DropdownMenuTrigger
                      className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none py-8"
                    >
                      {link.name}
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        openDropdown === link.name ? "rotate-180" : "rotate-0"
                      )} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="w-72 rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-card"
                      onMouseEnter={() => handleMouseEnter(link.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {(link.name === t("products") ? products : companyLinks).map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                          {item.href.startsWith("http") ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-start gap-1 py-3 cursor-pointer group"
                            >
                              <span className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{item.name}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{item.description}</span>
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              className="flex flex-col items-start gap-1 py-3 cursor-pointer group"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <span className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{item.name}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{item.description}</span>
                            </Link>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href || "#"}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ),
            )}
          </div>

          {/* Right Side - Search + Theme + CTAs */}
          <div className="hidden lg:flex lg:items-center lg:gap-1 lg:ml-12">
            {/* Search Button */}
            <Button
              variant="ghost"
              className="rounded-none text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 h-12 w-12 p-0"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-5" />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Try Demo Button */}
            <div className="ml-2">
              <Button className="rounded-none bg-primary hover:bg-primary/90 text-white font-semibold uppercase text-xs tracking-wider px-6 h-12 shadow-none" asChild>
                <Link href="/developers">{t("tryDemo")}</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground relative z-50 transition-transform hover:scale-110"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">{t("search")}</span>
            <div className="relative w-6 h-6">
              <span className={cn(
                "absolute block h-0.5 w-6 bg-foreground transition-all duration-300 ease-in-out",
                mobileMenuOpen ? "top-3 rotate-45" : "top-1"
              )} />
              <span className={cn(
                "absolute block h-0.5 w-6 bg-foreground top-3 transition-all duration-300 ease-in-out",
                mobileMenuOpen ? "opacity-0 translate-x-3" : "opacity-100"
              )} />
              <span className={cn(
                "absolute block h-0.5 w-6 bg-foreground transition-all duration-300 ease-in-out",
                mobileMenuOpen ? "top-3 -rotate-45" : "top-5"
              )} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-20 z-40 transition-all duration-500 ease-in-out",
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-500",
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className={cn(
          "relative bg-background border-t border-gray-200 dark:border-gray-800 shadow-2xl overflow-y-auto max-h-[calc(100vh-5rem)] transition-transform duration-500 ease-out",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}>
          <div className="px-6 py-6 space-y-6">
            {/* Products Section */}
            <div className="space-y-3">
              <p className={cn(
                "text-xs font-bold uppercase tracking-wider text-muted-foreground transition-all duration-500 delay-100",
                mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              )}>{t("products")}</p>
              {products.map((product, index) => (
                <a
                  key={product.name}
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "block py-2 transition-all duration-500 hover:translate-x-2 group",
                    mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  )}
                  style={{ transitionDelay: `${150 + index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </a>
              ))}
            </div>

            {/* Nav Links */}
            <div className="space-y-2 border-t border-border pt-6">
              {navLinks.filter(l => l.type !== "dropdown").map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href || "#"}
                  className={cn(
                    "block py-3 text-base font-medium text-foreground hover:text-primary hover:translate-x-2 transition-all duration-500",
                    mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  )}
                  style={{ transitionDelay: `${350 + index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Company Section */}
            <div className="space-y-3 border-t border-border pt-6">
              <p className={cn(
                "text-xs font-bold uppercase tracking-wider text-muted-foreground transition-all duration-500",
                mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              )} style={{ transitionDelay: '450ms' }}>{t("company")}</p>
              {companyLinks.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block py-2 transition-all duration-500 hover:translate-x-2 group",
                    mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  )}
                  style={{ transitionDelay: `${500 + index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Link>
              ))}
            </div>

            {/* Settings Section */}
            <div className="space-y-3 border-t border-border pt-6">
              <p className={cn(
                "text-xs font-bold uppercase tracking-wider text-muted-foreground transition-all duration-500",
                mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              )} style={{ transitionDelay: '600ms' }}>Settings</p>
              <div className={cn(
                "flex items-center gap-4 py-2 transition-all duration-500",
                mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              )} style={{ transitionDelay: '650ms' }}>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Language</span>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className={cn(
              "space-y-3 border-t border-border pt-6 transition-all duration-500",
              mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )} style={{ transitionDelay: '700ms' }}>
              <Button className="w-full rounded-none bg-primary hover:bg-primary/90 text-white font-semibold uppercase text-xs h-12 transition-all hover:scale-[1.02]" asChild>
                <Link href="/contact-us">{t("getStarted")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal - Rendered using Portal */}
      {searchOpen && typeof window !== 'undefined' ? createPortal(
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop - Full viewport blur */}
          <div
            className={cn(
              "fixed inset-0 bg-black/60 backdrop-blur-lg transition-all duration-300 ease-out",
              isSearchClosing ? "opacity-0 backdrop-blur-0" : "animate-in fade-in"
            )}
            onClick={handleCloseSearch}
          />

          {/* Modal Content Container */}
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-32 pointer-events-none">
            {/* Modal Content - Glass Effect */}
            <div className={cn(
              "relative w-full max-w-2xl mx-4 bg-white/90 dark:bg-card/90 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-white/10 pointer-events-auto transition-all duration-300 ease-out",
              isSearchClosing
                ? "opacity-0 -translate-y-4 scale-95"
                : "animate-in slide-in-from-top-4 fade-in zoom-in-95"
            )}>
              <div className="p-6">
                {/* Search Input */}
                <div className="flex items-center gap-3 border-b-2 border-border pb-4">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t("search")}
                    autoFocus
                    className="flex-1 text-lg outline-none bg-transparent placeholder:text-muted-foreground text-foreground"
                  />
                  <button
                    onClick={handleCloseSearch}
                    className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded hover:bg-muted/80 transition-colors"
                  >
                    ESC
                  </button>
                </div>

                {/* Search Results/Suggestions */}
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("quickLinks")}</p>
                    <Link
                      href="/solutions"
                      className="block py-2 px-3 hover:bg-muted/50 transition-all group rounded-lg"
                      onClick={handleCloseSearch}
                    >
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">{t("solutions")}</p>
                      <p className="text-sm text-muted-foreground">Explore our AI solutions</p>
                    </Link>
                    <Link
                      href="/company"
                      className="block py-2 px-3 hover:bg-muted/50 transition-all group rounded-lg"
                      onClick={handleCloseSearch}
                    >
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">{t("about")}</p>
                      <p className="text-sm text-muted-foreground">{t("companyDesc.about")}</p>
                    </Link>
                    <Link
                      href="/events"
                      className="block py-2 px-3 hover:bg-muted/50 transition-all group rounded-lg"
                      onClick={handleCloseSearch}
                    >
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">{t("events")}</p>
                      <p className="text-sm text-muted-foreground">{t("companyDesc.events")}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      ) : null}
    </nav>
  )
}
