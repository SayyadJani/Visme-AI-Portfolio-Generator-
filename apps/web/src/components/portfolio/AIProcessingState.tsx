"use client"

import { motion } from "framer-motion"
import { Cpu, Terminal, Sparkles, Loader2 } from "lucide-react"

export const AIProcessingState = () => {
    return (
        <div className="space-y-12 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[500px] text-center">
            <div className="relative">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border-4 border-dashed border-primary/20 p-4"
                >
                    <div className="w-full h-full rounded-full border-4 border-primary flex items-center justify-center">
                        <Cpu className="w-10 h-10 text-primary animate-pulse" />
                    </div>
                </motion.div>
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/40 animate-bounce-slow">
                    <Sparkles className="w-6 h-6" />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tighter">AI Extraction in Progress</h2>
                <p className="text-muted-foreground font-medium max-w-md mx-auto">
                    We're currently identifying your key skills, quantifying your impact, and mapping your experience to the template schema.
                </p>
            </div>

            <div className="w-full max-w-md clay-surface bg-background/50 p-6 border-border/50 text-left space-y-4">
                <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                    <Terminal className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Extraction Logs</span>
                </div>

                <div className="space-y-3 font-mono text-[10px]">
                    <div className="flex items-center gap-3 text-primary animate-pulse">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>IDENTIFYING SECTION: EXPERIENCE...</span>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-500/80">
                        <span className="w-3 h-3 flex items-center justify-center">✓</span>
                        <span>MAPPED PROFILE DATA: FELIX ANDERSON</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground/50">
                        <span className="w-3" />
                        <span>RUNNING ACCURACY CHECK: 99.8%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
