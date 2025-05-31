"use client"

import Image from "next/image";
import Link from "next/link";

export default function AraConnectPage() {
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
                                Ara Connect
                            </h1>
                            <span className="px-4 py-2 bg-green-600 text-white rounded-full text-lg font-medium">
                                In Development
                            </span>
                        </div>
                        <p className="font-serif text-xl md:text-2xl font-light leading-[1.3] tracking-[-0.01em] text-gray-600 dark:text-gray-400 mb-8">
                            Your AI-powered relationship manager that helps you maintain meaningful connections with friends, family, and colleagues.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200 shadow-lg">
                                Join Waitlist
                            </button>
                            <button className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="aspect-square rounded-3xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center border border-green-200 dark:border-green-800/30">
                            <div className="text-center p-8">
                                <div className="w-32 h-32 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <span className="text-4xl">🤝</span>
                                </div>
                                <h3 className="text-3xl font-serif font-light text-gray-800 dark:text-gray-200">
                                    Ara Connect
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-16">
                    Relationship Intelligence
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: "📊",
                            title: "Relationship Insights",
                            description: "Understand your social connections better with AI-powered insights about communication patterns and relationship health."
                        },
                        {
                            icon: "⏰",
                            title: "Smart Reminders",
                            description: "Never forget important dates, follow-ups, or check-ins. Ara Connect reminds you when it's time to reconnect."
                        },
                        {
                            icon: "💬",
                            title: "Communication Coaching",
                            description: "Get personalized suggestions for better conversations and relationship building based on communication styles."
                        },
                        {
                            icon: "📈",
                            title: "Social Analytics",
                            description: "Track relationship trends, communication frequency, and connection quality over time."
                        },
                        {
                            icon: "🎯",
                            title: "Goal Setting",
                            description: "Set and track relationship goals, from staying in touch with family to building professional networks."
                        },
                        {
                            icon: "🔒",
                            title: "Privacy Focused",
                            description: "Your relationship data stays completely private. Ara Connect processes everything locally on your device."
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

            {/* How It Works Section */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-16">
                    How Ara Connect Works
                </h2>

                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        {
                            step: "1",
                            title: "Connect",
                            description: "Link your communication channels - email, messaging apps, social media.",
                            icon: "🔗"
                        },
                        {
                            step: "2",
                            title: "Analyze",
                            description: "Ara Connect analyzes your communication patterns and relationship dynamics.",
                            icon: "🧠"
                        },
                        {
                            step: "3",
                            title: "Insight",
                            description: "Get personalized insights about your relationships and communication habits.",
                            icon: "💡"
                        },
                        {
                            step: "4",
                            title: "Act",
                            description: "Receive smart suggestions and reminders to strengthen your connections.",
                            icon: "✨"
                        }
                    ].map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl text-white">{step.icon}</span>
                            </div>
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-green-600 font-semibold">{step.step}</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
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
                            title: "Busy Professionals",
                            description: "Maintain professional relationships while managing a demanding career. Keep your network active and engaged.",
                            scenarios: ["Network maintenance", "Client relationships", "Team building", "Industry connections"],
                            icon: "💼"
                        },
                        {
                            title: "Social Butterflies",
                            description: "Manage large social circles and ensure no important relationships fall through the cracks.",
                            scenarios: ["Friend group dynamics", "Event planning", "Social calendar", "Group communications"],
                            icon: "🦋"
                        },
                        {
                            title: "Remote Workers",
                            description: "Stay connected with colleagues and build relationships in a distributed work environment.",
                            scenarios: ["Virtual team building", "Async communication", "Cross-timezone coordination", "Digital watercooler"],
                            icon: "🏠"
                        }
                    ].map((useCase, index) => (
                        <div key={index} className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                            <div className="text-4xl mb-4">{useCase.icon}</div>
                            <h3 className="text-2xl font-serif font-light mb-4 text-gray-900 dark:text-gray-100">
                                {useCase.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                {useCase.description}
                            </p>
                            <ul className="space-y-2">
                                {useCase.scenarios.map((scenario, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                                        {scenario}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Showcase */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-16">
                    Key Features
                </h2>

                <div className="space-y-16">
                    {[
                        {
                            title: "Relationship Dashboard",
                            description: "See all your relationships at a glance with beautiful visualizations of connection strength, communication frequency, and relationship health.",
                            features: ["Visual relationship map", "Communication timeline", "Connection strength metrics", "Interaction patterns"]
                        },
                        {
                            title: "Smart Notifications",
                            description: "Get contextual reminders and suggestions that help you stay connected at the right time with the right people.",
                            features: ["Birthday reminders", "Follow-up suggestions", "Check-in prompts", "Event notifications"]
                        },
                        {
                            title: "Communication Insights",
                            description: "Understand your communication style and get personalized tips for building stronger relationships.",
                            features: ["Communication style analysis", "Sentiment tracking", "Response time patterns", "Conversation starters"]
                        }
                    ].map((feature, index) => (
                        <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                            <div className="flex-1">
                                <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl flex items-center justify-center border border-green-200 dark:border-green-800/30">
                                    <div className="text-center p-8">
                                        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                            <span className="text-2xl text-white">📱</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Interactive Demo Coming Soon
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-serif font-light mb-4 text-gray-900 dark:text-gray-100">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                    {feature.description}
                                </p>
                                <ul className="grid grid-cols-2 gap-3">
                                    {feature.features.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <div className="w-2 h-2 bg-green-600 rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Coming Soon Section */}
            <section className="mb-20">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-12 border border-green-100 dark:border-green-800/30">
                    <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] text-center mb-8">
                        Coming Soon
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8 max-w-3xl mx-auto">
                        Ara Connect is currently in development. We're building something special that will transform how you manage and nurture your relationships. Be the first to know when it's ready.
                    </p>
                    <div className="text-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200 shadow-lg">
                            Join the Waitlist
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
                            question: "How does Ara Connect protect my privacy?",
                            answer: "Privacy is our top priority. All your relationship data is processed locally on your device. We never store or access your personal communications or relationship information."
                        },
                        {
                            question: "What platforms does Ara Connect work with?",
                            answer: "Ara Connect integrates with major communication platforms including email, messaging apps, social media, and calendar applications to give you a complete view of your relationships."
                        },
                        {
                            question: "Can I control what relationships Ara Connect tracks?",
                            answer: "Absolutely. You have complete control over which contacts and relationships Ara Connect monitors. You can easily add, remove, or categorize relationships as needed."
                        },
                        {
                            question: "When will Ara Connect be available?",
                            answer: "Ara Connect is currently in development. Join our waitlist to be notified when beta testing begins and get early access to the platform."
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
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-12 border border-green-100 dark:border-green-800/30">
                    <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] mb-4">
                        Ready to transform your relationships?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        Be among the first to experience AI-powered relationship management when Ara Connect launches.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200 shadow-lg">
                            Join the Waitlist
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