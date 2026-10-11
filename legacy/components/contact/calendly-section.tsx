"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

export function CalendlySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = section.querySelectorAll(".animate-in")
            elements.forEach((el, i) => {
              const element = el as HTMLElement
              setTimeout(() => {
                element.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"
                element.style.opacity = "1"
                element.style.transform = "translateY(0)"
              }, i * 100)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

      <section ref={sectionRef} id="calendly-scheduler" className="relative py-20 lg:py-28">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/3 blur-[120px] rounded-full" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-in text-center mb-12" style={{ opacity: 0, transform: "translateY(24px)" }}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Pick a Time That Works for You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select a convenient slot below and we'll be in touch to discuss how Geneline-X can help you.
            </p>
          </div>

          {/* Calendly Widget Container */}
          <div
            className="animate-in relative rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm overflow-hidden"
            style={{ opacity: 0, transform: "translateY(24px)" }}
          >
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/baimbaemmanuel14/30min"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>

          {/* Alternative contact info */}
          <div className="animate-in mt-12 text-center" style={{ opacity: 0, transform: "translateY(24px)" }}>
            <p className="text-muted-foreground">
              Prefer email?{" "}
              <a href="mailto:info@geneline-x.net" className="text-primary hover:underline underline-offset-4">
                info@geneline-x.net
              </a>
            </p>
          </div>
        </div>
      </section>``
    </>
  )
}
