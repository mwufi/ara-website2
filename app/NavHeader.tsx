"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function NavHeader({ className = "max-w-7xl px-6" }: { className?: string }) {
    const { scrollY } = useScroll();

    // Transform scroll position to padding values
    const headerPadding = useTransform(scrollY, [0, 100], [40, 8]); // py-10 = 40px, py-2 = 8px
    const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);
    const backgroundOpacity = useTransform(scrollY, [0, 100], [0.2, 0.3]);

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50"
            style={{
                paddingTop: headerPadding,
                paddingBottom: headerPadding,
            }}
        >
            <div className={`mx-auto flex items-center justify-between ${className}`}>
                <motion.div
                    style={{
                        scale: logoScale,
                    }}
                >
                    <Link href="/" className="flex items-center space-x-3 backdrop-blur-sm rounded-full px-8 bg-white/50 dark:bg-white/20 transition-transform duration-300 hover:scale-105">
                        <div className="w-20 h-16 rounded-lg flex items-center justify-center">
                            <Image
                                src="/ara_logo.svg"
                                alt="Ara Intelligence Logo"
                                width={140}
                                height={40}
                                className="w-full h-full dark:invert"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-sans text-gray-900 dark:text-gray-100">
                                Ara Intelligence
                            </h1>
                        </div>
                    </Link>
                </motion.div>

                <motion.nav
                    className="hidden md:flex space-x-8 backdrop-blur-sm rounded-full px-4 h-10 items-center"
                    style={{
                        backgroundColor: useTransform(backgroundOpacity, (opacity) => `rgba(255, 255, 255, ${opacity})`),
                    }}
                >
                    <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-medium transition-colors">
                        Home
                    </Link>
                    <Link href="/products" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-medium transition-colors">
                        Products
                    </Link>
                    <Link href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-medium transition-colors">
                        About
                    </Link>
                </motion.nav>
            </div>
        </motion.header>
    )
}