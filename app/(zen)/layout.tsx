"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ZenLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Extract the current tab from pathname
    const currentTab = pathname === "/zen" ? "today" :
        pathname.includes("/week") ? "week" :
            pathname.includes("/all-time") ? "all-time" : "today";

    // Calculate time remaining in work day
    const getTimeRemaining = () => {
        const now = currentTime;
        const endOfDay = new Date(now);
        endOfDay.setHours(22, 0, 0, 0); // 10 PM end

        const remainingMs = endOfDay.getTime() - now.getTime();
        if (remainingMs <= 0) return "Day ended";

        const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

        if (remainingHours > 0) {
            return `${remainingHours}h ${remainingMinutes}m left`;
        }
        return `${remainingMinutes}m left`;
    };

    return (
        <div className="font-mono h-screen bg-gray-50 flex flex-col">
            {/* Header Navigation */}
            <div className="border-b bg-white shadow-sm flex-shrink-0">
                <div className="max-w-6xl mx-auto px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-light text-gray-800">
                            Productivity Dashboard
                        </h1>

                        <div className="flex items-center gap-6">
                            {/* Navigation Tabs */}
                            <Tabs value={currentTab} className="w-auto">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="today" asChild>
                                        <Link href="/zen" className="flex items-center gap-2">Today
                                        </Link>
                                    </TabsTrigger>
                                    <TabsTrigger value="week" asChild>
                                        <Link href="/zen/week">Week</Link>
                                    </TabsTrigger>
                                    <TabsTrigger value="all-time" asChild>
                                        <Link href="/zen/all-time">All Time</Link>
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>

                            {/* Profile Avatar */}
                            <Link href="/zen/profile">
                                <Avatar className="cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all">
                                    <AvatarImage src="" alt="Profile" />
                                    <AvatarFallback className="bg-gray-200 text-gray-600">
                                        ZN
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Page Content */}
            <div className="flex-1 min-h-0">
                {pathname === "/zen" ? (
                    // Full screen layout for Today view
                    <div className="h-full px-8 py-6">
                        {children}
                    </div>
                ) : (
                    // Normal layout for other views
                    <div className="max-w-6xl mx-auto p-8">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
} 