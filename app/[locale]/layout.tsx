import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { Newsreader, Schibsted_Grotesk, Martian_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { CookieBanner } from "@/components/site/cookie-banner"
import "../tailwind.css"
import "@/styles/main.scss"

const display = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
})

const sans = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-schibsted",
})

const mono = Martian_Mono({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-martian",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://geneline-x.com"),
  title: {
    default: "GenelineX | The AI pipeline for African languages",
    template: "%s | GenelineX",
  },
  description:
    "GenelineX records, transcribes and trains speech and language models for African languages, starting with Krio in Sierra Leone.",
  keywords: ["AI", "Africa", "African languages", "speech-to-text", "Krio", "low-resource NLP", "Kay-X", "KACCP"],
  authors: [{ name: "GenelineX" }],
  openGraph: {
    type: "website",
    siteName: "GenelineX",
    title: "GenelineX | The AI pipeline for African languages",
    description: "Data, models and APIs for the languages most AI can’t hear.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GenelineX | The AI pipeline for African languages",
    description: "Data, models and APIs for the languages most AI can’t hear.",
  },
  icons: { icon: "/logo.png", shortcut: "/logo.png", apple: "/logo.png" },
}

export const viewport: Viewport = {
  themeColor: "#eff0ec",
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  const messages = await getMessages()
  const t = await getTranslations("Site")

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <noscript>
          <style>{`[data-in],[data-r]{opacity:1!important}`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          {t("skip")}
        </a>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          {children}
          <CookieBanner />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
