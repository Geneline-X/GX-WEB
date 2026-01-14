"use client"

import { useEffect, useRef, useState } from "react"
import { Database, Cpu, Layers, Zap } from "lucide-react"

const steps = [
  {
    icon: Database,
    title: "Ingest Your Data",
    description: "Connect documents, media, or custom data sources. Our pipelines handle the heavy lifting.",
  },
  {
    icon: Cpu,
    title: "Process & Understand",
    description: "RAG pipelines, vector embeddings, and AI models transform raw data into actionable intelligence.",
  },
  {
    icon: Layers,
    title: "Build & Deploy",
    description: "Use our APIs and SDKs to build custom AI applications, chatbots, or integrations.",
  },
  {
    icon: Zap,
    title: "Scale & Optimize",
    description: "Enterprise-grade infrastructure that scales with your needs. Monitor, iterate, improve.",
  },
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            // Stagger through steps
            steps.forEach((_, index) => {
              setTimeout(() => {
                setActiveStep(index)
              }, index * 400)
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -translate-x-1/2" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">How It Works</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
            From Data to Intelligence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our platform transforms how you work with AI — simple to start, powerful to scale.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative group transition-all duration-700 ${
                hasAnimated && index <= activeStep ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Connecting line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px">
                  <div
                    className={`h-full bg-gradient-to-r from-primary/40 to-transparent transition-all duration-700 ${
                      hasAnimated && index < activeStep ? "w-full" : "w-0"
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 400}ms` }}
                  />
                </div>
              )}

              {/* Step card */}
              <div className="relative p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors h-full">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{index + 1}</span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
