"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { validateAndLog } from "./validateTemplate"
import { ReconciliationData, ExperienceEntry } from "../portfolio/parsing/types"

export interface VirtualFile { code: string; language?: string }
export type VirtualFileSystem = Record<string, VirtualFile>
export interface Instance {
    instanceId: string; templateId: string; name: string
    files: VirtualFileSystem; createdAt: number; updatedAt: number
}

interface FileStoreState {
    instances: Record<string, Instance>
    currentInstanceId: string | null
    projectFiles: VirtualFileSystem
    activeFile: string
    editorBuffers: Record<string, string>
    pendingSandpackSync: { seq: number; files: Record<string, string> } | null
    resumeFile: File | null
    resumeText: string | null
    parsedResume: ReconciliationData | null
    suggestedChanges: { filePath: string; originalCode: string; proposedCode: string } | null
    createInstance: (templateId: string, templateName: string, templateFiles: VirtualFileSystem) => string
    setCurrentInstance: (instanceId: string) => void
    updateFile: (path: string, code: string) => void
    setActiveFile: (path: string) => void
    setEditorBuffer: (path: string, code: string) => void
    saveFile: (path: string) => void
    saveAllFiles: () => void
    applyAIChanges: (changes: Array<{ filePath: string; proposedCode: string }>) => void
    clearPendingSync: () => void
    setResumeFile: (file: File) => void
    performMockParsing: () => Promise<void>
    generateSuggestions: () => void
    acceptSuggestions: () => void
    rejectSuggestions: () => void
}

let syncSeq = 0

export const useFileStore = create<FileStoreState>()(
    persist(
        (set, get) => ({
            instances: {},
            currentInstanceId: null,
            projectFiles: {},
            activeFile: "",
            editorBuffers: {},
            pendingSandpackSync: null,
            resumeFile: null,
            resumeText: null,
            parsedResume: null,
            suggestedChanges: null,

            // ─────────────────────────────────────────────────────────────────
            setResumeFile: (file) => set({ resumeFile: file, resumeText: "Mock Resume Text" }),

            performMockParsing: async () => {
                await new Promise(r => setTimeout(r, 1500))
                // Full ReconciliationData shape — covers every field accessed by
                // ParsingHeader, PersonalIdentitySection, ExperienceSection, SidePanel, ControlBar
                set({
                    parsedResume: {
                        progress: 85,
                        unresolvedWarnings: 2,
                        extraSections: 1,
                        accuracy: "85% Data Accuracy",
                        personalDetails: {
                            fullName: "Jani Pasha",
                            email: "jani.pasha@example.com",
                            github: "janipasha-dev",
                            linkedin: "jani-pasha",
                            summary: "Expert Full Stack Developer specializing in automation tools and scalable web applications.",
                        },
                        skills: ["React", "Next.js", "TypeScript", "Node.js", "TailwindCSS"],
                        experience: [
                            {
                                role: "Senior Engineer",
                                company: "Innovate AI",
                                period: "2021 – Present",
                                desc: "Building automation tools and AI-driven portfolio generation platforms at scale.",
                            },
                        ],
                        missingRequired: [
                            {
                                id: "bio",
                                title: "Portfolio Bio",
                                desc: "The selected template requires a 150-word landing bio.",
                                placeholder: "Enter your portfolio bio...",
                            },
                        ],
                        orphanedData: [
                            {
                                id: "cert",
                                title: "Certifications",
                                content: "AWS Certified Solutions Architect – Associate (2022).",
                            },
                        ],
                    },
                })
            },

            generateSuggestions: () => {
                const { currentInstanceId, instances, parsedResume, projectFiles } = get()
                if (!currentInstanceId || !parsedResume) return
                
                // Find the data file in the CURRENT project files
                const dataPath = Object.keys(projectFiles).find(p => p.includes("portfolioData"))
                if (!dataPath) return
                
                const fileEntry = projectFiles[dataPath]
                if (!fileEntry) return
                
                const originalCode = fileEntry.code
                
                // Simulation of "Smart Comparison" logic
                // In a real app, this would be a DIFF or a structured merge
                const proposedCode = [
                    `export const portfolioData = {`,
                    `  name: "${parsedResume.personalDetails.fullName}",`,
                    `  role: "Full Stack Developer",`,
                    `  skills: ${JSON.stringify(parsedResume.skills, null, 2)},`,
                    `  projects: ${JSON.stringify(parsedResume.experience.map(e => ({ title: e.role, description: e.desc })), null, 2)}`,
                    `};`
                ].join("\n")

                console.log("[Store] 🤖 AI Scan Complete — Suggestions found for:", dataPath)
                set({ suggestedChanges: { filePath: dataPath, originalCode, proposedCode } })
            },

            // ─────────────────────────────────────────────────────────────────
            createInstance: (tId, name, files) => {
                let filesCopy: VirtualFileSystem = JSON.parse(JSON.stringify(files))
                const validation = validateAndLog(filesCopy)
                if (validation.fixedFiles) filesCopy = validation.fixedFiles

                const id = `inst-${Date.now()}`
                const newInstance: Instance = {
                    instanceId: id, templateId: tId, name,
                    files: filesCopy, createdAt: Date.now(), updatedAt: Date.now()
                }

                const activeFile = filesCopy["/src/App.js"]  ? "/src/App.js"
                                 : filesCopy["src/App.js"]   ? "src/App.js"
                                 : filesCopy["/src/App.jsx"] ? "/src/App.jsx"
                                 : filesCopy["src/App.jsx"]  ? "src/App.jsx"
                                 : Object.keys(filesCopy)[0] ?? ""

                console.group("%c[Store] createInstance", "color:#00d4aa;font-weight:bold")
                console.log("  id         :", id)
                console.log("  activeFile :", activeFile)
                console.log("  files      :", Object.keys(filesCopy))
                console.groupEnd()

                set({
                    instances: { ...get().instances, [id]: newInstance },
                    currentInstanceId: id,
                    projectFiles: filesCopy,
                    activeFile,
                    editorBuffers: {},
                    pendingSandpackSync: null,
                })
                return id
            },

            setCurrentInstance: (id) => {
                const inst = get().instances[id]
                if (!inst) return
                const activeFile = inst.files["/src/App.js"] ? "/src/App.js" 
                                 : inst.files["src/App.js"] ? "src/App.js"
                                 : Object.keys(inst.files)[0]
                console.log("[Store] setCurrentInstance →", id)
                set({ currentInstanceId: id, projectFiles: inst.files, activeFile, editorBuffers: {}, pendingSandpackSync: null })
            },

            // ─── updateFile: writes to VFS only, does NOT signal Sandpack ────
            updateFile: (path, code) => set(s => {
                const id = s.currentInstanceId
                if (!id || !s.instances[id]) { console.error("[Store] updateFile: no instance!"); return s }
                const updatedFiles: VirtualFileSystem = { ...s.projectFiles, [path]: { code, language: inferLanguage(path) } }
                return {
                    projectFiles: updatedFiles,
                    instances: { ...s.instances, [id]: { ...s.instances[id], files: updatedFiles, updatedAt: Date.now() } }
                }
            }),

            setEditorBuffer: (p, c) => set(s => ({ editorBuffers: { ...s.editorBuffers, [p]: c } })),
            setActiveFile: (path) => set({ activeFile: path }),
            clearPendingSync: () => set({ pendingSandpackSync: null }),

            // ─── saveFile: reads buffer, writes to VFS, signals Sandpack ──────
            saveFile: (path) => {
                const { editorBuffers, projectFiles } = get()
                const code = editorBuffers[path]

                if (code === undefined) {
                    console.warn(`[Store] saveFile("${path}"): no buffer — nothing to save`)
                    return
                }

                const oldInstanceCode = JSON.stringify(projectFiles, null, 2)
                const newInstanceFiles = { ...projectFiles, [path]: { ...projectFiles[path], code } }
                const newInstanceCode = JSON.stringify(newInstanceFiles, null, 2)

                console.group(`%c[Store] 💾 INSTANCE SAVED: "${path}"`, "color:#7c6aff;font-weight:bold;font-size:12px")
                console.log("%c--- OLD INSTANCE STATE ---", "color:#ef4444;font-weight:bold")
                console.log(oldInstanceCode)
                console.log("%c--- NEW INSTANCE STATE ---", "color:#22c55e;font-weight:bold")
                console.log(newInstanceCode)
                console.log("%cChange Detected:", "color:#3b82f6", projectFiles[path]?.code !== code)
                console.groupEnd()

                get().updateFile(path, code)

                set(s => {
                    const next = { ...s.editorBuffers }
                    delete next[path]
                    const seq = ++syncSeq
                    console.log(`[Store] 🔔 pendingSandpackSync → seq=${seq} file="${path}"`)
                    return { editorBuffers: next, pendingSandpackSync: { seq, files: { [path]: code } } }
                })
            },

            saveAllFiles: () => {
                const { editorBuffers, updateFile } = get()
                const paths = Object.keys(editorBuffers)
                if (!paths.length) return
                const payload: Record<string, string> = {}
                paths.forEach(p => { updateFile(p, editorBuffers[p]!); payload[p] = editorBuffers[p]! })
                console.log("[Store] saveAllFiles →", paths)
                set({ editorBuffers: {}, pendingSandpackSync: { seq: ++syncSeq, files: payload } })
            },

            // ─── applyAIChanges: used by external callers ────────────────────
            applyAIChanges: (changes) => {
                const payload: Record<string, string> = {}
                changes.forEach(({ filePath, proposedCode }) => {
                    console.log(`[Store] applyAIChanges → "${filePath}"`)
                    get().updateFile(filePath, proposedCode)
                    payload[filePath] = proposedCode
                })
                set(s => {
                    const next = { ...s.editorBuffers }
                    changes.forEach(({ filePath }) => delete next[filePath])
                    return { editorBuffers: next, pendingSandpackSync: { seq: ++syncSeq, files: payload } }
                })
            },

            // ─── acceptSuggestions ────────────────────────────────────────────
            acceptSuggestions: () => {
                const { suggestedChanges } = get()
                if (!suggestedChanges) return

                const { filePath, proposedCode } = suggestedChanges

                console.log(`%c[Store] 🤖 AI Accept → Buffer for "${filePath}"`, "color:#f59e0b;font-weight:bold")
                
                // IMPORTANT: We do NOT update VFS here. 
                // We only put it in the buffer so it appears in the editor as "unsaved".
                set(s => ({
                    editorBuffers: { ...s.editorBuffers, [filePath]: proposedCode },
                    suggestedChanges: null,
                    activeFile: filePath // Take user to the changed file
                }))
            },

            rejectSuggestions: () => {
                console.log("[Store] rejectSuggestions")
                set({ suggestedChanges: null })
            },
        }),
        {
            name: "vfs-store-v9",
            version: 9,
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    // Never restore stale sync signals or unsaved buffers across sessions
                    state.pendingSandpackSync = null
                    state.editorBuffers = {}
                    console.log("[Store] Rehydrated — instance:", state.currentInstanceId)
                    console.log("[Store] Files:", Object.keys(state.projectFiles))
                }
            },
        }
    )
)

export function inferLanguage(filePath: string): string {
    const ext = filePath.split(".").pop()?.toLowerCase() ?? ""
    return ({ js: "javascript", jsx: "javascript", ts: "typescript", tsx: "typescript", css: "css", html: "html", json: "json" } as any)[ext] ?? "plaintext"
}

export function normalizeBackendFiles(raw: Record<string, any>): VirtualFileSystem {
    return Object.fromEntries(
        Object.entries(raw).map(([path, content]) => [
            path,
            { code: (content && typeof content === "object" && "code" in content) ? String(content.code) : String(content), language: inferLanguage(path) }
        ])
    )
}
