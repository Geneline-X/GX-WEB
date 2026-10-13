import type { ReactNode } from "react"
import { Announce } from "@/components/site/announce"
import { Nav } from "@/components/site/nav"
import { Footer } from "@/components/site/footer"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Announce />
      <Nav />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  )
}
