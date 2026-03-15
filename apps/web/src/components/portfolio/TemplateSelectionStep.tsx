"use client"

import { motion } from "framer-motion"
import { Zap, ShieldCheck, Palette, ArrowRight, RefreshCw } from "lucide-react"
import { useTemplateStore } from "@/stores/templateStore"
import { projectService } from "@/services/project.service"
import { TemplateDTO } from "@repo/types"
import { useState, useEffect, memo } from "react"
import Link from "next/link"
import Image from "next/image"

const features = [
    { icon: Zap, title: "Fast Load", desc: "Optimized images and lightweight JS." },
    { icon: ShieldCheck, title: "SEO Ready", desc: "Pre-configured meta tags and schema." },
    { icon: Palette, title: "Themable", desc: "Easily adjust primary accent colors." },
]

interface TemplateSelectionStepProps {
    onContinue: (templateId: string) => void
}

export const TemplateSelectionStep = ({ onContinue }: TemplateSelectionStepProps) => {
    const { selectedTemplate, setSelectedTemplate } = useTemplateStore()
    const [templates, setTemplates] = useState<TemplateDTO[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const data = await projectService.getTemplates()
                setTemplates(data)
            } catch (err) {
                console.error("Failed to fetch templates", err)
            } finally {
                setLoading(false)
            }
        }
        fetchTemplates()
    }, [])

    // Default to the first template if nothing is selected
    const fallback = templates[0]
    const displayTemplate = selectedTemplate ?? (fallback ? { ...fallback, previewImage: fallback.thumbUrl || "/placeholder.png" } as any : null)

    if (loading) return <div className="h-[400px] clay-surface animate-pulse" />
    if (!displayTemplate) return null

    const handleContinue = () => {
        if (!selectedTemplate && fallback) {
            setSelectedTemplate({ ...fallback, previewImage: fallback.thumbUrl || "/placeholder.png" } as any)
        }
        onContinue(displayTemplate.id)
    }

    return (
        <div className="space-y-12 max-w-4xl mx-auto">
            <div className="space-y-4 text-center lg:text-left">
                <h2 className="text-3xl font-black tracking-tight">Step 1: Template Selection</h2>
                <p className="text-muted-foreground font-medium">Confirm the aesthetic foundation of your portfolio.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="clay-surface overflow-hidden group shadow-2xl relative"
            >
                <div className="aspect-video overflow-hidden border-none cursor-default">
                    <Image
                        src={displayTemplate.previewImage || displayTemplate.thumbUrl || "/placeholder.png"}
                        alt={displayTemplate.name}
                        width={1200}
                        height={675}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </div>

                <div className="absolute bottom-10 left-10 space-y-4 pr-10">
                    <div className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Selected Template
                    </div>
                    <h3 className="text-4xl font-black text-white tracking-tighter">{displayTemplate.name}</h3>
                    <p className="text-white/70 max-w-xl font-medium leading-relaxed">
                        {displayTemplate.description}
                    </p>
                </div>

                {/* Change Template link */}
                <div className="absolute top-4 right-4">
                    <Link
                        href="/dashboard/templates"
                        className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold rounded-lg border border-white/10 hover:bg-black/80 transition-all"
                    >
                        <RefreshCw className="w-3 h-3" />
                        Change Template
                    </Link>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((f, i) => (
                    <motion.div
                        key={f.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        className="clay-surface bg-muted/20 p-6 space-y-4 border-border/50"
                    >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <f.icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-black tracking-tight">{f.title}</p>
                            <p className="text-xs text-muted-foreground font-medium leading-relaxed">{f.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button
                onClick={handleContinue}
                className="w-full clay-button h-16 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-sm hover:shadow-2xl hover:shadow-primary/30 active:scale-95 flex items-center justify-center gap-3"
            >
                Confirm Template & Continue
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    )
}
