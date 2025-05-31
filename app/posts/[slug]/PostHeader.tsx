import { format, parseISO } from "date-fns";
import { Post } from "content-collections";

export default function PostHeader({ post }: { post: Post }) {
    return (
        <section className="mb-12">
            {post.previewImage && (
                <div className="mb-12 -mx-6 sm:-mx-8 md:-mx-12 lg:-mx-16">
                    <img
                        src={post.previewImage}
                        alt={post.title}
                        className="w-full h-[300px] md:h-[400px] object-cover"
                    />
                </div>
            )}
            <div className="max-w-[65rem] mx-auto">
                <h2 className="font-serif text-3xl md:text-[48px] font-light leading-[1.2] tracking-[-0.02em] mb-4">
                    {post.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <time dateTime={post.date.toISOString()}>
                        {format(post.date, 'LLLL d, yyyy')}
                    </time>
                    {post.previewTags && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                            {post.previewTags}
                        </span>
                    )}
                </div>
            </div>
        </section>
    )
}