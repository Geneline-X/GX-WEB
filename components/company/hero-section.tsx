"use client"

export function CompanyHeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
        <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4 animate-fade-in-up">Our Story</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-in-up animation-delay-100 text-balance max-w-4xl mx-auto">
          Building AI Infrastructure{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">From Africa</span>
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          Founded in 2023 in Sierra Leone, we're on a mission to democratize AI technology across the African continent
          and beyond.
        </p>

        {/* Origin badge */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in-up animation-delay-300">
          <div className="flex items-center gap-2">
            <div className="w-6 h-4 rounded-sm overflow-hidden flex">
              <div className="w-1/3 bg-green-600" />
              <div className="w-1/3 bg-white" />
              <div className="w-1/3 bg-blue-600" />
            </div>
            <span className="text-sm font-medium text-foreground">Founded in Sierra Leone</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <span className="text-sm text-muted-foreground">Est. 2023</span>
        </div>
      </div>

      <style jsx>{`
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
