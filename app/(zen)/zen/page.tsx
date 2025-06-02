"use client";

import { init, InstaQLEntity } from "@instantdb/react";
import schema from "@/instant.schema";
import CurrentTaskInput from "./CurrentTaskInput";
import Schedule from "./Schedule";
import PomodoroTimer from "./PomodoroTimer";

const APP_ID = "7b2b718a-5c9d-42f1-8544-e36b80181c24";

type Pomodoro = InstaQLEntity<typeof schema, "pomodoros">;

const db = init({ appId: APP_ID, schema });

function App() {
    const { isLoading, error, data } = db.useQuery({ pomodoros: {} });

    if (isLoading) {
        return <div className="font-mono min-h-screen flex justify-center items-center">
            <div className="text-gray-400">Loading...</div>
        </div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">Error: {error.message}</div>;
    }

    const { pomodoros } = data;

    return (
        <div className="font-mono min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto space-y-8">
                <h1 className="text-4xl font-light text-gray-800 text-center">
                    Productivity Dashboard
                </h1>

                <CurrentTaskPomodoro pomodoros={pomodoros} />
                <Schedule pomodoros={pomodoros} />
            </div>
        </div>
    );
}

function CurrentTaskPomodoro({ pomodoros }: { pomodoros: Pomodoro[] }) {
    // Find active pomodoro (one that's started but not completed)
    const activePomodoro = pomodoros.find(p => p.startTime && !p.completed);

    if (activePomodoro) {
        return <PomodoroTimer pomodoro={activePomodoro} />;
    } else {
        return <CurrentTaskInput />;
    }
}

export default App;