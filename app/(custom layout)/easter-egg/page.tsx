"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function EasterEggPage() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const glowVariants = {
        initial: { boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" },
        animate: {
            boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(59, 130, 246, 0.8)",
                "0 0 20px rgba(59, 130, 246, 0.5)"
            ],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
                        animate={{
                            x: [0, Math.random() * 1000],
                            y: [0, Math.random() * 1000],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            left: Math.random() * 100 + "%",
                            top: Math.random() * 100 + "%",
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="max-w-4xl mx-auto px-6 text-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate={showContent ? "visible" : "hidden"}
            >
                <motion.div
                    variants={itemVariants}
                    className="mb-8"
                >
                    <motion.div
                        className="text-8xl mb-4"
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        🥚✨
                    </motion.div>
                    <h1 className="text-6xl md:text-7xl font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
                        You Found It!
                    </h1>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mb-8"
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-6">
                        The Secret Easter Egg 🎉
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                        Congratulations, digital explorer! You've discovered something special hidden in the depths of our website.
                    </p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mb-12"
                >
                    <motion.div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8"
                        variants={glowVariants}
                        initial="initial"
                        animate="animate"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            🎁 Exclusive Offer Inside! 🎁
                        </h3>
                        <p className="text-lg text-blue-100 leading-relaxed">
                            Here's the deal: Email{" "}
                            <span className="font-mono bg-white/20 px-2 py-1 rounded text-white">
                                zen@ara.computer
                            </span>{" "}
                            with <strong>what you most want Ara to do</strong>, and receive a complimentary{" "}
                            <span className="font-bold text-yellow-300">All-Access Pass</span> to all Ara products!
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-gray-300 space-y-4"
                        variants={itemVariants}
                    >
                        <p className="text-lg">
                            ✨ Dream big! Want an AI that can compose music? Write novels? Solve quantum physics?
                        </p>
                        <p className="text-lg">
                            🚀 Help us build the future of AI by sharing your wildest ideas!
                        </p>
                        <p className="text-sm text-gray-400">
                            (This offer is real, by the way. We love curious minds who dig deep!)
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="space-y-6"
                >
                    <motion.button
                        onClick={() => window.location.href = "mailto:zen@ara.computer?subject=Easter%20Egg%20Discovery%20-%20My%20Ara%20Vision&body=Hey%20Zen!%0A%0AI%20found%20the%20easter%20egg!%20%F0%9F%A5%B3%0A%0AWhat%20I%20most%20want%20Ara%20to%20do%20is:%0A%0A[Tell%20us%20your%20big%20idea%20here!]%0A%0ACheers!"}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🚀 Email Zen Now!
                    </motion.button>

                    <p className="text-gray-400 text-sm">
                        Or manually email{" "}
                        <a
                            href="mailto:zen@ara.computer"
                            className="text-blue-400 hover:text-blue-300 underline transition-colors"
                        >
                            zen@ara.computer
                        </a>
                    </p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-16 pt-8 border-t border-gray-700"
                >
                    <p className="text-gray-500 text-sm">
                        Psst... want to go back to reality?{" "}
                        <a href="/" className="text-blue-400 hover:text-blue-300 underline transition-colors">
                            Return to Ara Intelligence
                        </a>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
} 