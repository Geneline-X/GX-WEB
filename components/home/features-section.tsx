"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useStaggerReveal } from "@/hooks/use-scroll-animations"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "@/i18n/routing"
import Image from "next/image"

const features = [
  {
    title: "Instant Answers",
    description: "Complex reasoning in under a second — perfect for deep search, copilots, and analysis.",
    image: "/images/features/instant-answers.jpg",
    ctaText: "Read more: AlphaSense",
    link: "/solutions#instant-answers",
    backgroundColor: "from-amber-50 to-orange-50",
  },
  {
    title: "Agents that never stall",
    description: "Execute multi-step workflows without delays or timeouts.",
    image: "/images/features/agents.jpg",
    ctaText: "Case study: NinjaTech",
    link: "/solutions#agents",
    backgroundColor: "from-gray-50 to-gray-100",
  },
  {
    title: "Code at the speed of thought",
    description: "Code, debug, and refactor instantly so developers never lose their flow.",
    image: "/images/features/code-speed.jpg",
    ctaText: "Read more: Cognition",
    link: "/solutions#code-speed",
    backgroundColor: "from-orange-400 to-orange-500",
  },
  {
    title: "Conversations that flow",
    description: "Instant, accurate voice responses for higher quality interactions.",
    image: "/images/features/conversations.jpg",
    ctaText: "Case study: Tavus",
    link: "/solutions#conversations",
    backgroundColor: "from-gray-200 to-gray-300",
  },
]

export function FeaturesSection() {
  const containerRef = useStaggerReveal<HTMLDivElement>({ stagger: 0.15 })
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-white">
      {/* Animated background elements */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(2rem,7vw,4rem)] sm:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            <span className="text-primary text-[clamp(1.5rem,5vw,2.5rem)] lg:text-3xl xl:text-4xl block mb-2 uppercase tracking-[0.2em]">The GenelineX Advantage</span>
            {/* Building Products that Others Can't */}
            Build Products that Others Can't
          </motion.h2>
        </div>

        {/* Features Grid - 4 columns on large screens, 2 on medium, 1 on small */}
        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="h-full"
            >
              <Card className="relative h-full overflow-hidden bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300 group">
                {/* Image Section */}
                <div className={`relative h-48 sm:h-64 overflow-hidden bg-gradient-to-br ${feature.backgroundColor}`}>
                  {/* Placeholder for actual image - you can add real images here */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="w-full h-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-sm text-gray-600 text-center">
                      Feature visualization
                      <br />
                      {feature.title}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    {feature.description}
                  </p>

                  {/* CTA Link */}
                  <Link
                    href={feature.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-primary px-4 py-2 hover:bg-primary/90 transition-colors group/link"
                  >
                    {feature.ctaText}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
