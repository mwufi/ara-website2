import { motion } from "framer-motion";

// Secret Mode Content Component
export default function SecretModeContent() {
    return (
        <div className="min-h-full text-white">
            {/* Header */}
            <div className="px-8 pt-8 pb-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h1 style={{ fontFamily: 'Instrument Serif, serif' }} className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        AIR Residency Application
                    </h1>
                    <p className="text-purple-200 mt-2">The real story behind MailPuppy</p>
                </motion.div>
            </div>

            {/* Hero Section */}
            <div className="px-8 py-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ fontFamily: 'Instrument Serif, serif' }}
                    className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight"
                >
                    The Future is<br />
                    Conversational
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed"
                >
                    We're not just building another AI assistant. We're crafting the first AI companion that truly understands your digital life and acts on your behalf with grace, intelligence, and personality.
                </motion.p>
            </div>

            {/* Story Sections */}
            <div className="space-y-32 px-8 pb-32">
                {/* Vision Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
                >
                    <div>
                        <h3 style={{ fontFamily: 'Instrument Serif, serif' }} className="text-4xl font-bold mb-6 text-white">
                            Why MailPuppy?
                        </h3>
                        <p className="text-lg text-purple-100 leading-relaxed mb-6">
                            Email is broken. We spend hours crafting messages, waiting for responses, and managing our digital relationships.
                            What if your inbox had a delightful companion that could handle all of this seamlessly?
                        </p>
                        <p className="text-lg text-purple-100 leading-relaxed">
                            MailPuppy isn't just an email client—it's your digital familiar, learning your communication style,
                            understanding context, and taking action with the warmth and intelligence of a beloved pet.
                        </p>
                    </div>
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                            className="w-full h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center"
                        >
                            <div className="text-6xl">🐶</div>
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
                            className="w-full h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center"
                        >
                            <div className="text-6xl">⚡</div>
                        </motion.div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h3 style={{ fontFamily: 'Instrument Serif, serif' }} className="text-4xl font-bold mb-6 text-white">
                            Technical Excellence
                        </h3>
                        <p className="text-lg text-purple-100 leading-relaxed mb-6">
                            We're building a multi-platform ecosystem: Gmail integration, standalone web app,
                            and mobile companion. Our backend combines state-of-the-art LLMs with custom training
                            on communication patterns.
                        </p>
                        <div className="space-y-3">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 1.4 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                <span className="text-purple-200">Agentic AI Architecture</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 1.5 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                <span className="text-purple-200">Multi-platform Integration</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 1.6 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                <span className="text-purple-200">Personalized Learning Models</span>
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
                    <h3 style={{ fontFamily: 'Instrument Serif, serif' }} className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                        Our 6-Month Vision
                    </h3>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                        className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8"
                    >
                        <p className="text-xl text-purple-100 leading-relaxed mb-6">
                            By December 2024, we'll have 4,000 paid users generating over $1M ARR.
                            We're not just competing with ChatGPT—we're creating an entirely new category of AI companions.
                        </p>
                        <p className="text-lg text-purple-100 leading-relaxed">
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
                    <h3 style={{ fontFamily: 'Instrument Serif, serif' }} className="text-4xl font-bold mb-8 text-white">
                        Meet the Builder
                    </h3>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1.6 }}
                        className="flex items-center justify-center gap-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8"
                    >
                        <img
                            src="https://pbs.twimg.com/profile_images/1930088119983886336/CPTJhZJr_400x400.jpg"
                            alt="Zen's profile"
                            className="w-20 h-20 rounded-full border-2 border-white/30"
                        />
                        <div className="text-left">
                            <h4 className="text-xl font-semibold text-white mb-1">Zen</h4>
                            <p className="text-purple-200 mb-2">Currently building an Ara</p>
                            <p className="text-sm text-purple-300">Former TikTok Engineer</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    className="text-center"
                >
                    <h3 style={{ fontFamily: 'Instrument Serif, serif' }} className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                        Why AIR? Why Now?
                    </h3>
                    <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed mb-8">
                        Design isn't just aesthetics—it's empathy made visible. AIR understands that the future of AI
                        isn't just about capability, but about creating experiences that feel magical, personal, and human.
                    </p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.8 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold"
                    >
                        <span>Let's build the future together</span>
                        <span>🚀</span>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}