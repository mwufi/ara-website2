"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SubscribeForUpdates() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);

        // Simulate API call - replace with actual implementation
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitted(true);
        setIsLoading(false);
        setEmail("");
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-8 text-center"
            >
                <div className="text-green-600 dark:text-green-400 text-2xl mb-2">✓</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Thanks for subscribing!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                    You'll be the first to know about our latest updates and AI innovations.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-8">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Stay Updated
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Get the latest updates on AI innovations, new product releases, and industry insights.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex gap-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            "Subscribe"
                        )}
                    </motion.button>
                </div>
            </form>
        </div>
    );
} 