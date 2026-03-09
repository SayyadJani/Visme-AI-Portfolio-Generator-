"use client"

import { motion } from "framer-motion"
import { Code2 } from "lucide-react"

export const CustomLayoutBanner = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="clay-surface p-12 lg:p-20 bg-muted/10 border-border/40 text-center space-y-8 mt-20"
        >
            <div className="w-16 h-16 rounded-[2rem] bg-primary/10 flex items-center justify-center mx-auto text-primary animate-bounce-slow">
                <Code2 className="w-8 h-8" />
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                    Want a custom layout?
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
                    Our Enterprise plan allows for completely custom components and styling. Get in touch with our design team to build a bespoke developer identity.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <button className="clay-button bg-primary text-primary-foreground font-black px-10 h-16 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest shadow-xl shadow-primary/20">
                    Contact Sales
                </button>
                <button className="text-sm font-black uppercase tracking-widest hover:text-primary transition-colors">
                    View Custom Showcase
                </button>
            </div>
        </motion.div>
    )
}
