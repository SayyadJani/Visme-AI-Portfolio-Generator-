"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Target, Eye, EyeOff, Lock, Mail, User, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { signIn } from "next-auth/react"

export function RegisterForm() {
    const [showPassword, setShowPassword] = React.useState(false)
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreed: false
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("REGISTER_SUBMIT_DATA:", formData)
        // Placeholder for email/password registration logic
        // await signIn("credentials", { ...formData, redirect: false })
    }

    const handleSocialLogin = async (provider: string) => {
        console.log(`SOCIAL_LOGIN_PROVIDER: ${provider}`)
        // await signIn(provider, { callbackUrl: "/dashboard" })
    }

    return (
        <div className="w-full max-w-xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-lg">
                    Create your developer account
                </h2>
                <p className="text-gray-400 font-bold text-lg md:text-xl max-w-md mx-auto leading-relaxed">
                    Join thousands of developers turning their code into beautiful portfolios.
                </p>
            </div>

            <div className="clay-card p-10 bg-[#0a0a0a]/80 backdrop-blur-3xl border-white/5 shadow-2xl space-y-10">
                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-5">
                    <button
                        type="button"
                        onClick={() => handleSocialLogin("github")}
                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all group active:scale-95"
                    >
                        <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                        <span className="font-bold text-sm text-gray-400 group-hover:text-white">GitHub</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSocialLogin("google")}
                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all group active:scale-95"
                    >
                        <Target className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors rotate-45" />
                        <span className="font-bold text-sm text-gray-400 group-hover:text-white">Google</span>
                    </button>
                </div>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/5" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#0a0a0a]/80 px-4 text-[10px] font-black tracking-widest text-[#444]">
                            OR CONTINUE WITH
                        </span>
                    </div>
                </div>

                {/* Form Logic */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                            <Input
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="pl-12 py-7 rounded-xl bg-white/[0.02] border-white/5 transition-all group-focus-within:border-primary/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                            <Input
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="pl-12 py-7 rounded-xl bg-white/[0.02] border-white/5 transition-all group-focus-within:border-primary/50"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="pl-12 py-7 rounded-xl bg-white/[0.02] border-white/5 transition-all group-focus-within:border-primary/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Confirm Password</label>
                            <div className="relative group">
                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="pl-12 py-7 rounded-xl bg-white/[0.02] border-white/5 transition-all group-focus-within:border-primary/50"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 group cursor-pointer w-fit" onClick={() => setFormData({ ...formData, agreed: !formData.agreed })}>
                        <div className={`w-6 h-6 rounded border border-white/10 flex items-center justify-center transition-all ${formData.agreed ? "bg-primary border-primary" : "bg-white/5 group-hover:border-primary"}`}>
                            {formData.agreed && <Lock className="w-3 h-3 text-white" />}
                        </div>
                        <p className="text-xs md:text-sm font-bold text-gray-600 group-hover:text-gray-400">
                            I agree to the <Link href="#" className="text-primary hover:text-primary/80 transition-colors">Terms of Service</Link> and <Link href="#" className="text-primary hover:text-primary/80 transition-colors">Privacy Policy</Link>.
                        </p>
                    </div>

                    <Button type="submit" className="w-full py-8 rounded-xl bg-primary text-white text-lg font-black transition-all hover:scale-105 active:scale-95 shadow-[0_10px_40px_rgba(37,99,235,0.4)] h-auto">
                        Create Account
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-500 font-bold">
                    Already have an account? <Link href="/login" className="text-primary hover:text-primary/80 transition-colors">Log in</Link>
                </p>
            </div>
        </div>
    )
}
