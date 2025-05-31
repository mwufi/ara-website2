import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const posts = defineCollection({
    name: "posts",
    directory: "posts",
    include: "**/*.mdx",
    schema: z.object({
        title: z.string(),
        date: z.string().transform((val) => new Date(val)),
        previewVariant: z.enum(["left", "right"]).default("left"),
        previewImage: z.string(),
        previewTags: z.string().default("Design").optional(),
        previewColor: z.string().optional(),
    }),
    transform: async (document, context) => {
        const mdx = await compileMDX(context, document);
        return {
            ...document,
            mdx,
        };
    },
});

export default defineConfig({
    collections: [posts],
});