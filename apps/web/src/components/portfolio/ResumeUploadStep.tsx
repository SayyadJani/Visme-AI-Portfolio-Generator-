"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileText, X, CheckCircle2, AlertCircle, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResumeUploadStepProps {
    onContinue: (file: File) => void
    onBack: () => void
}

export const ResumeUploadStep = ({ onContinue, onBack }: ResumeUploadStepProps) => {
    const [file, setFile] = useState<File | null>(null)
    const [isDragging, setIsDragging] = useState(false)

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile?.type === "application/pdf") {
            setFile(droppedFile)
        }
    }

    return (
        <div className="space-y-12 max-w-4xl mx-auto">
            <div className="space-y-4 text-center lg:text-left">
                <h2 className="text-3xl font-black tracking-tight">Step 2: Resume Upload</h2>
                <p className="text-muted-foreground font-medium">Upload your latest PDF resume for our AI to analyze and transform.</p>
            </div>

            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={cn(
                    "clay-surface min-h-[400px] flex flex-col items-center justify-center p-12 border-2 border-dashed transition-all duration-500 relative overflow-hidden",
                    isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border/50 hover:border-primary/50",
                    file ? "bg-emerald-500/5 border-emerald-500/30" : ""
                )}
            >
                <AnimatePresence mode="wait">
                    {!file ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center space-y-6"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto text-primary animate-bounce-slow">
                                <Upload className="w-10 h-10" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-xl font-black tracking-tight">Drop your resume here</p>
                                <p className="text-sm text-muted-foreground font-medium">Supports PDF and DOCX files up to 10MB</p>
                            </div>
                            <label className="clay-button px-8 py-3 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest cursor-pointer hover:shadow-xl hover:shadow-primary/20 transition-all inline-block">
                                Browse Files
                                <input type="file" className="hidden" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                            </label>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="file-selected"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-md space-y-6"
                        >
                            <div className="clay-surface bg-background p-6 flex items-center gap-6 relative shadow-2xl">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <FileText className="w-7 h-7" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-black truncate">{file.name}</p>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.name.split('.').pop()?.toUpperCase()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setFile(null)}
                                    className="w-8 h-8 rounded-full hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 px-4 py-3 bg-emerald-500/10 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                                <CheckCircle2 className="w-4 h-4" />
                                File ready for AI extraction
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -z-10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-muted/20 rounded-[2rem] border border-border/50">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-border flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-black tracking-tight">Privacy First</p>
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed">Your resume is parsed in a secure environment and never stored without your explicit permission.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-border flex-shrink-0">
                        <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-black tracking-tight">AI Precision</p>
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed">We use specialized LLMs to extract your skills, experience, and projects with 99.8% accuracy.</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="flex-1 lg:flex-none px-12 h-16 rounded-2xl border border-border font-black uppercase tracking-widest text-xs hover:bg-muted transition-all"
                >
                    Back
                </button>
                <button
                    disabled={!file}
                    onClick={() => {
                        if (file) {
                            console.log("--- STEP 2: Resume Upload ---")
                            console.log("File prepared for processing:", file.name)
                            console.log("----------------------------")
                            onContinue(file)
                        }
                    }}
                    className="flex-[2] lg:flex-1 clay-button h-16 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-sm hover:shadow-2xl hover:shadow-primary/30 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all"
                >
                    Process Resume
                </button>
            </div>
        </div>
    )
}
