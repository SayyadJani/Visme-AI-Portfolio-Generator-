"use client"

import React, { memo } from "react"
import Link from "next/link"
import { Sparkles, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

export const Navbar = memo(() => {
    return (
        <motion.nav
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-2.5 bg-background/50 backdrop-blur-2xl border border-border rounded-2xl clay-card">
                {/* Left: Branding */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95">
                        <div className="bg-primary p-1.5 rounded-lg shadow-sm">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-base font-black tracking-tight text-foreground">ApplyWizz</span>
                    </Link>
                </div>

                {/* Middle: Centered Nav Links */}
                <div className="hidden md:flex items-center space-x-8">
                    {["Features", "Templates", "Pricing"].map((link) => (
                        <Link
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            className="text-xs font-bold text-muted-foreground hover:text-primary transition-all active:scale-95"
                        >
                            {link}
                        </Link>
                    ))}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <div className="hidden sm:flex items-center gap-5">
                        <Link href="/login" className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
                            Log In
                        </Link>

                        <div className="h-8 w-8 p-0.5 rounded-full bg-gradient-to-tr from-primary to-purple-500 cursor-pointer shadow-sm">
                            <img
                                src="https://i.pravatar.cc/150?u=jane"
                                alt="Profile"
                                className="h-full w-full rounded-full border-2 border-background"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <Link href="/register">
                        <Button className="bg-primary text-white hover:bg-primary/90 font-bold px-5 py-2 rounded-xl text-xs transition-all hover:scale-105 shadow-md h-auto">
                            Get Started
                        </Button>
                    </Link>

                    <button className="md:hidden p-1.5 text-muted-foreground">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </motion.nav>
    )
})

Navbar.displayName = "Navbar"
