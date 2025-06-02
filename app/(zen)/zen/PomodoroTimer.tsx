"use client";

import { db } from "@/db/instant-client";
import { InstaQLEntity } from "@instantdb/react";
import schema from "@/instant.schema";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Pomodoro = InstaQLEntity<typeof schema, "pomodoros">;

export default function PomodoroTimer({ pomodoro }: { pomodoro: Pomodoro }) {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [targetDuration, setTargetDuration] = useState(25); // default 25 minutes

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = (Date.now() - pomodoro.startTime) / 1000; // seconds
            setTimeElapsed(elapsed);
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, [pomodoro.startTime]);

    const completePomodoro = () => {
        const endTime = Date.now();
        const duration = Math.floor((endTime - pomodoro.startTime) / 60000);

        db.transact(
            db.tx.pomodoros[pomodoro.id].update({
                endTime,
                duration,
                completed: true,
            })
        );
    };

    const cancelPomodoro = () => {
        db.transact(db.tx.pomodoros[pomodoro.id].delete());
    };

    const timeInMinutes = timeElapsed / 60;
    const progressPercentage = Math.min(100, (timeInMinutes / targetDuration) * 100);
    const isOvertime = timeInMinutes > targetDuration;

    const formatTimerDisplay = (seconds: number) => {
        const totalMinutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getTimerColor = () => {
        if (isOvertime) return "from-orange-400 to-red-500";
        if (progressPercentage > 80) return "from-yellow-400 to-orange-500";
        return "from-blue-400 to-blue-600";
    };

    return (
        <motion.div
            className="bg-white rounded-lg p-6 shadow-sm border overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="text-center space-y-6">
                <motion.h2
                    className="text-xl font-medium text-gray-800"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    Working on: <span className="text-blue-600">{pomodoro.task}</span>
                </motion.h2>

                {/* Interactive Timer Display */}
                <div className="relative">
                    <motion.div
                        className={`bg-gradient-to-r ${getTimerColor()} text-white rounded-2xl p-8 relative overflow-hidden`}
                        animate={{
                            scale: [1, 1.02, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                        </div>

                        <div className="relative z-10 space-y-4">
                            <motion.div
                                className="text-6xl font-light tracking-wider font-mono"
                                key={Math.floor(timeElapsed)} // Re-trigger animation when seconds change
                                initial={{ scale: 1.02, opacity: 0.8 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.1 }}
                            >
                                {formatTimerDisplay(timeElapsed)}
                            </motion.div>

                            <div className="text-sm opacity-90">
                                {isOvertime ?
                                    `+${Math.floor(timeInMinutes - targetDuration)} min overtime` :
                                    `${Math.floor(targetDuration - timeInMinutes)} min remaining`
                                }
                            </div>

                            {/* Progress Bar */}
                            <div className="relative">
                                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-white/60 rounded-full relative overflow-hidden"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPercentage}%` }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    >
                                        {/* Shimmer effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                            animate={{ x: ["-100%", "100%"] }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        />
                                    </motion.div>
                                </div>
                                <div className="text-xs mt-1 opacity-75">
                                    {Math.round(progressPercentage)}% complete
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Target Duration Selector */}
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <span>Target:</span>
                    {[15, 25, 45, 60].map((duration) => (
                        <button
                            key={duration}
                            onClick={() => setTargetDuration(duration)}
                            className={`px-3 py-1 rounded-full transition-colors ${targetDuration === duration
                                ? 'bg-blue-100 text-blue-700'
                                : 'hover:bg-gray-100'
                                }`}
                        >
                            {duration}m
                        </button>
                    ))}
                </div>

                {/* Action Buttons */}
                <motion.div
                    className="flex space-x-4 justify-center"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Button
                        onClick={completePomodoro}
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                        Complete Session
                    </Button>
                    <Button
                        onClick={cancelPomodoro}
                        variant="outline"
                        className="px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                        Cancel
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}