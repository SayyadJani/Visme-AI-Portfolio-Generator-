import * as React from "react"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { BackgroundAnimation } from "@/components/sections/background-animation"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="relative min-h-screen bg-[#060606] text-white selection:bg-primary/30 font-sans antialiased overflow-x-hidden flex flex-col items-center justify-center py-12 px-6">
            {/* Background Decor */}
            <BackgroundAnimation />

            {/* Branding Header */}
            <div className="mb-10 flex flex-col items-center gap-4 group">
                <Link href="/" className="flex items-center gap-4 transition-transform hover:scale-105 active:scale-95">
                    <div className="bg-primary p-2.5 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all group-hover:shadow-[0_0_40px_rgba(37,99,235,0.5)]">
                        <Sparkles className="w-6 h-6 text-white rotate-12" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white">Portfolio Automation Tool</span>
                </Link>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 group-hover:text-primary transition-colors">
                    Developer Portfolio Engine
                </p>
            </div>

            <main className="w-full max-w-xl relative z-10">
                {children}
            </main>

            {/* Subtle bottom gradient */}
            <div className="fixed bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 to-transparent pointer-events-none -z-10" />
        </div>
    )
}
