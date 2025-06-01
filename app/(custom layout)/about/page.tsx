"use client"

import NavHeader from "@/app/NavHeader";
import Image from "next/image";

const aboutText = `Ara Intelligence is building the future of AI - where every person has a personal assistant that's not just intelligent, but cute, personal, and truly helpful. We believe AI should feel like a friend, not a tool.`

const missionText = `Our mission is to create AI that understands you deeply, helps with anything you need, and grows with you over time. We're building towards a world where AI is everywhere, but it feels natural, personal, and genuinely caring.`

const teamValues = [
    {
        title: "Human-Centered AI",
        description: "We put humans first in everything we build. AI should augment human capabilities, not replace human connection."
    },
    {
        title: "Cute & Personal",
        description: "Technology doesn't have to be cold. We believe in creating AI that feels warm, approachable, and uniquely yours."
    },
    {
        title: "Radical Transparency",
        description: "We build in the open, share our learnings, and believe the future of AI should be developed collaboratively."
    },
    {
        title: "Privacy First",
        description: "Your personal AI should be truly personal. We prioritize privacy and user control in all our products."
    }
]

export default function About() {
    return (
        <main className="px-6 max-w-5xl mx-auto">
            <NavHeader className="max-w-5xl px-0" />
            {/* Hero Section */}
            <section className="mb-20 mt-40">
                <h1 className="font-serif text-4xl md:text-[56px] font-light leading-[1.1] tracking-[-0.02em] mb-8">
                    About Ara Intelligence
                </h1>
                <p className="font-sans text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
                    {aboutText}
                </p>
            </section>

            {/* Mission Section */}
            <section className="mb-20">
                <h2 className="font-serif text-3xl md:text-[40px] font-light leading-[1.2] tracking-[-0.02em] mb-8">
                    Our Mission
                </h2>
                <p className="font-sans text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
                    {missionText}
                </p>
            </section>

            {/* Values Section */}
            <section className="mb-20">
                <h2 className="font-serif text-3xl md:text-[40px] font-light leading-[1.2] tracking-[-0.02em] mb-12">
                    What We Believe
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {teamValues.map((value, index) => (
                        <div key={index} className="p-6 rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="font-sans text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                {value.title}
                            </h3>
                            <p className="font-sans text-gray-600 dark:text-gray-300 leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Vision Section */}
            <section className="mb-20">
                <h2 className="font-serif text-3xl md:text-[40px] font-light leading-[1.2] tracking-[-0.02em] mb-8">
                    The Future We're Building
                </h2>
                <div className="space-y-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p>
                        Imagine a world where your AI assistant knows you better than anyone else - your preferences, your goals, your quirks, and your dreams. It's not just a tool you use; it's a companion that grows with you.
                    </p>
                    <p>
                        This AI doesn't just answer questions or complete tasks. It understands context, anticipates your needs, and helps you become the best version of yourself. It's cute, it's personal, and it feels like it truly cares about you.
                    </p>
                    <p>
                        That's the future we're building at Ara Intelligence. A future where AI is everywhere, but it doesn't feel overwhelming or impersonal. Instead, it feels like having a thoughtful friend who's always there to help.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="mb-20 text-center">
                <h2 className="font-serif text-3xl md:text-[40px] font-light leading-[1.2] tracking-[-0.02em] mb-8">
                    Join Us
                </h2>
                <p className="font-sans text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                    We're always looking for passionate people who want to help build the future of AI. Whether you're a researcher, engineer, designer, or just someone who believes in our vision.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="mailto:zen@ara.computer"
                        className="inline-flex items-center px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium hover:scale-105 transition-transform"
                    >
                        Get in Touch
                    </a>
                    <a
                        href="/products"
                        className="inline-flex items-center px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 font-medium hover:scale-105 transition-transform"
                    >
                        See Our Work
                    </a>
                </div>
            </section>
        </main>
    );
} 