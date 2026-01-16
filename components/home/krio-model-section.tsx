"use client"

import { motion } from "framer-motion"
import { useStaggerReveal } from "@/hooks/use-scroll-animations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Zap, Shield, Layers, Play } from "lucide-react"
import { useState } from "react"
import { useTranslations } from "next-intl"

export function KrioModelSection() {
  const t = useTranslations("KrioModel")
  const containerRef = useStaggerReveal<HTMLDivElement>({ stagger: 0.2 })
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoPaused, setIsVideoPaused] = useState(false)

  const krioComponents = [
    {
      icon: Brain,
      title: t("components.neural.title"),
      description: t("components.neural.desc"),
      highlight: t("components.neural.highlight"),
    },
    {
      icon: Zap,
      title: t("components.performance.title"),
      description: t("components.performance.desc"),
      highlight: t("components.performance.highlight"),
    },
    {
      icon: Shield,
      title: t("components.security.title"),
      description: t("components.security.desc"),
      highlight: t("components.security.highlight"),
    },
    {
      icon: Layers,
      title: t("components.modular.title"),
      description: t("components.modular.desc"),
      highlight: t("components.modular.highlight"),
    },
  ]

  const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    if (video.paused) {
      video.play()
      setIsVideoPaused(false)
    } else {
      video.pause()
      setIsVideoPaused(true)
    }
  }

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary font-semibold text-sm tracking-widest uppercase mb-4"
          >
            {t("badge")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2rem,8vw,3.5rem)] sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight mb-6 text-foreground leading-[1.1]"
          >
            {t.rich("title", {
              span: (chunks) => <span className="text-primary">{chunks}</span>
            })}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* Video Frame - Unmatched Design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20 relative group"
        >
          {/* Outer glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-none blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse-slow" />

          {/* Video container */}
          <div className="relative aspect-video bg-card rounded-none overflow-hidden border-2 border-border/50 shadow-2xl transition-colors duration-500">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50" />

            {/* Video or placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 via-transparent to-primary/5">
              {/* Animated grid background */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
              </div>

              {/* Play button overlay */}
              {!isVideoPlaying && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsVideoPlaying(true)}
                  className="relative z-10 group/play"
                >
                  <div className="relative">
                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                    <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />

                    {/* Play button */}
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover/play:shadow-primary/40">
                      <Play className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-white ml-1" />
                    </div>
                  </div>

                  {/* Watch demo text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-foreground font-bold text-[10px] tracking-[0.2em] uppercase"
                  >
                    {t("watchDemo")}
                  </motion.div>
                </motion.button>
              )}

              {/* Video player */}
              {isVideoPlaying && (
                <video
                  className="w-full h-full object-cover cursor-pointer"
                  autoPlay
                  onClick={handleVideoClick}
                  src="/videos/krio-demo.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Floating particles effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/40 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -40, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Status bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          {/* Caption */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8 text-xs font-medium tracking-wide text-muted-foreground uppercase"
          >
            {t("experience")}
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {krioComponents.map((component, index) => (
            <motion.div
              key={component.title}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
              className="h-full"
            >
              <Card className="relative h-full bg-card border border-border hover:border-primary/60 hover:shadow-xl transition-all duration-500 group overflow-hidden rounded-none">
                <CardHeader className="relative z-10">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500">
                    <component.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-500">{component.title}</CardTitle>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-wider">
                    {component.highlight}
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                    {component.description}
                  </CardDescription>
                </CardContent>

                {/* Subtle hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
