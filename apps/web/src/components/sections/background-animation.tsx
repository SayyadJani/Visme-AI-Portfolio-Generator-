"use client"

import { motion } from "framer-motion"

export const BackgroundAnimation = () => {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
            {/* Grid Pattern */}
            <div className="absolute inset-0 grid-pattern opacity-50" />

            {/* Moving Blurs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full"
            />

            <motion.div
                animate={{
                    x: [0, -150, 0],
                    y: [0, 150, 0],
                    scale: [1, 0.8, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full"
            />

            <motion.div
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                }}
                className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            />
        </div>
    )
}
