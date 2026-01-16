"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Calendar, Bell, ArrowRight, Sparkles, Rocket, Globe, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EventsPage() {
    const t = useTranslations("Events")

    return (
        <main className="min-h-screen pt-32 pb-24 bg-background overflow-hidden relative">
            {/* Dynamic Background - More Intense */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/10 dark:bg-primary/20 blur-[150px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[150px] rounded-full animate-bounce-slow" />
            </div>

            {/* Floating Elements for "Excitement" */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-none border border-primary/20 bg-primary/5 p-4 hidden lg:block"
                        style={{
                            left: `${Math.random() * 80 + 10}%`,
                            top: `${Math.random() * 80 + 10}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5,
                        }}
                    >
                        {i % 3 === 0 ? <Zap className="w-6 h-6 text-primary/40" /> : i % 3 === 1 ? <Globe className="w-6 h-6 text-primary/40" /> : <Rocket className="w-6 h-6 text-primary/40" />}
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    {/* Super Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group mb-12"
                    >
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary via-indigo-500 to-primary rounded-none blur-lg opacity-40 animate-pulse" />
                        <div className="relative inline-flex items-center gap-2 px-6 py-2 bg-background border border-primary/50 text-primary text-[10px] font-bold uppercase tracking-[0.4em]">
                            <Sparkles className="w-4 h-4 animate-spin-slow" />
                            {t("badge")}
                        </div>
                    </motion.div>

                    {/* Epic Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tighter text-foreground mb-8 text-balance uppercase"
                    >
                        {t("title")}
                    </motion.h1>

                    {/* Description with high impact */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mb-16 font-medium"
                    >
                        {t("description")}
                    </motion.p>

                    {/* The "No Events" Exciting Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="w-full max-w-4xl relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-indigo-500 to-primary rounded-none blur opacity-20 group-hover:opacity-60 transition-opacity duration-1000" />

                        <div className="relative bg-card/80 backdrop-blur-2xl border border-white/10 p-12 lg:p-24 overflow-hidden">
                            {/* Background text decoration */}
                            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 text-[200px] font-black text-primary/5 select-none pointer-events-none uppercase">
                                SOON
                            </div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-24 h-24 bg-primary/20 flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform duration-700">
                                    <Calendar className="w-12 h-12 text-primary" />
                                </div>

                                <h2 className="text-3xl lg:text-5xl font-black text-foreground mb-6 uppercase tracking-tight">
                                    {t("noEvents")}
                                </h2>

                                <div className="h-1 w-24 bg-primary mb-10" />

                                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                                    <Button size="lg" className="flex-1 rounded-none bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-[0.2em] h-16 shadow-[0_10px_30px_-10px_rgba(var(--primary),0.5)] transition-all hover:-translate-y-1">
                                        <Bell className="w-5 h-5 mr-3" />
                                        {t("notifyMe")}
                                    </Button>
                                </div>

                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="mt-10 flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.3em] cursor-pointer hover:gap-5 transition-all"
                                >
                                    {t("stayTuned")}
                                    <ArrowRight className="w-5 h-5" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Animated Grid Decoration */}
            <div
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(var(--primary), 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary), 0.2) 1px, transparent 1px)`,
                    backgroundSize: "100px 100px",
                }}
            />

            <style jsx>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-pulse-slow {
          animation: pulse 10s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-bounce-slow {
          animation: bounce 7s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
      `}</style>
        </main>
    )
}
