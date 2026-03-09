"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Eye, Clock, MousePointer2, AppWindow, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { PortfolioCard } from "@/components/dashboard/PortfolioCard"
import { CreatePortfolioCard } from "@/components/dashboard/CreatePortfolioCard"
import { TipCard } from "@/components/dashboard/TipCard"

// Mock Data
const stats = [
    { title: "Total Views", value: "1,335", icon: Eye, trend: "12%", trendType: "up" as const },
    { title: "Avg. Session", value: "2m 45s", icon: Clock, trend: "5%", trendType: "up" as const },
    { title: "Conv. Rate", value: "3.2%", icon: MousePointer2, trend: "0.5%", trendType: "up" as const },
    { title: "Templates", value: "3/12", icon: AppWindow },
]

const recentPortfolios = [
    {
        title: "Senior Frontend Lead 2024",
        template: "Hyperdrive",
        status: "Live" as const,
        lastEdited: "2 days ago",
        views: 432,
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2344&auto=format&fit=crop"
    },
    {
        title: "Fullstack Architecture",
        template: "Minimalist Mono",
        status: "Draft" as const,
        lastEdited: "1 week ago",
        views: 12,
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2340&auto=format&fit=crop"
    },
    {
        title: "Open Source Contributor",
        template: "Glassmorphism Pro",
        status: "Live" as const,
        lastEdited: "3 weeks ago",
        views: 891,
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2340&auto=format&fit=crop"
    }
]

export default function DashboardHome() {
    return (
        <div className="relative p-8 lg:p-12 space-y-16 max-w-[1600px] mx-auto min-h-screen">
            {/* Decorative Blur Backgrounds */}
            <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

            {/* Hero Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-4 flex-wrap">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                            Welcome back, <span className="text-primary italic relative">
                                Felix!
                                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>
                        <span className="text-4xl md:text-6xl animate-bounce-slow">👋</span>
                    </div>
                    <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl leading-relaxed">
                        You have <span className="text-foreground font-bold">2 active portfolios</span> live and getting traffic. Your reach is up <span className="text-emerald-500 font-bold">12.5%</span> this week.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Link href="/dashboard/portfolios/create" className="block">
                        <Button className="bg-primary text-primary-foreground hover:shadow-2xl hover:shadow-primary/30 font-black px-10 h-16 rounded-2xl transition-all hover:scale-105 active:scale-95 gap-3 group text-base uppercase tracking-widest shadow-xl shadow-primary/10">
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                            New Portfolio
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Stats Summary Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <StatsCard key={stat.title} {...stat} delay={i * 0.1 + 0.3} />
                ))}
            </div>

            {/* Main Content Area - Split Layout could go here if needed */}
            <section className="space-y-8">
                <div className="flex items-center justify-between border-b border-border/50 pb-6">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            Recent Portfolios
                        </h2>
                        <p className="text-muted-foreground text-sm font-medium">Manage your existing projects and deployments.</p>
                    </div>
                    <Button variant="link" className="text-primary font-black hover:no-underline group/link transition-all uppercase tracking-widest text-[10px] gap-2">
                        View Library
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recentPortfolios.map((item, i) => (
                        <PortfolioCard key={item.title} {...item} delay={0.4 + i * 0.1} />
                    ))}
                    <CreatePortfolioCard delay={0.7} />
                </div>
            </section>

            {/* Insights / Tips Section */}
            <TipCard />
        </div>
    )
}
