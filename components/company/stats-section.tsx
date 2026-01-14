"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 5, suffix: "+", label: "Products in Ecosystem" },
  { value: 10, suffix: "+", label: "African Languages" },
  { value: 100, suffix: "+", label: "Enterprise Clients" },
  { value: 15, suffix: "+", label: "Team Members" },
]

function AnimatedNumber({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(value * easeOut))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [isVisible, value])

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  )
}

export function CompanyStatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full translate-x-1/2" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">By the Numbers</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
            Growing Impact Across Africa
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
