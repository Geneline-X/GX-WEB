"use client"

import { motion } from "framer-motion"
import { useStaggerReveal } from "@/hooks/use-scroll-animations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Zap, Shield, Layers, Play } from "lucide-react"
import { useState } from "react"

const krioComponents = [
  {
    icon: Brain,
    title: "Neural Architecture",
    description: "Advanced transformer-based architecture optimized for multi-modal understanding and generation.",
    highlight: "Built on cutting-edge research",
  },
  {
    icon: Zap,
    title: "Lightning Performance",
    description: "Unprecedented inference speed with optimized compute efficiency, achieving millisecond-level response times.",
    highlight: "10x faster than competitors",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Military-grade encryption and compliance with GDPR, SOC2, and HIPAA standards built into the core.",
    highlight: "Zero-trust architecture",
  },
  {
    icon: Layers,
    title: "Modular Framework",
    description: "Flexible, composable modules that adapt to your specific use cases without retraining the entire model.",
    highlight: "Plug-and-play capabilities",
  },
]

export function KrioModelSection() {
  const containerRef = useStaggerReveal<HTMLDivElement>({ stagger: 0.2 })
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoPaused, setIsVideoPaused] = useState(false)
  const videoRef = useState<HTMLVideoElement | null>(null)[0]

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
    <section className="relative py-24 lg:py-32 overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/8 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-primary/8 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary font-semibold text-sm tracking-wider uppercase mb-4"
          >
            Introducing KRIO
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6"
          >
            Building the First{" "}
            <span className="text-primary">
              KRIO Model
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            A revolutionary AI architecture designed for the next generation of intelligent applications. 
            Purpose-built for African languages and global deployment.
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
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-none blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-pulse-slow" />
          
          {/* Video container */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-none overflow-hidden border-4 border-primary/20 shadow-2xl">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary" />

            {/* Video or placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-purple-500/10 to-primary/20">
              {/* Animated grid background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }} />
              </div>

              {/* Play button overlay */}
              {!isVideoPlaying && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsVideoPlaying(true)}
                  className="relative z-10 group/play"
                >
                  <div className="relative">
                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
                    
                    {/* Play button */}
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover/play:shadow-primary/50">
                      <Play className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-white ml-1" />
                    </div>
                  </div>
                  
                  {/* Watch demo text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-white font-semibold text-sm tracking-wider uppercase"
                  >
                    Watch Demo
                  </motion.div>
                </motion.button>
              )}

              {/* Video player (placeholder - replace with actual video) */}
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
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Status bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          {/* Caption */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-6 text-sm text-muted-foreground"
          >
            Experience the power of KRIO in action
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {krioComponents.map((component, index) => (
            <motion.div
              key={component.title}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="h-full"
            >
              <Card className="relative h-full bg-white border-2 border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <component.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{component.title}</CardTitle>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                    {component.highlight}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {component.description}
                  </CardDescription>
                </CardContent>

                {/* Hover gradient effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
