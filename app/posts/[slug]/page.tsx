import { allPosts } from 'content-collections'
import PostHeader from './PostHeader'
import { MDXContent } from "@content-collections/mdx/react";

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._meta.path }))

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const post = allPosts.find((post) => post._meta.path === slug)
    if (!post) throw new Error(`Post not found for slug: ${slug}`)
    return { title: post.title }
}

const PostLayout = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const post = allPosts.find((post) => post._meta.path === slug)
    if (!post) throw new Error(`Post not found for slug: ${slug}`)

    return (
        <main className="px-6 max-w-7xl mx-auto">
            <PostHeader post={post} />

            <div className="[&>*]:mb-3 [&>*:last-child]:mb-0 max-w-[65rem] mx-auto">
                <MDXContent code={post.mdx} />
            </div>
        </main>
    )
}

export default PostLayout