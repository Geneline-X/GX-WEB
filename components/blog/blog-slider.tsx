"use client"

import * as React from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { BlogEntry } from "@/lib/blog-data"
import { Link } from "@/i18n/routing"

interface BlogSliderProps {
    blogs: BlogEntry[]
}

export function BlogSlider({ blogs }: BlogSliderProps) {
    const featuredBlogs = blogs.filter(blog => blog.featured)

    if (featuredBlogs.length === 0) return null

    return (
        <div className="relative w-full">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {featuredBlogs.map((blog) => (
                        <CarouselItem key={blog.id}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gray-50 dark:bg-card border border-gray-200 dark:border-gray-800 p-8 lg:p-12">
                                <div className="space-y-6">
                                    <div className="flex flex-wrap gap-2">
                                        {blog.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="rounded-none bg-primary/10 text-primary border-none text-[10px] uppercase tracking-widest px-2 py-0.5">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                                        {blog.title}
                                    </h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {blog.summary}
                                    </p>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm pt-4">
                                        <div>
                                            <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold block mb-1">Author</span>
                                            <span className="font-semibold text-foreground">{blog.author}</span>
                                        </div>
                                        <div className="hidden sm:block h-8 w-px bg-gray-200 dark:bg-gray-800" />
                                        <div>
                                            <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold block mb-1">Date</span>
                                            <span className="font-semibold text-foreground">{blog.date}</span>
                                        </div>
                                    </div>
                                    <div className="pt-6">
                                        <Button
                                            asChild
                                            className="rounded-none bg-primary hover:bg-primary/90 text-white font-semibold uppercase text-xs tracking-widest px-8 h-12 shadow-none group"
                                        >
                                            <a href={blog.externalUrl} target="_blank" rel="noopener noreferrer">
                                                Read full article
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                                <div className="hidden lg:flex items-center justify-center bg-gray-100 dark:bg-muted/30 aspect-square border border-dashed border-gray-300 dark:border-gray-700 p-12">
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto">
                                            <ArrowRight className="w-8 h-8 text-primary -rotate-45" />
                                        </div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Technical Research</p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-end gap-2 mt-4">
                    <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-card hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" />
                    <CarouselNext className="static translate-y-0 h-10 w-10 rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-card hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" />
                </div>
            </Carousel>
        </div>
    )
}
