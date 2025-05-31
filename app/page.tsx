"use client"

import Image from "next/image";
import BlogSection from "./BlogSection";
import { allPosts } from 'content-collections'
import { compareDesc } from "date-fns";

const headerText = `What will the world look like, when AI is everywhere? We're building a future that looks more cute & personal - where every person has an OS1, a personal assistant & friend that helps with anything.`

const themeColors = {
  magenta: "#AB0782",
}

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <main className="px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-20">
        <h2 className="font-serif text-3xl md:text-[48px] font-light leading-[1.2] tracking-[-0.02em] max-w-[65rem]">
          {headerText}
        </h2>
      </section>

      {/* Full-width Content Blocks */}
      <div className="space-y-8 mb-20">
        {posts.map((post) => (
          <BlogSection.All key={post._meta.filePath} tags={post.previewTags!} title={post.title} img={post.previewImage} href={`/posts/${post._meta.path}`} alignment={post.previewVariant as "left" | "right"} themeColor={post.previewColor} />
        ))}
      </div>
    </main>
  );
}
