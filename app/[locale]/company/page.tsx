import type { Metadata } from "next"
import { CompanyHeroSection } from "@/components/company/hero-section"
import { MissionSection } from "@/components/company/mission-section"
import { AboutSection } from "@/components/company/about-section"
import { CompanyStatsSection } from "@/components/company/stats-section"

export const metadata: Metadata = {
  title: "Company",
  description:
    "Learn about Geneline-X — an African-founded AI company building intelligent platforms and language technologies from Sierra Leone.",
}

export default function CompanyPage() {
  return (
    <>
      <CompanyHeroSection />
      <MissionSection />
      <AboutSection />
      <CompanyStatsSection />
    </>
  )
}
