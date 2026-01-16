"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export function HeroSection() {
  const t = useTranslations("Hero")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP animations would be initialized here
  }, [])

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 bg-background transition-colors duration-500">
        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/20 blur-[150px] rounded-full" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 dark:bg-primary/10 blur-[100px] rounded-full" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] sm:text-6xl lg:text-5xl xl:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up text-foreground leading-[1.1]">
                {t.rich("title", {
                  africanAI: (chunks) => <span className="text-primary">{chunks}</span>
                })}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-100">
                {t("subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-200 mb-8 sm:mb-12">
                <Button size="lg" className="h-12 sm:h-14 px-8 sm:px-12 min-w-[180px] sm:min-w-[200px] rounded-none bg-primary hover:bg-primary/90 text-white font-semibold uppercase text-[10px] sm:text-xs tracking-wider shadow-lg hover:shadow-xl transition-all group overflow-hidden" asChild>
                  <Link href="/developers" className="flex items-center justify-center">
                    <span className="transition-transform duration-300">{t("tryDemo")}</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 -ml-5 opacity-0 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300 font-bold" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 sm:h-14 px-8 sm:px-12 min-w-[180px] sm:min-w-[200px] rounded-none border-2 border-foreground hover:bg-foreground hover:text-background bg-transparent font-semibold uppercase text-[10px] sm:text-xs tracking-wider shadow-sm hover:shadow-md transition-all group overflow-hidden" asChild>
                  <Link href="/contact-us" className="flex items-center justify-center text-foreground group-hover:text-background transition-colors">
                    <span className="transition-transform duration-300">{t("contactUs")}</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 -ml-5 opacity-0 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300 font-bold" />
                  </Link>
                </Button>
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] animate-fade-in-up animation-delay-300">
                {t("footer")}
              </p>
            </div>

            {/* Hero Visual Section */}
            <div className="relative aspect-square w-full max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto order-1 lg:order-2 animate-fade-in-up animation-delay-200">
              {/* Floating Stats Cards */}
              <div className="absolute top-6 sm:top-4 lg:top-8 left-4 sm:-left-4 lg:-left-8 z-20 animate-float">
                <div className="bg-card/80 backdrop-blur-md border border-border p-2 sm:p-3 lg:p-4 shadow-xl">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-0.5 sm:mb-1">150+</div>
                  <div className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{t("stats.languages")}</div>
                </div>
              </div>

              <div className="absolute top-16 sm:top-24 lg:top-32 right-10 sm:-right-4 lg:-right-8 z-20 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="bg-card/80 backdrop-blur-md border border-border p-2 sm:p-3 lg:p-4 shadow-xl">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-0.5 sm:mb-1">99.9%</div>
                  <div className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{t("stats.uptime")}</div>
                </div>
              </div>

              <div className="absolute bottom-20 sm:bottom-16 lg:bottom-24 left-10 sm:left-4 lg:left-8 z-20 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-card/80 backdrop-blur-md border border-border p-2 sm:p-3 lg:p-4 shadow-xl">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-0.5 sm:mb-1">&lt;50ms</div>
                  <div className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{t("stats.latency")}</div>
                </div>
              </div>

              {/* AI Hero Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full p-10 lg:p-12">
                  <img
                    src="/ai_hero.png"
                    alt="AI Infrastructure"
                    className="w-full h-full object-contain filter drop-shadow-2xl dark:brightness-110"
                  />
                  {/* Glow behind image */}
                  <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full scale-75 opacity-50 dark:opacity-70" />
                </div>
              </div>
            </div>
          </div>

          {/* Partners Section - Integrated */}
          <div className="mt-24 lg:mt-32 animate-fade-in-up animation-delay-300">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-12">
              {t("trustedBy")}
            </p>
            <div className="overflow-hidden">
              <div className="flex animate-marquee items-center">
                {[
                  { name: "OpenAI", logo: "/openai-logo.svg" },
                  { name: "AWS", logo: "/Amazon_Web_Services_Logo.svg" },
                  { name: "Google Cloud", logo: "/Google Cloud.svg" },
                  { name: "Microsoft Azure", logo: "/Microsoft_Azure-OXJddnt9u_brandlogos.net.svg" },
                  { name: "Vercel", logo: "/vercel.svg" },
                  { name: "Pinecone", logo: "/Pinecone-Icon--Streamline-Svg-Logos.svg" },
                ].concat([
                  { name: "OpenAI", logo: "/openai-logo.svg" },
                  { name: "AWS", logo: "/Amazon_Web_Services_Logo.svg" },
                  { name: "Google Cloud", logo: "/Google Cloud.svg" },
                  { name: "Microsoft Azure", logo: "/Microsoft_Azure-OXJddnt9u_brandlogos.net.svg" },
                  { name: "Vercel", logo: "/vercel.svg" },
                  { name: "Pinecone", logo: "/Pinecone-Icon--Streamline-Svg-Logos.svg" },
                ]).map((partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="flex-shrink-0 mx-4 sm:mx-8 lg:mx-12 opacity-40 hover:opacity-100 transition-opacity duration-500"
                    title={partner.name}
                  >
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="h-5 sm:h-7 lg:h-9 w-auto object-contain grayscale dark:invert-[0.8] hover:grayscale-0 dark:hover:invert-0 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
      </section>
    </>
  )
}
