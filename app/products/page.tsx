"use client"

import Image from "next/image";
import Link from "next/link";

const products = [
    {
        id: 1,
        name: "MailPuppy",
        slug: "mailpuppy",
        description: "An intelligent email assistant that reads your emails and follows instructions. Voice-first interactions make email management effortless and natural.",
        image: "/api/placeholder/400/300",
        status: "Coming Soon",
        features: ["Voice-first interaction", "Email intelligence", "Smart filtering", "Task automation"],
        color: "#AB0782"
    },
    {
        id: 2,
        name: "Ara Studio",
        slug: "ara-studio",
        description: "Creative AI companion for designers, writers, and creators. Transform ideas into reality with intelligent collaboration.",
        image: "/api/placeholder/400/300",
        status: "Beta",
        features: ["Creative collaboration", "Multi-modal generation", "Style learning", "Project management"],
        color: "#2563EB"
    },
    {
        id: 3,
        name: "Ara Connect",
        slug: "ara-connect",
        description: "AI-powered relationship manager that helps you maintain meaningful connections with friends, family, and colleagues.",
        image: "/api/placeholder/400/300",
        status: "In Development",
        features: ["Relationship insights", "Smart reminders", "Communication coaching", "Social analytics"],
        color: "#059669"
    },
    {
        id: 4,
        name: "OS1",
        slug: "os1",
        description: "Your ambient AI companion that lives across desktop, phone, and cloud. Seamlessly integrates with 250+ tools while working beautifully offline.",
        image: "/api/placeholder/400/300",
        status: "Research",
        features: ["Ambient presence", "250+ integrations", "Offline capable", "Cross-platform sync"],
        color: "#DC2626"
    }
];

export default function Products() {
    return (
        <main className="px-6 max-w-7xl mx-auto">
            {/* Hero Section */}
            <section className="mb-20">
                <h1 className="font-serif text-4xl md:text-[56px] font-light leading-[1.1] tracking-[-0.02em] mb-6">
                    Our Products
                </h1>
                <p className="font-serif text-xl md:text-2xl font-light leading-[1.3] tracking-[-0.01em] max-w-[50rem] text-gray-600 dark:text-gray-400">
                    Building the future of personal AI - products that understand, assist, and connect with you on a deeply personal level.
                </p>
            </section>

            {/* Products Grid */}
            <section className="mb-20">
                <div className="grid gap-12 md:gap-16">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
                        >
                            {/* Product Image */}
                            <div className="flex-1">
                                <Link href={`/products/${product.slug}`}>
                                    <div
                                        className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                                        style={{
                                            background: `linear-gradient(135deg, ${product.color}15, ${product.color}05)`,
                                            border: `1px solid ${product.color}20`
                                        }}
                                    >
                                        <div className="text-center p-8">
                                            <div
                                                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                                                style={{ backgroundColor: `${product.color}20` }}
                                            >
                                                <div
                                                    className="w-10 h-10 rounded-full"
                                                    style={{ backgroundColor: product.color }}
                                                />
                                            </div>
                                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                                {product.name}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em]">
                                        {product.name}
                                    </h2>
                                    <span
                                        className="px-3 py-1 rounded-full text-sm font-medium text-white"
                                        style={{ backgroundColor: product.color }}
                                    >
                                        {product.status}
                                    </span>
                                </div>

                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {product.description}
                                </p>

                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Key Features:</h4>
                                    <ul className="grid grid-cols-2 gap-2">
                                        {product.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <div
                                                    className="w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: product.color }}
                                                />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg inline-block text-center"
                                        style={{ backgroundColor: product.color }}
                                    >
                                        Learn More
                                    </Link>
                                    <button className="px-6 py-3 rounded-lg font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        Join Waitlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="mb-20 text-center">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-12 border border-purple-100 dark:border-purple-800/30">
                    <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[-0.02em] mb-4">
                        Ready to experience the future?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        Join thousands of early adopters who are already experiencing the next generation of personal AI.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200 shadow-lg">
                            Get Early Access
                        </button>
                        <Link
                            href="/"
                            className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-gray-700 pt-12 pb-8">
                <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        © 2024 Ara Intelligence. Building the future of personal AI.
                    </p>
                </div>
            </footer>
        </main>
    );
} 