"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Tag, Globe, MessageSquare, Code2, ShieldAlert, CheckCircle2, Loader2, Link2 } from "lucide-react"
import { templateService } from "@/services/template.service"
import { useRouter } from "next/navigation"

export default function AdminTemplateUploadPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        domain: "Personal",
        gitRepoUrl: "",
        techStack: "React, Next.js, TailwindCSS",
        adminKey: "",
    })
    const [file, setFile] = useState<File | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const data = new FormData()
            data.append("name", formData.name)
            data.append("description", formData.description)
            data.append("domain", formData.domain)
            data.append("gitRepoUrl", formData.gitRepoUrl)
            
            // Convert comma string to JSON array for backend transform
            const techStackArray = formData.techStack.split(",").map(s => s.trim())
            data.append("techStack", JSON.stringify(techStackArray))

            if (file) {
                data.append("thumbFile", file)
            }

            await templateService.uploadTemplate(data, formData.adminKey)
            
            setSuccess(true)
            // Reset form
            setFormData({
                name: "",
                description: "",
                domain: "Personal",
                gitRepoUrl: "",
                techStack: "React, Next.js, TailwindCSS",
                adminKey: formData.adminKey, // Keep the key for next upload
            })
            setFile(null)
            
            setTimeout(() => {
                router.push("/dashboard/templates")
            }, 2000)
        } catch (err: any) {
            console.error("UPLOAD_ERROR:", err)
            setError(err.response?.data?.error?.message || "Upload failed. Verify your Admin Key.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 lg:p-12 max-w-4xl mx-auto space-y-12 pb-32">
            <div className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                >
                    <div className="w-12 h-12 rounded-2xl clay-surface flex items-center justify-center bg-primary/10 text-primary">
                        <Upload className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                        Template Deployment
                    </h1>
                </motion.div>
                <p className="text-xl text-muted-foreground font-medium ml-16 max-w-2xl">
                    Register a new architectural blueprint into the Portfolio Automation Library. Ensure the Git repository is public or accessible.
                </p>
            </div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="clay-surface p-10 space-y-8 bg-background/50 backdrop-blur-xl border-border/50 shadow-2xl"
            >
                {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center gap-3 text-destructive text-sm font-bold">
                        <ShieldAlert className="w-5 h-5" />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-600 text-sm font-bold">
                        <CheckCircle2 className="w-5 h-5" />
                        Template published successfully! Redirecting...
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                            <Tag className="w-3 h-3" /> Template Name
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Minimalist Dark"
                            className="w-full bg-muted/30 border-2 border-border/30 rounded-2xl px-6 h-14 font-bold focus:outline-none focus:border-primary/50 transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    {/* Domain */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                            <Globe className="w-3 h-3" /> Industry / Domain
                        </label>
                        <select
                            className="w-full bg-muted/30 border-2 border-border/30 rounded-2xl px-6 h-14 font-bold focus:outline-none focus:border-primary/50 transition-all appearance-none"
                            value={formData.domain}
                            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                        >
                            <option>Personal</option>
                            <option>Developer</option>
                            <option>Creative</option>
                            <option>Minimalist</option>
                        </select>
                    </div>

                    {/* Git Repo URL */}
                    <div className="col-span-full space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                            <Link2 className="w-3 h-3" /> Github Repository URL
                        </label>
                        <input
                            required
                            type="url"
                            placeholder="https://github.com/user/repo.git"
                            className="w-full bg-muted/30 border-2 border-border/30 rounded-2xl px-6 h-14 font-bold focus:outline-none focus:border-primary/50 transition-all"
                            value={formData.gitRepoUrl}
                            onChange={(e) => setFormData({ ...formData, gitRepoUrl: e.target.value })}
                        />
                    </div>

                    {/* Tech Stack */}
                    <div className="col-span-full space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                            <Code2 className="w-3 h-3" /> Technologies (Comma separated)
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="React, Next.js, Framer Motion..."
                            className="w-full bg-muted/30 border-2 border-border/30 rounded-2xl px-6 h-14 font-bold focus:outline-none focus:border-primary/50 transition-all"
                            value={formData.techStack}
                            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                        />
                    </div>

                    {/* Description */}
                    <div className="col-span-full space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                            <MessageSquare className="w-3 h-3" /> Marketing Description
                        </label>
                        <textarea
                            required
                            rows={3}
                            placeholder="Tell users why this template is special..."
                            className="w-full bg-muted/30 border-2 border-border/30 rounded-3xl px-6 py-4 font-bold focus:outline-none focus:border-primary/50 transition-all resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* Thumbnail Upload */}
                    <div className="col-span-full space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                            Thumbnail Image (Vibrant Preview)
                        </label>
                        <div 
                            className="w-full bg-muted/20 border-2 border-dashed border-border/50 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary/30 transition-all cursor-pointer group"
                            onClick={() => document.getElementById("thumb-upload")?.click()}
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Upload className="w-6 h-6" />
                            </div>
                            <p className="text-xs font-bold text-muted-foreground">
                                {file ? file.name : "Click to upload template preview (JPEG/PNG)"}
                            </p>
                            <input
                                id="thumb-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                        </div>
                    </div>

                    {/* Admin Key Section */}
                    <div className="col-span-full pt-8 border-t border-border/40 space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4" /> Security Authorization Required
                            </label>
                            <input
                                required
                                type="password"
                                placeholder="Enter Admin Secret Key"
                                className="w-full bg-primary/5 border-2 border-primary/20 rounded-2xl px-6 h-14 font-black tracking-widest focus:outline-none focus:border-primary/50 transition-all placeholder:tracking-normal placeholder:font-bold"
                                value={formData.adminKey}
                                onChange={(e) => setFormData({ ...formData, adminKey: e.target.value })}
                            />
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full clay-button h-16 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/30 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Verifying & Uploading...
                                </>
                            ) : (
                                <>
                                    Publish Architectural Template
                                    <CheckCircle2 className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.form>

            <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30">
                    Proprietary Deployment Service © 2026 PAT
                </p>
            </div>
        </div>
    )
}
