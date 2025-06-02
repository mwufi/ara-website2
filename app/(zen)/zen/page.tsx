"use client";

import { init, InstaQLEntity } from "@instantdb/react";
import schema from "@/instant.schema";
import CurrentTaskInput from "./CurrentTaskInput";
import Schedule from "./Schedule";
import PomodoroTimer from "./PomodoroTimer";
import NotesTimeline from "./NotesTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const APP_ID = "7b2b718a-5c9d-42f1-8544-e36b80181c24";

type Pomodoro = InstaQLEntity<typeof schema, "pomodoros">;

const db = init({ appId: APP_ID, schema });

function App() {
    const { isLoading, error, data } = db.useQuery({ pomodoros: {} });
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">
            <div className="text-gray-400">Loading...</div>
        </div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">Error: {error.message}</div>;
    }

    const { pomodoros } = data;

    // Calculate today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayPomodoros = pomodoros.filter(p => {
        const pomodoroDate = new Date(p.createdAt);
        pomodoroDate.setHours(0, 0, 0, 0);
        return pomodoroDate.getTime() === today.getTime() && p.completed;
    });

    const totalMinutesToday = todayPomodoros.reduce((sum, p) => sum + (p.duration || 0), 0);

    return (
        <div className="h-screen flex flex-col">
            {/* Today Overview - Full Width */}
            <div className="mb-6">
                <TodayOverview
                    currentTime={currentTime}
                    totalMinutesToday={totalMinutesToday}
                    completedPomodoros={todayPomodoros.length}
                />
            </div>

            {/* 2-Panel Layout */}
            <div className="flex-1 grid grid-cols-5 gap-6 min-h-0">
                {/* Left Panel - Main Content */}
                <div className="col-span-3 space-y-6 overflow-y-auto">
                    <CurrentTaskPomodoro pomodoros={pomodoros} />
                    <Schedule pomodoros={pomodoros} />
                </div>

                {/* Right Panel - Notes Timeline */}
                <div className="col-span-2 overflow-y-auto">
                    <NotesTimeline />
                </div>
            </div>
        </div>
    );
}

function TodayOverview({
    currentTime,
    totalMinutesToday,
    completedPomodoros
}: {
    currentTime: Date;
    totalMinutesToday: number;
    completedPomodoros: number;
}) {
    const now = currentTime;
    const startOfDay = new Date(now);
    startOfDay.setHours(9, 0, 0, 0); // 9 AM start
    const endOfDay = new Date(now);
    endOfDay.setHours(22, 0, 0, 0); // 10 PM end

    const totalDayMinutes = (endOfDay.getTime() - startOfDay.getTime()) / (1000 * 60);
    const elapsedMinutes = Math.max(0, (now.getTime() - startOfDay.getTime()) / (1000 * 60));
    const remainingMinutes = Math.max(0, totalDayMinutes - elapsedMinutes);

    const dayProgress = Math.min(100, (elapsedMinutes / totalDayMinutes) * 100);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = Math.floor(minutes % 60);
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Today Overview</span>
                    <Badge variant="outline" className="text-lg px-3 py-1">
                        {formatTime(currentTime)}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{completedPomodoros}</div>
                        <div className="text-sm text-gray-500">Pomodoros</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{formatDuration(totalMinutesToday)}</div>
                        <div className="text-sm text-gray-500">Focused Time</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{formatDuration(remainingMinutes)}</div>
                        <div className="text-sm text-gray-500">Remaining</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{Math.round(dayProgress)}%</div>
                        <div className="text-sm text-gray-500">Day Progress</div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Day Progress ({formatTime(startOfDay)} - {formatTime(endOfDay)})</span>
                        <span>{Math.round(dayProgress)}%</span>
                    </div>
                    <Progress value={dayProgress} className="h-2" />
                </div>
            </CardContent>
        </Card>
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