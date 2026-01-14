import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Github, Instagram, Facebook, MessageCircle, Linkedin } from "lucide-react"

const products = [
  { name: "Xplain AI", href: "https://xplain-ai.net", external: true },
  { name: "Genestudio", href: "https://genistud.io", external: true },
  { name: "Kay-X", href: "https://kay-x-entreprise.vercel.app", external: true },
  { name: "AI Infrastructure", href: "https://gen-x-service-dashboard.vercel.app", external: true },
]

const company = [
  { name: "Solutions", href: "/solutions" },
  { name: "Company", href: "/company" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Docs", href: "https://docs.geneline-x.com", external: true },
]

const legal = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
]

const social = [
  {
    name: "GitHub",
    href: "https://github.com/geneline-x",
    icon: <Github className="w-5 h-5" />,
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/geneline-x",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@genelinex",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/geneline-x",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    name: "Linkedin",
    href: "https://linkedin.com/company/geneline-x",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/geneline-x",
    icon: <Instagram className="w-5 h-5" />,
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-background">
      {/* Radial gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
            {/* Company description */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 group mb-4">
                <Image
                  src="/logo.png"
                  alt="Geneline-X Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <span className="text-lg font-semibold tracking-tight text-foreground">Geneline-X</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
                African-founded AI company building intelligent platforms, infrastructure, and language technologies.
                Powering the future of AI across the continent.
              </p>
              <div className="flex items-center gap-4">
                {social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={item.name}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Products</h3>
              <ul className="space-y-3">
                {products.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {item.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.name}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                      >
                        {item.name}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Legal</h3>
              <ul className="space-y-3">
                {legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Brand statement with radiating effect */}
        <div className="py-12 border-t border-border/40">
          <div className="text-center">
            <div className="relative inline-block">
              {/* Radiating lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                      style={{
                        width: "100%",
                        transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <h2 className="relative text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground/10">
                Geneline-X
              </h2>
            </div>
          </div>
        </div>

        {/* Legal footer */}
        <div className="py-6 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Geneline-X. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
