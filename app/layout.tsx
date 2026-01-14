import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Geneline-X | AI Infrastructure for Africa",
    template: "%s | Geneline-X",
  },
  description:
    "African-founded AI company building intelligent platforms, infrastructure, and language technologies. Powering the future of AI across the continent.",
  keywords: [
    "AI",
    "artificial intelligence",
    "Africa",
    "machine learning",
    "RAG",
    "vector database",
    "Krio",
    "language technology",
  ],
  authors: [{ name: "Geneline-X" }],
  creator: "Geneline-X",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Geneline-X",
    title: "Geneline-X | AI Infrastructure for Africa",
    description:
      "African-founded AI company building intelligent platforms, infrastructure, and language technologies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geneline-X | AI Infrastructure for Africa",
    description:
      "African-founded AI company building intelligent platforms, infrastructure, and language technologies.",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
