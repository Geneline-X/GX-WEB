"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useStaggerReveal } from "@/hooks/use-scroll-animations"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Link } from "@/i18n/routing"
import Image from "next/image"

const newsArticles = [
  {
    id: 1,
    category: "Product Launch",
    title: "GenelineX Announces KRIO v2 with Enhanced Multilingual Capabilities",
    excerpt: "The latest iteration of our flagship AI model brings unprecedented accuracy in African language processing and understanding.",
    image: "/news/krio-v2-launch.jpg",
    date: "2026-01-10",
    readTime: "5 min read",
    slug: "krio-v2-launch",
  },
  {
    id: 2,
    category: "Partnership",
    title: "Strategic Partnership with African Union for Digital Transformation",
    excerpt: "Collaborating to bring AI-powered solutions to government services across 55 African nations.",
    image: "/news/au-partnership.jpg",
    date: "2026-01-08",
    readTime: "4 min read",
    slug: "au-partnership",
  },
  {
    id: 3,
    category: "Funding",
    title: "Series B Funding: $50M to Accelerate AI Research and Expansion",
    excerpt: "Led by top-tier venture capital firms, this funding will fuel our mission to democratize AI across Africa.",
    image: "/news/series-b-funding.jpg",
    date: "2026-01-05",
    readTime: "6 min read",
    slug: "series-b-funding",
  },
  {
    id: 4,
    category: "Achievement",
    title: "GenelineX Wins 'AI Innovation of the Year' at Africa Tech Summit",
    excerpt: "Recognized for groundbreaking work in natural language processing for low-resource languages.",
    image: "/news/award-win.jpg",
    date: "2025-12-28",
    readTime: "3 min read",
    slug: "award-win-2025",
  },
  {
    id: 5,
    category: "Research",
    title: "New Research Paper: Advancing Zero-Shot Learning for African Languages",
    excerpt: "Our research team publishes breakthrough findings in multilingual AI model training.",
    image: "/news/research-paper.jpg",
    date: "2025-12-20",
    readTime: "8 min read",
    slug: "research-zero-shot",
  },
  {
    id: 6,
    category: "Company",
    title: "GenelineX Opens New AI Research Center in Nairobi",
    excerpt: "Expanding our footprint with a state-of-the-art facility focused on indigenous language AI.",
    image: "/news/nairobi-center.jpg",
    date: "2025-12-15",
    readTime: "4 min read",
    slug: "nairobi-research-center",
  },
]

const categoryColors: Record<string, string> = {
  "Product Launch": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Partnership": "bg-green-500/10 text-green-500 border-green-500/20",
  "Funding": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Achievement": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "Research": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  "Company": "bg-pink-500/10 text-pink-500 border-pink-500/20",
}

export function NewsSection() {
  const containerRef = useStaggerReveal<HTMLDivElement>({ stagger: 0.12 })
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 pointer-events-none" />
      <motion.div
        style={{ y }}
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 lg:mb-20 gap-6">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-primary font-semibold text-sm tracking-wider uppercase mb-4"
            >
              Latest Updates
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(2.5rem,7vw,4rem)] sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              News & Announcements
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button variant="outline" size="lg" className="group" asChild>
              <Link href="/news">
                View All News
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* News Grid */}
        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {newsArticles.map((article, index) => (
            <motion.div
              key={article.id}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="h-full group cursor-pointer"
            >
              <Link href={`/news/${article.slug}`}>
                <Card className="h-full overflow-hidden border-2 border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 bg-white">
                  {/* Image */}
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5">
                    {/* Placeholder gradient - replace with actual images */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent" />

                    {/* Animated overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 0.9 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Parallax effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-primary/20"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge
                        variant="outline"
                        className={`${categoryColors[article.category] || 'bg-primary/10 text-primary'} backdrop-blur-sm font-medium border`}
                      >
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 lg:p-7">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={article.date}>
                          {new Date(article.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center text-primary font-semibold group/link">
                      <span>Read article</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardContent>

                  {/* Animated glow effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 shadow-lg text-center"
        >
          <h3 className="text-xl lg:text-2xl lg:text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter to receive the latest news, product updates, and insights directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="lg" className="group">
              Subscribe
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
