"use client"

import React, { memo } from "react"
import { motion } from "framer-motion"
import { MoreVertical, Layers, Clock, Eye, Edit3, Settings, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface PortfolioCardProps {
    title: string
    template: string
    status: "Live" | "Draft"
    lastEdited: string
    views: number
    imageUrl?: string
    delay?: number
}

export const PortfolioCard = memo(({
    title,
    template,
    status,
    lastEdited,
    views,
    imageUrl,
    delay = 0
}: PortfolioCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -6 }}
            className="clay-surface group overflow-hidden transition-all flex flex-col p-4 bg-card/60"
        >
            {/* Thumbnail */}
            <div className="aspect-[16/10] relative overflow-hidden rounded-2xl bg-muted/40 shadow-inner">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={320}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[0.2] group-hover:grayscale-0"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Layers className="w-12 h-12 text-muted-foreground/20" />
                    </div>
                )}

                {/* Glass Status Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 backdrop-blur-md border border-white/10 shadow-lg ${status === "Live" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${status === "Live" ? "bg-emerald-400" : "bg-amber-400"
                            }`} />
                        {status}
                    </span>
                </div>

                {/* Action Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Button className="bg-white text-black hover:bg-white/90 rounded-xl font-bold text-xs h-9 shadow-xl shadow-black/20">
                        Preview
                    </Button>
                </div>
            </div>

            <div className="pt-6 pb-2 px-2 space-y-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
                            <Globe className="w-3.5 h-3.5" />
                            <span><span className="text-foreground/60">{template}</span> template</span>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted h-8 w-8 rounded-lg flex-shrink-0">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-4 py-3 border-y border-border/50">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{lastEdited}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80 font-medium">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{views} views</span>
                    </div>
                </div>

                <div className="flex items-center gap-2.5 mt-auto pt-2">
                    <Button className="flex-1 bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20 h-11 rounded-xl gap-2.5 font-bold text-xs uppercase tracking-widest transition-all active:scale-95 group/btn">
                        <Edit3 className="w-3.5 h-3.5 transition-transform group-hover/btn:rotate-12" />
                        Edit
                    </Button>
                    <Button variant="ghost" size="icon" className="h-11 w-11 text-muted-foreground hover:bg-muted rounded-xl border border-border/50 active:scale-95">
                        <Settings className="w-4.5 h-4.5" />
                    </Button>
                </div>
            </div>
        </motion.div>
    )
})
