"use client"

import Image from "next/image"

const partners = [
  { name: "OpenAI", logo: "/openai-logo.svg" },
  { name: "AWS", logo: "/Amazon_Web_Services_Logo.svg" },
  { name: "Google Cloud", logo: "/Google Cloud.svg" },
  { name: "Microsoft Azure", logo: "/Microsoft_Azure-OXJddnt9u_brandlogos.net.svg" },
  { name: "Vercel", logo: "/vercel.svg" },
  { name: "Pinecone", logo: "/Pinecone-Icon--Streamline-Svg-Logos.svg" },
  { name: "LangChain", logo: "/langchain-1.svg" },
  { name: "Anthropic", logo: "/claude-color.svg" },
]

const tools = [
  "RAG Pipelines",
  "Vector Databases",
  "LLM Orchestration",
  "Speech-to-Text",
  "Document Processing",
  "AI Agents",
  "Embeddings",
  "Fine-tuning",
]

import { useTranslations } from "next-intl"

export function PartnershipsSection() {
  const t = useTranslations("Partnerships")

  const tools = [
    t("tools.rag"),
    t("tools.vector"),
    t("tools.llm"),
    t("tools.stt"),
    t("tools.doc"),
    t("tools.agents"),
    t("tools.embeddings"),
    t("tools.fineTuning"),
  ]

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full translate-x-1/2" />
      </div>

      <div className="relative z-10">
        <div className="mb-12 overflow-hidden">
          <div className="flex animate-marquee items-center">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 mx-6 sm:mx-10 lg:mx-16 opacity-70 hover:opacity-100 transition-opacity duration-300"
                title={partner.name}
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  width={120}
                  height={48}
                  className="h-7 sm:h-10 lg:h-12 w-auto object-contain grayscale dark:invert-[0.8] hover:grayscale-0 dark:hover:invert-0 transition-all opacity-50 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tools Marquee (reverse direction) */}
        <div className="overflow-hidden">
          <div className="flex animate-marquee-reverse">
            {[...tools, ...tools].map((tool, index) => (
              <div
                key={`${tool}-${index}`}
                className="flex-shrink-0 mx-4 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 dark:bg-primary/10 backdrop-blur-sm"
              >
                <span className="text-sm font-medium text-foreground whitespace-nowrap">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 25s linear infinite;
        }
      `}</style>
    </section>
  )
}
