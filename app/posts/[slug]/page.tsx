
import { allPosts } from 'contentlayer/generated'
import PostHeader from './PostHeader'

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
    const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
    if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
    return { title: post.title }
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
    const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
    if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

    return (
        <main className="px-6 max-w-7xl mx-auto">
            <PostHeader post={post} />

            <div className="[&>*]:mb-3 [&>*:last-child]:mb-0 max-w-[65rem] mx-auto" dangerouslySetInnerHTML={{ __html: post.body.html }} />
        </main>
    )
}

export default PostLayout