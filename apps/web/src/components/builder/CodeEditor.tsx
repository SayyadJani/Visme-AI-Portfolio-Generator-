"use client"

import React, { useRef, useEffect, useCallback } from "react"
import Editor from "@monaco-editor/react"
import { useFileStore } from "./fileStore"
import { Save, FileCode2 } from "lucide-react"

export default function CodeEditor() {
    const { activeFile, projectFiles, editorBuffers, setEditorBuffer, saveFile } = useFileStore()
    const editorRef = useRef<any>(null)

    const currentValue = editorBuffers[activeFile] ?? projectFiles[activeFile]?.code ?? ""
    const hasUnsaved   = editorBuffers[activeFile] !== undefined

    // When AI applies changes to the currently-open file, push into Monaco.
    useEffect(() => {
        if (!editorRef.current || !activeFile) return
        if (editorBuffers[activeFile] !== undefined) return

        const savedContent = projectFiles[activeFile]?.code ?? ""
        const model = editorRef.current.getModel?.()
        if (model && model.getValue() !== savedContent) {
            console.log(`[Editor] Pushing external change to Monaco for "${activeFile}"`)
            const pos = editorRef.current.getPosition?.()
            model.setValue(savedContent)
            if (pos) editorRef.current.setPosition?.(pos)
        }
    }, [activeFile, projectFiles, editorBuffers])

    // Global Ctrl+S
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault()
                const { activeFile, editorBuffers } = useFileStore.getState()
                if (editorBuffers[activeFile] !== undefined) {
                    console.log(`[Editor] Ctrl+S → saveFile("${activeFile}")`)
                    useFileStore.getState().saveFile(activeFile)
                } else {
                    console.log("[Editor] Ctrl+S — no unsaved changes")
                }
            }
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [])

    const handleChange = useCallback((val: string | undefined) => {
        if (val !== undefined) setEditorBuffer(activeFile, val)
    }, [activeFile, setEditorBuffer])

    const handleMount = useCallback((editor: any) => {
        editorRef.current = editor
        editor.addCommand(2048 | 49, () => {
            const { activeFile } = useFileStore.getState()
            useFileStore.getState().saveFile(activeFile)
        })
    }, [])

    // Format active file as breadcrumb: /src/data/portfolioData.js
    const breadcrumb = activeFile || "No file"

    return (
        <div className="h-full flex flex-col bg-[#0b0b0e]">
            {/* File tab / breadcrumb header — matches screenshot */}
            <div className="h-9 shrink-0 flex items-center justify-between bg-[#0f0f12] border-b border-[#1c1c22] px-0">
                {/* File tab */}
                <div className="flex items-center h-full">
                    <div className={`flex items-center gap-2 h-full px-4 border-r border-[#1c1c22] text-xs font-mono transition-colors ${
                        activeFile
                            ? "bg-[#0b0b0e] text-foreground border-t-2 border-t-indigo-500"
                            : "text-muted-foreground"
                    }`}>
                        {activeFile && (
                            <FileCode2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        )}
                        <span className="truncate max-w-[280px]">{breadcrumb}</span>
                        {hasUnsaved && (
                            <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" title="Unsaved changes" />
                        )}
                    </div>
                </div>

                {/* Save button — right side */}
                <button
                    onClick={() => saveFile(activeFile)}
                    disabled={!hasUnsaved}
                    className={`flex items-center gap-1.5 mr-3 px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest transition-all ${
                        hasUnsaved
                            ? "bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 hover:border-indigo-500/50 cursor-pointer"
                            : "text-muted-foreground/30 cursor-not-allowed"
                    }`}
                    title={hasUnsaved ? "Save (Ctrl+S)" : "No changes"}
                >
                    <Save className="w-3 h-3" />
                    {hasUnsaved ? "Save" : "Saved"}
                </button>
            </div>

            {/* Monaco editor */}
            <div className="flex-1 min-h-0 overflow-hidden">
                {activeFile ? (
                    <Editor
                        height="100%"
                        theme="vs-dark"
                        language={inferLang(activeFile)}
                        key={activeFile}
                        defaultValue={currentValue}
                        onChange={handleChange}
                        onMount={handleMount}
                        options={{
                            fontSize: 13,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            wordWrap: "on",
                            tabSize: 2,
                            lineNumbers: "on",
                            renderLineHighlight: "line",
                            scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
                        }}
                    />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
                        <FileCode2 className="w-10 h-10 opacity-20" />
                        <span className="text-xs uppercase tracking-widest opacity-50">Select a file to edit</span>
                    </div>
                )}
            </div>
        </div>
    )
}

function inferLang(path: string) {
    const ext = path?.split(".").pop()?.toLowerCase() ?? ""
    return ({ js: "javascript", jsx: "javascript", ts: "typescript", tsx: "typescript", css: "css", html: "html", json: "json" } as any)[ext] ?? "plaintext"
}
