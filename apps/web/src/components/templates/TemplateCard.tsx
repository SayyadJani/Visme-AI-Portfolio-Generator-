"use client"

import { motion } from "framer-motion"
import { ArrowRight, Star, Zap, Cpu, Globe, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTemplateStore, Template } from "@/stores/templateStore"
import { useFileStore, normalizeBackendFiles } from "@/components/builder/fileStore"

interface TemplateCardProps extends Template {
    delay?: number
}

export const TemplateCard = ({
    id,
    name,
    description,
    previewImage,
    files,
    category = "General",
    tags = ["React", "Customizable"],
    badge,
    delay = 0,
}: TemplateCardProps) => {
    const router = useRouter()
    const setSelectedTemplate = useTemplateStore((state) => state.setSelectedTemplate)
    const { createInstance, setCurrentInstance } = useFileStore()

    const handleUseTemplate = () => {
        // STEP 1 — User Selects Template
        console.log("--- STEP 1: Template Selection ---")
        console.log("Loading template blueprint:", id)

        // 1. Set the selected template in the UI store
        setSelectedTemplate({ id, name, description, previewImage, files })
        
        // 2. Create a working copy (Instance Files Created)
        // Important: instanceFiles ≠ template.files (Deep copy)
        const instanceId = createInstance(id, name, normalizeBackendFiles(files as any))
        
        // 3. Set this instance as active immediately
        setCurrentInstance(instanceId)
        
        console.log("Result of Step 1: Instance Created with ID:", instanceId)
        console.log("----------------------------------")

        // 4. Navigate to the creation workflow (Resume Upload -> Parsing -> IDE)
        router.push("/dashboard/portfolios/create")
    }
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
                    src={previewImage}
                    alt={name}
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
                    <h3 className="text-xl font-black tracking-tight">{name}</h3>
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

                <button
                    onClick={handleUseTemplate}
                    className="w-full clay-button py-3 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                    Use Template
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    )
}
