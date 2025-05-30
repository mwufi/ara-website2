import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `**/*.{md,mdx}`,
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'date', required: true },
        previewVariant: { type: "enum", options: ["left", "right"], required: true, default: 'left' },
        previewImage: { type: 'string', required: true },
        previewTags: { type: 'string', required: false, default: 'Design' },
        previewColor: { type: 'string', required: false },
    },
    computedFields: {
        url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
    },
}))

export default makeSource({ contentDirPath: 'posts', documentTypes: [Post] })