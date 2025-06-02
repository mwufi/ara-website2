"use client";

import { motion, AnimatePresence } from "framer-motion";
import { InstaQLEntity, id } from "@instantdb/react";
import schema from "@/instant.schema";
import { db } from "@/db/instant-client";
import { Clock } from "lucide-react";
import PomodoroCard from "./PomodoroCard";

type Pomodoro = InstaQLEntity<typeof schema, "pomodoros">;

export default function Schedule({ pomodoros }: { pomodoros: Pomodoro[] }) {
    // Get today's completed pomodoros
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).getTime();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).getTime();

    const todaysPomodoros = pomodoros.filter(p =>
        p.completed &&
        p.startTime >= startOfDay &&
        p.startTime <= endOfDay
    ).sort((a, b) => a.startTime - b.startTime);

    const deletePomodoro = (pomodoroId: string) => {
        db.transact(db.tx.pomodoros[pomodoroId].delete());
    };

    const updatePomodoroTime = (pomodoroId: string, newDuration: number) => {
        db.transact(db.tx.pomodoros[pomodoroId].update({ duration: newDuration }));
    };

    const resumePomodoro = (task: string) => {
        // First, complete any active pomodoro
        const activePomodoro = pomodoros.find(p => p.startTime && !p.completed);
        if (activePomodoro) {
            const endTime = Date.now();
            const duration = Math.floor((endTime - activePomodoro.startTime) / 60000);
            db.transact(
                db.tx.pomodoros[activePomodoro.id].update({
                    endTime,
                    duration,
                    completed: true,
                })
            );
        }

        // Then start a new pomodoro with the same task
        db.transact(
            db.tx.pomodoros[id()].update({
                task: task,
                startTime: Date.now(),
                completed: false,
                createdAt: Date.now(),
            })
        );
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-medium text-gray-800 mb-6">Today's Work Sessions</h2>

            {todaysPomodoros.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No work sessions completed today</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <AnimatePresence>
                            {todaysPomodoros.map((pomodoro, index) => (
                                <PomodoroCard
                                    key={pomodoro.id}
                                    pomodoro={pomodoro}
                                    index={index}
                                    onDelete={() => deletePomodoro(pomodoro.id)}
                                    onUpdateTime={(newDuration) => updatePomodoroTime(pomodoro.id, newDuration)}
                                    onResume={() => resumePomodoro(pomodoro.task)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    <motion.div
                        className="p-4 bg-blue-50 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="text-sm text-blue-800 flex items-center justify-between">
                            <span>Total productive time today:</span>
                            <span className="font-bold text-lg">
                                {todaysPomodoros.reduce((sum, p) => sum + (p.duration || 0), 0)} minutes
                            </span>
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
}