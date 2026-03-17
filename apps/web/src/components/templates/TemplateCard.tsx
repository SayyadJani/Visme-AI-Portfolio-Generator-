"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Star, Zap, Cpu, Globe, Monitor, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTemplateStore, Template } from "@/stores/templateStore"
import Image from "next/image"
import React, { memo } from "react"

interface TemplateCardProps extends Template {
    delay?: number
    onDelete?: (id: string) => void
}

export const TemplateCard = memo(({
    id,
    name,
    description,
    previewImage,
    previews = [],
    files,
    category = "General",
    tags = ["React", "Customizable"],
    badge,
    delay = 0,
    onDelete,
}: TemplateCardProps) => {
    const router = useRouter()
    const setSelectedTemplate = useTemplateStore((state) => state.setSelectedTemplate)
    const [imageIndex, setImageIndex] = React.useState(0)
    const [isHovered, setIsHovered] = React.useState(false)

    // Combine thumbnail and previews for a complete gallery
    const gallery = React.useMemo(() => {
        const items = [previewImage, ...previews].filter(Boolean) as string[]
        return items.length > 0 ? items : ["/placeholder.png"]
    }, [previewImage, previews])

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovered && gallery.length > 1) {
            interval = setInterval(() => {
                setImageIndex((prev) => (prev + 1) % gallery.length);
            }, 2000);
        } else if (!isHovered) {
            setImageIndex(0);
        }
        return () => clearInterval(interval);
    }, [isHovered, gallery.length]);

    const handleUseTemplate = () => {
        setSelectedTemplate({ id, name, description, previewImage, previews, files })
        router.push("/dashboard/portfolios/create")
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
            className="group relative flex flex-col bg-[#0f0f12] rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-500 hover:border-primary/20 hover:shadow-[0_32px_80px_-20px_rgba(0,0,0,0.8)]"
        >
            {/* Image Section */}
            <div className="relative h-72 w-full overflow-hidden p-3 pb-0">
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-zinc-900">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={gallery[imageIndex]}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={gallery[imageIndex] as string}
                                alt={name}
                                fill
                                className="object-cover"
                                loading="lazy"
                            />
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* Dark Overlay for Image */}
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />

                    {/* Gallery Indicators */}
                    {gallery.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {gallery.map((_, i) => (
                                <div 
                                    key={i} 
                                    className={cn(
                                        "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                        i === imageIndex ? "bg-white w-4" : "bg-white/30"
                                    )}
                                />
                            ))}
                        </div>
                    )}

                    {/* Top Action Row */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
                        <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
                            <Monitor className="w-3.5 h-3.5" />
                            {category}
                        </div>

                        {onDelete && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(id);
                                }}
                                className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 pt-6 flex-1 flex flex-col">
                <div className="space-y-4 mb-6">
                    <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span 
                                key={tag} 
                                className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white/80 group-hover:border-white/10 transition-all"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <p className="text-sm text-white/50 font-medium leading-relaxed mb-8 line-clamp-2">
                    {description}
                </p>

                <div className="mt-auto">
                    <button
                        onClick={handleUseTemplate}
                        className="w-full h-14 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-black uppercase tracking-[0.15em] text-xs rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/10"
                    >
                        Initialize Architecture
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
})
