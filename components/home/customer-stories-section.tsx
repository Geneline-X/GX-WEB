"use client"

import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-animations"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"

const customerStories = [
  {
    id: 1,
    company: "TechCorp Africa",
    logo: "/logos/techcorp.svg",
    customer: "Amara Johnson",
    title: "CTO",
    quote: "GenelineX's KRIO model transformed how we handle multilingual customer support. We reduced response time by 70% and improved customer satisfaction dramatically.",
    metrics: {
      label: "Response Time",
      value: "70%",
      improvement: "faster",
    },
    industry: "E-commerce",
  },
  {
    id: 2,
    company: "HealthLink",
    logo: "/logos/healthlink.svg",
    customer: "Dr. Kwame Mensah",
    title: "Head of Innovation",
    quote: "The accuracy and speed of GenelineX's AI in processing medical records in local languages has been game-changing for rural healthcare delivery.",
    metrics: {
      label: "Accuracy",
      value: "95%",
      improvement: "improvement",
    },
    industry: "Healthcare",
  },
  {
    id: 3,
    company: "EduFuture",
    logo: "/logos/edufuture.svg",
    customer: "Fatima Okafor",
    title: "Product Director",
    quote: "We integrated GenelineX in just 3 days and immediately saw a 3x increase in student engagement across our language learning platform.",
    metrics: {
      label: "Engagement",
      value: "3x",
      improvement: "increase",
    },
    industry: "Education",
  },
  {
    id: 4,
    company: "FinanceFlow",
    logo: "/logos/financeflow.svg",
    customer: "Michael Otieno",
    title: "VP Engineering",
    quote: "Security and compliance were our top concerns. GenelineX exceeded expectations with their enterprise-grade infrastructure and support.",
    metrics: {
      label: "Compliance",
      value: "100%",
      improvement: "certified",
    },
    industry: "Fintech",
  },
  {
    id: 5,
    company: "AgriTech Solutions",
    logo: "/logos/agritech.svg",
    customer: "Aisha Diallo",
    title: "CEO",
    quote: "The ability to provide real-time crop advice in multiple African languages has helped thousands of smallholder farmers increase their yields.",
    metrics: {
      label: "Farmer Reach",
      value: "50K+",
      improvement: "farmers",
    },
    industry: "Agriculture",
  },
  {
    id: 6,
    company: "RetailHub",
    logo: "/logos/retailhub.svg",
    customer: "John Mboya",
    title: "Chief Data Officer",
    quote: "GenelineX's scalability is impressive. We handle peak traffic 10x our average with zero downtime. Their infrastructure is rock solid.",
    metrics: {
      label: "Uptime",
      value: "99.99%",
      improvement: "reliability",
    },
    industry: "Retail",
  },
]

export function CustomerStoriesSection() {
  const [displayedStories, setDisplayedStories] = useState(customerStories.slice(0, 6))
  const [isShuffling, setIsShuffling] = useState(false)
  const sectionRef = useScrollReveal<HTMLElement>()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Auto-shuffle every 6 seconds
    intervalRef.current = setInterval(() => {
      shuffleStories()
    }, 6000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const shuffleStories = () => {
    setIsShuffling(true)
    setTimeout(() => {
      const shuffled = [...customerStories].sort(() => Math.random() - 0.5)
      setDisplayedStories(shuffled.slice(0, 6))
      setIsShuffling(false)
    }, 400)
  }

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-gray-50">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full" />
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
            Success Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2rem,8vw,4rem)] sm:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Join thousands of companies transforming their operations with GenelineX AI technology
          </motion.p>
        </div>

        {/* Shuffling Grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
          >
            <AnimatePresence mode="popLayout">
              {displayedStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    layout: { duration: 0.4 },
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="h-full"
                >
                  <Card className="h-full bg-white border-2 border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                    {/* Magnetic effect background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />

                    <CardContent className="p-6 lg:p-7 relative z-10">
                      {/* Industry Tag */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {story.industry}
                        </span>
                      </div>

                      {/* Quote Icon */}
                      <Quote className="w-10 h-10 text-primary/20 mb-4" />

                      {/* Quote */}
                      <blockquote className="text-sm sm:text-base leading-relaxed mb-6 min-h-[100px] sm:min-h-[120px]">
                        "{story.quote}"
                      </blockquote>

                      {/* Customer Info */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="font-semibold text-lg">{story.customer}</div>
                          <div className="text-sm text-muted-foreground">{story.title}</div>
                          <div className="text-sm font-medium text-primary mt-1">{story.company}</div>
                        </div>
                        {/* Logo placeholder */}
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <div className="w-8 h-8 rounded bg-primary/20" />
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="pt-4 border-t border-border/50">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-primary">{story.metrics.value}</span>
                          <span className="text-sm text-muted-foreground">
                            {story.metrics.improvement}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{story.metrics.label}</div>
                      </div>
                    </CardContent>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Button size="lg" className="group" asChild>
            <Link href="/company#case-studies">
              View All Case Studies
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 shadow-lg"
        >
          {[
            { value: "5000+", label: "Active Customers" },
            { value: "150+", label: "Countries" },
            { value: "99.99%", label: "Uptime" },
            { value: "24/7", label: "Support" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-[10px] sm:text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
