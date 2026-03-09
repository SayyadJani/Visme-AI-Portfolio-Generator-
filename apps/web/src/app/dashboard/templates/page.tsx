"use client"

import { motion } from "framer-motion"
import { Layout } from "lucide-react"
import { TemplateCard } from "@/components/templates/TemplateCard"
import { TemplateStats } from "@/components/templates/TemplateStats"
import { TemplateFilters } from "@/components/templates/TemplateFilters"
import { CustomLayoutBanner } from "@/components/templates/CustomLayoutBanner"

const templates = [
    {
        title: "Neo-Brutalist Dev",
        category: "Creative",
        description: "High contrast, bold typography, and a unique grid-based layout for experimental portfolios.",
        tags: ["React", "Tailwind", "Framer"],
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2340&auto=format&fit=crop",
        badge: "New" as const
    },
    {
        title: "Minimalist Architect",
        category: "Minimal",
        description: "Focus on whitespace and clean typography. Perfect for backend engineers who value clarity.",
        tags: ["Vue", "CSS Modules"],
        imageUrl: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=2324&auto=format&fit=crop",
        badge: "Popular" as const
    },
    {
        title: "The Terminal Pro",
        category: "Developer",
        description: "A dark-mode first, command-line inspired interface with interactive terminal components.",
        tags: ["Next.js", "TypeScript"],
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2340&auto=format&fit=crop"
    },
    {
        title: "Corporate Executive",
        category: "Corporate",
        description: "Professional, polished, and structured. Ideal for management-level technical roles.",
        tags: ["Modern", "SEO Ready"],
        imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2340&auto=format&fit=crop"
    },
    {
        title: "Bento Box Portfolio",
        category: "Modern",
        description: "Modular sections that highlight various projects and skills in an organized tile layout.",
        tags: ["Bento", "Grid"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        badge: "New" as const
    },
    {
        title: "Glassmorphism Flow",
        category: "Creative",
        description: "Soft blurs, vibrant gradients, and elegant translucency for a cutting-edge frontend look.",
        tags: ["SCSS", "Glass"],
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop"
    }
]

export default function TemplatesPage() {
    return (
        <div className="relative p-8 lg:p-12 space-y-16 max-w-[1600px] mx-auto min-h-screen">
            {/* Page Header */}
            <div className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                >
                    <div className="w-12 h-12 rounded-2xl clay-surface flex items-center justify-center bg-primary/10 text-primary">
                        <Layout className="w-6 h-6" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
                        Template Library
                    </h1>
                </motion.div>
                <p className="text-xl text-muted-foreground font-medium max-w-2xl ml-16">
                    Discover professional themes tailored for the modern developer. Each template is rigorously tested for SEO and mobile performance.
                </p>
            </div>

            <TemplateStats />

            <TemplateFilters />

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {templates.map((tpl, i) => (
                    <TemplateCard key={tpl.title} {...tpl} delay={i * 0.1 + 0.5} />
                ))}
            </div>

            <CustomLayoutBanner />
        </div>
    )
}
