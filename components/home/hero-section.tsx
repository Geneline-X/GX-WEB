"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP animations would be initialized here
    // For now, using CSS animations as placeholder
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4 animate-fade-in-up">
              African-Founded AI Company
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-6 animate-fade-in-up animation-delay-100 text-balance">
              The Intelligent Core of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                AI Innovation
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-200">
              Building AI platforms, infrastructure, and language technologies. Xplain AI, Genestudio, Kay-X, and more —
              all from one powerful ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-300">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group" asChild>
                <a href="/contact-us" target="_blank" rel="noopener noreferrer">
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-muted bg-transparent" asChild>
                <a href="https://docs.geneline-x.com" target="_blank" rel="noopener noreferrer">
                  Explore Documentation
                </a>
              </Button>
            </div>
          </div>

          {/* Hero Animation Placeholder */}
          <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none animate-fade-in-up animation-delay-200">
            {/* 
              HERO ANIMATION CONTAINER
              TODO: Replace with Lottie animation or 3D visualization
              This placeholder represents the nucleus/core visual concept from brand guidelines
            */}
            <div className="relative w-full h-full">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin-slow" />
              <div
                className="absolute inset-4 rounded-full border border-primary/15 animate-spin-slow"
                style={{ animationDirection: "reverse", animationDuration: "25s" }}
              />
              <div className="absolute inset-8 rounded-full border border-primary/10 animate-spin-slow" />

              {/* Center nucleus */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-32 h-32 bg-primary/30 blur-3xl rounded-full animate-pulse-slow" />

                  {/* Core diamond shapes */}
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <div className="absolute w-24 h-24 bg-primary/20 rotate-45 rounded-lg animate-pulse-slow" />
                    <div className="absolute w-16 h-16 bg-primary/40 rotate-45 rounded-md" />
                    <div className="absolute w-8 h-8 bg-primary rounded-sm rotate-45" />
                  </div>
                </div>
              </div>

              {/* Orbiting elements */}
              {[0, 60, 120, 180, 240, 300].map((degree, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-3 h-3"
                  style={{
                    transform: `rotate(${degree}deg) translateX(140px) rotate(-${degree}deg)`,
                  }}
                >
                  <div
                    className="w-full h-full bg-primary/60 rounded-full animate-pulse-slow"
                    style={{ animationDelay: `${i * 200}ms` }}
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
  )
}
