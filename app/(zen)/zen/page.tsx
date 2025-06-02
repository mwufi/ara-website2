"use client";

import { id, i, init, InstaQLEntity } from "@instantdb/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Minus, Plus, Trash2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

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

function Schedule({ pomodoros }: { pomodoros: Pomodoro[] }) {
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

function PomodoroCard({
    pomodoro,
    index,
    onDelete,
    onUpdateTime,
    onResume
}: {
    pomodoro: Pomodoro;
    index: number;
    onDelete: () => void;
    onUpdateTime: (newDuration: number) => void;
    onResume: () => void;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editDuration, setEditDuration] = useState(pomodoro.duration || 25);

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    const getTimeFromStart = (startTime: number) => {
        const start = new Date(startTime);
        return start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleSaveTime = () => {
        onUpdateTime(editDuration);
        setIsDrawerOpen(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{
                duration: 0.3,
                delay: index * 0.1,
                exit: { duration: 0.2 }
            }}
            className="relative overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <div className="relative">
                    <DrawerTrigger asChild>
                        <motion.div
                            className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-lg cursor-pointer relative group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs opacity-75">
                                        {getTimeFromStart(pomodoro.startTime)}
                                    </span>
                                    <span className="text-xs opacity-75 font-mono">
                                        {formatTime(pomodoro.duration || 0)}
                                    </span>
                                </div>
                                <div className="font-medium text-sm line-clamp-2">
                                    {pomodoro.task}
                                </div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-white/40 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(100, ((pomodoro.duration || 0) / 60) * 100)}%` }}
                                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </DrawerTrigger>

                    {/* Action buttons that slide in from right */}
                    <motion.div
                        className="absolute top-2 right-2 flex space-x-1"
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            x: isHovered ? 0 : 30,
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Resume button with play icon */}
                        <motion.button
                            className="p-1 bg-green-500 rounded-full text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                onResume();
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Resume this task"
                        >
                            <Play className="w-3 h-3" fill="white" />
                        </motion.button>

                        {/* Delete button */}
                        <motion.button
                            className="p-1 bg-red-500 rounded-full text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Delete this session"
                        >
                            <X className="w-3 h-3" />
                        </motion.button>
                    </motion.div>
                </div>

                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Edit Work Session</DrawerTitle>
                            <DrawerDescription>
                                Adjust the duration of "{pomodoro.task}"
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0">
                            <div className="flex items-center justify-center space-x-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => setEditDuration(Math.max(5, editDuration - 5))}
                                    disabled={editDuration <= 5}
                                >
                                    <Minus className="w-4 h-4" />
                                </Button>
                                <div className="flex-1 text-center">
                                    <div className="text-6xl font-bold tracking-tighter">
                                        {editDuration}
                                    </div>
                                    <div className="text-muted-foreground text-xs uppercase">
                                        minutes
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => setEditDuration(Math.min(180, editDuration + 5))}
                                    disabled={editDuration >= 180}
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Quick presets:</span>
                                </div>
                                <div className="flex gap-2">
                                    {[15, 25, 45, 60].map((preset) => (
                                        <Button
                                            key={preset}
                                            variant={editDuration === preset ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setEditDuration(preset)}
                                            className="flex-1"
                                        >
                                            {preset}m
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <DrawerFooter>
                            <Button onClick={handleSaveTime}>Save Changes</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </motion.div>
    );
}

export default App;