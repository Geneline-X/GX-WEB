import { HeroSection } from "@/components/home/hero-section"
import { KrioModelSection } from "@/components/home/krio-model-section"
import { FeaturesSection } from "@/components/home/features-section"
import { IntegrationSection } from "@/components/home/integration-section"
import { CustomerStoriesSection } from "@/components/home/customer-stories-section"
import { NewsSection } from "@/components/home/news-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { StatsSection } from "@/components/home/stats-section"
import { PartnershipsSection } from "@/components/home/partnerships-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <KrioModelSection />
      <HowItWorksSection />
      <StatsSection />
      <PartnershipsSection />
    </>
  )
}
