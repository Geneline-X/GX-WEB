"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

function AnimatedNumber({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const startTime = Date.now()
    const isDecimal = value % 1 !== 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = value * easeOut

      setDisplayValue(isDecimal ? Number(current.toFixed(1)) : Math.floor(current))

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

export function StatsSection() {
  const t = useTranslations("Stats")
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const stats = [
    { value: 50, suffix: "K+", label: t("processed") },
    { value: 99.9, suffix: "%", label: t("uptime") },
    { value: 500, suffix: "ms", label: t("latency") },
    { value: 10, suffix: "+", label: t("languages") },
  ]

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
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-background transition-colors duration-500">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-[clamp(2.5rem,10vw,4rem)] sm:text-5xl lg:text-7xl font-black text-foreground mb-2 sm:mb-4 tracking-tighter">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <p className="text-[10px] sm:text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] max-w-[120px] sm:max-w-[150px] mx-auto leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
