"use client"

import React, { useEffect, useState } from "react"
import { useFileStore } from "./fileStore"
import { Loader2, Plus, Trash2, Save, FileJson } from "lucide-react"
import { useSnackbar } from "notistack"

export default function FormEditor() {
    const { projectFiles, pendingSandpackSync, editorBuffers, saveFile } = useFileStore()
    const { enqueueSnackbar } = useSnackbar()
    
    // Find the data file (Supports .json natively, or fallback to .js/.ts)
    const dataFilePath = Object.keys(projectFiles).find(p => 
        p.endsWith("data.json") || 
        p.endsWith("portfolioData.json") || 
        p.includes("portfolioData.js") || 
        p.includes("portfolioData.ts")
    )
    
    // The current code (either from un-saved buffer or from file system)
    const activeCode = dataFilePath 
        ? editorBuffers[dataFilePath] ?? projectFiles[dataFilePath]?.code ?? "" 
        : ""
        
    const [formData, setFormData] = useState<any>(null)
    const [parseError, setParseError] = useState<string | null>(null)

    // Try to parse the configuration
    useEffect(() => {
        if (!activeCode || !dataFilePath) return
        
        try {
            if (dataFilePath.endsWith(".json")) {
                // If it's a JSON file, parse it as pure JSON
                const parsed = JSON.parse(activeCode)
                setFormData(parsed)
            } else {
                // If it's JS, do naive loose JS parsing
                let cleanCode = activeCode.replace(/export\s+default\s+portfolioData;?/g, '')
                cleanCode = cleanCode.replace(/export\s+const\s+portfolioData\s*=\s*/g, '')
                cleanCode = cleanCode.replace(/const\s+portfolioData\s*=\s*/g, '')
                cleanCode = cleanCode.trim()
                if (cleanCode.endsWith(";")) cleanCode = cleanCode.slice(0, -1)
                
                const getObj = new Function(`return ${cleanCode}`)
                const parsed = getObj()
                setFormData(parsed)
            }
            setParseError(null)
        } catch (e: any) {
            setParseError((e as Error).message)
            setFormData(null)
        }
    }, [activeCode, dataFilePath])

    // Generate string and update the store buffer
    const handleSave = () => {
        if (!dataFilePath || !formData) return
        
        const jsonStr = JSON.stringify(formData, null, 2)
        let newCode = ""

        if (dataFilePath.endsWith(".json")) {
            // Direct JSON save
            newCode = jsonStr
        } else {
            // JS Code format reconstruction
            const isExportConst = activeCode.includes("export const portfolioData")
            const isDefaultExport = !isExportConst && activeCode.includes("export default")
            
            if (isExportConst) {
                newCode = `export const portfolioData = ${jsonStr};`
            } else if (isDefaultExport) {
                newCode = `const portfolioData = ${jsonStr};\n\nexport default portfolioData;`
            } else {
                newCode = `export const portfolioData = ${jsonStr};\nexport default portfolioData;`
            }
        }
        
        // Push the update to zustand store
        useFileStore.getState().updateFile(dataFilePath, newCode)
        useFileStore.getState().setEditorBuffer(dataFilePath, newCode)
        
        // Actually save the file, triggering Sandpack auto-sync
        useFileStore.getState().saveFile(dataFilePath)
        
        enqueueSnackbar(`Data from ${dataFilePath.split('/').pop()} Saved`, { variant: "success" })
    }

    if (!dataFilePath) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center p-6 text-muted-foreground bg-[#0b0b0e]">
                <FileJson className="w-10 h-10 mb-2 opacity-50" />
                <p className="text-sm font-bold uppercase tracking-widest text-[#fff]">No portfolioData file found</p>
                <p className="text-xs opacity-50 text-center mt-2 max-w-sm">
                    This template does not use an external data file, so the form editor is unavailable. Try the Code Editor instead.
                </p>
            </div>
        )
    }

    if (parseError || !formData) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center p-6 text-muted-foreground bg-[#0b0b0e]">
                <p className="text-red-400 font-bold mb-2">Could not parse data file</p>
                <div className="text-[10px] bg-red-500/10 p-4 rounded-xl border border-red-500/20 font-mono text-red-500/70">
                    {parseError || "Unknown parsing error."}
                </div>
                <p className="text-xs opacity-50 text-center mt-4">
                    The code in {dataFilePath} is not a valid JS object. Please fix syntax errors in the Code Editor first.
                </p>
            </div>
        )
    }

    // Render forms recursively
    const handleChange = (key: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }))
    }

    const handleProjectChange = (index: number, key: string, value: any) => {
        setFormData((prev: any) => {
            const newProjects = [...prev.projects]
            newProjects[index] = { ...newProjects[index], [key]: value }
            return { ...prev, projects: newProjects }
        })
    }

    const handleAddProject = () => {
        setFormData((prev: any) => ({
            ...prev,
            projects: [...(prev.projects || []), { name: "New Project", description: "" }]
        }))
    }

    const handleRemoveProject = (index: number) => {
        setFormData((prev: any) => {
            const newProjects = [...prev.projects]
            newProjects.splice(index, 1)
            return { ...prev, projects: newProjects }
        })
    }

    return (
        <div className="h-full w-full flex flex-col bg-[#0b0b0e] overflow-hidden text-[#e0e0e0]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#1c1c22] shrink-0 bg-[#0d0d10]">
                <div className="flex items-center gap-2">
                    <FileJson className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-black uppercase tracking-widest">Portfolio Editor</span>
                </div>
                <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-md text-[10px] font-bold uppercase tracking-widest text-white transition-all shadow-lg shadow-indigo-500/20"
                >
                    <Save className="w-3.5 h-3.5" />
                    Save & Apply
                </button>
            </div>

            {/* Scrollable Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar relative">
                
                {/* Basic Details */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400 border-b border-[#1c1c22] pb-2">Basic Details</h3>
                    <div className="grid gap-4 max-w-2xl">
                        {Object.keys(formData).map((key) => {
                            // Filter out arrays and complex objects to handle separately
                            if (typeof formData[key] === "object") return null
                            
                            return (
                                <div key={key} className="space-y-1.5">
                                    <label className="text-[10px] uppercase font-bold text-muted-foreground/80 tracking-widest">{key}</label>
                                    {typeof formData[key] === "string" && formData[key].length > 50 ? (
                                        <textarea 
                                            value={formData[key]}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                            className="w-full bg-[#16161a] border border-[#1c1c22] rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500/50 min-h-[100px] text-[#e0e0e0]"
                                        />
                                    ) : (
                                        <input 
                                            type="text" 
                                            value={formData[key]}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                            className="w-full bg-[#16161a] border border-[#1c1c22] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500/50 text-[#e0e0e0]"
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Projects Section */}
                {Array.isArray(formData.projects) && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-[#1c1c22] pb-2">
                            <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400">Projects</h3>
                            <button 
                                onClick={handleAddProject}
                                className="flex items-center gap-1 text-[10px] uppercase font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                Add Project
                            </button>
                        </div>
                        
                        <div className="grid gap-4 max-w-2xl">
                            {formData.projects.map((proj: any, idx: number) => (
                                <div key={idx} className="p-4 bg-[#16161a] border border-[#1c1c22] rounded-xl space-y-3 relative group transition-all hover:border-[#2a2a30]">
                                    <button 
                                        onClick={() => handleRemoveProject(idx)}
                                        className="absolute -top-3 -right-3 p-1.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                    
                                    {Object.keys(proj).map((key) => (
                                        <div key={key} className="space-y-1">
                                            <label className="text-[9px] uppercase font-bold text-muted-foreground/60 tracking-wider">{key}</label>
                                            {typeof proj[key] === "string" && key === "description" ? (
                                                <textarea 
                                                    value={proj[key]}
                                                    onChange={(e) => handleProjectChange(idx, key, e.target.value)}
                                                    className="w-full bg-[#0b0b0e] border border-[#1c1c22] rounded-lg p-3 text-xs focus:outline-none focus:border-indigo-500/50 min-h-[80px]"
                                                />
                                            ) : (
                                                <input 
                                                    type="text" 
                                                    value={proj[key]}
                                                    onChange={(e) => handleProjectChange(idx, key, e.target.value)}
                                                    className="w-full bg-[#0b0b0e] border border-[#1c1c22] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500/50"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
