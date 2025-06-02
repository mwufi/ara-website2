"use client";

import { InstaQLEntity } from "@instantdb/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { X, Minus, Plus, Play } from "lucide-react";
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
import schema from "@/instant.schema";

type Pomodoro = InstaQLEntity<typeof schema, "pomodoros">;
        
export default function PomodoroCard({
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