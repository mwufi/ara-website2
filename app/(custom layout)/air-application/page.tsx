'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

export default function AirApplication() {
    const [formData, setFormData] = useState({
        team: '',
        materials: '',
        technicalFoundation: '',
        traction: '',
        sixMonthGoals: '',
        linkedin: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Video Introduction Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        AIR Residency Application
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                        Join our community of innovative builders and creators. Share your vision with us.
                    </p>

                    {/* Video Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative w-full max-w-2xl mx-auto mb-8"
                    >
                        <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center group hover:border-slate-400 dark:hover:border-slate-500 transition-colors">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-slate-400 dark:group-hover:bg-slate-500 transition-colors">
                                    <svg className="w-8 h-8 text-slate-600 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Hi! I'm Zen</p>
                                <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">Upload your 60-second introduction video</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Application Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    {/* Question 1: Team Introduction */}
                    <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-start gap-3 text-slate-900 dark:text-slate-100">
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shrink-0">
                                    1
                                </span>
                                Share a 60-second video introducing your team and showing a quick demo of your product/prototype.
                            </CardTitle>
                            <CardDescription className="ml-11">
                                Tell us your origin story. How did you arrive at this vision? Why this? Why now?
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="ml-11">
                            <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                Video uploaded above ↑
                            </div>
                        </CardContent>
                    </Card>

                    {/* Question 2: Materials */}
                    <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-start gap-3 text-slate-900 dark:text-slate-100">
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shrink-0">
                                    2
                                </span>
                                Please share any relevant materials, such as your product, pitch deck, usage metrics, prototype, or design concepts.
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="ml-11">
                            <Label htmlFor="materials" className="sr-only">Relevant materials</Label>
                            <Textarea
                                id="materials"
                                placeholder="Type your answer here..."
                                value={formData.materials}
                                onChange={(e) => handleInputChange('materials', e.target.value)}
                                className="min-h-[100px] resize-none"
                            />
                            <div className="flex items-center gap-2 mt-2 text-sm text-slate-500 dark:text-slate-400">
                                <span>Shift + Enter</span>
                                <span>to make a line break</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Question 3: Team */}
                    <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-start gap-3 text-slate-900 dark:text-slate-100">
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shrink-0">
                                    3
                                </span>
                                Tell us about your team.
                            </CardTitle>
                            <CardDescription className="ml-11">
                                Please share their LinkedIn profiles or background information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="ml-11 space-y-4">
                            <div>
                                <Label htmlFor="linkedin" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    LinkedIn Profile or Team Information
                                </Label>
                                <Input
                                    id="linkedin"
                                    placeholder="https://x.com/airesidency"
                                    value={formData.linkedin}
                                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                                    className="mt-1"
                                />
                                <div className="flex items-center gap-2 mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    <span>Shift + Enter</span>
                                    <span>to make a line break</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Question 3: Technical Foundation */}
                    <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-start gap-3 text-slate-900 dark:text-slate-100">
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shrink-0">
                                    4
                                </span>
                                Tell us about your technical foundation. What form does your product take?
                            </CardTitle>
                            <CardDescription className="ml-11">
                                Agentic assistant, social experience, hardware, mobile app, et cetera.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="ml-11">
                            <Label htmlFor="technical" className="sr-only">Technical foundation</Label>
                            <Textarea
                                id="technical"
                                placeholder="Type your answer here..."
                                value={formData.technicalFoundation}
                                onChange={(e) => handleInputChange('technicalFoundation', e.target.value)}
                                className="min-h-[100px] resize-none"
                            />
                            <div className="flex items-center gap-2 mt-2 text-sm text-slate-500 dark:text-slate-400">
                                <span>Shift + Enter</span>
                                <span>to make a line break</span>
                            </div>
                        </CardContent>
                    </Card>


                    {/* Question 4: Traction */}
                    <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-start gap-3 text-slate-900 dark:text-slate-100">
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shrink-0">
                                    5
                                </span>
                                What traction or validation have you achieved so far?
                            </CardTitle>
                            <CardDescription className="ml-11">
                                This can be users, revenue, retention, or any other key milestones.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="ml-11">
                            <Label htmlFor="traction" className="sr-only">Traction and validation</Label>
                            <Textarea
                                id="traction"
                                placeholder="Type your answer here..."
                                value={formData.traction}
                                onChange={(e) => handleInputChange('traction', e.target.value)}
                                className="min-h-[100px] resize-none"
                            />
                            <div className="flex items-center gap-2 mt-2 text-sm text-slate-500 dark:text-slate-400">
                                <span>Shift + Enter</span>
                                <span>to make a line break</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Question 5: Six Month Goals */}
                    <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-start gap-3 text-slate-900 dark:text-slate-100">
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shrink-0">
                                    6
                                </span>
                                Six months from now, if everything goes perfectly, what will you have achieved?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="ml-11">
                            <Label htmlFor="goals" className="sr-only">Six month goals</Label>
                            <Textarea
                                id="goals"
                                placeholder="Type your answer here..."
                                value={formData.sixMonthGoals}
                                onChange={(e) => handleInputChange('sixMonthGoals', e.target.value)}
                                className="min-h-[100px] resize-none"
                            />
                            <div className="flex items-center gap-2 mt-2 text-sm text-slate-500 dark:text-slate-400">
                                <span>Shift + Enter</span>
                                <span>to make a line break</span>
                            </div>
                        </CardContent>
                    </Card>


                    <Separator className="my-8" />

                    {/* Submit Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex justify-center"
                    >
                        <Button
                            type="submit"
                            size="lg"
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            Submit Application
                        </Button>
                    </motion.div>
                </motion.form>
            </div>
        </div>
    );
}