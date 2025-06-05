'use client'

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FlipCardProps {
    children: ReactNode;
    back: ReactNode;
    isFlipped: boolean;
    className?: string;
}

export default function FlipCard({ children, back, isFlipped, className = "" }: FlipCardProps) {
    return (
        <>
            <style jsx>{`
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
            <div className={`perspective-1000 ${className}`} style={{ perspective: "1000px" }}>
                <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="relative w-full preserve-3d"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Front of card */}
                    <div className="backface-hidden">
                        {children}
                    </div>

                    {/* Back of card */}
                    <div
                        className="absolute inset-0 backface-hidden"
                        style={{ transform: "rotateY(180deg)" }}
                    >
                        {back}
                    </div>
                </motion.div>
            </div>
        </>
    );
} 