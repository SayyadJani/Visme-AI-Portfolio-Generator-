"use client"

import React, { useEffect, useRef, useState } from "react"
import { SandpackProvider, useSandpack } from "@codesandbox/sandpack-react"
import { useFileStore } from "./fileStore"
import BuilderLayout from "./builderLayout"
import { useRouter } from "next/navigation"
import {
    ArrowLeft, Globe, Download, Share2, Rocket, ChevronDown,
    Settings, Wifi, WifiOff
} from "lucide-react"
import { useTemplateStore } from "@/stores/templateStore"
import { templates } from "@/data/templates/index"

// ─────────────────────────────────────────────────────────────────────────────
// SandpackSyncBridge — pure logic, no UI
// ─────────────────────────────────────────────────────────────────────────────
function SandpackSyncBridge() {
    const { sandpack } = useSandpack()
    const pendingSandpackSync = useFileStore(s => s.pendingSandpackSync)
    const clearPendingSync = useFileStore(s => s.clearPendingSync)
    const lastSeq = useRef<number>(-1)

    useEffect(() => {
        if (!pendingSandpackSync) return
        if (pendingSandpackSync.seq === lastSeq.current) return

        if (sandpack.status !== "running" && sandpack.status !== "idle") {
            console.warn(`[Bridge] Sandpack not ready (${sandpack.status}), will retry on status change`)
            return
        }

        lastSeq.current = pendingSandpackSync.seq

        console.group(`%c[Bridge] ▶ Sync #${pendingSandpackSync.seq}`, "color:#7c6aff;font-weight:bold")
        console.log("[Bridge] Files to push:", Object.keys(pendingSandpackSync.files))

        let allOk = true
        Object.entries(pendingSandpackSync.files).forEach(([path, code]) => {
            try {
                sandpack.updateFile(path, code)
                const received = (sandpack.files as any)[path]?.code
                if (received === code) {
                    console.log(`[Bridge] ✅ "${path}" — verified`)
                } else {
                    console.warn(`[Bridge] ⚠️ "${path}" — MISMATCH`)
                }
            } catch (err) {
                console.error(`[Bridge] ❌ updateFile("${path}") threw:`, err)
                allOk = false
            }
        })

        if (!allOk) { clearPendingSync(); console.groupEnd(); return }

        try {
            sandpack.runSandpack()
            console.log("[Bridge] ✅ runSandpack() called")
        } catch (err) {
            console.warn("[Bridge] runSandpack() unavailable:", err)
            try { (sandpack as any).dispatch?.({ type: "refresh" }) } catch { /* noop */ }
        }

        console.groupEnd()
        clearPendingSync()
    }, [pendingSandpackSync?.seq, sandpack.status]) // eslint-disable-line

    return null
}

// ─────────────────────────────────────────────────────────────────────────────
// Top Navbar
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// Top Navbar
// ─────────────────────────────────────────────────────────────────────────────
function TopNav() {
    const router = useRouter()
    const { selectedTemplate } = useTemplateStore()
    const [isLive] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
            setIsFullscreen(true)
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
                setIsFullscreen(false)
            }
        }
    }

    useEffect(() => {
        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener("fullscreenchange", handleFsChange)
        return () => document.removeEventListener("fullscreenchange", handleFsChange)
    }, [])

    return (
        <header className="h-12 shrink-0 flex items-center justify-between px-4 bg-[#0d0d10] border-b border-[#1c1c22] z-50 select-none shadow-xl">
            {/* Left — back + branding */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-1.5 hover:bg-[#1c1c22] rounded-md text-muted-foreground hover:text-foreground transition-all duration-200"
                    title="Go back"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="h-4 w-[1px] bg-[#1c1c22]" />

                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 rotate-3">
                        <Rocket className="text-white w-4 h-4 -rotate-3" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-foreground tracking-tight leading-none mb-0.5">
                            Portfolio.ai Builder
                        </span>
                        <span className="text-[9px] text-muted-foreground/60 font-medium uppercase tracking-[0.15em] leading-none">
                            Classic Workspace • v1.4
                        </span>
                    </div>
                </div>
            </div>

            {/* Center — Project Info */}
            <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 bg-[#16161a] rounded-full border border-[#1c1c22] shadow-inner">
                <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)] animate-pulse" : "bg-red-500"}`} />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {isLive ? "Synchronized" : "Disconnected"}
                    </span>
                </div>
                <div className="w-[1px] h-3 bg-[#1c1c22]" />
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                    Build Mode
                </span>
            </div>

            {/* Right — actions */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-[#16161a] p-1 rounded-lg border border-[#1c1c22]">
                    <button 
                        onClick={toggleFullscreen}
                        className="p-1.5 hover:bg-[#1c1c22] rounded-md text-muted-foreground hover:text-foreground transition-all duration-200"
                        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                        {isFullscreen ? <Settings className="w-3.5 h-3.5 antialiased" /> : <Settings className="w-3.5 h-3.5" />}
                    </button>
                    <button className="p-1.5 hover:bg-[#1c1c22] rounded-md text-muted-foreground hover:text-foreground transition-all duration-200">
                        <Share2 className="w-3.5 h-3.5" />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest bg-[#1c1c22] text-muted-foreground hover:text-white border border-[#2a2a30] hover:border-[#3a3a45] transition-all">
                        <Download className="w-3.5 h-3.5" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-500/25 border border-indigo-500/50">
                        <Globe className="w-3.5 h-3.5" />
                        Publish Site
                    </button>
                </div>
            </div>
        </header>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Bottom Status Bar
// ─────────────────────────────────────────────────────────────────────────────
function StatusBar() {
    const { activeFile, projectFiles } = useFileStore()
    const { sandpack } = useSandpack()

    const isReady = sandpack.status === "running" || sandpack.status === "idle"
    const lang = activeFile ? (() => {
        const ext = activeFile.split(".").pop()?.toLowerCase() ?? ""
        return ({ js: "JavaScript", jsx: "JavaScript (React)", ts: "TypeScript", tsx: "TypeScript (React)", css: "CSS", html: "HTML", json: "JSON" } as any)[ext] ?? "Plain Text"
    })() : ""

    return (
        <div className="h-7 shrink-0 flex items-center justify-between px-3 bg-[#0d0d10] border-t border-[#1c1c22] text-[9px] font-bold uppercase tracking-widest select-none z-50 text-muted-foreground/60">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-[#16161a] border border-[#1c1c22]">
                    <div className={`w-1.5 h-1.5 rounded-full ${isReady ? "bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.5)]" : "bg-yellow-500 animate-pulse"}`} />
                    <span className="text-muted-foreground">{isReady ? "Systems Ready" : "Initializing"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3" />
                    <span>WebSocket: Connected</span>
                </div>
            </div>
            <div className="flex items-center gap-5">
                {activeFile && (
                    <div className="flex items-center gap-3">
                        <span className="text-indigo-400/80">{activeFile}</span>
                        <div className="w-[1px] h-3 bg-[#1c1c22]" />
                        <span>{lang}</span>
                    </div>
                )}
                <div className="flex items-center gap-2 text-indigo-500/50">
                    <Globe className="w-3 h-3" />
                    <span>Region: US-East</span>
                </div>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Builder
// ─────────────────────────────────────────────────────────────────────────────
export default function Builder() {
    const { projectFiles, currentInstanceId, instances } = useFileStore()

    const currentInstance = currentInstanceId ? instances[currentInstanceId] : null
    const selectedTemplate = templates.find(t => t.id === currentInstance?.templateId)

    const sandpackFiles = React.useMemo(() => {
        console.log("[Builder] Computing sandpackFiles — instance:", currentInstanceId)
        return Object.fromEntries(
            Object.entries(projectFiles).map(([p, f]) => [p, { code: f.code }])
        )
    }, [currentInstanceId]) 

    if (!currentInstanceId || !currentInstance) {
        return (
            <div className="h-screen w-screen bg-[#0b0b0e] flex flex-col items-center justify-center gap-4 text-muted-foreground">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
                    <Rocket className="text-white w-5 h-5" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-widest text-white">No project loaded</p>
                <p className="text-xs text-muted-foreground/50">Go back and create a portfolio first</p>
            </div>
        )
    }

    const dependencies = {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        ...(selectedTemplate?.dependencies || {})
    }

    return (
        <SandpackProvider
            key={currentInstanceId}
            template="react"
            files={sandpackFiles}
            options={{
                autorun: true,
                recompileMode: "delayed",
                recompileDelay: 300,
                bundlerTimeOut: 60000,
                logLevel: 0 as any,
            }}
            customSetup={{
                entry: "src/index.js",
                dependencies: dependencies
            }}
        >
            <SandpackSyncBridge />

            {/* Full-screen IDE layout */}
            <div className="flex flex-col h-screen w-screen bg-[#0b0b0e] overflow-hidden">
                {/* Top navbar */}
                <TopNav />

                {/* Three-pane editor body */}
                <div className="flex-1 min-h-0 overflow-hidden">
                    <BuilderLayout />
                </div>

                {/* Bottom status bar */}
                <StatusBar />
            </div>
        </SandpackProvider>
    )
}
