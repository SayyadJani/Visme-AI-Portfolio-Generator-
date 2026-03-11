"use client"

import React from "react"
import { useFileStore } from "./fileStore"
import { Check, X, Sparkles, Wand2, Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function SuggestionOverlay() {
    const { 
        suggestedChanges, 
        acceptSuggestions, 
        rejectSuggestions,
        activeFile,
        setActiveFile
    } = useFileStore()

    if (!suggestedChanges) return null

    const isDifferentFile = suggestedChanges.filePath !== activeFile

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-6 left-6 right-6 z-50 pointer-events-none"
            >
                <div className="bg-[#1c1c22]/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl shadow-2xl p-4 pointer-events-auto overflow-hidden relative">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-none" />
                    
                    <div className="flex items-center justify-between gap-6 relative z-10">
                        <div className="flex items-center gap-4 min-w-0">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/20">
                                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    AI Suggestions Ready
                                    <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/10 uppercase tracking-tighter font-mono">
                                        Match Found
                                    </span>
                                </h3>
                                <p className="text-[11px] text-muted-foreground truncate max-w-[300px]">
                                    We've mapped your resume data to <span className="text-indigo-300 font-mono">{suggestedChanges.filePath.split('/').pop()}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            {isDifferentFile && (
                                <button
                                    onClick={() => setActiveFile(suggestedChanges.filePath)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-bold text-white transition-all border border-white/5"
                                >
                                    <Eye className="w-3.5 h-3.5" />
                                    View File
                                </button>
                            )}
                            <button
                                onClick={rejectSuggestions}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-[11px] font-bold text-red-400 transition-all border border-red-500/20"
                            >
                                <X className="w-3.5 h-3.5" />
                                Discard
                            </button>
                            <button
                                onClick={acceptSuggestions}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-[11px] font-bold text-white transition-all shadow-lg shadow-indigo-600/20 group"
                            >
                                <Wand2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                Apply Changes
                                <div className="ml-1 w-1 h-1 rounded-full bg-white opacity-40 animate-ping" />
                            </button>
                        </div>
                    </div>
                    
                    {/* Progress Bar (Decorative) */}
                    <div className="absolute bottom-0 left-0 h-[2px] bg-indigo-500/30 w-full overflow-hidden">
                        <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="h-full w-1/3 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
                        />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
