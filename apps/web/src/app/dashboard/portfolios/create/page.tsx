"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { StepIndicator } from "@/components/portfolio/StepIndicator"
import { TemplateSelectionStep } from "@/components/portfolio/TemplateSelectionStep"
import { ResumeUploadStep } from "@/components/portfolio/ResumeUploadStep"
import { ParsingStep } from "@/components/portfolio/ParsingStep"
import { AIProcessingState } from "@/components/portfolio/AIProcessingState"
import { FileText, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { templates } from "@/data/templates/index"
import { useTemplateStore, Template } from "@/stores/templateStore"
import { simulateResumeParsing, simulatePortfolioGeneration } from "@/services/simulation"
import { useFileStore } from "@/components/builder/fileStore"

export default function CreatePortfolioPage() {
    const router = useRouter()
    const { selectedTemplate, setSelectedTemplate } = useTemplateStore()
    const parsedResume = useFileStore(s => s.parsedResume)
    const storeSetResumeFile = useFileStore(s => s.setResumeFile)
    const performParsing = useFileStore(s => s.performParsing)
    const generateSuggestions = useFileStore(s => s.generateSuggestions)
    const createProject = useFileStore(s => s.createProject)

    const [currentStep, setCurrentStep] = useState(() => selectedTemplate ? 2 : 1)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)

    const steps = ["Template", "Resume", "Parsing"]

    const handleTemplateSelect = (templateId: string) => {
        const template = templates.find(t => t.id === templateId)
        if (template) {
            setSelectedTemplate(template as Template)
            setCurrentStep(2)
        }
    }

    const handleResumeUpload = async (file: File) => {
        setIsProcessing(true)

        try {
            // STEP 2 & 3: Upload and Parse
            await storeSetResumeFile(file)
            await performParsing()
            
            setIsProcessing(false)
            setCurrentStep(3)
        } catch (error) {
            console.error("Parsing failed", error)
            setIsProcessing(false)
        }
    }

    const handleFinish = async () => {
        if (!selectedTemplate) return

        setIsGenerating(true)

        try {
            // STEP 3.5: Initialize Instance with Template Files
            await createProject(
                selectedTemplate.id, 
                selectedTemplate.name
            )

            // STEP 4: Information Matching (Generate Recommendations)
            generateSuggestions()

            // Redirect to builder where user will see Accept/Reject
            router.push('/dashboard/portfolios/builder')
        } catch (error) {
            console.error("Generation failed", error)
            setIsGenerating(false)
        }
    }

    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1))

    return (
        <div className={cn(
            "relative p-8 lg:p-12 mx-auto min-h-screen transition-all duration-500",
            currentStep === 3 ? "max-w-[1400px]" : "max-w-[1200px] space-y-12"
        )}>
            {/* Background Ornament */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Header: Hide on Step 3 as it has its own header */}
            <AnimatePresence mode="wait">
                {(currentStep !== 3 || isGenerating) && !isProcessing && !isGenerating && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center space-y-4 pt-12"
                    >
                        <motion.h1
                            key={currentStep}
                            className="text-5xl md:text-6xl font-black tracking-tighter"
                        >
                            {currentStep === 1 && "Start Your Journey"}
                            {currentStep === 2 && "Upload Your Resume"}
                        </motion.h1>
                        <motion.p
                            key={`p-${currentStep}`}
                            className="text-muted-foreground text-lg md:text-xl font-medium"
                        >
                            {currentStep === 1 && "Select a base aesthetic for your digital identity."}
                            {currentStep === 2 && "Our AI will transform your dry resume into a dynamic story."}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Processing Header */}
            {(isProcessing || isGenerating) && (
                <div className="text-center space-y-4 pt-12">
                    <motion.h1 className="text-5xl md:text-6xl font-black tracking-tighter">
                        {isGenerating ? "Generating Portfolio..." : "Processing Logic..."}
                    </motion.h1>
                    <motion.p className="text-muted-foreground text-lg md:text-xl font-medium">
                        {isGenerating
                            ? "Assembling components and injecting your professional story."
                            : "Our neural engine is analyzing your professional data."}
                    </motion.p>
                </div>
            )}

            {currentStep !== 3 && !isProcessing && !isGenerating && (
                <StepIndicator currentStep={currentStep} steps={steps} />
            )}

            <main className={cn(
                "min-h-[600px]",
                currentStep === 3 && !isGenerating ? "pt-0" : ""
            )}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep + (isProcessing ? "-proc" : "") + (isGenerating ? "-gen" : "")}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        {isProcessing || isGenerating ? (
                            <AIProcessingState />
                        ) : (
                            <>
                                {currentStep === 1 && (
                                    <TemplateSelectionStep onContinue={(id) => handleTemplateSelect(id)} />
                                )}
                                {currentStep === 2 && (
                                    <ResumeUploadStep
                                        onContinue={(file) => handleResumeUpload(file)}
                                        onBack={handleBack}
                                    />
                                )}
                                {currentStep === 3 && (
                                    <ParsingStep
                                        data={parsedResume}
                                        onFinish={handleFinish}
                                    />
                                )}
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer Info / Links: Hide on Step 3 as it has its own sticky footer */}
            {currentStep !== 3 && (
                <div className="pt-20 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-12">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Auto-saving draft...</p>
                            <div className="h-1 w-32 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="h-full w-1/2 bg-primary/30"
                                />
                            </div>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                            Session ID: <span className="text-foreground">PAT-882-QX</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all">
                            <Search className="w-3.5 h-3.5" />
                            View Template Source
                        </button>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all">
                            <FileText className="w-3.5 h-3.5" />
                            Parsing Guidelines
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
