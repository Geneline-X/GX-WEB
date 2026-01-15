"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, Search, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const products = [
  { name: "Xplain AI", description: "Document & media intelligence", href: "https://xplain-ai.net" },
  { name: "Genestudio", description: "Business chatbot creation", href: "https://genistud.io" },
  { name: "Kay-X", description: "Krio-to-English speech-to-text", href: "https://kay-x-entreprise.vercel.app" },
  { name: "AI Infrastructure", description: "RAG, vector databases, AI agents", href: "https://gen-x-service-dashboard.vercel.app" }
]

const companyLinks = [
  { name: "About", description: "Learn about our mission and vision", href: "/company#about" },
  { name: "Career", description: "Join our talented team", href: "/company#career" },
  { name: "Events", description: "Upcoming events and webinars", href: "/company#events" },
  { name: "Contact Us", description: "Get in touch with us", href: "/contact-us" }
]

const navLinks = [
  { name: "Products", type: "dropdown" },
  { name: "Customers", href: "/company#customers" },
  { name: "Developers", href: "https://docs.geneline-x.com" },
  { name: "Resources", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
  { name: "Company", type: "dropdown" },
]

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Geneline-x", icon: Github },
  {
    name: "X",
    href: "https://x.com/genelinex",
    icon: () => (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@genelinex",
    icon: () => (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/geneline-x",
    icon: () => (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Linkedin",
    href: "https://linkedin.com/company/geneline-x",
    icon: () => (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/geneline-x",
    icon: () => (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.849 0-3.204.013-3.583.07-4.849.196-4.354-2.617-6.78-6.979-6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isSearchClosing, setIsSearchClosing] = useState(false)

  const handleCloseSearch = () => {
    setIsSearchClosing(true)
    setTimeout(() => {
      setSearchOpen(false)
      setIsSearchClosing(false)
    }, 300) // Match animation duration
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

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
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
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
      "fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-xl transition-transform duration-300",
      isVisible ? "translate-y-0" : "-translate-y-full"
    )}>
      <div className="mx-auto max-w-8xl px-6 lg:px-28">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="GenelineX"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold tracking-tight">GenelineX</span>
          </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden lg:flex lg:items-center lg:gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) =>
              link.type === "dropdown" ? (
                <DropdownMenu 
                  key={link.name}
                  open={openDropdown === link.name}
                  onOpenChange={(open) => setOpenDropdown(open ? link.name : null)}
                >
                  <DropdownMenuTrigger 
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    onMouseEnter={() => setOpenDropdown(link.name)}
                  >
                    {link.name}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="start" 
                    className="w-72 rounded-none border-gray-200"
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {(link.name === "Products" ? products : companyLinks).map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <a
                          href={item.href}
                          target={link.name === "Products" ? "_blank" : undefined}
                          rel={link.name === "Products" ? "noopener noreferrer" : undefined}
                          className="flex flex-col items-start gap-1 py-3 cursor-pointer"
                        >
                          <span className="font-semibold text-gray-900">{item.name}</span>
                          <span className="text-sm text-gray-600">{item.description}</span>
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </Link>
              ),
            )}
          </div>

          {/* Right Side - Search + CTAs */}
          <div className="hidden lg:flex lg:items-center lg:gap-3 lg:ml-12">
            {/* Search Button */}
            <Button 
              variant="ghost" 
              className="rounded-none text-gray-700 hover:text-gray-900 hover:bg-gray-100 h-12 w-12 p-0"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-5" />
            </Button>

            {/* Contact Us Button */}
            <Button variant="outline" className="rounded-none border-2 border-gray-900 text-gray-900 hover:bg-gray-900  font-semibold uppercase text-xs tracking-wider px-6 h-12">
              <Link href="/contact-us">Contact Us</Link>
            </Button>

            {/* Get Started Button */}
            <Button className="rounded-none bg-primary hover:bg-primary/90 text-white font-semibold uppercase text-xs tracking-wider px-6 h-12 shadow-none">
              <Link href="/contact-us">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-gray-700 relative z-50 transition-transform hover:scale-110"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            <div className="relative w-6 h-6">
              <span className={cn(
                "absolute block h-0.5 w-6 bg-gray-900 transition-all duration-300 ease-in-out",
                mobileMenuOpen ? "top-3 rotate-45" : "top-1"
              )} />
              <span className={cn(
                "absolute block h-0.5 w-6 bg-gray-900 top-3 transition-all duration-300 ease-in-out",
                mobileMenuOpen ? "opacity-0 translate-x-3" : "opacity-100"
              )} />
              <span className={cn(
                "absolute block h-0.5 w-6 bg-gray-900 transition-all duration-300 ease-in-out",
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
            "absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500",
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={cn(
          "relative bg-white border-t border-gray-200 shadow-2xl overflow-y-auto max-h-[calc(100vh-5rem)] transition-transform duration-500 ease-out",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}>
          <div className="px-6 py-6 space-y-6">
            {/* Products Section */}
            <div className="space-y-3">
              <p className={cn(
                "text-xs font-bold uppercase tracking-wider text-gray-500 transition-all duration-500 delay-100",
                mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              )}>Products</p>
              {products.map((product, index) => (
                <a
                  key={product.name}
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "block py-2 transition-all duration-500 hover:translate-x-2 hover:text-primary",
                    mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  )}
                  style={{ transitionDelay: `${150 + index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <p className="font-semibold text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </a>
              ))}
            </div>

            {/* Nav Links */}
            <div className="space-y-2 border-t border-gray-200 pt-6">
              {navLinks.slice(1).map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href || "#"}
                  className={cn(
                    "block py-3 text-base font-medium text-gray-700 hover:text-primary hover:translate-x-2 transition-all duration-500",
                    mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  )}
                  style={{ transitionDelay: `${350 + index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <div className={cn(
              "space-y-3 border-t border-gray-200 pt-6 transition-all duration-500 delay-500",
              mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <Button variant="outline" className="w-full rounded-none border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold uppercase text-xs h-12 transition-all hover:scale-105" asChild>
                <Link href="/contact-us">Contact Us</Link>
              </Button>
              <Button className="w-full rounded-none bg-primary hover:bg-primary/90 text-white font-semibold uppercase text-xs h-12 transition-all hover:scale-105" asChild>
                <Link href="/contact-us">Get Started</Link>
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
              "fixed inset-0 bg-black/50 backdrop-blur-lg transition-all duration-300 ease-out",
              isSearchClosing ? "opacity-0 backdrop-blur-0" : "animate-in fade-in"
            )}
            onClick={handleCloseSearch}
          />
          
          {/* Modal Content Container */}
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-32 pointer-events-none">
            {/* Modal Content - Glass Effect */}
            <div className={cn(
              "relative w-full max-w-2xl mx-4 bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20 pointer-events-auto transition-all duration-300 ease-out",
              isSearchClosing 
                ? "opacity-0 -translate-y-4 scale-95" 
                : "animate-in slide-in-from-top-4 fade-in zoom-in-95"
            )}>
              <div className="p-6">
                {/* Search Input */}
                <div className="flex items-center gap-3 border-b-2 border-gray-200 pb-4">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    autoFocus
                    className="flex-1 text-lg outline-none placeholder:text-gray-400"
                  />
                  <button
                    onClick={handleCloseSearch}
                    className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    ESC
                  </button>
                </div>

                {/* Search Results/Suggestions */}
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Quick Links</p>
                    <Link
                      href="/solutions"
                      className="block py-2 px-3 hover:bg-gray-50 transition-colors group"
                      onClick={handleCloseSearch}
                    >
                      <p className="font-medium text-gray-900 group-hover:text-primary">Solutions</p>
                      <p className="text-sm text-gray-600">Explore our AI solutions</p>
                    </Link>
                    <Link
                      href="/company"
                      className="block py-2 px-3 hover:bg-gray-50 transition-colors group"
                      onClick={handleCloseSearch}
                    >
                      <p className="font-medium text-gray-900 group-hover:text-primary">About Us</p>
                      <p className="text-sm text-gray-600">Learn about our mission</p>
                    </Link>
                    <a
                      href="https://docs.geneline-x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 px-3 hover:bg-gray-50 transition-colors group"
                      onClick={handleCloseSearch}
                    >
                      <p className="font-medium text-gray-900 group-hover:text-primary">Documentation</p>
                      <p className="text-sm text-gray-600">API docs and guides</p>
                    </a>
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