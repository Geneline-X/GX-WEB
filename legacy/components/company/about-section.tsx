"use client"

import { useEffect, useRef, useState } from "react"

const timeline = [
  {
    year: "2023",
    title: "Founded in Freetown",
    description:
      "Geneline-X was established in Sierra Leone with a vision to bring world-class AI technology to Africa.",
  },
  {
    year: "2023",
    title: "Xplain AI Launch",
    description:
      "Released our flagship document intelligence platform, enabling businesses to process documents at scale.",
  },
  {
    year: "2024",
    title: "Kay-X Development",
    description:
      "Began development of Krio-to-English speech recognition, the first of its kind for Sierra Leonean languages.",
  },
  {
    year: "2024",
    title: "Genestudio Release",
    description:
      "Launched our no-code chatbot platform, making AI accessible to businesses without technical expertise.",
  },
  {
    year: "2025",
    title: "Infrastructure APIs",
    description: "Opened our AI infrastructure to developers worldwide with comprehensive APIs and documentation.",
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -translate-x-1/2" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* About Text */}
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">About Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
              Pioneering AI from the Heart of West Africa
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Geneline-X was born from a simple observation: Africa has the talent, the problems worth solving, and
                the unique perspectives needed to build transformative AI — what was missing was the infrastructure.
              </p>
              <p>
                Starting from Freetown, Sierra Leone, we've built a comprehensive AI ecosystem that includes document
                intelligence (Xplain AI), chatbot creation (Genestudio), and groundbreaking language technology (Kay-X)
                for underserved African languages.
              </p>
              <p>
                Our team combines deep technical expertise with firsthand understanding of African business contexts.
                We're not adapting Western solutions — we're building from the ground up for the challenges and
                opportunities unique to our continent.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="relative pl-8 border-l border-border">
              {timeline.map((item, index) => (
                <div
                  key={`${item.year}-${item.title}`}
                  className={`relative pb-8 last:pb-0 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary/20 border-2 border-primary" />

                  {/* Content */}
                  <div className="ml-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{item.year}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-1 mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
