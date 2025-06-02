"use client";
import { useState } from "react";
import { db, id } from "@/db/instant-client";

export default function CurrentTaskInput() {
    const [task, setTask] = useState("");

    const startPomodoro = (taskText: string) => {
        if (!taskText.trim()) return;

        db.transact(
            db.tx.pomodoros[id()].update({
                task: taskText,
                startTime: Date.now(),
                completed: false,
                createdAt: Date.now(),
            })
        );
        setTask("");
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    startPomodoro(task);
                }}
                className="space-y-4"
            >
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="What do you want to work on?"
                    className="w-full text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Start Working
                </button>
            </form>
        </div>
    );
}