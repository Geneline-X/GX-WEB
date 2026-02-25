"use client"

import { motion } from "framer-motion"
import { AudioLines, Users, Share2, Github, ArrowRight, Code, Database, Globe } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function KACCPSection() {
    const t = useTranslations("KACCP")

    const features = [
        {
            icon: Users,
            title: t("features.transcribe.title"),
            description: t("features.transcribe.desc"),
            color: "blue"
        },
        {
            icon: Database,
            title: t("features.curate.title"),
            description: t("features.curate.desc"),
            color: "primary"
        },
        {
            icon: Globe,
            title: t("features.research.title"),
            description: t("features.research.desc"),
            color: "purple"
        }
    ]

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden bg-background text-foreground transition-colors duration-300">
            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full opacity-50 dark:opacity-20" />
                <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full opacity-30 dark:opacity-10" />

                {/* Animated code grid */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
                    backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }} />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                                <Code className="w-3 h-3" />
                                {t("badge")}
                            </span>
                            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] text-foreground">
                                {t("title")}
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                                {t("description")}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <p className="text-muted-foreground leading-relaxed">
                                {t("longDescription")}
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button size="lg" className="rounded-none group bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                                    <a href="https://kaccp.vercel.app" target="_blank" rel="noopener noreferrer">
                                        {t("link")}
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </Button>
                                <Button variant="outline" size="lg" className="rounded-none border-border bg-transparent text-foreground hover:bg-accent/50" asChild>
                                    <a href="https://github.com/Geneline-X/kaccp" target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 w-5 h-5" />
                                        GitHub Repository
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Visual Component */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* The Visual Platform Mock/Graphic */}
                        <div className="relative aspect-square sm:aspect-video lg:aspect-square bg-card border border-border rounded-2xl overflow-hidden shadow-2xl dark:shadow-primary/5">
                            {/* Fake UI Header */}
                            <div className="h-10 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                                </div>
                                <div className="mx-auto text-[10px] text-muted-foreground font-mono">kaccp.vercel.app/curation</div>
                            </div>

                            {/* Main Content Area */}
                            <div className="p-8 h-full">
                                {/* Simulated Audio Waves */}
                                <div className="flex items-end justify-center gap-1.5 h-32 mb-12">
                                    {[...Array(24)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1.5 bg-primary/30 rounded-full"
                                            animate={{
                                                height: [20, Math.random() * 80 + 20, 20],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                delay: i * 0.05,
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Transcription Lines */}
                                <div className="space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="p-4 bg-muted/50 border-l-4 border-primary rounded-r-lg"
                                    >
                                        <div className="text-[10px] text-primary font-bold uppercase mb-1">Audio Segment #1042</div>
                                        <div className="text-sm font-medium italic text-foreground/80">"Wetin yu de do tide?"</div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className="p-4 bg-primary/5 border-l-4 border-primary/40 rounded-r-lg"
                                    >
                                        <div className="text-[10px] text-primary/70 font-bold uppercase mb-1">Translation</div>
                                        <div className="text-sm font-bold text-foreground">"What are you doing today?"</div>
                                    </motion.div>
                                </div>

                                {/* Status indicator */}
                                <div className="absolute bottom-6 right-6 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">System Active</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating decorative elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 p-4 bg-card border border-border rounded-xl shadow-xl z-20"
                        >
                            <Users className="w-8 h-8 text-primary" />
                            <div className="mt-2 text-[10px] font-bold text-center text-foreground">100+<br />Contributors</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-10 -left-6 p-4 bg-card border border-border rounded-xl shadow-xl z-20"
                        >
                            <Share2 className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                            <div className="mt-2 text-[10px] font-bold text-center text-foreground">Open<br />Dataset</div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Features Row */}
                <div className="mt-24 grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 + 0.5 }}
                        >
                            <Card className="bg-card border border-border hover:border-primary/50 transition-all duration-300 group shadow-sm hover:shadow-md rounded-none">
                                <CardContent className="p-8">
                                    <div className={`w-12 h-12 rounded-lg bg-${feature.color === 'primary' ? 'primary' : feature.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <feature.icon className={`w-6 h-6 text-${feature.color === 'primary' ? 'primary' : feature.color}-500`} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
