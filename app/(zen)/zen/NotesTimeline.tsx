"use client";

import { useState, useEffect } from "react";
import { init, InstaQLEntity } from "@instantdb/react";
import schema from "@/instant.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { v4 as uuidv4 } from 'uuid';

const APP_ID = "7b2b718a-5c9d-42f1-8544-e36b80181c24";

type Note = InstaQLEntity<typeof schema, "notes">;

const db = init({ appId: APP_ID, schema });

export default function NotesTimeline() {
    const [newNote, setNewNote] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    // Helper function to get today's date in local timezone
    const getTodayLocal = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const today = getTodayLocal();

    const { isLoading, error, data } = db.useQuery({
        notes: {
            $: {
                where: {
                    date: today
                },
                order: {
                    createdAt: "desc"
                }
            }
        }
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const todayNotes = data?.notes || [];

    const addNote = () => {
        if (newNote.trim()) {
            const noteId = uuidv4();
            db.transact([
                db.tx.notes[noteId].update({
                    content: newNote.trim(),
                    date: today,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                })
            ]);
            setNewNote("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            addNote();
        }
    };

    const formatTime = (timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDateHeader = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (error) {
        console.error("Notes timeline error:", error);
    }

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center justify-between">
                    <div>
                        <span>📝 Daily Timeline</span>
                        <p className="text-sm font-normal text-gray-500 mt-1">
                            {formatDateHeader(currentTime)}
                        </p>
                    </div>
                    <Badge variant="outline">
                        {formatTime(currentTime.getTime())}
                    </Badge>
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col space-y-4 min-h-0">
                {/* Add New Note */}
                <div className="flex-shrink-0 space-y-3">
                    <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="What's happening? (Cmd/Ctrl + Enter to save)"
                        className="w-full h-20 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        autoFocus
                    />
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                            {newNote.length} characters
                        </span>
                        <Button
                            onClick={addNote}
                            disabled={!newNote.trim()}
                            size="sm"
                        >
                            Add Note
                        </Button>
                    </div>
                </div>

                <Separator />

                {/* Timeline */}
                <div className="flex-1 overflow-y-auto space-y-4">
                    {isLoading ? (
                        <div className="text-center text-gray-400 py-8">
                            Loading timeline...
                        </div>
                    ) : todayNotes.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                            <div className="text-4xl mb-2">✨</div>
                            <p>Start your day by adding a note!</p>
                            <p className="text-xs mt-1">
                                Share your thoughts, goals, or observations
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {todayNotes.map((note, index) => (
                                <TimelineEntry
                                    key={note.id || index}
                                    note={note}
                                    isLatest={index === 0}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Timeline Stats */}
                {todayNotes.length > 0 && (
                    <div className="flex-shrink-0 pt-3 border-t">
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{todayNotes.length} entries today</span>
                            <span>
                                Started {formatTime(Math.min(...todayNotes.map(n => n.createdAt)))}
                            </span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function TimelineEntry({ note, isLatest }: { note: Note; isLatest: boolean }) {
    const formatTime = (timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const getTimeAgo = (timestamp: number) => {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(minutes / 60);

        if (minutes < 1) return "now";
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return formatTime(timestamp);
    };

    return (
        <div className="relative">
            {/* Timeline dot */}
            <div className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full"></div>
            {/* Timeline line */}
            {!isLatest && (
                <div className="absolute left-1 top-4 w-px h-full bg-gray-200"></div>
            )}

            <div className="ml-6 pb-4">
                <div className="flex items-center justify-between mb-2">
                    <Badge variant={isLatest ? "default" : "secondary"} className="text-xs">
                        {getTimeAgo(note.createdAt)}
                    </Badge>
                    <span className="text-xs text-gray-400">
                        {formatTime(note.createdAt)}
                    </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm whitespace-pre-wrap break-words">
                        {note.content}
                    </p>
                </div>
            </div>
        </div>
    );
} 