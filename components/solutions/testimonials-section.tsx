"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote:
      "Geneline-X transformed how we process medical records. What used to take hours now happens in minutes with remarkable accuracy.",
    author: "Dr. Aminata Kamara",
    role: "Chief Medical Officer",
    organization: "Connaught Hospital, Sierra Leone",
  },
  {
    quote:
      "The Kay-X integration allowed us to serve citizens in Krio for the first time. It's breaking down language barriers in public services.",
    author: "Mohamed Sesay",
    role: "Director of Digital Services",
    organization: "Ministry of Information, Sierra Leone",
  },
  {
    quote:
      "Genestudio helped us deploy a customer service bot in days, not months. The RAG capabilities are exceptional for our knowledge base.",
    author: "Fatmata Bangura",
    role: "Head of Innovation",
    organization: "Sierra Leone Commercial Bank",
  },
  {
    quote:
      "The AI infrastructure from Geneline-X powers our entire analytics platform. Their vector database solution handles millions of queries daily.",
    author: "Emmanuel Koroma",
    role: "CTO",
    organization: "Freetown Fintech",
  },
  {
    quote:
      "Xplain AI revolutionized our legal document review process. We've reduced contract analysis time by 80% while improving accuracy.",
    author: "Isatu Conteh",
    role: "Legal Operations Director",
    organization: "West Africa Law Partners",
  },
  {
    quote:
      "As an EdTech startup, we needed affordable AI solutions. Geneline-X provided enterprise-grade tools at pricing that made sense for Africa.",
    author: "Alhaji Bah",
    role: "Founder & CEO",
    organization: "LearnSalone",
  },
  {
    quote:
      "Their developer platform documentation is exceptional. We integrated speech-to-text in under a week and launched our voice app successfully.",
    author: "Mariama Jalloh",
    role: "Lead Developer",
    organization: "VoiceTech Africa",
  },
  {
    quote:
      "The team at Geneline-X understands African markets. Their AI solutions are designed with our unique challenges and opportunities in mind.",
    author: "Samuel Williams",
    role: "Managing Director",
    organization: "Pan-African Investment Group",
  },
]

import { useTranslations } from "next-intl"

export function TestimonialsSection() {
  const t = useTranslations("Testimonials")
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)

  const testimonials = [
    {
      quote: t("items.aminata.quote"),
      author: t("items.aminata.author"),
      role: t("items.aminata.role"),
      organization: t("items.aminata.org"),
    },
    {
      quote: t("items.mohamed.quote"),
      author: t("items.mohamed.author"),
      role: t("items.mohamed.role"),
      organization: t("items.mohamed.org"),
    },
    {
      quote: t("items.fatmata.quote"),
      author: t("items.fatmata.author"),
      role: t("items.fatmata.role"),
      organization: t("items.fatmata.org"),
    },
  ]

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1)
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2)
      } else {
        setCardsPerView(3)
      }
    }

    updateCardsPerView()
    window.addEventListener("resize", updateCardsPerView)
    return () => window.removeEventListener("resize", updateCardsPerView)
  }, [])

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

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - cardsPerView : prev - 1))
  }, [cardsPerView, testimonials.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= testimonials.length - cardsPerView ? 0 : prev + 1))
  }, [cardsPerView, testimonials.length])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <p className="text-primary font-medium tracking-wide uppercase text-[10px] sm:text-sm mb-4">{t("badge")}</p>
          <h2 className="text-[clamp(1.75rem,7vw,3.5rem)] sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300 shadow-lg dark:shadow-none"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300 shadow-lg dark:shadow-none"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>

          {/* Testimonials Container */}
          <div className="overflow-hidden mx-6 lg:mx-8">
            <div
              ref={scrollContainerRef}
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.author}
                  className={`flex-shrink-0 px-3 ${cardsPerView === 1 ? "w-full" : cardsPerView === 2 ? "w-1/2" : "w-1/3"
                    }`}
                >
                  <div
                    className={`relative h-full p-6 lg:p-8 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                    style={{ transitionDelay: `${(index % cardsPerView) * 150}ms` }}
                  >
                    {/* Quote icon */}
                    <Quote className="w-8 h-8 text-primary/30 mb-4" />

                    {/* Quote text */}
                    <blockquote className="text-foreground mb-6 leading-relaxed italic">"{testimonial.quote}"</blockquote>

                    {/* Author */}
                    <div className="border-t border-border/50 pt-4 mt-auto">
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-primary/80">{testimonial.organization}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(testimonials.length - cardsPerView + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-primary w-6" : "bg-border hover:bg-muted-foreground"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
