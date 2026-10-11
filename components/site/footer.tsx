import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { EXTERNAL, PRODUCTS } from "@/lib/site"
import { Logo } from "./logo"
import { LocaleSelect } from "./locale-select"
import { PauseToggle } from "@/components/motion/pause-toggle"
import styles from "./footer.module.scss"

const SOCIAL = [
  { name: "LinkedIn", href: EXTERNAL.linkedin },
  { name: "X", href: EXTERNAL.x },
  { name: "GitHub", href: EXTERNAL.github },
  { name: "Facebook", href: EXTERNAL.facebook },
  { name: "TikTok", href: EXTERNAL.tiktok },
]

export function Footer() {
  const t = useTranslations("Site")
  const year = new Date().getFullYear()

  const columns = [
    {
      title: t("footer.products"),
      links: PRODUCTS.map((p) => ({ label: t(`products.${p.key}.name`), href: p.href })),
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.about"), href: "/company" },
        { label: t("footer.events"), href: "/events" },
        { label: t("footer.contact"), href: "/contact-us" },
      ],
    },
    {
      title: t("footer.resources"),
      links: [
        { label: t("footer.research"), href: "/blog" },
        { label: t("footer.developers"), href: "/developers" },
        { label: t("footer.console"), href: "/console" },
        { label: t("footer.github"), href: EXTERNAL.github },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { label: t("footer.privacy"), href: "/privacy" },
        { label: t("footer.terms"), href: "/terms" },
      ],
    },
  ]

  return (
    <footer className={styles.footer} data-theme="dark">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.tagline}>{t("footer.tagline")}</p>
          <div className={styles.prefs}>
            <LocaleSelect placement="top" />
            <PauseToggle />
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className={styles.col}>
            <h2 className="t-mono dim">{col.title}</h2>
            <ul>
              {col.links.map((l) => {
                const external = l.href.startsWith("http")
                return (
                  <li key={l.label}>
                    {external ? (
                      <a href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link href={l.href}>{l.label}</Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        ))}
      </div>

      <div className={styles.word} aria-hidden="true">
        Geneline<span>X</span>
      </div>

      <div className={styles.base}>
        <p className="t-small dim">
          © {year} GenelineX. {t("footer.rights")}
        </p>
        <ul className={styles.social} aria-label={t("footer.social")}>
          {SOCIAL.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noreferrer" className="t-mono">
                {s.name}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
