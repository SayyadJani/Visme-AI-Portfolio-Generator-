"use client"

import React, { useRef, useState, useEffect } from "react"
import { RefreshCw, Monitor, Tablet, Smartphone, Maximize, Minimize, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFileStore } from "./fileStore"

export default function PreviewPanel() {
    const previewUrl = useFileStore(s => s.previewUrl)
    const isPreviewLoading = useFileStore(s => s.isPreviewLoading)
    const previewRefreshKey = useFileStore(s => s.previewRefreshKey)
    const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop")
    const [isFullscreen, setIsFullscreen] = useState(false)
    const panelRef = useRef<HTMLDivElement>(null)
    const iframeRef = useRef<HTMLIFrameElement>(null)

    // Automatically Refresh Iframe on Save
    useEffect(() => {
        if (previewRefreshKey > 0 && iframeRef.current) {
            console.log("[PreviewPanel] 🔄 Change detected, refreshing iframe...")
            iframeRef.current.src = iframeRef.current.src
        }
    }, [previewRefreshKey])

    const handleRefresh = () => {
        if (iframeRef.current) {
            iframeRef.current.src = iframeRef.current.src
        }
    }

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

    return (
        <div ref={panelRef} className="h-full flex flex-col bg-[#0b0b0e]">
            {/* Sub-header */}
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
                        previewUrl ? "text-green-400" : "text-indigo-400"
                    )}>
                        <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            previewUrl ? "bg-green-400 animate-pulse" : "bg-indigo-400"
                        )} />
                        {previewUrl ? "LIVE" : isPreviewLoading ? "STARTING..." : "IDLE"}
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
                </div>
            </div>

            {/* Preview iframe Container */}
            <div className="flex-1 bg-[#16161a] overflow-auto flex items-start justify-center p-4 min-h-0 relative">
                {isPreviewLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0b0b0e]/80 backdrop-blur-sm">
                        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Initializing Environment...</p>
                        <p className="text-[9px] text-muted-foreground/40 mt-1 italic">Server 2 is spinning up your portfolio</p>
                    </div>
                )}

                {!previewUrl && !isPreviewLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#1c1c22] flex items-center justify-center mb-4">
                            <Monitor className="w-8 h-8 text-muted-foreground/20" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Preview Unavailable</p>
                    </div>
                )}

                {previewUrl && (
                    <div 
                        className="bg-white shadow-2xl transition-all duration-300 ease-in-out h-full"
                        style={{ 
                            width: viewport === "desktop" ? "100%" : viewport === "tablet" ? "768px" : "375px",
                            maxHeight: "100%",
                            borderRadius: viewport === "desktop" ? "0px" : "12px",
                            overflow: "hidden"
                        }}
                    >
                        <iframe
                            ref={iframeRef}
                            src={previewUrl}
                            className="w-full h-full border-none"
                            title="Portfolio Preview"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
