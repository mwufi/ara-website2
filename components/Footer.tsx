import Link from "next/link";
import Image from "next/image";
import SubscribeForUpdates from "@/components/SubscribeForUpdates";

export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            {/* Subscribe Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <SubscribeForUpdates />
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

                    {/* Product Section */}
                    <div className="lg:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Our Tools
                                </Link>
                            </li>
                            <li>
                                <Link href="/api" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    API
                                </Link>
                            </li>
                            <li>
                                <Link href="/models" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    AI Models
                                </Link>
                            </li>
                            <li>
                                <Link href="/features" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/use-cases" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Use Cases
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div className="lg:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/research" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Our Research
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    News
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Section */}
                    <div className="lg:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/community" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link href="/tutorials" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Tutorials
                                </Link>
                            </li>
                            <li>
                                <Link href="/status" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    System Status
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Get Started Section */}
                    <div className="lg:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                            Get Started
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/signup" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/enterprise" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    For Enterprises
                                </Link>
                            </li>
                            <li>
                                <Link href="/developers" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    For Developers
                                </Link>
                            </li>
                            <li>
                                <Link href="/security" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Security
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div className="lg:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                            Connect
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    Discord
                                </a>
                            </li>
                            <li>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                                    YouTube
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                        {/* Logo and Copyright */}
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                    <Image
                                        src="/ara_logo.svg"
                                        alt="Ara Intelligence Logo"
                                        width={32}
                                        height={32}
                                        className="w-full h-full dark:invert"
                                    />
                                </div>
                                <span className="text-gray-900 dark:text-gray-100 font-semibold">
                                    Ara Intelligence
                                </span>
                            </Link>
                        </div>

                        {/* Legal Links - Small like Runway */}
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>© 2025 Ara Intelligence. All rights reserved.</span>
                            <span className="hidden md:inline">•</span>
                            <Link href="/terms" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                                Terms of Use
                            </Link>
                            <span>•</span>
                            <Link href="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                                Privacy Policy
                            </Link>
                            <span>•</span>
                            <Link href="/cookies" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                                Cookie Policy
                            </Link>
                            <span>•</span>
                            <Link href="/responsible-ai" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                                Responsible AI
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 