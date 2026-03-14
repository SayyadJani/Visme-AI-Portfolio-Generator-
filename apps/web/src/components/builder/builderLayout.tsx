"use client"

import React, { useState } from "react"
import { 
    PanelLeftClose, PanelLeftOpen, Terminal as TerminalIcon, X, 
    ChevronDown, ChevronUp, Trash2, Files, Search, 
    Sparkles, Settings, Command, Activity
} from "lucide-react"
import { cn } from "@/lib/utils"
import FileExplorer from "./FileExplorer"
import CodeEditor from "./CodeEditor"
import PreviewPanel from "./PreviewPanel"
import { motion, AnimatePresence } from "framer-motion"
import { SandpackConsole } from "@codesandbox/sandpack-react"
import SandpackDiagnostics from "./SandpackDiagnostics"
import SuggestionOverlay from "./SuggestionOverlay"

export default function BuilderLayout() {
    const [explorerOpen, setExplorerOpen] = useState(true)
    const [consoleOpen, setConsoleOpen] = useState(false) // Default closed for cleaner look
    const [activeTab, setActiveTab] = useState("explorer")

    return (
        <div className="flex h-full w-full overflow-hidden bg-[#0b0b0e]">
            {/* ── Activity Bar (VS Code Style) ─────────────────────────── */}
            <div className="w-12 shrink-0 flex flex-col items-center py-4 bg-[#0d0d10] border-r border-[#1c1c22] z-40">
                <div className="flex flex-col gap-4">
                    <button 
                        onClick={() => { setExplorerOpen(true); setActiveTab("explorer") }}
                        className={cn("p-2 rounded-md transition-all", activeTab === "explorer" ? "text-indigo-500 bg-indigo-500/5" : "text-muted-foreground hover:text-foreground")}
                    >
                        <Files className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-md text-muted-foreground/40 cursor-not-allowed">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-md text-muted-foreground/40 cursor-not-allowed">
                        <Sparkles className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-auto flex flex-col gap-4">
                    <button className="p-2 rounded-md text-muted-foreground/40 cursor-not-allowed">
                        <Activity className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-md text-muted-foreground/40 cursor-not-allowed">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* ── File Explorer (collapsible) ───────────────────────────── */}
            <motion.div
                initial={false}
                animate={{ width: explorerOpen ? 260 : 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300, bounce: 0 }}
                className="shrink-0 overflow-hidden relative border-r border-[#1c1c22] bg-[#0d0d10]/50"
            >
                <div className="w-[260px] h-full flex flex-col">
                    <div className="h-10 flex items-center justify-between px-4 border-b border-[#1c1c22]">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Explorer</span>
                        <button onClick={() => setExplorerOpen(false)}>
                            <PanelLeftClose className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <FileExplorer />
                    </div>
                </div>
            </motion.div>

            {/* Explorer toggle floating button when closed */}
            {!explorerOpen && (
                <button
                    onClick={() => setExplorerOpen(true)}
                    className="absolute top-16 left-14 z-30 p-2 bg-[#1c1c22] border border-[#2a2a30] rounded-md text-white shadow-xl hover:bg-[#252530] transition-all"
                >
                    <PanelLeftOpen className="w-4 h-4" />
                </button>
            )}

            {/* ── Main Workspace ────────────────────────────────────────── */}
            <div className="flex-1 flex min-w-0 overflow-hidden relative">

                {/* ── Editor & Console Panel (Middle) ───────────────────────── */}
                <div className="flex-[1.2] min-w-0 flex flex-col overflow-hidden relative border-r border-[#1c1c22]">
                    <div className="flex-1 overflow-hidden shadow-2xl">
                        <CodeEditor />
                    </div>

                    {/* VS Code Style Terminal / Console */}
                    <motion.div
                        initial={false}
                        animate={{ height: consoleOpen ? 240 : 36 }}
                        className="bg-[#0b0b0e] flex flex-col shrink-0 overflow-hidden border-t border-[#1c1c22]"
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-4 h-9 bg-[#0f0f12] border-b border-[#1c1c22] shrink-0">
                            <div className="flex items-center gap-6 h-full">
                                <button
                                    onClick={() => setConsoleOpen(true)}
                                    className={cn(
                                        "h-full flex items-center gap-2 px-1 transition-all",
                                        consoleOpen ? "border-b-2 border-indigo-500 text-foreground" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <TerminalIcon className="w-3.5 h-3.5" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Console</span>
                                </button>
                                <button className="h-full flex items-center gap-2 px-1 text-muted-foreground/40 cursor-not-allowed">
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Output</span>
                                </button>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setConsoleOpen(!consoleOpen)}
                                    className="p-1.5 hover:bg-[#1c1c22] rounded text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {consoleOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                                </button>
                                <button
                                    onClick={() => setConsoleOpen(false)}
                                    className="p-1.5 hover:bg-[#1c1c22] rounded text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Actual Console Content */}
                        <div className="flex-1 overflow-hidden bg-[#0b0b0e]">
                            <SandpackConsole
                                style={{ height: "100%" }}
                                showHeader={false}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* ── Preview Panel (Right) ────────────────────────────────── */}
                <div className="flex-1 min-w-0 flex flex-col overflow-hidden bg-[#0d0d10]/30 backdrop-blur-sm">
                    <PreviewPanel />
                </div>
            </div>

            {/* Activities & Sidebar Handlers handled inside subcomponents */}
            <SandpackDiagnostics />
        </div>
    )
}
