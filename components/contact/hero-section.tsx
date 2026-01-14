"use client"

import { useEffect, useRef } from "react"
import { Calendar, MessageSquare, Lightbulb } from "lucide-react"

const ctaItems = [
  {
    icon: Calendar,
    title: "Book a Demo",
    description: "See our AI solutions in action with a personalized walkthrough.",
  },
  {
    icon: MessageSquare,
    title: "Schedule Consultation",
    description: "Discuss your business needs with our AI experts.",
  },
  {
    icon: Lightbulb,
    title: "Discuss Your Use Case",
    description: "Explore how our platforms can solve your specific challenges.",
  },
]

export function ContactHeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const elements = hero.querySelectorAll(".animate-in")
    elements.forEach((el, i) => {
      const element = el as HTMLElement
      element.style.opacity = "0"
      element.style.transform = "translateY(24px)"

      setTimeout(() => {
        element.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, i * 150)
    })
  }, [])

  const scrollToCalendly = () => {
    const calendlySection = document.getElementById("calendly-scheduler")
    if (calendlySection) {
      calendlySection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="animate-in inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-muted/30 text-sm text-muted-foreground mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Ready to help
          </div>

          <h1 className="animate-in text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
            Let's Build the Future <br className="hidden sm:block" />
            <span className="text-primary">Together</span>
          </h1>

          <p className="animate-in text-lg sm:text-xl text-muted-foreground leading-relaxed text-pretty">
            Whether you're ready to see our AI platforms in action, need expert guidance, or want to explore a specific
            use case — we're here to help.
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {ctaItems.map((item, index) => (
            <button
              key={item.title}
              onClick={scrollToCalendly}
              className="animate-in group relative p-6 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/40 transition-all duration-300 text-left"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>

                <div className="mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Schedule now →
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
