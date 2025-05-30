import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const sectionVariants = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeInOut"
        }
    }
};

function BlogSection({
    tags,
    title,
    img,
    href,
    color,
    imgSize = "w-80 h-80",
    alignment = "left"
}: {
    tags: string;
    title: string;
    img: string;
    href: string;
    color?: string;
    imgSize?: string;
    alignment?: "left" | "right";
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const isLeft = alignment === "left";
    const flexDirection = isLeft ? "md:flex-row" : "md:flex-row-reverse";
    const contentAlignment = isLeft ? "" : "mr-auto";

    return (
        <motion.section
            ref={ref}
            className={`w-full py-16 flex flex-col ${flexDirection} gap-12 border-t border-blue-800`}
            style={{ borderColor: color }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={sectionVariants}
        >
            <div className={`${imgSize} relative rounded overflow-hidden shrink-0 group select-none`}>
                <Image
                    src={img}
                    alt="Featured image"
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105 select-none pointer-events-none"
                    priority
                />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-700 mix-blend-lighten select-none pointer-events-none"></div>
            </div>
            <div className={`space-y-4 ${contentAlignment}`}>
                <div className="text-sm md:text-base text-blue-800 font-mono underline" style={{ color: color }}>
                    {tags}
                </div>

                <h2 className="font-serif text-blue-800 text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-[-0.02em]" style={{ color: color }}>
                    {title}
                </h2>

                <div className="pt-4">
                    <Link href={href} className="inline-block px-4 py-1.5 cursor-pointer border border-gray-900 dark:border-gray-100 text-gray-700 dark:text-gray-100 text-sm md:text-base font-medium hover:bg-gray-900/5 dark:hover:bg-gray-100/5 transition-all duration-300">
                        Read More
                    </Link>
                </div>
            </div>
        </motion.section>
    );
}

export default {
    Left: (props: Omit<Parameters<typeof BlogSection>[0], 'alignment'>) => <BlogSection {...props} alignment="left" />,
    Right: (props: Omit<Parameters<typeof BlogSection>[0], 'alignment'>) => <BlogSection {...props} alignment="right" />,
    All: BlogSection
};