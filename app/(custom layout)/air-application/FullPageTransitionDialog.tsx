'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function FullPageTransitionDialog({
    isOpen,
    onClose,
    children
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) {
    const [showContent, setShowContent] = useState(false);

    const overlayVariants = {
        closed: {
            scaleY: 0,
        },
        open: {
            scaleY: 1,
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1], // power3.inOut equivalent
            },
        },
    };

    const contentVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.4, // Start showing content while overlay is still animating
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const handleOverlayComplete = () => {
        if (isOpen) {
            setShowContent(true);
        }
    };

    const handleClose = () => {
        setShowContent(false);
        // Delay the actual close to allow content to fade out
        setTimeout(() => {
            onClose();
        }, 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay Rows */}
                    <div className="fixed inset-0 z-[100] pointer-events-none">
                        {/* Top Row */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
                            style={{ transformOrigin: '50% 0%' }}
                            variants={overlayVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            onAnimationComplete={handleOverlayComplete}
                        />

                        {/* Bottom Row */}
                        <motion.div
                            className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-tr from-purple-900 via-blue-900 to-indigo-900"
                            style={{ transformOrigin: '50% 100%' }}
                            variants={overlayVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        />
                    </div>

                    {/* Content */}
                    <AnimatePresence>
                        {showContent && (
                            <motion.div
                                className="fixed inset-0 z-[110] overflow-y-auto scrollbar-hide"
                                style={{
                                    scrollbarWidth: 'none', /* Firefox */
                                    msOverflowStyle: 'none', /* IE and Edge */
                                }}
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <style jsx>{`
                                    /* WebKit browsers (Chrome, Safari, newer Edge) */
                                    .scrollbar-hide::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}</style>

                                {/* Fixed Background with Parallax */}
                                <div className="fixed inset-0 z-[111]">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                                    {/* Parallax Elements */}
                                    <motion.div
                                        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-500/20 to-transparent rounded-full blur-3xl"
                                        style={{
                                            transform: 'translate3d(0, 0, 0)',
                                        }}
                                        animate={{
                                            y: [0, -20, 0],
                                            x: [0, 10, 0],
                                        }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />
                                    <motion.div
                                        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full blur-3xl"
                                        style={{
                                            transform: 'translate3d(0, 0, 0)',
                                        }}
                                        animate={{
                                            y: [0, 15, 0],
                                            x: [0, -15, 0],
                                        }}
                                        transition={{
                                            duration: 25,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />
                                </div>

                                {/* Close Button */}
                                <div className="absolute top-8 right-8 z-[120]">
                                    <Button
                                        onClick={handleClose}
                                        variant="ghost"
                                        className="text-white hover:bg-white/10 rounded-full w-12 h-12 p-0 text-xl font-light"
                                    >
                                        ✕
                                    </Button>
                                </div>

                                {/* Scrolling Content */}
                                <div className="relative z-[115] min-h-screen">
                                    {children}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </AnimatePresence>
    );
}
