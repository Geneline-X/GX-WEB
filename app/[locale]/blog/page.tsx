import { useTranslations } from "next-intl"
import { getMessages } from "next-intl/server"
import { BlogSlider } from "@/components/blog/blog-slider"
import { blogs } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateMetadata() {
    return {
        title: "Blog",
        description: "Technical research, AI insights, and thought leadership from the Geneline-X team.",
    }
}

export default async function BlogPage() {
    const messages = await getMessages()

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden border-b border-gray-100 dark:border-gray-900">
                <div className="mx-auto max-w-8xl px-6 lg:px-28">
                    <div className="max-w-3xl">
                        <Badge variant="outline" className="mb-6 rounded-none border-primary/20 bg-primary/5 text-primary text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1">
                            Geneline-X Insights
                        </Badge>
                        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tighter text-foreground mb-6">
                            Advancing AI <br />
                            <span className="text-primary italic">Through Research</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Explore our latest breakthroughs in continual learning, autonomous agents, and language technologies tailored for the African continent and beyond.
                        </p>
                    </div>
                </div>

                {/* Background Elements */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
            </section>

            {/* Featured Section */}
            <section className="py-20 lg:py-24 bg-white dark:bg-background">
                <div className="mx-auto max-w-8xl px-6 lg:px-28">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-2">Featured Publication</h2>
                            <p className="text-2xl font-bold tracking-tight text-foreground">Technical Deep Dives</p>
                        </div>
                    </div>

                    <BlogSlider blogs={blogs} />
                </div>
            </section>

            {/* All Blogs Grid */}
            <section className="py-20 lg:py-24 border-t border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-card/30">
                <div className="mx-auto max-w-8xl px-6 lg:px-28">
                    <div className="mb-12">
                        <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-2">Archive</h2>
                        <p className="text-2xl font-bold tracking-tight text-foreground">Recent Research Writes</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="group flex flex-col bg-white dark:bg-card border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 p-8 shadow-sm hover:shadow-xl">
                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {blog.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[9px] uppercase tracking-widest font-bold text-primary">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-3">
                                        {blog.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm line-clamp-4 leading-relaxed">
                                        {blog.summary}
                                    </p>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{blog.date}</span>
                                        <a
                                            href={blog.externalUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:gap-2 transition-all"
                                        >
                                            Read <ArrowRight className="ml-1 h-3 w-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 lg:py-32 bg-primary text-white overflow-hidden relative">
                <div className="mx-auto max-w-8xl px-6 lg:px-28 relative z-10">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tighter mb-8 leading-tight">
                            Stay Informed on the Future of AI.
                        </h2>
                        <Button className="rounded-none bg-white text-primary hover:bg-white/90 font-bold uppercase text-xs tracking-[0.2em] px-10 h-14 shadow-none">
                            Contact Research Team
                        </Button>
                    </div>
                </div>

                {/* Background Visuals */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] border border-white/10 rounded-full pointer-events-none" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[400px] h-[400px] border border-white/10 rounded-full pointer-events-none" />
            </section>
        </div>
    )
}
