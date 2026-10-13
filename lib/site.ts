export const EXTERNAL = {
  kaccp: "https://kaccp.vercel.app",
  kayx: "https://kay-x-entreprise.vercel.app",
  xplain: "https://xplain-ai.net",
  genestudio: "https://genistud.io",
  infra: "https://gen-x-service-dashboard.vercel.app",
  github: "https://github.com/geneline-x",
  linkedin: "https://www.linkedin.com/company/geneline-x",
  x: "https://x.com/GenelineX1333",
  facebook: "https://www.facebook.com/profile.php?id=61573120467513",
  tiktok: "https://tiktok.com/@genelinex",
} as const

/** Products in stack order, top (apps) to bottom (infrastructure). */
export const PRODUCTS = [
  { key: "xplain", layer: "apps", href: EXTERNAL.xplain },
  { key: "genestudio", layer: "apps", href: EXTERNAL.genestudio },
  { key: "kayx", layer: "models", href: EXTERNAL.kayx },
  { key: "kaccp", layer: "data", href: EXTERNAL.kaccp },
  { key: "infra", layer: "infra", href: EXTERNAL.infra },
] as const

export const LOCALES = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
  { code: "pt", name: "Português" },
  { code: "it", name: "Italiano" },
  { code: "zh", name: "中文" },
] as const

export const CONTACT = {
  email: "info@geneline-x.com",
  calendly: "https://calendly.com/baimbaemmanuel14/30min",
} as const
