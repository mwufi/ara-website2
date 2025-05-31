'use client'

import LayoutToggle from "@/components/LayoutToggle"
import { components } from "@/mdx-components"
import { MDXContent } from "@content-collections/mdx/react"
import { useState } from "react"

export default function PostBody({ post }: { post: any }) {
    const [layout, setLayout] = useState<'left' | 'center'>('left')

    return (
        <>
            <div className="[&>*]:mb-3 [&>*:last-child]:mb-0 max-w-5xl mx-auto border-t border-gray-200 pt-12">
                <div className={`transition-all duration-300 ${layout === 'center'
                    ? 'max-w-[75ch] mx-auto'
                    : 'max-w-[75ch] mr-auto'
                    }`}>
                    <MDXContent code={post.mdx} components={components} />
                </div>
            </div>

            <LayoutToggle
                currentLayout={layout}
                onLayoutChange={setLayout}
            />
        </>
    )
}
