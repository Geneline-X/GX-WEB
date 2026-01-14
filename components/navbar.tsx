"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const products = [
  { name: "Xplain AI", description: "Document & media intelligence", href: "https://xplain-ai.net", external: true },
  { name: "Genestudio", description: "Business chatbot creation", href: "https://genistud.io", external: true },
  { name: "Kay-X", description: "Krio-to-English speech-to-text", href: "https://kay-x-entreprise.vercel.app", external: true },
  {
    name: "AI Infrastructure",
    description: "RAG, vector databases, AI agents",
    href: "https://gen-x-service-dashboard.vercel.app",
    external: true,
  }
]

const navLinks = [
  { name: "Solutions", href: "/solutions" },
  { name: "Docs", href: "https://docs.geneline-x.com", external: true },
  { name: "Company", href: "/company" },
  { name: "Contact Us", href: "/contact-us" },
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Geneline-X Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-lg font-semibold tracking-tight text-foreground">Geneline-X</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {/* Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-1">
                  Products
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72">
                {products.map((product) => (
                  <DropdownMenuItem key={product.name} asChild>
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-start gap-1 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{product.name}</span>
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground">{product.description}</span>
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Nav Links */}
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ),
            )}
          </div>

          {/* Right Side - Social + CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-1">
              {socialLinks.slice(0, 3).map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="/contact-us" target="_blank" rel="noopener noreferrer">
                Book a Demo
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl",
          mobileMenuOpen ? "block" : "hidden",
        )}
      >
        <div className="px-4 py-4 space-y-4">
          {/* Products Section */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Products</p>
            {products.map((product) => (
              <a
                key={product.name}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>

          {/* Nav Links */}
          <div className="space-y-2 border-t border-border pt-4">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ),
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 border-t border-border pt-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.name}
              >
                <social.icon />
              </a>
            ))}
          </div>

          {/* CTA */}
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="https://cal.com/geneline-x/demo" target="_blank" rel="noopener noreferrer">
              Book a Demo
            </a>
          </Button>
        </div>
      </div>
    </nav>
  )
}
