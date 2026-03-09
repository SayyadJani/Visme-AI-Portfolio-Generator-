"use client"

import { Search, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const categories = ["All", "Minimal", "Creative", "Developer", "Corporate", "Modern"]

export const TemplateFilters = () => {
    const [active, setActive] = useState("All")

    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-8 border-t border-border/50">
            <div className="flex items-center gap-4 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
                <div className="flex items-center gap-2 text-muted-foreground mr-4">
                    <Filter className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-widest">Filter:</span>
                </div>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActive(cat)}
                        className={cn(
                            "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                            active === cat
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                : "bg-muted/40 text-muted-foreground hover:bg-muted"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="relative group max-w-sm w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                    placeholder="Search templates or tech stack..."
                    className="w-full bg-muted/40 border-none pl-12 h-12 rounded-2xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all text-sm font-medium"
                />
            </div>
        </div>
    )
}
