"use client"

import { motion } from "framer-motion"
import { ArrowRight, Star, Zap, Cpu, Globe, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

import Link from "next/link"

interface TemplateCardProps {
    title: string
    category: string
    description: string
    tags: string[]
    imageUrl: string
    badge?: "New" | "Popular"
    delay?: number
}

export const TemplateCard = ({
    title,
    category,
    description,
    tags,
    imageUrl,
    badge,
    delay = 0,
}: TemplateCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="clay-surface group flex flex-col overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl"
        >
            {/* Image Preview */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                {badge && (
                    <div className={cn(
                        "absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg",
                        badge === "New" ? "bg-primary text-primary-foreground" : "bg-amber-500 text-white"
                    )}>
                        {badge === "New" ? <Zap className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                        {badge}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black tracking-tight">{title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg bg-muted border border-border">
                        {category}
                    </span>
                </div>

                <p className="text-sm text-muted-foreground font-medium line-clamp-2 mb-6">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold text-primary/80 bg-primary/5 px-2 py-1 rounded-md">
                            #{tag}
                        </span>
                    ))}
                </div>

                <Link href="/dashboard/portfolios/create" className="mt-auto block">
                    <button className="w-full clay-button py-3 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                        Use Template
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </Link>
            </div>
        </motion.div>
    )
}
