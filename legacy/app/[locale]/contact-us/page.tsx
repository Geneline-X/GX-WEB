import type { Metadata } from "next"
import { ContactHeroSection } from "@/components/contact/hero-section"
import { CalendlySection } from "@/components/contact/calendly-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Contact Us | Geneline-X",
  description:
    "Get in touch with Geneline-X. Book a demo, schedule a consultation, or discuss your AI use case with our team.",
}

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-background">
      <ContactHeroSection />
      <CalendlySection />
    </main>
  )
}
