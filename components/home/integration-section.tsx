"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-animations"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Check, Copy } from "lucide-react"
import { Link } from "@/i18n/routing"

const codeExamples = {
  python: {
    title: "Python SDK",
    code: `from genelinex import KrioClient

# Initialize the client
client = KrioClient(api_key="your_api_key")

# Generate text
response = client.generate(
    prompt="Translate to Swahili: Hello, how are you?",
    model="krio-v1",
    max_tokens=100
)

print(response.text)
# Output: "Habari, hujambo?"`,
  },
  javascript: {
    title: "JavaScript SDK",
    code: `import { KrioClient } from '@genelinex/sdk';

// Initialize the client
const client = new KrioClient({
  apiKey: 'your_api_key'
});

// Generate text
const response = await client.generate({
  prompt: 'Translate to Swahili: Hello, how are you?',
  model: 'krio-v1',
  maxTokens: 100
});

console.log(response.text);
// Output: "Habari, hujambo?"`,
  },
  curl: {
    title: "REST API",
    code: `curl -X POST https://api.genelinex.ai/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Translate to Swahili: Hello, how are you?",
    "model": "krio-v1",
    "max_tokens": 100
  }'

# Response:
# {
#   "text": "Habari, hujambo?",
#   "model": "krio-v1",
#   "tokens_used": 12
# }`,
  },
}

const integrationSteps = [
  { step: "1", title: "Sign Up", description: "Create your free account" },
  { step: "2", title: "Get API Key", description: "Generate your credentials" },
  { step: "3", title: "Install SDK", description: "Add to your project" },
  { step: "4", title: "Start Building", description: "Make your first call" },
]

const sdkPlatforms = [
  { name: "Python", available: true },
  { name: "JavaScript", available: true },
  { name: "Java", available: true },
  { name: "Go", available: true },
  { name: "Ruby", available: true },
  { name: "PHP", available: true },
  { name: ".NET", available: true },
  { name: "Swift", available: false, comingSoon: true },
]

export function IntegrationSection() {
  const [selectedTab, setSelectedTab] = useState<keyof typeof codeExamples>("python")
  const [copied, setCopied] = useState(false)
  const [typedCode, setTypedCode] = useState("")
  const sectionRef = useScrollReveal<HTMLElement>()
  const codeRef = useRef<HTMLPreElement>(null)

  const currentCode = codeExamples[selectedTab].code

  // Typing animation effect
  useEffect(() => {
    setTypedCode("")
    let index = 0
    const intervalId = setInterval(() => {
      if (index < currentCode.length) {
        setTypedCode(currentCode.slice(0, index + 1))
        index++
      } else {
        clearInterval(intervalId)
      }
    }, 15) // Adjust speed here

    return () => clearInterval(intervalId)
  }, [selectedTab, currentCode])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 pointer-events-none" />

      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
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
            Developer Friendly
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2.5rem,8vw,4rem)] sm:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            Easier Integration
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Get started in minutes with our comprehensive SDKs and APIs.
            Build powerful AI applications with just a few lines of code.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="overflow-hidden border-2 border-gray-200 bg-white shadow-lg">
              <div className="bg-muted/50 border-b border-border/50 p-4 flex items-center justify-between">
                <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as keyof typeof codeExamples)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 h-9 sm:h-10">
                    <TabsTrigger value="python" className="text-[10px] sm:text-xs">Python</TabsTrigger>
                    <TabsTrigger value="javascript" className="text-[10px] sm:text-xs">JavaScript</TabsTrigger>
                    <TabsTrigger value="curl" className="text-[10px] sm:text-xs">cURL</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <CardContent className="p-0 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>

                <pre
                  ref={codeRef}
                  className="p-4 sm:p-6 overflow-x-auto text-[10px] sm:text-sm leading-relaxed font-mono bg-muted/30 min-h-[300px] sm:min-h-[400px]"
                >
                  <code className="text-foreground/90">{typedCode}</code>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-5 bg-primary ml-1 align-middle"
                  />
                </pre>
              </CardContent>
            </Card>
          </motion.div>

          {/* Integration Steps */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Quick Start in 4 Steps</h3>
              <div className="space-y-4">
                {integrationSteps.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4 items-start group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-xl font-bold mb-4">Integration Time</h3>
              <div className="bg-muted/30 rounded-lg p-4 sm:p-6 border border-border/50">
                <div className="text-3xl sm:text-5xl font-bold text-primary mb-2">~5 min</div>
                <p className="text-sm sm:text-base text-muted-foreground">Average time to first API call</p>
              </div>
            </div>

            <Button size="lg" className="w-full group" asChild>
              <Link href="/docs">
                View Documentation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* SDK Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Available SDKs & Languages</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {sdkPlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Card className={`px-6 py-3 ${platform.available ? 'bg-card' : 'bg-muted/30'} border-border/50`}>
                  <div className="flex items-center gap-2">
                    {platform.available && <Check className="w-4 h-4 text-primary" />}
                    <span className={`font-medium ${platform.comingSoon ? 'text-muted-foreground' : ''}`}>
                      {platform.name}
                    </span>
                    {platform.comingSoon && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        Soon
                      </span>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
