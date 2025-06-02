"use client";

import { id, i, init, InstaQLEntity } from "@instantdb/react";
import { useState, useEffect } from "react";

// ID for app: medipass
const APP_ID = "7b2b718a-5c9d-42f1-8544-e36b80181c24";

// Updated schema for pomodoros
const schema = i.schema({
    entities: {
        pomodoros: i.entity({
            task: i.string(),
            startTime: i.number(),
            endTime: i.number().optional(),
            duration: i.number().optional(), // in minutes
            completed: i.boolean(),
            createdAt: i.number(),
        }),
    },
});

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

// Components
// ----------

function CurrentTaskPomodoro({ pomodoros }: { pomodoros: Pomodoro[] }) {
    // Find active pomodoro (one that's started but not completed)
    const activePomodoro = pomodoros.find(p => p.startTime && !p.completed);

    if (activePomodoro) {
        return <PomodoroTimer pomodoro={activePomodoro} />;
    } else {
        return <CurrentTaskInput />;
    }
}

function CurrentTaskInput() {
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

function PomodoroTimer({ pomodoro }: { pomodoro: Pomodoro }) {
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - pomodoro.startTime) / 60000); // minutes
            setTimeElapsed(elapsed);
        }, 1000);

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

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="text-center space-y-4">
                <h2 className="text-xl font-medium text-gray-800">
                    Working on: {pomodoro.task}
                </h2>
                <div className="text-4xl font-light text-blue-600">
                    {timeElapsed} min
                </div>
                <div className="flex space-x-4 justify-center">
                    <button
                        onClick={completePomodoro}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Complete
                    </button>
                    <button
                        onClick={cancelPomodoro}
                        className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

function Schedule({ pomodoros }: { pomodoros: Pomodoro[] }) {
    // Get today's completed pomodoros
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).getTime();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).getTime();

    const todaysPomodoros = pomodoros.filter(p =>
        p.completed &&
        p.startTime >= startOfDay &&
        p.startTime <= endOfDay
    );

    // Create timeline from 9am to 9pm (12 hours)
    const timeSlots = Array.from({ length: 24 }, (_, i) => {
        const hour = 9 + (i * 0.5);
        const displayHour = Math.floor(hour);
        const displayMinute = (hour % 1) * 60;
        const timeString = `${displayHour.toString().padStart(2, '0')}:${displayMinute.toString().padStart(2, '0')}`;

        const slotStart = new Date();
        slotStart.setHours(displayHour, displayMinute, 0, 0);
        const slotStartTime = slotStart.getTime();

        const slotEnd = new Date(slotStartTime + 30 * 60 * 1000); // 30 minutes later

        // Find pomodoro that overlaps with this time slot
        const overlappingPomodoro = todaysPomodoros.find(p => {
            const pomStart = p.startTime;
            const pomEnd = p.endTime || Date.now();
            return pomStart < slotEnd.getTime() && pomEnd > slotStartTime;
        });

        return {
            time: timeString,
            pomodoro: overlappingPomodoro,
            height: overlappingPomodoro ? Math.min(60, (overlappingPomodoro.duration || 30)) : 20,
        };
    });

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Today's Schedule</h2>
            <div className="space-y-1">
                {timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center">
                        <div className="w-16 text-sm text-gray-500 font-mono">
                            {slot.time}
                        </div>
                        <div
                            className={`ml-4 rounded transition-all ${slot.pomodoro
                                ? 'bg-blue-400 text-white px-3 py-1'
                                : 'bg-gray-100 border-l-2 border-gray-300'
                                }`}
                            style={{
                                height: `${slot.height}px`,
                                minWidth: slot.pomodoro ? '200px' : '100px'
                            }}
                        >
                            {slot.pomodoro && (
                                <div className="text-sm">
                                    {slot.pomodoro.task} ({slot.pomodoro.duration}min)
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {todaysPomodoros.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-800">
                        Total productive time today: {todaysPomodoros.reduce((sum, p) => sum + (p.duration || 0), 0)} minutes
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;