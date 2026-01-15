"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { PartnershipsSection } from "@/components/home/partnerships-section"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP animations would be initialized here
    // For now, using CSS animations as placeholder
  }, [])

  return (
    <>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/4 right-1/4 w-100 h-100 bg-primary/8 blur-[100px] rounded-full" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              The First{" "}
              <span className="text-primary">
                African AI
              </span>{" "}
              Infrastructure
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-100">
              Multilingual intelligence, built for global scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-200 mb-12">
              <Button size="lg" className="h-14 px-12 min-w-50 rounded-none bg-primary hover:bg-primary/90 text-white font-semibold uppercase text-sm tracking-wider shadow-lg hover:shadow-xl transition-all group overflow-hidden" asChild>
                <a href="/contact-us" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  <span className="transition-transform duration-300">Get Started</span>
                  <ArrowRight className="h-5 w-5 -ml-5 opacity-0 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-12 min-w-50 rounded-none border-2 border-gray-900 hover:border-gray-900 hover:bg-gray-900 bg-white font-semibold uppercase text-sm tracking-wider shadow-sm hover:shadow-md transition-all group overflow-hidden" asChild>
                <a href="https://docs.geneline-x.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-900 group-hover:text-white transition-colors">
                  <span className="transition-transform duration-300">Try Demo</span>
                  <ArrowRight className="h-5 w-5 -ml-5 opacity-0 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300" />
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground animate-fade-in-up animation-delay-300">
              Powering Innovation Across Africa and Beyond
            </p>
          </div>

          {/* Hero Visual Section */}
          <div className="relative aspect-square w-full max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto order-1 lg:order-2 animate-fade-in-up animation-delay-200">
            {/* Floating Stats Cards */}
            <div className="absolute top-4 lg:top-8 -left-4 lg:-left-8 z-20 animate-float">
              <div className="bg-white border-2 border-gray-200 p-3 lg:p-4 shadow-xl">
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">150+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Languages</div>
              </div>
            </div>
            
            <div className="absolute top-24 lg:top-32 -right-4 lg:-right-8 z-20 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="bg-white border-2 border-gray-200 p-3 lg:p-4 shadow-xl">
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Uptime</div>
              </div>
            </div>
            
            <div className="absolute bottom-16 lg:bottom-24 left-4 lg:left-8 z-20 animate-float" style={{ animationDelay: '1s' }}>
              <div className="bg-white border-2 border-gray-200 p-3 lg:p-4 shadow-xl">
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">&lt;50ms</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Latency</div>
              </div>
            </div>

            {/* AI Hero Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                <img 
                  src="/ai_hero.png" 
                  alt="AI Infrastructure" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section - Integrated */}
        <div className="mt-24 lg:mt-25 animate-fade-in-up animation-delay-300">
          <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-8">
            Trusted by Industry Leaders
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
                { name: "OpenAI", logo: "/openai-logo.svg" },
                { name: "AWS", logo: "/Amazon_Web_Services_Logo.svg" },
                { name: "Google Cloud", logo: "/Google Cloud.svg" },
                { name: "Microsoft Azure", logo: "/Microsoft_Azure-OXJddnt9u_brandlogos.net.svg" },
                { name: "Vercel", logo: "/vercel.svg" },
                { name: "Pinecone", logo: "/Pinecone-Icon--Streamline-Svg-Logos.svg" },
              ].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 mx-8 lg:mx-12 opacity-70 hover:opacity-100 transition-opacity duration-300"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-8 lg:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />

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
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
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
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
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
