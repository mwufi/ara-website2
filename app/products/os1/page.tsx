"use client"

import Image from "next/image";
import Link from "next/link";

export default function OS1Page() {
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
                                OS1
                            </h1>
                            <span className="px-4 py-2 bg-red-600 text-white rounded-full text-lg font-medium">
                                Research
                            </span>
                        </div>
                        <p className="font-serif text-xl md:text-2xl font-light leading-[1.3] tracking-[-0.01em] text-gray-600 dark:text-gray-400 mb-8">
                            Your ambient AI companion that lives seamlessly across desktop, phone, and cloud. Always present, deeply integrated, beautifully offline.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200 shadow-lg">
                                Join Research Program
                            </button>
                            <button className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="aspect-square rounded-3xl bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 flex items-center justify-center border border-red-200 dark:border-red-800/30">
                            <div className="text-center p-8">
                                <div className="w-32 h-32 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <span className="text-4xl">🌟</span>
                                </div>
                                <h3 className="text-3xl font-serif font-light text-gray-800 dark:text-gray-200">
                                    OS1
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ambient AI Section */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-16">
                    Ambient Intelligence
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: "🌊",
                            title: "Ambient Presence",
                            description: "OS1 lives quietly in the background, understanding context and anticipating your needs without interruption."
                        },
                        {
                            icon: "🔄",
                            title: "Seamless Sync",
                            description: "Your AI companion follows you across every device - desktop, phone, tablet, and cloud - with perfect continuity."
                        },
                        {
                            icon: "🛠️",
                            title: "250+ Integrations",
                            description: "Connect with every tool in your workflow. From productivity apps to creative software, OS1 speaks their language."
                        },
                        {
                            icon: "✈️",
                            title: "Offline First",
                            description: "Works beautifully without internet. Your AI companion is always available, even in airplane mode."
                        },
                        {
                            icon: "🧠",
                            title: "Context Aware",
                            description: "Understands what you're working on, who you're with, and what you need - adapting intelligently to every situation."
                        },
                        {
                            icon: "🔒",
                            title: "Privacy by Design",
                            description: "Your data stays yours. OS1 processes everything locally, with zero data sent to external servers."
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

            {/* Platform Showcase */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-16">
                    Everywhere You Are
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            platform: "Desktop",
                            icon: "💻",
                            description: "Lives in your menu bar, desktop widgets, and integrated into your workflow. Always accessible, never intrusive.",
                            features: ["Menu bar presence", "Desktop widgets", "Quick actions", "Workflow integration"]
                        },
                        {
                            platform: "Mobile",
                            icon: "📱",
                            description: "Your pocket companion that understands context from location, calendar, and activities. Helps you stay connected.",
                            features: ["Lock screen widgets", "Contextual suggestions", "Voice interactions", "Smart notifications"]
                        },
                        {
                            platform: "Cloud",
                            icon: "☁️",
                            description: "Synchronizes seamlessly across all devices while maintaining privacy. Your AI grows smarter with you.",
                            features: ["Cross-device sync", "Encrypted storage", "Preference learning", "Usage analytics"]
                        }
                    ].map((platform, index) => (
                        <div key={index} className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                            <div className="text-4xl mb-4">{platform.icon}</div>
                            <h3 className="text-2xl font-serif font-light mb-4 text-gray-900 dark:text-gray-100">
                                {platform.platform}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                {platform.description}
                            </p>
                            <ul className="space-y-2">
                                {platform.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Integrations Showcase */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-16">
                    250+ Deep Integrations
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { category: "Productivity", tools: ["Notion", "Obsidian", "Linear", "Slack"], color: "from-blue-500 to-cyan-500" },
                        { category: "Creative", tools: ["Figma", "Photoshop", "Blender", "Logic Pro"], color: "from-purple-500 to-pink-500" },
                        { category: "Development", tools: ["VSCode", "GitHub", "Docker", "Vercel"], color: "from-green-500 to-emerald-500" },
                        { category: "Communication", tools: ["Gmail", "Zoom", "Discord", "Teams"], color: "from-orange-500 to-red-500" }
                    ].map((category, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                            <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg mb-4 flex items-center justify-center`}>
                                <span className="text-white font-semibold">
                                    {category.tools.length}+
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                                {category.category}
                            </h3>
                            <ul className="space-y-1">
                                {category.tools.map((tool, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                                        {tool}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        And many more tools across design, productivity, development, communication, and workflow automation.
                    </p>
                    <button className="px-6 py-3 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        View All Integrations
                    </button>
                </div>
            </section>

            {/* Offline Capabilities */}
            <section className="mb-20">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-3xl p-12 border border-red-100 dark:border-red-800/30">
                    <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-8">
                        Works Beautifully Offline
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-serif font-light mb-4 text-gray-900 dark:text-gray-100">
                                True Offline Intelligence
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                OS1 doesn't just cache data - it runs full AI models locally on your device. Whether you're on a plane, in a remote location, or simply prefer privacy, your AI companion works at full capacity.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Local AI model processing",
                                    "Offline voice recognition",
                                    "Document analysis without internet",
                                    "Smart suggestions and automation",
                                    "Encrypted local storage"
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center">
                            <div className="text-center p-8">
                                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-white">✈️</span>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    Always Available
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    No internet? No problem.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Research Program */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-16">
                    Join the Research Program
                </h2>

                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            OS1 represents the future of ambient computing. We're building something unprecedented - an AI that truly understands and enhances your digital life. Join our research program to help shape the future of personal AI.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Early Access",
                                description: "Be among the first to experience OS1 as we develop and refine its capabilities.",
                                icon: "🚀"
                            },
                            {
                                title: "Shape the Future",
                                description: "Your feedback directly influences OS1's development and feature prioritization.",
                                icon: "🔮"
                            },
                            {
                                title: "Research Community",
                                description: "Connect with other forward-thinking individuals exploring the future of AI.",
                                icon: "🤝"
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="text-center p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                                <div className="text-3xl mb-4">{benefit.icon}</div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="mb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] mb-8">
                        The Vision
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
                        OS1 is more than software - it's a new paradigm for human-computer interaction. Imagine an AI that knows your preferences, understands your workflow, and enhances your capabilities without ever getting in your way. An intelligence that grows with you, learns from you, and becomes an extension of your mind.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif font-light text-gray-900 dark:text-gray-100">
                                Today's Challenges
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "AI assistants that require specific commands",
                                    "Context switching between different tools",
                                    "Privacy concerns with cloud-based AI",
                                    "Dependence on internet connectivity"
                                ].map((challenge, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                        {challenge}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif font-light text-gray-900 dark:text-gray-100">
                                OS1's Solution
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Ambient intelligence that anticipates needs",
                                    "Seamless integration across all tools",
                                    "Complete privacy with local processing",
                                    "Full functionality without internet"
                                ].map((solution, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                                        {solution}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="mb-20 text-center">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-3xl p-12 border border-red-100 dark:border-red-800/30">
                    <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] mb-4">
                        Ready to shape the future?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        OS1 is in active research and development. Join our research program to be part of building the next generation of ambient AI.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200 shadow-lg">
                            Join Research Program
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