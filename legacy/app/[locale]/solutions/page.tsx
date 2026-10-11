import type { Metadata } from "next"
import { SolutionsHeroSection } from "@/components/solutions/hero-section"
import { UseCasesSection } from "@/components/solutions/use-cases-section"
import { TestimonialsSection } from "@/components/solutions/testimonials-section"

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Discover how Geneline-X AI solutions transform businesses across healthcare, education, finance, and more.",
}

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHeroSection />
      <UseCasesSection />
      <TestimonialsSection />
    </>
  )
}
