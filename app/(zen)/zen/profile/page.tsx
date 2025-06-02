"use client";

import { init, InstaQLEntity } from "@instantdb/react";
import schema from "@/instant.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const APP_ID = "7b2b718a-5c9d-42f1-8544-e36b80181c24";

type Pomodoro = InstaQLEntity<typeof schema, "pomodoros">;

const db = init({ appId: APP_ID, schema });

export default function ProfilePage() {
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
    const profileStats = calculateProfileStats(completedPomodoros);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-light text-gray-800 mb-2">Profile</h2>
                <p className="text-gray-600">Your productivity profile and achievements</p>
            </div>

            {/* Profile Header */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src="" alt="Profile" />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold">
                                ZN
                            </AvatarFallback>
                        </Avatar>

                        <div className="text-center md:text-left flex-1">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Zen User</h3>
                            <p className="text-gray-600 mb-4">Productivity enthusiast since {profileStats.memberSince}</p>

                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {profileStats.badges.map((badge, index) => (
                                    <Badge key={index} variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                                        {badge}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                                {profileStats.level}
                            </div>
                            <div className="text-sm text-gray-500">Level</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                            {profileStats.totalSessions}
                        </div>
                        <div className="text-sm text-gray-500">Total Sessions</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                            {Math.round(profileStats.totalHours)}h
                        </div>
                        <div className="text-sm text-gray-500">Total Hours</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                            {profileStats.streak}
                        </div>
                        <div className="text-sm text-gray-500">Day Streak</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold text-orange-600 mb-1">
                            {profileStats.activeDays}
                        </div>
                        <div className="text-sm text-gray-500">Active Days</div>
                    </CardContent>
                </Card>
            </div>

            {/* Achievements */}
            <Card>
                <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {profileStats.achievements.map((achievement, index) => (
                            <div key={index} className={`p-4 rounded-lg border-2 ${achievement.earned ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                                        {achievement.icon}
                                    </div>
                                    <div>
                                        <h4 className={`font-semibold ${achievement.earned ? 'text-yellow-800' : 'text-gray-500'}`}>
                                            {achievement.title}
                                        </h4>
                                        <p className={`text-sm ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`}>
                                            {achievement.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {profileStats.recentSessions.map((session, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="font-medium">{session.task}</span>
                                        <p className="text-sm text-gray-500">{session.date}</p>
                                    </div>
                                    <Badge variant="outline">
                                        {Math.round(session.duration || 0)}m
                                    </Badge>
                                </div>
                                {index < profileStats.recentSessions.length - 1 && <Separator className="mt-4" />}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold">Default Pomodoro Duration</h4>
                            <p className="text-sm text-gray-500">Default time for focus sessions</p>
                        </div>
                        <Button variant="outline">25 minutes</Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold">Daily Goal</h4>
                            <p className="text-sm text-gray-500">Target pomodoros per day</p>
                        </div>
                        <Button variant="outline">8 sessions</Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold">Notifications</h4>
                            <p className="text-sm text-gray-500">Get reminders and updates</p>
                        </div>
                        <Button variant="outline">Enabled</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function calculateProfileStats(pomodoros: Pomodoro[]) {
    const totalSessions = pomodoros.length;
    const totalMinutes = pomodoros.reduce((sum, p) => sum + (p.duration || 0), 0);
    const totalHours = totalMinutes / 60;

    // Calculate level based on total sessions
    const level = Math.floor(totalSessions / 10) + 1;

    // Get member since date
    const firstSession = pomodoros.length > 0 ? Math.min(...pomodoros.map(p => p.createdAt)) : Date.now();
    const memberSince = new Date(firstSession).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });

    // Calculate streak and active days
    const uniqueDays = new Set();
    pomodoros.forEach(p => {
        const day = new Date(p.createdAt).toDateString();
        uniqueDays.add(day);
    });

    // Simple streak calculation (consecutive days from today backwards)
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dateString = checkDate.toDateString();

        if (uniqueDays.has(dateString)) {
            if (i === 0 || streak > 0) {
                streak++;
            }
        } else if (i === 0) {
            // If today has no sessions, check yesterday
            continue;
        } else {
            break;
        }
    }

    // Generate badges
    const badges = [];
    if (level >= 5) badges.push("🔥 Dedicated");
    if (totalSessions >= 50) badges.push("💯 Century");
    if (streak >= 7) badges.push("⚡ Streak Master");
    if (totalHours >= 100) badges.push("🏆 Time Master");
    if (badges.length === 0) badges.push("🌱 Getting Started");

    // Generate achievements
    const achievements = [
        {
            title: "First Steps",
            description: "Complete your first pomodoro session",
            icon: "🎯",
            earned: totalSessions >= 1
        },
        {
            title: "Early Bird",
            description: "Complete 10 pomodoro sessions",
            icon: "🐦",
            earned: totalSessions >= 10
        },
        {
            title: "Dedicated Learner",
            description: "Complete 50 pomodoro sessions",
            icon: "📚",
            earned: totalSessions >= 50
        },
        {
            title: "Century Club",
            description: "Complete 100 pomodoro sessions",
            icon: "💯",
            earned: totalSessions >= 100
        },
        {
            title: "Streak Starter",
            description: "Maintain a 3-day streak",
            icon: "🔥",
            earned: streak >= 3
        },
        {
            title: "Week Warrior",
            description: "Maintain a 7-day streak",
            icon: "⚡",
            earned: streak >= 7
        }
    ];

    // Recent sessions (last 5)
    const recentSessions = pomodoros
        .slice(-5)
        .reverse()
        .map(session => ({
            task: session.task,
            duration: session.duration,
            date: new Date(session.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        }));

    return {
        totalSessions,
        totalHours,
        level,
        memberSince,
        streak,
        activeDays: uniqueDays.size,
        badges,
        achievements,
        recentSessions
    };
} 