"use client"

import { useEffect, useRef, useState } from "react"
import { FileText, Building2, GraduationCap, Heart, Landmark, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

const useCases = [
  {
    icon: Heart,
    category: "Healthcare",
    title: "Medical Document Intelligence",
    description:
      "Process patient records, research papers, and clinical documents with AI-powered extraction and summarization.",
    product: "Xplain AI",
    features: ["Medical record analysis", "Research synthesis", "Compliance documentation"],
  },
  {
    icon: GraduationCap,
    category: "Education",
    title: "Learning Assistant Chatbots",
    description:
      "Deploy AI tutors and educational assistants that understand local context and multiple languages including Krio.",
    product: "Genestudio + Kay-X",
    features: ["Multilingual support", "Curriculum-aligned responses", "Student progress tracking"],
  },
  {
    icon: Landmark,
    category: "Government",
    title: "Public Service Automation",
    description:
      "Streamline citizen services with intelligent document processing and voice-enabled assistance in local languages.",
    product: "Full Platform",
    features: ["Document verification", "Voice-based services", "Multilingual citizen support"],
  },
  {
    icon: Building2,
    category: "Enterprise",
    title: "Knowledge Management",
    description: "Transform internal documents into searchable, queryable knowledge bases with RAG-powered retrieval.",
    product: "AI Infrastructure",
    features: ["Internal knowledge base", "Semantic search", "Custom AI agents"],
  },
  {
    icon: FileText,
    category: "Legal",
    title: "Contract Analysis",
    description: "Automate contract review, clause extraction, and risk assessment with document intelligence.",
    product: "Xplain AI",
    features: ["Clause extraction", "Risk identification", "Compliance checking"],
  },
  {
    icon: Truck,
    category: "Logistics",
    title: "Operations Intelligence",
    description: "Process shipping documents, invoices, and operational data with automated extraction and analysis.",
    product: "Xplain AI + APIs",
    features: ["Document processing", "Data extraction", "Workflow automation"],
  },
]

export function UseCasesSection() {
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
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full translate-x-1/2" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">Use Cases</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
            Built for Every Industry
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our AI platform adapts to your specific needs, whether you're in healthcare, education, or enterprise.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              className={`group relative p-6 lg:p-8 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Category badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <useCase.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{useCase.category}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">{useCase.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{useCase.description}</p>

              {/* Product tag */}
              <div className="mb-4">
                <span className="text-xs font-medium text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                  {useCase.product}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-2">
                {useCase.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">Don't see your industry? We build custom solutions.</p>
          <Button size="lg" variant="outline" className="border-border hover:bg-muted bg-transparent" asChild>
            <a href="/contact-us" target="_blank" rel="noopener noreferrer">
              Discuss Your Use Case
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
