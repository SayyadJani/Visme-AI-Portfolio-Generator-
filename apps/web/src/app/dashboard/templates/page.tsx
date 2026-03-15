import { Layout } from "lucide-react"
import { TemplateCard } from "@/components/templates/TemplateCard"
import { TemplateStats } from "@/components/templates/TemplateStats"
import { TemplateFilters } from "@/components/templates/TemplateFilters"
import { CustomLayoutBanner } from "@/components/templates/CustomLayoutBanner"
import { Suspense } from "react"
import { TemplateDTO } from "@repo/types"

import { ClientTemplateGrid } from "@/components/templates/ClientTemplateGrid"

function TemplatesHeader() {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl clay-surface flex items-center justify-center bg-primary/10 text-primary">
                    <Layout className="w-6 h-6" />
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
                    Template Library
                </h1>
            </div>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl ml-16">
                Discover professional themes tailored for the modern developer. Each template is rigorously tested for SEO and mobile performance.
            </p>
        </div>
    )
}

export default function TemplatesPage() {
    return (
        <div className="relative p-8 lg:p-12 space-y-16 max-w-[1600px] mx-auto min-h-screen">
            <TemplatesHeader />
            <TemplateStats />
            <TemplateFilters />
            
            <ClientTemplateGrid />

            <CustomLayoutBanner />
        </div>
    )
}
