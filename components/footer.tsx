import { Link } from "@/i18n/routing"
import Image from "next/image"
import { ExternalLink, Github, Instagram, Facebook, Linkedin } from "lucide-react"
import { useTranslations } from "next-intl"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"

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
  const t = useTranslations("Footer")

  const productsList = [
    { name: "Xplain AI", href: "https://xplain-ai.net", external: true },
    { name: "Genestudio", href: "https://genistud.io", external: true },
    { name: "Kay-X", href: "https://kay-x-entreprise.vercel.app", external: true },
    { name: "AI Infrastructure", href: "https://gen-x-service-dashboard.vercel.app", external: true },
  ]

  const companyList = [
    { name: t("links.solutions"), href: "/solutions" },
    { name: t("links.about"), href: "/company" },
    { name: t("links.contact"), href: "/contact-us" },
    { name: t("links.docs"), href: "https://docs.geneline-x.com", external: true },
  ]

  const legalList = [
    { name: t("privacy"), href: "/privacy" },
    { name: t("terms"), href: "/terms" },
  ]

  return (
    <footer className="relative bg-background overflow-hidden transition-colors duration-300">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 lg:py-20 border-t border-border">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
            {/* Company description */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 group mb-6">
                <Image
                  src="/logo.png"
                  alt="Geneline-X Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <span className="text-xl font-bold tracking-tight text-foreground transition-colors">Geneline-X</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-8">
                {t("description")}
              </p>
              <div className="flex items-center gap-4">
                {social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                    aria-label={item.name}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-6">{t("products")}</h3>
              <ul className="space-y-3">
                {productsList.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-6">{t("company")}</h3>
              <ul className="space-y-3">
                {companyList.map((item) => (
                  <li key={item.name}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-all inline-block hover:translate-x-0.5"
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
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-6">{t("legal")}</h3>
              <ul className="space-y-3">
                {legalList.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-all inline-block hover:translate-x-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Big Brand Name Section */}
        <div className="relative py-24 lg:py-40 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full max-w-6xl">
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
              {/* Radial glow */}
              <div className="absolute inset-0 bg-gradient-radial from-gray-100/20 dark:from-primary/5 via-transparent to-transparent opacity-60" />
            </div>
          </div>

          <div className="relative text-center">
            {/* Main Brand Text */}
            <h2 className="text-[clamp(4rem,20vw,18rem)] font-black tracking-tighter leading-[0.9] select-none">
              <span className="bg-gradient-to-br from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent drop-shadow-sm">
                Geneline-X
              </span>
            </h2>

            {/* Accent line */}
            <div className="mt-12 flex items-center justify-center gap-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
              <div className="h-2 w-2 rounded-full bg-border" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Geneline-X. {t("rights")}
            </p>
            <div className="flex items-center gap-4 sm:gap-8">
              <div className="flex items-center">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <div className="flex items-center gap-4 sm:gap-8">
                {legalList.map((item) => (
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
      </div>
    </footer>
  )
}
