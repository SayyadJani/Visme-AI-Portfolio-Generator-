"use client"

import React, { useEffect, useRef, useCallback, useState } from "react"
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react"
import { RefreshCw, RotateCcw, Monitor, Tablet, Smartphone, Maximize, Minimize } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PreviewPanel() {
    const { sandpack, dispatch } = useSandpack()
    const prevStatus = useRef(sandpack.status)
    const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop")
    const [isFullscreen, setIsFullscreen] = useState(false)
    const panelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (sandpack.status !== prevStatus.current) {
            const color = sandpack.status === "running" ? "color:#22c55e" : "color:#fbbf24"
            console.log(`%c[Preview] ${prevStatus.current} → ${sandpack.status}`, color)
            prevStatus.current = sandpack.status
        }
    }, [sandpack.status])

    const handleRefresh = useCallback(() => {
        console.log("[Preview] Manual refresh")
        dispatch({ type: "refresh" })
    }, [dispatch])

    const handleRestart = useCallback(() => {
        console.log("[Preview] Hard restart")
        try { sandpack.runSandpack() } catch { dispatch({ type: "refresh" }) }
    }, [sandpack, dispatch])

    const toggleFullscreen = () => {
        if (!panelRef.current) return
        if (!document.fullscreenElement) {
            panelRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`)
            })
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    useEffect(() => {
        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener("fullscreenchange", handleFsChange)
        return () => document.removeEventListener("fullscreenchange", handleFsChange)
    }, [])

    const isRunning = sandpack.status === "running"
    const isError = sandpack.status === "error" as any // Bypass lint because type might be missing it

    return (
        <div ref={panelRef} className="h-full flex flex-col bg-[#0b0b0e]">
            {/* Sub-header matching classic IDE style */}
            <div className="h-10 shrink-0 flex items-center justify-between px-3 bg-[#111115] border-b border-[#1c1c22]">
                {/* Viewport Toggles */}
                <div className="flex items-center gap-0.5 bg-[#16161a] p-1 rounded-md border border-[#1c1c22] shadow-inner">
                    <button
                        onClick={() => setViewport("desktop")}
                        className={cn(
                            "p-1.5 rounded transition-all",
                            viewport === "desktop" ? "bg-indigo-600 text-white" : "text-muted-foreground/60 hover:text-foreground hover:bg-[#1c1c22]"
                        )}
                        title="Desktop View"
                    >
                        <Monitor className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewport("tablet")}
                        className={cn(
                            "p-1.5 rounded transition-all",
                            viewport === "tablet" ? "bg-indigo-600 text-white" : "text-muted-foreground/60 hover:text-foreground hover:bg-[#1c1c22]"
                        )}
                        title="Tablet View"
                    >
                        <Tablet className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewport("mobile")}
                        className={cn(
                            "p-1.5 rounded transition-all",
                            viewport === "mobile" ? "bg-indigo-600 text-white" : "text-muted-foreground/60 hover:text-foreground hover:bg-[#1c1c22]"
                        )}
                        title="Mobile View"
                    >
                        <Smartphone className="w-4 h-4" />
                    </button>
                </div>

                {/* Status badge */}
                <div className="hidden sm:flex items-center h-full">
                    <div className={cn(
                        "flex items-center gap-2 px-3 py-1 rounded bg-[#16161a] border border-[#1c1c22] text-[9px] font-black uppercase tracking-widest",
                        isRunning ? "text-green-400" : isError ? "text-red-400" : "text-indigo-400"
                    )}>
                        <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            isRunning ? "bg-green-400 animate-pulse" : isError ? "bg-red-400" : "bg-indigo-400"
                        )} />
                        {sandpack.status.toUpperCase()}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={handleRefresh}
                        className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-[#1c1c22] transition-all"
                        title="Refresh"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-[#1c1c22] transition-all"
                        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
                    >
                        {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
                    </button>
                    <button
                        onClick={handleRestart}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[9px] font-black uppercase tracking-widest bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm shadow-indigo-500/20"
                    >
                        <RotateCcw className="w-3 h-3" />
                        Restart
                    </button>
                </div>
            </div>

            {/* Preview iframe Container */}
            <div className="flex-1 bg-[#16161a] overflow-auto flex items-start justify-center p-4 min-h-0">
                <div 
                    className="bg-white shadow-2xl transition-all duration-300 ease-in-out h-full"
                    style={{ 
                        width: viewport === "desktop" ? "100%" : viewport === "tablet" ? "768px" : "375px",
                        maxHeight: "100%",
                        borderRadius: viewport === "desktop" ? "0px" : "12px",
                        overflow: "hidden"
                    }}
                >
                    <SandpackPreview
                        style={{ height: "100%" }}
                        showNavigator={false}
                        showOpenInCodeSandbox={false}
                    />
                </div>
            </div>
        </div>
    )
}
