import { allPosts } from 'content-collections'
import PostHeader from './PostHeader'
import PostBody from './PostBody';

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

    return <PostContent post={post} />
}

function PostContent({ post }: { post: any }) {
    return (
        <main className="px-6 mx-auto pb-30">
            <PostHeader post={post} />
            <PostBody post={post} />
        </main>
    )
}

export default PostLayout