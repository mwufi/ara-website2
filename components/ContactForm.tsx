'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import Paper from "@/components/Paper";
import { db, id } from "@/db/instant-client";

interface ContactFormProps {
    onBack: () => void;
}

export default function ContactForm({ onBack }: ContactFormProps) {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsSubmitting(true);
        try {
            await db.transact(
                db.tx.signups[id()].update({
                    email: email,
                    message: message,
                    createdAt: Date.now(),
                })
            );
            setSubmitted(true);
            setEmail("");
            setMessage("");
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setSubmitted(false);
        onBack();
    };

    if (submitted) {
        return (
            <Paper className="p-4 md:p-12" intensity={0.2}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="text-6xl mb-6">✅</div>
                    <h4 style={{ fontFamily: 'Instrument Serif, serif' }} className="text-4xl font-bold text-gray-900 mb-6">
                        Thank you!
                    </h4>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        You'll hear from me soon with updates on our progress. I'm excited to build the future of AI together!
                    </p>
                    <button
                        onClick={resetForm}
                        className="text-purple-600 hover:text-purple-700 underline text-lg"
                    >
                        ← Back to application
                    </button>
                </motion.div>
            </Paper>
        );
    }

    return (
        <Paper className="p-4 md:p-12" intensity={0.2}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                <h3 style={{ fontFamily: 'Instrument Serif, serif' }} className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-pink-600 bg-clip-text text-transparent text-center">
                    Stay Updated
                </h3>
                <p className="text-lg text-gray-700 text-center mb-8">
                    Leave an email to get updates from the founder
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full text-lg p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                    />
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Any thoughts or questions? (optional)"
                        className="w-full text-lg p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 resize-none"
                    />
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex-1 px-6 py-3 text-gray-600 hover:text-gray-700 underline text-lg"
                        >
                            ← Back
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 text-lg font-semibold"
                        >
                            {isSubmitting ? "Sending..." : "Send Updates"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </Paper>
    );
} 