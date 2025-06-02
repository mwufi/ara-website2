"use client";

import { init, InstaQLEntity } from "@instantdb/react";
import schema from "@/instant.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const APP_ID = "7b2b718a-5c9d-42f1-8544-e36b80181c24";

type Pomodoro = InstaQLEntity<typeof schema, "pomodoros">;

const db = init({ appId: APP_ID, schema });

export default function AllTimeView() {
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

    const completedPomodoros = pomodoros.filter(p => p.completed);
    const stats = calculateAllTimeStats(completedPomodoros);
    const monthlyData = getMonthlyData(completedPomodoros);
    const maxMinutes = Math.max(...monthlyData.map(d => d.minutes), 1);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-light text-gray-800 mb-2">All Time Statistics</h2>
                <p className="text-gray-600">Your complete productivity journey</p>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                {stats.totalSessions}
                            </div>
                            <div className="text-sm text-gray-500">Total Sessions</div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-2">
                                {formatDuration(stats.totalMinutes)}
                            </div>
                            <div className="text-sm text-gray-500">Total Time</div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 mb-2">
                                {formatDuration(stats.averageSession)}
                            </div>
                            <div className="text-sm text-gray-500">Avg Session</div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600 mb-2">
                                {stats.activeDays}
                            </div>
                            <div className="text-sm text-gray-500">Active Days</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly Productivity Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Productivity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {monthlyData.map((month, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-medium">{month.month}</span>
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline">{month.sessions} sessions</Badge>
                                        <Badge variant="secondary">{month.days} days</Badge>
                                        <span className="text-gray-600 font-medium">{formatDuration(month.minutes)}</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className="h-4 rounded-full transition-all duration-700 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"
                                        style={{ width: `${(month.minutes / maxMinutes) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Top Tasks */}
            <Card>
                <CardHeader>
                    <CardTitle>Most Focused Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {stats.topTasks.slice(0, 10).map((task, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        {index + 1}
                                    </div>
                                    <span className="font-medium">{task.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge>{task.sessions} sessions</Badge>
                                    <span className="font-bold text-gray-700">{formatDuration(task.minutes)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Productivity Insights */}
            <Card>
                <CardHeader>
                    <CardTitle>Insights</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2">Best Productive Day</h4>
                            <p className="text-gray-600">{stats.bestDay.day}</p>
                            <p className="text-sm text-gray-500">
                                {stats.bestDay.sessions} sessions, {formatDuration(stats.bestDay.minutes)}
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Consistency</h4>
                            <p className="text-gray-600">
                                Active {stats.activeDays} out of {stats.totalDays} days
                            </p>
                            <p className="text-sm text-gray-500">
                                {Math.round((stats.activeDays / stats.totalDays) * 100)}% consistency rate
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function calculateAllTimeStats(pomodoros: Pomodoro[]) {
    if (pomodoros.length === 0) {
        return {
            totalSessions: 0,
            totalMinutes: 0,
            averageSession: 0,
            activeDays: 0,
            totalDays: 1,
            topTasks: [],
            bestDay: { day: 'N/A', sessions: 0, minutes: 0 }
        };
    }

    const totalMinutes = pomodoros.reduce((sum, p) => sum + (p.duration || 0), 0);
    const averageSession = Math.round(totalMinutes / pomodoros.length);

    // Get unique days
    const days = new Set();
    const dailyStats: { [key: string]: { sessions: number; minutes: number } } = {};

    pomodoros.forEach(p => {
        const day = new Date(p.createdAt).toDateString();
        days.add(day);

        if (!dailyStats[day]) {
            dailyStats[day] = { sessions: 0, minutes: 0 };
        }
        dailyStats[day].sessions++;
        dailyStats[day].minutes += p.duration || 0;
    });

    // Find best day
    const bestDayEntry = Object.entries(dailyStats).reduce((best, [day, stats]) => {
        return stats.minutes > best.minutes ? { day, ...stats } : best;
    }, { day: 'N/A', sessions: 0, minutes: 0 });

    // Group by task
    const taskStats: { [key: string]: { sessions: number; minutes: number } } = {};
    pomodoros.forEach(p => {
        if (!taskStats[p.task]) {
            taskStats[p.task] = { sessions: 0, minutes: 0 };
        }
        taskStats[p.task].sessions++;
        taskStats[p.task].minutes += p.duration || 0;
    });

    const topTasks = Object.entries(taskStats)
        .map(([name, stats]) => ({ name, ...stats }))
        .sort((a, b) => b.minutes - a.minutes);

    // Calculate total days from first pomodoro to now
    const firstPomodoro = Math.min(...pomodoros.map(p => p.createdAt));
    const daysSinceFirst = Math.ceil((Date.now() - firstPomodoro) / (1000 * 60 * 60 * 24));

    return {
        totalSessions: pomodoros.length,
        totalMinutes,
        averageSession,
        activeDays: days.size,
        totalDays: Math.max(daysSinceFirst, 1),
        topTasks,
        bestDay: {
            day: bestDayEntry.day === 'N/A' ? 'N/A' : new Date(bestDayEntry.day).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            sessions: bestDayEntry.sessions,
            minutes: bestDayEntry.minutes
        }
    };
}

function getMonthlyData(pomodoros: Pomodoro[]) {
    const monthlyStats: { [key: string]: { sessions: number; minutes: number; days: Set<string> } } = {};

    pomodoros.forEach(p => {
        const date = new Date(p.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const dayKey = date.toDateString();

        if (!monthlyStats[monthKey]) {
            monthlyStats[monthKey] = { sessions: 0, minutes: 0, days: new Set() };
        }

        monthlyStats[monthKey].sessions++;
        monthlyStats[monthKey].minutes += p.duration || 0;
        monthlyStats[monthKey].days.add(dayKey);
    });

    return Object.entries(monthlyStats)
        .map(([monthKey, stats]) => {
            const [year, month] = monthKey.split('-');
            const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
            });

            return {
                month: monthName,
                sessions: stats.sessions,
                minutes: stats.minutes,
                days: stats.days.size
            };
        })
        .sort((a, b) => a.month.localeCompare(b.month))
        .slice(-12); // Last 12 months
}

function formatDuration(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    if (hours > 0) {
        return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
} 