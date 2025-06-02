"use client";

import { init, InstaQLEntity } from "@instantdb/react";
import schema from "@/instant.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const APP_ID = "7b2b718a-5c9d-42f1-8544-e36b80181c24";

type Pomodoro = InstaQLEntity<typeof schema, "pomodoros">;

const db = init({ appId: APP_ID, schema });

export default function WeekView() {
    const { isLoading, error, data } = db.useQuery({ pomodoros: {} });

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">
            <div className="text-gray-400">Loading...</div>
        </div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">Error: {error.message}</div>;
    }

    const { pomodoros } = data;

    // Get the last 7 days
    const weekData = getWeekData(pomodoros);
    const maxMinutes = Math.max(...weekData.map(d => d.minutes), 1);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-light text-gray-800 mb-2">Week Overview</h2>
                <p className="text-gray-600">Your productivity over the last 7 days</p>
            </div>

            {/* Weekly Bar Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Daily Productivity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {weekData.map((day, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-medium">{day.date}</span>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">{day.pomodoros} pomodoros</Badge>
                                        <span className="text-gray-600">{formatDuration(day.minutes)}</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${(day.minutes / maxMinutes) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Daily Activity Lists */}
            <div className="space-y-6">
                <h3 className="text-2xl font-light text-gray-800">Daily Activities</h3>
                {weekData.map((day, index) => (
                    <DayActivityCard key={index} day={day} />
                ))}
            </div>
        </div>
    );
}

function DayActivityCard({ day }: { day: any }) {
    if (day.tasks.length === 0) {
        return (
            <Card className="opacity-60">
                <CardHeader>
                    <CardTitle className="text-lg">{day.date}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-500 italic">No focused sessions recorded</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                    <span>{day.date}</span>
                    <div className="flex items-center gap-2">
                        <Badge>{day.pomodoros} sessions</Badge>
                        <Badge variant="outline">{formatDuration(day.minutes)}</Badge>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {day.tasks.map((task: any, idx: number) => (
                        <div key={idx}>
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{task.task}</span>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span>{formatDuration(task.totalMinutes)}</span>
                                    <Badge variant="secondary" className="text-xs">
                                        {task.sessions} sessions
                                    </Badge>
                                </div>
                            </div>
                            {idx < day.tasks.length - 1 && <Separator className="mt-3" />}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function getWeekData(pomodoros: Pomodoro[]) {
    const weekData = [];
    const today = new Date();

    for (let i = 0; i <= 6; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        date.setHours(0, 0, 0, 0);

        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);

        const dayPomodoros = pomodoros.filter(p => {
            const pomodoroDate = new Date(p.createdAt);
            return pomodoroDate >= date && pomodoroDate < nextDate && p.completed;
        });

        // Group by task
        const taskGroups: { [key: string]: { sessions: number; totalMinutes: number } } = {};
        dayPomodoros.forEach(p => {
            if (!taskGroups[p.task]) {
                taskGroups[p.task] = { sessions: 0, totalMinutes: 0 };
            }
            taskGroups[p.task].sessions++;
            taskGroups[p.task].totalMinutes += p.duration || 0;
        });

        const tasks = Object.entries(taskGroups).map(([task, data]) => ({
            task,
            sessions: data.sessions,
            totalMinutes: data.totalMinutes
        }));

        weekData.push({
            date: date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
            }),
            pomodoros: dayPomodoros.length,
            minutes: dayPomodoros.reduce((sum, p) => sum + (p.duration || 0), 0),
            tasks: tasks.sort((a, b) => b.totalMinutes - a.totalMinutes)
        });
    }

    return weekData;
}

function formatDuration(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    if (hours > 0) {
        return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
} 