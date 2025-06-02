"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trophy,
    Star,
    Plus,
    Edit3,
    Trash2,
    Medal,
    Target,
    Zap,
    Crown,
    Flame,
    Heart,
    Award,
    CheckCircle,
    Clock,
    Calendar,
    TrendingUp
} from "lucide-react";
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

// Mock data - this would come from InstantDB
const mockLevels = [
    { id: 1, level: 1, xpRequired: 0, title: "Novice", color: "from-gray-400 to-gray-600", reward: "Welcome badge" },
    { id: 2, level: 2, xpRequired: 100, title: "Apprentice", color: "from-green-400 to-green-600", reward: "First timer unlock" },
    { id: 3, level: 3, xpRequired: 300, title: "Focused", color: "from-blue-400 to-blue-600", reward: "Custom themes" },
    { id: 4, level: 4, xpRequired: 600, title: "Dedicated", color: "from-purple-400 to-purple-600", reward: "Advanced analytics" },
    { id: 5, level: 5, xpRequired: 1000, title: "Master", color: "from-yellow-400 to-orange-500", reward: "All features unlocked" },
    { id: 6, level: 6, xpRequired: 1500, title: "Legendary", color: "from-pink-400 to-red-500", reward: "Exclusive badges" },
];

const mockBadges = [
    {
        id: 1,
        name: "First Steps",
        description: "Complete your first 25-minute focus session",
        icon: "🎯",
        requirement: "1 session",
        rarity: "common",
        xpReward: 50
    },
    {
        id: 2,
        name: "Consistency King",
        description: "Complete sessions for 7 days in a row",
        icon: "🔥",
        requirement: "7-day streak",
        rarity: "rare",
        xpReward: 200
    },
    {
        id: 3,
        name: "Deep Focus",
        description: "Complete a 2-hour uninterrupted session",
        icon: "🧠",
        requirement: "120min session",
        rarity: "epic",
        xpReward: 300
    },
    {
        id: 4,
        name: "Early Bird",
        description: "Start a session before 7 AM",
        icon: "🌅",
        requirement: "Session before 7AM",
        rarity: "uncommon",
        xpReward: 100
    },
    {
        id: 5,
        name: "Night Owl",
        description: "Complete a session after 10 PM",
        icon: "🦉",
        requirement: "Session after 10PM",
        rarity: "uncommon",
        xpReward: 100
    },
    {
        id: 6,
        name: "Productivity Master",
        description: "Reach 1000 total XP",
        icon: "👑",
        requirement: "1000 XP",
        rarity: "legendary",
        xpReward: 500
    },
];

export default function LevelsAdmin() {
    const [activeTab, setActiveTab] = useState<"levels" | "badges">("levels");
    const [levels, setLevels] = useState(mockLevels);
    const [badges, setBadges] = useState(mockBadges);
    const [isAddingLevel, setIsAddingLevel] = useState(false);
    const [isAddingBadge, setIsAddingBadge] = useState(false);

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case "common": return "from-gray-400 to-gray-600";
            case "uncommon": return "from-green-400 to-green-600";
            case "rare": return "from-blue-400 to-blue-600";
            case "epic": return "from-purple-400 to-purple-600";
            case "legendary": return "from-yellow-400 to-orange-500";
            default: return "from-gray-400 to-gray-600";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-4xl font-light text-gray-800">
                        Gamification Admin
                    </h1>
                    <p className="text-gray-600">
                        Configure XP levels, achievement badges, and rewards
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div
                    className="flex justify-center space-x-2 bg-white rounded-lg p-2 shadow-sm border max-w-md mx-auto"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <button
                        onClick={() => setActiveTab("levels")}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${activeTab === "levels"
                            ? "bg-blue-500 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <TrendingUp className="w-4 h-4" />
                        <span>XP Levels</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("badges")}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${activeTab === "badges"
                            ? "bg-blue-500 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <Trophy className="w-4 h-4" />
                        <span>Badges</span>
                    </button>
                </motion.div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === "levels" ? (
                        <LevelsTab
                            key="levels"
                            levels={levels}
                            setLevels={setLevels}
                            isAdding={isAddingLevel}
                            setIsAdding={setIsAddingLevel}
                        />
                    ) : (
                        <BadgesTab
                            key="badges"
                            badges={badges}
                            setBadges={setBadges}
                            isAdding={isAddingBadge}
                            setIsAdding={setIsAddingBadge}
                            getRarityColor={getRarityColor}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function LevelsTab({ levels, setLevels, isAdding, setIsAdding }: any) {
    const [newLevel, setNewLevel] = useState({
        level: '',
        title: '',
        xpRequired: '',
        reward: '',
        color: 'from-blue-400 to-blue-600'
    });

    const handleCreateLevel = () => {
        if (!newLevel.level || !newLevel.title || !newLevel.xpRequired || !newLevel.reward) {
            alert('Please fill in all fields');
            return;
        }

        const levelData = {
            id: Date.now(), // Simple ID generation
            level: parseInt(newLevel.level),
            title: newLevel.title,
            xpRequired: parseInt(newLevel.xpRequired),
            reward: newLevel.reward,
            color: newLevel.color
        };

        setLevels([...levels, levelData]);
        setNewLevel({
            level: '',
            title: '',
            xpRequired: '',
            reward: '',
            color: 'from-blue-400 to-blue-600'
        });
        setIsAdding(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
        >
            {/* Header with Add Button */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-medium text-gray-800">XP Levels</h2>
                <Button
                    onClick={() => setIsAdding(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Level
                </Button>
            </div>

            {/* Levels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {levels.map((level: any, index: number) => (
                        <motion.div
                            key={level.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
                        >
                            <div className="space-y-4">
                                {/* Level Header */}
                                <div className="flex items-center justify-between">
                                    <div className={`bg-gradient-to-r ${level.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                                        Level {level.level}
                                    </div>
                                    <div className="flex space-x-1">
                                        <button className="p-1 text-gray-400 hover:text-blue-500">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            className="p-1 text-gray-400 hover:text-red-500"
                                            onClick={() => setLevels(levels.filter((l: any) => l.id !== level.id))}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Level Info */}
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">{level.title}</h3>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <Zap className="w-4 h-4 text-yellow-500" />
                                            <span>{level.xpRequired} XP required</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Award className="w-4 h-4 text-purple-500" />
                                            <span>{level.reward}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Preview */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Preview</span>
                                        <span>{level.xpRequired} XP</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full bg-gradient-to-r ${level.color}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Add Level Form */}
            <Drawer open={isAdding} onOpenChange={setIsAdding}>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-md">
                        <DrawerHeader>
                            <DrawerTitle>Add New Level</DrawerTitle>
                            <DrawerDescription>
                                Create a new XP level with rewards
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Level Number</label>
                                <input
                                    type="number"
                                    value={newLevel.level}
                                    onChange={(e) => setNewLevel({ ...newLevel, level: e.target.value })}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="7"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    value={newLevel.title}
                                    onChange={(e) => setNewLevel({ ...newLevel, title: e.target.value })}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Grandmaster"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">XP Required</label>
                                <input
                                    type="number"
                                    value={newLevel.xpRequired}
                                    onChange={(e) => setNewLevel({ ...newLevel, xpRequired: e.target.value })}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="2500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Reward</label>
                                <input
                                    type="text"
                                    value={newLevel.reward}
                                    onChange={(e) => setNewLevel({ ...newLevel, reward: e.target.value })}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Special title and badge"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Color Theme</label>
                                <div className="flex space-x-2">
                                    {["from-gray-400 to-gray-600", "from-green-400 to-green-600", "from-blue-400 to-blue-600", "from-purple-400 to-purple-600", "from-yellow-400 to-orange-500"].map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setNewLevel({ ...newLevel, color })}
                                            className={`w-8 h-8 rounded-full bg-gradient-to-r ${color} border-2 ${newLevel.color === color ? 'border-blue-500' : 'border-white'} shadow-md transition-all hover:scale-110`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <DrawerFooter>
                            <Button onClick={handleCreateLevel}>Create Level</Button>
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

function BadgesTab({ badges, setBadges, isAdding, setIsAdding, getRarityColor }: any) {
    const [newBadge, setNewBadge] = useState({
        name: '',
        description: '',
        icon: '',
        requirement: '',
        xpReward: '',
        rarity: 'common'
    });

    const handleCreateBadge = () => {
        if (!newBadge.name || !newBadge.description || !newBadge.icon || !newBadge.requirement || !newBadge.xpReward) {
            alert('Please fill in all fields');
            return;
        }

        const badgeData = {
            id: Date.now(), // Simple ID generation
            name: newBadge.name,
            description: newBadge.description,
            icon: newBadge.icon,
            requirement: newBadge.requirement,
            xpReward: parseInt(newBadge.xpReward),
            rarity: newBadge.rarity
        };

        setBadges([...badges, badgeData]);
        setNewBadge({
            name: '',
            description: '',
            icon: '',
            requirement: '',
            xpReward: '',
            rarity: 'common'
        });
        setIsAdding(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            {/* Header with Add Button */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-medium text-gray-800">Achievement Badges</h2>
                <Button
                    onClick={() => setIsAdding(true)}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Badge
                </Button>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {badges.map((badge: any, index: number) => (
                        <motion.div
                            key={badge.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
                        >
                            <div className="space-y-4">
                                {/* Badge Header */}
                                <div className="flex items-center justify-between">
                                    <div className={`bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white px-3 py-1 rounded-full text-xs font-medium capitalize`}>
                                        {badge.rarity}
                                    </div>
                                    <div className="flex space-x-1">
                                        <button className="p-1 text-gray-400 hover:text-blue-500">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            className="p-1 text-gray-400 hover:text-red-500"
                                            onClick={() => setBadges(badges.filter((b: any) => b.id !== badge.id))}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Badge Icon and Info */}
                                <div className="text-center space-y-3">
                                    <div className="text-4xl">{badge.icon}</div>
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-lg">{badge.name}</h3>
                                        <p className="text-sm text-gray-600">{badge.description}</p>
                                    </div>
                                </div>

                                {/* Badge Details */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Requirement:</span>
                                        <span className="font-medium">{badge.requirement}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">XP Reward:</span>
                                        <span className="flex items-center space-x-1">
                                            <Zap className="w-3 h-3 text-yellow-500" />
                                            <span className="font-medium">{badge.xpReward}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Add Badge Form */}
            <Drawer open={isAdding} onOpenChange={setIsAdding}>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-md">
                        <DrawerHeader>
                            <DrawerTitle>Add New Badge</DrawerTitle>
                            <DrawerDescription>
                                Create a new achievement badge
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Badge Name</label>
                                <input
                                    type="text"
                                    value={newBadge.name}
                                    onChange={(e) => setNewBadge({ ...newBadge, name: e.target.value })}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Speed Demon"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <textarea
                                    value={newBadge.description}
                                    onChange={(e) => setNewBadge({ ...newBadge, description: e.target.value })}
                                    className="w-full p-3 border rounded-lg h-20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Complete 10 sessions in under 20 minutes each"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Icon (Emoji)</label>
                                <input
                                    type="text"
                                    value={newBadge.icon}
                                    onChange={(e) => setNewBadge({ ...newBadge, icon: e.target.value })}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="⚡"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Requirement</label>
                                <input
                                    type="text"
                                    value={newBadge.requirement}
                                    onChange={(e) => setNewBadge({ ...newBadge, requirement: e.target.value })}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="10 sessions < 20min"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">XP Reward</label>
                                <input
                                    type="number"
                                    value={newBadge.xpReward}
                                    onChange={(e) => setNewBadge({ ...newBadge, xpReward: e.target.value })}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="150"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Rarity</label>
                                <select
                                    value={newBadge.rarity}
                                    onChange={(e) => setNewBadge({ ...newBadge, rarity: e.target.value })}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="common">Common</option>
                                    <option value="uncommon">Uncommon</option>
                                    <option value="rare">Rare</option>
                                    <option value="epic">Epic</option>
                                    <option value="legendary">Legendary</option>
                                </select>
                            </div>
                        </div>
                        <DrawerFooter>
                            <Button onClick={handleCreateBadge}>Create Badge</Button>
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