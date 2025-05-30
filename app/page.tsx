"use client"

import Image from "next/image";
import BlogSection from "./BlogSection";
import { motion } from "framer-motion";

const headerText = `What will the world look like, when AI is everywhere? We're building a future that looks more cute & personal - where every person has an OS1, a personal assistant & friend that helps with anything.`

const themeColors = {
  magenta: "#AB0782",
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between py-6 mb-16">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <Image
              src="/ara_logo.svg"
              alt="Ara Intelligence Logo"
              width={140}
              height={40}
              className="w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-sans text-gray-900 dark:text-gray-100">
              Ara Intelligence
            </h1>
          </div>
        </div>

        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-medium transition-colors">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-medium transition-colors">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-medium transition-colors">
            Connect
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mb-20">
        <h2 className="font-serif text-3xl md:text-[48px] font-light leading-[1.2] tracking-[-0.02em] max-w-[65rem]">
          {headerText}
        </h2>
      </section >

      {/* Full-width Content Blocks */}
      <motion.div
        className="space-y-8 mb-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.3
            }
          }
        }}
      >
        <BlogSection.Left tags="Design" title="Personal Memory" img="/img1.png" href="#" />
        <BlogSection.Right tags="Artwork" title="Email Client of You" img="/img2.png" href="#" color={themeColors.magenta} imgSize="lg:w-[500px] lg:h-[500px]" />
      </motion.div>

      {/* Footer */}
      < footer className="border-t border-gray-200 dark:border-gray-700 pt-12 pb-8" >
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2024 Ara Intelligence. Building the future of personal AI.
          </p>
        </div>
      </footer >
    </div >
  );
}
