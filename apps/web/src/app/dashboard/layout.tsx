import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-screen w-screen overflow-hidden bg-background text-foreground flex flex-col select-none relative">
            {/* Top Navbar - Fixed height 80px */}
            <DashboardNavbar />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Positioned below Navbar, fixed width or hover-expand */}
                <DashboardSidebar />

                {/* Main Content Area - Scrollable */}
                <div className="flex-1 flex flex-col ml-20 relative overflow-hidden h-full">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none z-0" />

                    <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 pt-20">
                        <div className="min-h-full flex flex-col">
                            <div className="flex-1">
                                {children}
                            </div>

                            {/* Footer integrated at the bottom of the scroll area */}
                            <footer className="px-12 py-10 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30 mt-auto">
                                <p>© 2026 Portfolio Automation Tool. All rights reserved.</p>
                                <div className="flex items-center gap-12">
                                    <a href="#" className="hover:text-primary transition-all hover:tracking-widest">Docs</a>
                                    <a href="#" className="hover:text-primary transition-all hover:tracking-widest">Privacy</a>
                                    <a href="#" className="hover:text-primary transition-all hover:tracking-widest">Support</a>
                                </div>
                            </footer>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
