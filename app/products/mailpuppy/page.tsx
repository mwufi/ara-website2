"use client"

import Image from "next/image";
import Link from "next/link";

export default function MailPuppyPage() {
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
                                MailPuppy
                            </h1>
                            <span className="px-4 py-2 bg-purple-600 text-white rounded-full text-lg font-medium">
                                Coming Soon
                            </span>
                        </div>
                        <p className="font-serif text-xl md:text-2xl font-light leading-[1.3] tracking-[-0.01em] text-gray-600 dark:text-gray-400 mb-8">
                            Your intelligent email assistant that reads, understands, and acts on your emails through natural voice commands.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200 shadow-lg">
                                Join Waitlist
                            </button>
                            <button className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Watch Demo
                            </button>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center border border-purple-200 dark:border-purple-800/30">
                            <div className="text-center p-8">
                                <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <span className="text-4xl">🐶</span>
                                </div>
                                <h3 className="text-3xl font-serif font-light text-gray-800 dark:text-gray-200">
                                    MailPuppy
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-16">
                    Why MailPuppy?
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: "🎤",
                            title: "Voice-First Interface",
                            description: "Talk to MailPuppy naturally. 'Read me my urgent emails' or 'Schedule a meeting with Sarah for next week' - it just works."
                        },
                        {
                            icon: "🧠",
                            title: "Email Intelligence",
                            description: "MailPuppy understands context, urgency, and relationships. It learns your preferences and handles emails the way you would."
                        },
                        {
                            icon: "🔍",
                            title: "Smart Filtering",
                            description: "Automatically categorizes and prioritizes emails. Important messages surface to the top, spam disappears."
                        },
                        {
                            icon: "⚡",
                            title: "Task Automation",
                            description: "From scheduling meetings to following up on proposals, MailPuppy handles routine email tasks automatically."
                        },
                        {
                            icon: "🔒",
                            title: "Privacy First",
                            description: "Your emails stay private. MailPuppy processes everything locally and never stores your personal data."
                        },
                        {
                            icon: "🌐",
                            title: "Universal Compatibility",
                            description: "Works with Gmail, Outlook, Apple Mail, and any IMAP email provider. One assistant for all your accounts."
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

            {/* Demo Section */}
            <section className="mb-20">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-12 border border-purple-100 dark:border-purple-800/30">
                    <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-8">
                        See MailPuppy in Action
                    </h2>
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center mb-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">▶️</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Product Demo Coming Soon
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200 shadow-lg">
                            Request Early Access
                        </button>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-16">
                    Perfect For
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Busy Executives",
                            description: "Manage hundreds of emails daily without losing important messages. MailPuppy handles the noise so you can focus on what matters.",
                            scenarios: ["Priority filtering", "Meeting scheduling", "Follow-up reminders"]
                        },
                        {
                            title: "Small Business Owners",
                            description: "Keep customer communications organized and never miss a sales opportunity. MailPuppy helps you stay responsive and professional.",
                            scenarios: ["Customer support", "Lead management", "Invoice tracking"]
                        },
                        {
                            title: "Remote Workers",
                            description: "Stay connected with your team across time zones. MailPuppy helps manage project communications and keeps you in the loop.",
                            scenarios: ["Team coordination", "Project updates", "Document sharing"]
                        }
                    ].map((useCase, index) => (
                        <div key={index} className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-serif font-light mb-4 text-gray-900 dark:text-gray-100">
                                {useCase.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                {useCase.description}
                            </p>
                            <ul className="space-y-2">
                                {useCase.scenarios.map((scenario, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full" />
                                        {scenario}
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
                    Simple Pricing
                </h2>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-serif font-light mb-4">MailPuppy Personal</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-light">$9</span>
                            <span className="text-gray-600 dark:text-gray-400">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            {["Up to 3 email accounts", "Voice commands", "Smart filtering", "Basic automation", "Mobile app"].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full px-6 py-3 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                            Join Waitlist
                        </button>
                    </div>

                    <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                        <h3 className="text-2xl font-serif font-light mb-4">MailPuppy Pro</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-light">$29</span>
                            <span className="text-purple-100">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            {["Unlimited email accounts", "Advanced AI features", "Custom automations", "Team collaboration", "Priority support"].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Join Waitlist
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-16">
                    Frequently Asked Questions
                </h2>

                <div className="max-w-3xl mx-auto space-y-6">
                    {[
                        {
                            question: "How does MailPuppy access my emails?",
                            answer: "MailPuppy connects to your email accounts using secure OAuth protocols. We never store your passwords or personal data. All processing happens locally on your device."
                        },
                        {
                            question: "Can I use voice commands on mobile?",
                            answer: "Yes! MailPuppy works seamlessly on iOS and Android. Use voice commands, dictate responses, and manage your email hands-free while on the go."
                        },
                        {
                            question: "What email providers are supported?",
                            answer: "MailPuppy works with Gmail, Outlook, Yahoo Mail, Apple Mail, and any IMAP-compatible email provider. You can connect multiple accounts from different providers."
                        },
                        {
                            question: "When will MailPuppy be available?",
                            answer: "We're currently in private beta testing. Join our waitlist to get early access and be among the first to experience the future of email management."
                        }
                    ].map((faq, index) => (
                        <div key={index} className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                                {faq.question}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="mb-20 text-center">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-12 border border-purple-100 dark:border-purple-800/30">
                    <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] mb-4">
                        Ready to transform your email experience?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        Join thousands of professionals who are already on the waitlist for MailPuppy.
                    </p>
                    <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200 shadow-lg">
                        Join the Waitlist
                    </button>
                </div>
            </section>
        </main>
    );
} 