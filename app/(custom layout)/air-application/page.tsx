'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

import FullPageTransitionDialog from "./FullPageTransitionDialog";
import SecretModeContent from "./SecretModeComponent";
import PreviewThumbnail from "./PreviewThumbnail";

export default function AirApplication() {
    const [formData, setFormData] = useState({
        team: '',
        materials: '',
        technicalFoundation: '',
        traction: '',
        sixMonthGoals: '',
        linkedin: '',
        commitment: '',
        incorporation: '',
        references: '',
    });

    const [secretMode, setSecretMode] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Open secret mode instead of just handling form submission
        setSecretMode(true);
    };

    return (
        <>
            {/* Import Instrument Serif font */}
            <link
                href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&display=swap"
                rel="stylesheet"
            />

            {/* Global scrollbar hiding styles */}
            <style jsx global>{`
                /* Hide scrollbars globally */
                html {
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE and Edge */
                }
                
                /* WebKit browsers (Chrome, Safari, newer Edge) */
                html::-webkit-scrollbar {
                    display: none;
                }
                
                body {
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE and Edge */
                }
                
                body::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    {/* Mode Toggle */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-full px-6 py-3 shadow-lg border border-slate-200 dark:border-slate-700">
                            <span className={`text-sm font-medium transition-colors ${!secretMode ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                Normal
                            </span>
                            <Switch
                                checked={secretMode}
                                onCheckedChange={setSecretMode}
                                className="data-[state=checked]:bg-purple-600"
                            />
                            <span className={`text-sm font-medium transition-colors ${secretMode ? 'text-purple-600 dark:text-purple-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                Secret mode ✨
                            </span>
                        </div>
                    </motion.div>

                    {/* Full Page Transition Dialog */}
                    <FullPageTransitionDialog isOpen={secretMode} onClose={() => setSecretMode(false)}>
                        <SecretModeContent />
                    </FullPageTransitionDialog>

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
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Left Column - Text Description */}
                                    <div>
                                        <div className="prose prose-slate dark:prose-invert max-w-none">
                                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                                I'm making <strong>MailPuppy</strong> (or <strong>Ara Mail</strong>) -- conceptually an AI puppy that lives in your inbox! It can do things for you that other AI's can't ("email the President, and if he responds, invite him to a meeting!")
                                            </p>
                                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                                                Right now I'm in the prototyping phase! I have some vibes I'm going for (modern, sleek email), and half my backend sorted out!
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Column - Links and Resources */}
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Resources & Links</h4>
                                            <div className="space-y-2">
                                                <div>
                                                    <PreviewThumbnail
                                                        href="https://app.chroniclehq.com/share/32a8c640-fb7d-438e-b68a-7aac82d289e9/98aff70d-0ac8-4e40-97ed-09cb852f0a0d/intro"
                                                        preview="/pitchdeck-thumbnail.png" // You'll replace this with actual thumbnail
                                                    >
                                                        Pitch Deck
                                                    </PreviewThumbnail>
                                                </div>
                                                <div>
                                                    <PreviewThumbnail
                                                        href="https://www.figma.com/design/G76qPAGOS1GOz9nVIA0Vzu/Ara-Vibes?node-id=0-1&t=MyOgE03HO3ljO30E-1" // You'll add your Figma URL here
                                                        preview="/figma-thumbnail.png" // You'll replace this with actual thumbnail
                                                    >
                                                        Figma Moodboard
                                                    </PreviewThumbnail>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Project Status */}
                                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 mt-12">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-sm font-medium text-green-700 dark:text-green-400">Product status</span>
                                            </div>
                                            <p className="text-xs text-green-600 dark:text-green-400">Work in progress! Check out the Figma above, I think that's what I'll make </p>
                                        </div>
                                    </div>
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
                            <CardContent className="ml-11">
                                <div className="flex items-center gap-4">
                                    {/* Profile Image */}
                                    <div className="shrink-0">
                                        <img
                                            src="https://pbs.twimg.com/profile_images/1930088119983886336/CPTJhZJr_400x400.jpg"
                                            alt="Zen's profile"
                                            className="w-16 h-16 rounded-full border-2 border-slate-200 dark:border-slate-700 object-cover"
                                        />
                                    </div>

                                    {/* Profile Info */}
                                    <div className="flex-1">
                                        <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Zen</h4>
                                        <a
                                            href="https://www.linkedin.com/in/zen-t-492720136/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm underline decoration-1 underline-offset-2 transition-colors"
                                        >
                                            {`https://linkedin.com/in/zen-t-492720136/`}
                                        </a>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Currently building an Ara</p>
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
                                <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4">
                                    <div className="prose prose-slate dark:prose-invert max-w-none">
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                            In the long run, agentic assistant. The first thing it'll do is your email! So we plan to ship a webapp (where you can configure the settings, etc), and then you can just use it in Gmail. As well, I plan to build an email client frontend (so you can do cooler things!), as well as a mobile app where you can chat with Ara.
                                        </p>
                                    </div>
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
                                <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4">
                                    <div className="prose prose-slate dark:prose-invert max-w-none">
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                            None so far! I'm still focused on building the product, but I plan on acquiring my first 200 users by the end of the month! (personal onboarding)
                                        </p>
                                    </div>
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
                            <CardContent className="ml-11 mb-7">
                                <div className="prose prose-slate dark:prose-invert max-w-none font-serif">
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                        In 6 months, it'll be December. I'll have 4000 paid users, each at $20/mo, earning over $1M ARR! (or more! everyone needs this) We'll double down on email, focusing on high value users (e.g. VCs, sales, etc), but also retain our consumer roots & mission to build an AI assistant that's actually fun. If all goes well, we will be a good entrant in the AI personal assistant space, competing with ChatGPT, Cluely, and more. We will build a small app team, perfect our process of launching apps, and enter several new markets: AI cozy gaming, AI social networking, AI education, and more.
                                    </p>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                                        We'll also build a community around Ara, and customizable, user-controlled AI companions! An important milestone to unlock is the ability for the community to upgrade & tweak Ara (the "App Store" moment for AI!). by 6 months, we'll have launched a store of customizable Ara skills, as well as built the foundations for crafting Ara experiences (think: a dating app that selectively utilizes what Ara knows about you!).
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Question 7: Commitment & References */}
                        <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-start gap-3 text-slate-900 dark:text-slate-100">
                                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shrink-0">
                                        7
                                    </span>
                                    Commitment & References*
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="ml-11 space-y-6">
                                {/* Commitment Question */}
                                <div>
                                    <Label className="text-base font-medium text-slate-900 dark:text-slate-100 mb-4 block">
                                        Please confirm you will do your best to prioritize the time we have together, arrive prepared for scheduled sessions, and share requested materials with enough advance that our team can deliver the most value possible. *
                                    </Label>
                                    <div className="mt-3 space-y-2">
                                        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
                                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                            <div className="flex-1 font-medium text-green-700 dark:text-green-300">
                                                <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold mr-3">
                                                    Y
                                                </span>
                                                Yes
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 opacity-40">
                                            <div className="w-4 h-4 border-2 border-slate-300 dark:border-slate-600 rounded-full"></div>
                                            <div className="flex-1 font-medium text-slate-500 dark:text-slate-500">
                                                <span className="inline-flex items-center justify-center w-6 h-6 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-500 rounded-full text-sm font-semibold mr-3">
                                                    N
                                                </span>
                                                No
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-6" />

                                {/* C-Corp Question */}
                                <div>
                                    <Label className="text-base font-medium text-slate-900 dark:text-slate-100 mb-4 block">
                                        Please confirm you'll incorporate as a C-Corp by program start (we can help, if needed). *
                                    </Label>
                                    <div className="mt-3 space-y-2">
                                        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
                                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                            <div className="flex-1 font-medium text-green-700 dark:text-green-300">
                                                <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold mr-3">
                                                    Y
                                                </span>
                                                Yes
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 opacity-40">
                                            <div className="w-4 h-4 border-2 border-slate-300 dark:border-slate-600 rounded-full"></div>
                                            <div className="flex-1 font-medium text-slate-500 dark:text-slate-500">
                                                <span className="inline-flex items-center justify-center w-6 h-6 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-500 rounded-full text-sm font-semibold mr-3">
                                                    N
                                                </span>
                                                No
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-6" />

                                {/* References */}
                                <div>
                                    <Label className="text-base font-medium text-slate-900 dark:text-slate-100 mb-4 block">
                                        If selected as a finalist, we will ask for professional references who can speak to your team and innovation.
                                    </Label>
                                    <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 mt-3">
                                        <div className="prose prose-slate dark:prose-invert max-w-none">
                                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                                Of course! I can connect you with more people as well.
                                            </p>
                                            <div className="mt-4 space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <div>
                                                        <strong>wuwei.bupt@bytedance.com</strong> - Wei Wu, former teammate at TikTok
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <div>
                                                        <strong>xinghai.hu@bytedance.com</strong> - Xinghai Hu, former manager at TikTok
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                I'm finished
                            </Button>
                        </motion.div>
                    </motion.form>
                </div>
            </div>
        </>
    );
}