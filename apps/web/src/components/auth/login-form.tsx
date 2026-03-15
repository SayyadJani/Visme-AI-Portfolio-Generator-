"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Target, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { signIn } from "next-auth/react"

import { authService } from "@/services/auth.service"
import { useAuthStore } from "@/stores/authStore"
import { useRouter } from "next/navigation"

export function LoginForm() {
    const router = useRouter()
    const setAuth = useAuthStore((state) => state.setAuth)
    const [showPassword, setShowPassword] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        
        try {
            const result = await authService.login(formData)
            const accessToken = result.tokens?.accessToken || (result as any).accessToken;
            if (accessToken) {
                setAuth(result.user, accessToken);
                router.push("/dashboard");
            } else {
                throw new Error("Tokens missing from response");
            }
        } catch (err: any) {
            console.error("LOGIN_ERROR:", err)
            setError(err.response?.data?.error?.message || "Invalid credentials. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSocialLogin = async (provider: string) => {
        console.log(`SOCIAL_LOGIN_PROVIDER: ${provider}`)
    }

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="clay-card p-10 bg-[#0a0a0a]/80 backdrop-blur-3xl border-white/5 shadow-2xl space-y-8">
                <div className="text-center space-y-3">
                    <h2 className="text-4xl font-black tracking-tight text-white italic">Welcome back</h2>
                    <p className="text-muted-foreground text-base">Enter your credentials to access your dashboard</p>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-5">
                    <button
                        type="button"
                        onClick={() => handleSocialLogin("github")}
                        className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all group active:scale-95"
                    >
                        <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                        <span className="font-bold text-sm text-gray-400 group-hover:text-white">GitHub</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSocialLogin("google")}
                        className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all group active:scale-95"
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
                            OR CONTINUE WITH EMAIL
                        </span>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                {/* Form Logic */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                            <Input
                                type="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="pl-12 py-7 rounded-xl bg-white/[0.02] border-white/5 transition-all group-focus-within:border-primary/50"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2 relative">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Password</label>
                            <Link href="#" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">Forgot password?</Link>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="pl-12 py-7 rounded-xl bg-white/[0.02] border-white/5 transition-all group-focus-within:border-primary/50"
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 group cursor-pointer w-fit" onClick={() => { }}>
                        <div className="w-5 h-5 rounded border border-white/10 bg-white/5 flex items-center justify-center transition-all group-hover:border-primary group-hover:bg-primary/10">
                            {/* Checked icon placeholder if need be */}
                        </div>
                        <span className="text-sm font-bold text-gray-400 group-hover:text-gray-200 transition-colors">Remember me for 30 days</span>
                    </div>

                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-8 rounded-xl bg-primary text-white text-lg font-black transition-all hover:scale-[1.02] active:scale-95 shadow-[0_10px_40px_rgba(37,99,235,0.4)] h-auto disabled:opacity-50 disabled:scale-100"
                    >
                        {isLoading ? "Logging in..." : "Log in →"}
                    </Button>
                </form>

                <div className="text-center space-y-4">
                    <p className="text-sm text-gray-500 font-bold">
                        Don't have an account? <Link href="/register" className="text-primary hover:text-primary/80 transition-colors">Sign up for free</Link>
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-600">
                        <Link href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
                        <span className="w-1 h-1 bg-gray-800 rounded-full" />
                        <Link href="#" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>

            <p className="mt-12 text-center text-sm font-bold text-gray-600 italic">
                "The fastest way to deploy a stunning portfolio that recruiters actually read."
            </p>
        </div>
    )
}
