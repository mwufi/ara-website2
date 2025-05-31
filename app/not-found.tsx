"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import NavHeader from "./NavHeader";
import Footer from "@/components/Footer";

export default function NotFound() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
                <NavHeader />
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left Column - Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-center lg:text-left order-2 lg:order-1"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="mb-6"
                            >
                                <h1 className="text-6xl md:text-7xl font-serif font-light text-gray-900 dark:text-gray-100 mb-4">
                                    404
                                </h1>
                                <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-800 dark:text-gray-200 mb-6">
                                    Unknown Zone Detected
                                </h2>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="mb-8"
                            >
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                    You've ventured into uncharted digital territory! Our AI architects are busy constructing this section of the web.
                                </p>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    While we build the future, why not explore what's already live?
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:flex-wrap sm:justify-center lg:justify-start"
                            >
                                <Link
                                    href="/"
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                                >
                                    🏠 Return Home
                                </Link>

                                <Link
                                    href="/products"
                                    className="inline-block bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium px-8 py-3 rounded-lg transition-colors duration-300"
                                >
                                    🚀 Explore Products
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
                            >
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Lost? Email us at{" "}
                                    <a
                                        href="mailto:support@ara.computer"
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
                                    >
                                        support@ara.computer
                                    </a>
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Construction Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="flex justify-center lg:justify-end order-1 lg:order-2"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 1, -1, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative"
                            >
                                <Image
                                    src="/construction.png"
                                    alt="AI Construction in Progress"
                                    width={500}
                                    height={600}
                                    className="w-full max-w-md lg:max-w-lg h-auto"
                                    priority
                                />

                                {/* Floating construction indicators */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.7, 1, 0.7]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute top-1/4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                                >
                                    🚧 Building...
                                </motion.div>

                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.6, 1, 0.6]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                    className="absolute bottom-1/3 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                                >
                                    ⚡ AI at Work
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Fun stats section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
                    >
                        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">59.7%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Site Coverage</div>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">24/7</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">AI Construction</div>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">∞</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Possibilities</div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </>
    );
} 