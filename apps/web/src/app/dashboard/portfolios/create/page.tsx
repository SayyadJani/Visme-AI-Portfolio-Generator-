"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StepIndicator } from "@/components/portfolio/StepIndicator"
import { TemplateSelectionStep } from "@/components/portfolio/TemplateSelectionStep"
import { ResumeUploadStep } from "@/components/portfolio/ResumeUploadStep"
import { ParsingStep } from "@/components/portfolio/ParsingStep"
import { AIProcessingState } from "@/components/portfolio/AIProcessingState"
import { FileText, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CreatePortfolioPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [isProcessing, setIsProcessing] = useState(false)
    const steps = ["Template", "Resume", "Parsing"]

    const handleNext = () => {
        if (currentStep === 2) {
            setIsProcessing(true)
            setTimeout(() => {
                setIsProcessing(false)
                setCurrentStep(3)
            }, 3000)
        } else {
            setCurrentStep(prev => Math.min(prev + 1, steps.length))
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
                {currentStep !== 3 && !isProcessing && (
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
            {isProcessing && (
                <div className="text-center space-y-4 pt-12">
                    <motion.h1 className="text-5xl md:text-6xl font-black tracking-tighter">
                        Processing Logic...
                    </motion.h1>
                    <motion.p className="text-muted-foreground text-lg md:text-xl font-medium">
                        Our neural engine is analyzing your professional data.
                    </motion.p>
                </div>
            )}

            {currentStep !== 3 && !isProcessing && (
                <StepIndicator currentStep={currentStep} steps={steps} />
            )}

            <main className={cn(
                "min-h-[600px]",
                currentStep === 3 ? "pt-0" : ""
            )}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep + (isProcessing ? "-proc" : "")}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        {isProcessing ? (
                            <AIProcessingState />
                        ) : (
                            <>
                                {currentStep === 1 && (
                                    <TemplateSelectionStep onContinue={handleNext} />
                                )}
                                {currentStep === 2 && (
                                    <ResumeUploadStep onContinue={handleNext} onBack={handleBack} />
                                )}
                                {currentStep === 3 && (
                                    <ParsingStep onFinish={() => console.log('Finished')} />
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
