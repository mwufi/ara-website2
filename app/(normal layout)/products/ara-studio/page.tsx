"use client"

import Image from "next/image";
import Link from "next/link";

export default function AraStudioPage() {
    return (
        <main className="px-6 max-w-7xl mx-auto">
            {/* Hero Section */}
            <section className="mb-20">
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/products" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                        ← Back to Products
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                            <h1 className="font-serif text-4xl md:text-[56px] font-light leading-[1.1] tracking-[-0.02em]">
                                Ara Studio
                            </h1>
                            <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-lg font-medium">
                                Beta
                            </span>
                        </div>
                        <p className="font-serif text-xl md:text-2xl font-light leading-[1.3] tracking-[-0.01em] text-gray-600 dark:text-gray-400 mb-8">
                            Your creative AI companion that transforms ideas into reality through intelligent collaboration across all creative mediums.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200 shadow-lg">
                                Join Beta
                            </button>
                            <button className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                View Gallery
                            </button>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center border border-blue-200 dark:border-blue-800/30">
                            <div className="text-center p-8">
                                <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <span className="text-4xl">🎨</span>
                                </div>
                                <h3 className="text-3xl font-serif font-light text-gray-800 dark:text-gray-200">
                                    Ara Studio
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-16">
                    Creative Intelligence
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: "🤝",
                            title: "Creative Collaboration",
                            description: "Work alongside AI that understands your creative vision. Brainstorm, iterate, and refine ideas together in real-time."
                        },
                        {
                            icon: "🌐",
                            title: "Multi-Modal Generation",
                            description: "Create across all mediums - text, images, video, audio, and 3D. One platform for all your creative needs."
                        },
                        {
                            icon: "🎯",
                            title: "Style Learning",
                            description: "Ara Studio learns your unique creative style and preferences, becoming a true extension of your artistic vision."
                        },
                        {
                            icon: "📋",
                            title: "Project Management",
                            description: "Keep your creative projects organized with AI-powered project tracking, version control, and collaboration tools."
                        },
                        {
                            icon: "⚡",
                            title: "Rapid Prototyping",
                            description: "Turn concepts into prototypes in minutes. Test ideas quickly and iterate faster than ever before."
                        },
                        {
                            icon: "🔄",
                            title: "Seamless Iteration",
                            description: "Refine and evolve your work with intelligent suggestions and automated improvements."
                        }
                    ].map((feature, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                            <div className="text-3xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Gallery Section */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-16">
                    Created with Ara Studio
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { type: "Design", color: "from-pink-500 to-rose-500" },
                        { type: "Video", color: "from-blue-500 to-cyan-500" },
                        { type: "Writing", color: "from-green-500 to-emerald-500" },
                        { type: "Music", color: "from-purple-500 to-violet-500" },
                        { type: "3D Art", color: "from-orange-500 to-amber-500" },
                        { type: "Concept", color: "from-indigo-500 to-blue-500" }
                    ].map((item, index) => (
                        <div key={index} className="aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center border border-gray-200 dark:border-gray-700 group hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <div className="text-center">
                                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                                    <span className="text-2xl text-white">✨</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {item.type}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    AI-Generated
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-16">
                    Built For Creators
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            title: "Designers",
                            description: "Create stunning visuals, brand identities, and user interfaces with AI assistance.",
                            tools: ["Logo design", "UI mockups", "Brand assets", "Color palettes"]
                        },
                        {
                            title: "Writers",
                            description: "Craft compelling stories, articles, and copy with intelligent writing assistance.",
                            tools: ["Story development", "Content research", "Style adaptation", "Editing support"]
                        },
                        {
                            title: "Filmmakers",
                            description: "Produce videos, animations, and visual effects with AI-powered tools.",
                            tools: ["Storyboarding", "Video editing", "VFX generation", "Sound design"]
                        },
                        {
                            title: "Musicians",
                            description: "Compose, arrange, and produce music with AI collaboration.",
                            tools: ["Melody generation", "Harmony creation", "Mixing assistance", "Lyric writing"]
                        }
                    ].map((creator, index) => (
                        <div key={index} className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-serif font-light mb-4 text-gray-900 dark:text-gray-100">
                                {creator.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                {creator.description}
                            </p>
                            <ul className="space-y-2">
                                {creator.tools.map((tool, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                        {tool}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-16">
                    Creator Pricing
                </h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-serif font-light mb-4">Studio Free</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-light">$0</span>
                            <span className="text-gray-600 dark:text-gray-400">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            {["Basic AI tools", "10 projects", "Standard generation", "Community support", "Personal use"].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                            Get Started
                        </button>
                    </div>

                    <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                        <h3 className="text-2xl font-serif font-light mb-4">Studio Pro</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-light">$29</span>
                            <span className="text-blue-100">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            {["Advanced AI models", "Unlimited projects", "High-res generation", "Priority support", "Commercial license"].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Start Free Trial
                        </button>
                    </div>

                    <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-serif font-light mb-4">Studio Team</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-light">$99</span>
                            <span className="text-gray-600 dark:text-gray-400">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            {["Team collaboration", "Custom AI training", "Brand guidelines", "Admin controls", "24/7 support"].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="mb-20 text-center">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-12 border border-blue-100 dark:border-blue-800/30">
                    <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] mb-4">
                        Ready to unleash your creativity?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        Join thousands of creators who are already using Ara Studio to bring their ideas to life.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200 shadow-lg">
                            Start Creating Now
                        </button>
                        <Link
                            href="/products"
                            className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
} 