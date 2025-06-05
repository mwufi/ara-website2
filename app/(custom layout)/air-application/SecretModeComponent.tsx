'use client'

import { motion } from "framer-motion";
import Image from "next/image";
import Paper from "@/components/Paper";
import TactileButton from "@/components/TactileButton";

export default function SecretModeContent() {
    return (
        <div className="min-h-full">
            {/* Header with Mountains Background */}
            <div
                className="relative h-[60vh] bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/mountains_background.png)'
                }}
            >
                {/* Narrow gradient overlay at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-100 to-transparent"></div>

                {/* Header content */}
                <div className="relative z-10 px-8 pt-8 pb-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 style={{ fontFamily: 'Instrument Serif, serif' }} className="text-4xl font-bold text-white drop-shadow-lg">
                            AIR Residency Application
                        </h1>
                        <p className="text-white/90 mt-2 drop-shadow">The real story behind MailPuppy</p>
                    </motion.div>
                </div>

                {/* Hero Section - positioned over the image */}
                <div className="relative z-10 px-8 py-8 text-center flex flex-col justify-center h-[30vh]">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ fontFamily: 'Instrument Serif, serif' }}
                        className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg leading-tight"
                    >
                        The Future is<br />
                        Conversational
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-xl text-white font-bold max-w-2xl mx-auto leading-relaxed drop-shadow"
                    >
                        We're crafting the first AI companion that truly understands your digital life.
                    </motion.p>
                </div>
            </div>

            {/* Content on Light Background */}
            <div className="bg-white">
                {/* Story Sections */}
                <div className="space-y-32 px-8 py-32">
                    {/* Vision Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <h3 style={{ fontFamily: 'Instrument Serif, serif' }} className="text-4xl font-bold mb-6 text-gray-900">
                                Why MailPuppy?
                            </h3>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                MailPuppy is a bet that a real AI companion would know about your preferences, your communication style, and your relationships. So why not start with the inbox?
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                To make it genuinely delightful, we're committed to designing & building the most intuitive personal AI. Not only the best frontend, but the best AI UX -- how it stores memory, how it reminds you, and how you can customize its behavior. Building the best product experience: a novel everyday tool that you can make yours, like an unassuming yet powerful iPhone.
                            </p>
                        </div>
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 1.0 }}
                                className="w-full h-80 rounded-3xl flex items-center justify-center shadow-lg overflow-hidden"
                            >
                                <Image
                                    src="/mailpuppy.png"
                                    alt="MailPuppy Logo"
                                    width={320}
                                    height={320}
                                    className="object-contain"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Technology Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div className="order-2 md:order-1 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                                className="w-full h-64 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl border border-gray-200 flex items-center justify-center shadow-lg"
                            >
                                <div className="text-6xl">⚡</div>
                            </motion.div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h3 style={{ fontFamily: 'Instrument Serif, serif' }} className="text-4xl font-bold mb-6 text-gray-900">
                                Technical Excellence
                            </h3>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                We're building a multi-platform ecosystem: Gmail integration, a polished web app,
                                and a thoughtful mobile companion - in the service of dependability. One day, you can say, "Hey Jarvis, did I forget this?" and it'll answer back.
                            </p>
                            <div className="space-y-3">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 1.4 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                    <span className="text-gray-600">Agentic AI Architecture</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 1.5 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                    <span className="text-gray-600">Background Knowledge</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 1.6 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                    <span className="text-gray-600">Proactive AI UX</span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Ambition Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h3 style={{ fontFamily: 'Instrument Serif, serif' }} className="text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-cyan-600 bg-clip-text text-transparent">
                            Our 6-Month Vision
                        </h3>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-3xl p-8 shadow-lg"
                        >
                            <p className="text-xl text-gray-700 leading-relaxed mb-6">
                                By December 2024, we'll have 4,000 paid users generating over $1M ARR.
                                We're not just competing with ChatGPT—we're creating an entirely new category of AI companions.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our community will have access to customizable Ara skills, and we'll have launched
                                the foundations for an AI companion ecosystem. Think App Store, but for AI personalities and capabilities.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Team Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <h3 style={{ fontFamily: 'Instrument Serif, serif' }} className="text-4xl font-bold mb-8 text-gray-900">
                            Meet the Builder
                        </h3>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 1.6 }}
                            className="flex items-center justify-center gap-6 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-3xl p-8 shadow-lg"
                        >
                            <img
                                src="https://pbs.twimg.com/profile_images/1930088119983886336/CPTJhZJr_400x400.jpg"
                                alt="Zen's profile"
                                className="w-20 h-20 rounded-full border-2 border-gray-300"
                            />
                            <div className="text-left">
                                <h4 className="text-xl font-semibold text-gray-900 mb-1">Zen</h4>
                                <p className="text-gray-600 mb-2">Currently building an Ara</p>
                                <p className="text-sm text-gray-500">Former TikTok Engineer</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <Paper className="p-12" intensity={0.2}>
                            <h3 style={{ fontFamily: 'Instrument Serif, serif' }} className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-pink-600 bg-clip-text text-transparent text-center">
                                Why AIR? Why Now?
                            </h3>
                            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
                                The best products aren't going to look like ChatGPT with email bolted on, but something entirely different, and personal. AIR understands that the future of AI
                                isn't just about capability, but about creating experiences that feel magical, personal, and human.
                            </p>
                            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
                                I'm excited about AIR because I care about human-centric AI. Everyone wants a personal assistant, but what that looks like in practice is still to-be-built. With AIR, we have a good chance at building something that feels like a real friend.
                            </p>
                        </Paper>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <TactileButton className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow">
                            <span>Let's build the future together</span>
                            <span>🚀</span>
                        </TactileButton>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}