"use client"

/**
 * SandpackDiagnostics — Drop this anywhere inside <SandpackProvider>
 * to get real-time visibility into what Sandpack is doing.
 */

import { useEffect, useRef, useState } from "react"
import { useSandpack } from "@codesandbox/sandpack-react"
import { useFileStore } from "./fileStore"

interface LogEntry {
    time: string
    type: "info" | "warn" | "error" | "success"
    message: string
}

export default function SandpackDiagnostics() {
    const { sandpack } = useSandpack()
    const pendingSandpackSync = useFileStore(s => s.pendingSandpackSync)
    const projectFiles = useFileStore(s => s.projectFiles)
    const [logs, setLogs] = useState<LogEntry[]>([])
    const [open, setOpen] = useState(false)
    const prevStatus = useRef(sandpack.status)
    const prevSeq = useRef<number | null>(null)

    const addLog = (type: LogEntry["type"], message: string) => {
        const time = new Date().toLocaleTimeString("en", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
        setLogs(prev => [...prev.slice(-49), { time, type, message }])
    }

    // Track status changes
    useEffect(() => {
        if (sandpack.status !== prevStatus.current) {
            const type = sandpack.status === "running" ? "success"
                : sandpack.status === "timeout" ? "error"
                : "info"
            addLog(type, `Status: ${prevStatus.current} → ${sandpack.status}`)
            prevStatus.current = sandpack.status
        }
    }, [sandpack.status])

    // Track sync signals
    useEffect(() => {
        if (!pendingSandpackSync) return
        if (pendingSandpackSync.seq === prevSeq.current) return
        prevSeq.current = pendingSandpackSync.seq
        const files = Object.keys(pendingSandpackSync.files).join(", ")
        addLog("info", `Sync signal #${pendingSandpackSync.seq}: [${files}]`)
    }, [pendingSandpackSync?.seq])

    // Track file count changes
    const fileCount = Object.keys(projectFiles).length
    const prevFileCount = useRef(fileCount)
    useEffect(() => {
        if (fileCount !== prevFileCount.current) {
            addLog("info", `VFS file count: ${prevFileCount.current} → ${fileCount}`)
            prevFileCount.current = fileCount
        }
    }, [fileCount])

    return (
        <div style={{
            position: "fixed", bottom: 12, right: 12, zIndex: 9999,
            fontFamily: "monospace", fontSize: 11,
        }}>
            <button
                onClick={() => setOpen(v => !v)}
                style={{
                    background: sandpack.status === "running" ? "#166534" : "#7c2d12",
                    color: "#fff", border: "none", borderRadius: 6, padding: "4px 10px",
                    cursor: "pointer", fontSize: 11, fontWeight: 700,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.4)"
                }}
            >
                🔧 {sandpack.status} {pendingSandpackSync ? `(sync #${pendingSandpackSync.seq})` : ""}
            </button>

            {open && (
                <div style={{
                    marginTop: 6, background: "#0a0a14", border: "1px solid #2a2a40",
                    borderRadius: 8, width: 480, maxHeight: 320, overflow: "hidden",
                    display: "flex", flexDirection: "column",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
                }}>
                    <div style={{ padding: "8px 12px", borderBottom: "1px solid #1a1a2a", color: "#666", fontSize: 10, display: "flex", justifyContent: "space-between" }}>
                        <span>SANDPACK DIAGNOSTICS</span>
                        <span>Files in VFS: {fileCount} | Sandpack files: {Object.keys(sandpack.files).length}</span>
                    </div>

                    {/* File list */}
                    <div style={{ padding: "6px 12px", borderBottom: "1px solid #1a1a2a" }}>
                        <div style={{ color: "#555", fontSize: 10, marginBottom: 4 }}>SANDPACK INTERNAL FILES:</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                            {Object.keys(sandpack.files).map(f => (
                                <span key={f} style={{
                                    background: "#1a1a2a", color: "#7c6aff", padding: "1px 6px",
                                    borderRadius: 3, fontSize: 10
                                }}>{f}</span>
                            ))}
                        </div>
                    </div>

                    {/* Log */}
                    <div style={{ flex: 1, overflowY: "auto", padding: "6px 12px" }}>
                        {logs.length === 0 ? (
                            <div style={{ color: "#333", textAlign: "center", padding: "12px 0" }}>No events yet</div>
                        ) : (
                            logs.map((log, i) => (
                                <div key={i} style={{
                                    color: log.type === "error" ? "#f87171"
                                        : log.type === "warn" ? "#fbbf24"
                                        : log.type === "success" ? "#34d399"
                                        : "#9999bb",
                                    padding: "1px 0", lineHeight: 1.5
                                }}>
                                    <span style={{ color: "#333", marginRight: 8 }}>{log.time}</span>
                                    {log.message}
                                </div>
                            ))
                        )}
                    </div>

                    <div style={{ padding: "6px 12px", borderTop: "1px solid #1a1a2a", display: "flex", gap: 8 }}>
                        <button onClick={() => setLogs([])} style={{ background: "#1a1a2a", color: "#666", border: "none", borderRadius: 4, padding: "3px 8px", cursor: "pointer", fontSize: 10 }}>
                            Clear logs
                        </button>
                        <span style={{ color: "#333", fontSize: 10, lineHeight: "24px" }}>
                            autorun: {String((sandpack as any).options?.autorun ?? "?")} | 
                            activeFile: {sandpack.activeFile}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
