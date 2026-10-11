"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Code, Terminal, Cpu, FileText, ArrowRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DevelopersPage() {
    const t = useTranslations("Developers")

    const features = [
        {
            icon: Terminal,
            title: "Clean API Design",
            desc: "RESTful endpoints designed for clarity and performance."
        },
        {
            icon: Cpu,
            title: "Edge Optimization",
            desc: "Low-latency inference at the edge, nearest to your users."
        },
        {
            icon: Code,
            title: "Unified SDKs",
            desc: "Native support for Python, JavaScript, and Go."
        }
    ]

    return (
        <main className="min-h-screen pt-32 pb-24 bg-background overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 dark:bg-primary/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    {/* Header */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.3em]"
                        >
                            <Terminal className="w-3 h-3" />
                            {t("badge")}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-tight"
                        >
                            {t("title")}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-muted-foreground leading-relaxed max-w-xl"
                        >
                            {t("description")}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Button size="lg" className="rounded-none bg-primary hover:bg-primary/90 text-white font-bold uppercase text-[10px] tracking-[0.2em] px-8 h-14">
                                <Github className="w-4 h-4 mr-2" />
                                View GitHub
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-none border-2 border-foreground hover:bg-foreground hover:text-background text-foreground font-bold uppercase text-[10px] tracking-[0.2em] px-8 h-14 transition-all">
                                Request API Access
                            </Button>
                        </motion.div>
                    </div>

                    {/* Code/Visual Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20 rounded-full" />
                        <div className="relative aspect-square lg:aspect-[4/3] bg-card/80 backdrop-blur-xl border border-border/50 p-1 lg:p-2 shadow-2xl">
                            <div className="w-full h-full bg-slate-950 p-6 font-mono text-sm overflow-hidden flex flex-col text-slate-300">
                                <div className="flex gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="text-emerald-400"># Initializing Geneline-X SDK</div>
                                    <div><span className="text-purple-400">import</span> geneline <span className="text-purple-400">from</span> <span className="text-orange-300">"@geneline-x/sdk"</span></div>
                                    <div>&nbsp;</div>
                                    <div><span className="text-purple-400">const</span> gx = <span className="text-purple-400">new</span> geneline.Client(&#123;</div>
                                    <div className="pl-4">apiKey: process.env.GX_API_KEY</div>
                                    <div>&#125;)</div>
                                    <div>&nbsp;</div>
                                    <div><span className="text-emerald-400">// Multilingual document analysis</span></div>
                                    <div><span className="text-purple-400">await</span> gx.process(file, &#123;</div>
                                    <div className="pl-4">language: <span className="text-orange-300">"auto"</span>,</div>
                                    <div className="pl-4">mode: <span className="text-orange-300">"neural"</span></div>
                                    <div>&#125;)</div>
                                </div>
                                {/* Typing cursor effect */}
                                <div className="mt-auto flex items-center gap-2">
                                    <span className="text-primary font-bold mr-2">&gt;</span>
                                    <div className="w-2 h-4 bg-primary animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Integration and Docs sections */}
                <div className="grid lg:grid-cols-2 gap-8 mb-24">
                    {/* Integration */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group p-8 lg:p-12 bg-card border border-border/50 hover:border-primary/40 transition-all duration-500"
                    >
                        <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <Cpu className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold mb-6 text-foreground tracking-tight">{t("integrationTitle")}</h2>
                        <p className="text-muted-foreground leading-relaxed mb-8">{t("integrationDesc")}</p>
                    </motion.div>

                    {/* Docs Soon */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="group p-8 lg:p-12 bg-primary/5 dark:bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all duration-500"
                    >
                        <div className="w-16 h-16 bg-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                            Coming Soon
                        </div>
                        <h2 className="text-3xl font-bold mb-6 text-foreground tracking-tight">{t("docsSoon")}</h2>
                        <p className="text-muted-foreground leading-relaxed">{t("docsDesc")}</p>
                    </motion.div>
                </div>

                {/* Feature grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex gap-4"
                        >
                            <div className="shrink-0 w-8 h-8 rounded-none bg-primary/10 flex items-center justify-center">
                                <f.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                                <p className="text-sm text-muted-foreground">{f.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
                    backgroundSize: "64px 64px",
                }}
            />
        </main>
    )
}
