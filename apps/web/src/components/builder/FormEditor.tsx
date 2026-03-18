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

    // Simple check to identify if an object is "simple" (only contains primitives, no nested items)
    const isSimpleObject = (obj: any): boolean => {
        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
        return Object.values(obj).every(v => typeof v !== 'object' || v === null);
    };

    // Dynamic recursive renderer for any structure
    const renderNode = (path: (string | number)[], value: any, depth: number = 0): React.ReactNode => {
        // Handle null/undefined
        if (value === null || value === undefined) return null;

        const isRoot = depth === 0;

        // Better formatting for labels
        const formatLabel = (str: string) => str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
        const nodeName = path.length > 0 ? String(path[path.length - 1]) : "Configuration";

        // Handle Arrays dynamically
        if (Array.isArray(value)) {
            return (
                <div key={path.join('.')} className={`${isRoot ? 'space-y-6 mb-10' : 'mt-6'}`}>
                    <div className="flex items-center justify-between pb-3 border-b border-[#2a2a30]">
                        <h3 className={`${isRoot ? 'text-sm' : 'text-xs'} font-black text-white capitalize flex items-center gap-2`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                            {formatLabel(nodeName)}
                        </h3>
                        <button 
                            onClick={() => handleAddArrayItem(path)}
                            className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-white bg-indigo-600 px-3 py-1.5 rounded hover:bg-indigo-500 transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                    </div>
                    
                    {value.length === 0 && (
                        <div className="p-8 text-center bg-[#121216] border border-dashed border-[#2a2a30] rounded-xl text-muted-foreground/50 text-xs mt-4">
                            No {formatLabel(nodeName)} yet.
                        </div>
                    )}
                    
                    <div className="grid gap-4 mt-4">
                        {value.map((item, idx) => (
                            <div key={idx} className="p-4 bg-[#121216] border border-[#2a2a30] rounded-xl relative group transition-all hover:border-indigo-500/30">
                                <button 
                                    onClick={() => handleRemoveArrayItem(path, idx)}
                                    className="absolute top-4 right-4 text-muted-foreground/40 hover:text-red-500 transition-colors"
                                    title="Delete Item"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                {/* Render the array item directly inside the card without extra wrapping if it's simple */}
                                <div className="pr-8">
                                    {renderNode([...path, idx], item, depth + 1)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Handle nested Objects dynamically (that are not arrays)
        if (typeof value === 'object') {
            const simpleObj = isRoot ? false : isSimpleObject(value);
            
            return (
                <div key={path.join('.')} className={`${isRoot ? 'space-y-6 mb-10' : simpleObj ? 'mt-2' : 'mt-6 p-5 bg-[#121216] border border-[#2a2a30] rounded-xl'}`}>
                    {(!isRoot && !simpleObj && typeof path[path.length - 1] === 'string') && (
                        <h4 className="text-xs font-black text-white capitalize mb-4 pb-2 border-b border-[#2a2a30]">
                            {formatLabel(String(path[path.length - 1]))}
                        </h4>
                    )}
                    
                    {/* Root sections visually group inputs closely together without borders */}
                    {isRoot && typeof path[path.length - 1] === 'string' && (
                        <h3 className="text-sm font-black text-white capitalize flex items-center gap-2 pb-3 border-b border-[#2a2a30]">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            {formatLabel(String(path[path.length - 1]))}
                        </h3>
                    )}
                    
                    {/* Render properties in a clean responsive grid */}
                    <div className={`grid gap-x-6 gap-y-5 ${simpleObj || isRoot ? 'grid-cols-1 sm:grid-cols-2' : ''}`}>
                        {Object.keys(value).map((key) => renderNode([...path, key], value[key], depth + 1))}
                    </div>
                </div>
            )
        }

        // Handle primitives (Strings, Numbers, Booleans)
        // If the path parent represents an array index, don't label it "Item 1", "Item 2", just don't show label or use index.
        const labelName = typeof path[path.length - 1] === 'number' ? `Value` : String(path[path.length - 1])
        const isTextArea = typeof value === "string" && (value.length > 50 || ['description', 'bio', 'summary', 'content'].some(w => labelName.toLowerCase().includes(w)));
        
        return (
            <div key={path.join('.')} className={`space-y-1.5 flex flex-col ${isTextArea || typeof path[path.length - 1] === 'number' ? 'col-span-full' : ''}`}>
                {typeof path[path.length - 1] !== 'number' && (
                    <label className="text-[11px] font-bold text-muted-foreground/80 capitalize">
                        {formatLabel(labelName)}
                    </label>
                )}
                
                {isTextArea ? (
                    <textarea 
                        value={value}
                        onChange={(e) => handleNestedChange(path, e.target.value)}
                        className="w-full bg-[#0d0d10] border border-[#2a2a30] rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-[#e0e0e0] transition-all min-h-[100px] resize-y"
                    />
                ) : typeof value === "boolean" ? (
                    <select 
                        value={value ? "true" : "false"}
                        onChange={(e) => handleNestedChange(path, e.target.value === "true")}
                        className="w-full bg-[#0d0d10] border border-[#2a2a30] rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 text-[#e0e0e0] appearance-none cursor-pointer"
                    >
                        <option value="true">True (Enabled)</option>
                        <option value="false">False (Disabled)</option>
                    </select>
                ) : (
                    <input 
                        type={typeof value === 'number' ? 'number' : 'text'} 
                        value={value}
                        onChange={(e) => handleNestedChange(path, typeof value === 'number' ? Number(e.target.value) : e.target.value)}
                        className="w-full bg-[#0d0d10] border border-[#2a2a30] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-[#e0e0e0] transition-all"
                    />
                )}
            </div>
        );
    }

    // Helper to deeply update state
    const handleNestedChange = (path: (string | number)[], newValue: any) => {
        setFormData((prev: any) => {
            if (!prev) return prev;
            const newState = JSON.parse(JSON.stringify(prev)); // Deep clone
            let current = newState;
            
            for (let i = 0; i < path.length - 1; i++) {
                const key = path[i];
                if (key !== undefined) current = current[key as keyof typeof current];
            }
            
            const lastKey = path[path.length - 1];
            if (lastKey !== undefined) current[lastKey as keyof typeof current] = newValue;
            return newState;
        });
    }

    const handleAddArrayItem = (path: (string | number)[]) => {
        setFormData((prev: any) => {
            if (!prev) return prev;
            const newState = JSON.parse(JSON.stringify(prev));
            let current = newState;
            
            // Navigate to array
            for (let i = 0; i < path.length; i++) {
                const key = path[i];
                if (key !== undefined) current = current[key as keyof typeof current];
            }
            
            // Determine structure of new item based on first element (if exists)
            let newItem: any = {};
            if (Array.isArray(current) && current.length > 0) {
                // Empty the values of the template object
                if (typeof current[0] === 'object' && current[0] !== null) {
                    newItem = Object.keys(current[0]).reduce((acc, key) => {
                        acc[key] = Array.isArray(current[0][key]) ? [] : typeof current[0][key] === 'string' ? "" : null;
                        return acc;
                    }, {} as any);
                } else if (typeof current[0] === 'string') {
                    newItem = "";
                }
            }
            
            if (Array.isArray(current)) current.push(newItem);
            return newState;
        });
    }

    const handleRemoveArrayItem = (path: (string | number)[], indexToRemove: number) => {
        setFormData((prev: any) => {
            if (!prev) return prev;
            const newState = JSON.parse(JSON.stringify(prev));
            let current = newState;
            
            // Navigate to array
            for (let i = 0; i < path.length; i++) {
                const key = path[i];
                if (key !== undefined) current = current[key as keyof typeof current];
            }
            
            if (Array.isArray(current)) current.splice(indexToRemove, 1);
            return newState;
        });
    }

    return (
        <div className="h-full w-full flex flex-col bg-[#0b0b0e] overflow-hidden text-[#e0e0e0]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#1c1c22] shrink-0 bg-[#0d0d10]">
                <div className="flex items-center gap-2">
                    <FileJson className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-black uppercase tracking-widest">Dynamic Portfolio Editor</span>
                </div>
                <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-md text-[10px] font-bold uppercase tracking-widest text-white transition-all shadow-lg shadow-indigo-500/20"
                >
                    <Save className="w-3.5 h-3.5" />
                    Save & Apply
                </button>
            </div>

            {/* Scrollable Dynamic Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar relative">
                <div className="bg-[#0b0b0e] rounded-xl">
                    {Object.keys(formData).map((key) => renderNode([key], formData[key]))}
                </div>
            </div>
        </div>
    )
}
