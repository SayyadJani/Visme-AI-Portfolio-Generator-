"use client"

import { useEffect, useState } from "react"
import { projectService } from "@/services/project.service"
import { TemplateDTO } from "@repo/types"
import { TemplateCard } from "@/components/templates/TemplateCard"
import { Loader2 } from "lucide-react"

export function ClientTemplateGrid() {
    const [templates, setTemplates] = useState<TemplateDTO[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const data = await projectService.getTemplates()
                setTemplates(data)
            } catch (err) {
                console.error("Failed to fetch templates", err)
                setError("Failed to load templates. Please try again later.")
            } finally {
                setLoading(false)
            }
        }
        fetchTemplates()
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-[400px] clay-surface animate-pulse bg-muted/20" />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 clay-surface bg-destructive/5 border-destructive/20 text-destructive text-center space-y-4">
                <p className="font-bold">{error}</p>
                <button 
                    onClick={() => { setLoading(true); setError(null); /* retry logic */ }}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                >
                    Retry
                </button>
            </div>
        )
    }

    if (templates.length === 0) {
        return (
            <div className="text-center py-20 clay-surface bg-muted/10">
                <p className="text-muted-foreground font-medium">No templates available yet.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {templates.map((tpl, i) => (
                <TemplateCard 
                    key={tpl.id} 
                    {...tpl} 
                    previewImage={tpl.thumbUrl || "/placeholder.png"}
                    delay={i * 0.05} 
                />
            ))}
        </div>
    )
}
