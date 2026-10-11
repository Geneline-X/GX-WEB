"use client"

import { useEffect, useRef, useState } from "react"
import { Target, Globe, Lightbulb } from "lucide-react"

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To build AI infrastructure that empowers African businesses and developers to create world-class intelligent applications.",
  },
  {
    icon: Globe,
    title: "Our Vision",
    description:
      "A world where AI technology is accessible to everyone, regardless of geography, and where African innovation leads global progress.",
  },
  {
    icon: Lightbulb,
    title: "Our Approach",
    description:
      "We combine cutting-edge AI research with deep local understanding to build solutions that work for real-world African contexts.",
  },
]

export function MissionSection() {
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
      { threshold: 0.2 },
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <div className="text-center mb-16 lg:mb-20">
          <blockquote
            className={`text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground leading-relaxed max-w-4xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            "We believe the next generation of AI innovation will come from Africa. We're building the infrastructure to
            make that possible."
          </blockquote>
        </div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <pillar.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
