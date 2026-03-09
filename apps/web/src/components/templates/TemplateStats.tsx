"use client"

import { motion } from "framer-motion"
import { LayoutGrid, Timer, ShieldCheck, Laptop } from "lucide-react"

const stats = [
    { label: "Available Themes", value: "24+", icon: LayoutGrid },
    { label: "Avg. Build Time", value: "< 2m", icon: Timer },
    { label: "SEO Score", value: "98/100", icon: ShieldCheck },
    { label: "Device Support", value: "All", icon: Laptop },
]

export const TemplateStats = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="clay-surface p-5 flex items-center gap-4 bg-muted/20 border-border/50"
                >
                    <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center border border-border">
                        <stat.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            {stat.label}
                        </p>
                        <p className="text-lg font-black tracking-tight mt-0.5">
                            {stat.value}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
