"use client"

import { motion } from "framer-motion"
import { Zap, ShieldCheck, Palette, ArrowRight } from "lucide-react"

const features = [
    { icon: Zap, title: "Fast Load", desc: "Optimized images and lightweight JS." },
    { icon: ShieldCheck, title: "SEO Ready", desc: "Pre-configured meta tags and schema." },
    { icon: Palette, title: "Themable", desc: "Easily adjust primary accent colors." },
]

interface TemplateSelectionStepProps {
    onContinue: () => void
}

export const TemplateSelectionStep = ({ onContinue }: TemplateSelectionStepProps) => {
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
                <div className="aspect-video overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2340&auto=format&fit=crop"
                        alt="Selected Template"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="absolute bottom-10 left-10 space-y-4 pr-10">
                    <div className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Selected Template
                    </div>
                    <h3 className="text-4xl font-black text-white tracking-tighter">Neo-Noir Developer</h3>
                    <p className="text-white/70 max-w-xl font-medium leading-relaxed">
                        A high-contrast, typography-focused design perfect for senior full-stack engineers and architects.
                    </p>
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
                onClick={onContinue}
                className="w-full clay-button h-16 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-sm hover:shadow-2xl hover:shadow-primary/30 active:scale-95 flex items-center justify-center gap-3"
            >
                Confirm Template & Continue
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    )
}
