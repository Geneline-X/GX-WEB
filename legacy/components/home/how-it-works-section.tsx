"use client"

import { motion, useInView } from "framer-motion"
import { Database, Cpu, Layers, Zap } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

export function HowItWorksSection() {
  const t = useTranslations("HowItWorks")
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [activeStep, setActiveStep] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  const steps = [
    {
      icon: Database,
      title: t("steps.ingest.title"),
      description: t("steps.ingest.desc"),
    },
    {
      icon: Cpu,
      title: t("steps.process.title"),
      description: t("steps.process.desc"),
    },
    {
      icon: Layers,
      title: t("steps.build.title"),
      description: t("steps.build.desc"),
    },
    {
      icon: Zap,
      title: t("steps.scale.title"),
      description: t("steps.scale.desc"),
    },
  ]

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      steps.forEach((_, index) => {
        setTimeout(() => {
          setActiveStep(index)
        }, index * 400)
      })
    }
  }, [isInView, hasAnimated, steps.length])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-background transition-colors duration-500">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 blur-[150px] rounded-full -translate-x-1/2 opacity-50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4"
          >
            {t("badge")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,8vw,3.5rem)] sm:text-5xl lg:text-6xl font-black tracking-tighter text-foreground mb-6 text-balance uppercase"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* Steps with Beam Animation */}
        <div className="relative">
          {/* The Glowing Beam Track (Desktop Only) */}
          <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[2px] bg-border/20 z-0">
            {/* The Beam */}
            {isInView && (
              <motion.div
                initial={{ left: "0%" }}
                animate={{
                  left: ["0%", "100%", "0%"]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 -translate-y-1/2 w-32 h-20 blur-xl opacity-50 dark:opacity-80 z-0"
                style={{
                  background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`
                }}
              />
            )}
            {/* Sharp Beam Light */}
            {isInView && (
              <motion.div
                initial={{ left: "0%" }}
                animate={{
                  left: ["0%", "100%", "0%"]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 -translate-y-1/2 w-24 h-[3px] bg-primary shadow-[0_0_15px_rgba(var(--primary),0.8)] z-10"
              />
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 }}
                className="relative group h-full"
              >
                {/* Step card */}
                <div className="relative p-8 rounded-none border border-border/50 bg-card/40 backdrop-blur-xl hover:border-primary/50 hover:bg-card transition-all duration-500 h-full overflow-hidden">
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Step number marker */}
                  <div className="mb-8 flex items-center justify-between">
                    <div className="w-14 h-14 rounded-none bg-primary/10 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                      <step.icon className="w-7 h-7 text-primary" />
                      {/* Active indicator */}
                      {hasAnimated && index <= activeStep && (
                        <motion.div
                          layoutId="active-marker"
                          className="absolute -inset-1 border border-primary animate-pulse"
                        />
                      )}
                    </div>
                    <span className="text-4xl font-black text-foreground/5 group-hover:text-primary/10 transition-colors uppercase select-none">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-4 tracking-tight uppercase">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-500">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
    </section>
  )
}
