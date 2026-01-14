import { HeroSection } from "@/components/home/hero-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { StatsSection } from "@/components/home/stats-section"
import { PartnershipsSection } from "@/components/home/partnerships-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <StatsSection />
      <PartnershipsSection />
    </>
  )
}
