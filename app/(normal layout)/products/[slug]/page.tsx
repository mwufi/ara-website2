import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Product data (in a real app, this would come from a database)
const products = {
    "mailpuppy": {
        id: 1,
        name: "MailPuppy",
        slug: "mailpuppy",
        description: "An intelligent email assistant that reads your emails and follows instructions. Voice-first interactions make email management effortless and natural.",
        longDescription: "MailPuppy revolutionizes email management with voice-first AI interactions. Simply tell MailPuppy what you want to do with your emails - from organizing your inbox to drafting responses - and watch as it handles the complexity while you focus on what matters.",
        status: "Coming Soon",
        features: ["Voice-first interaction", "Email intelligence", "Smart filtering", "Task automation"],
        color: "#AB0782",
        videoDemo: "/mailpuppy-demo.mp4"
    },
    "ara-studio": {
        id: 2,
        name: "Ara Studio",
        slug: "ara-studio",
        description: "Creative AI companion for designers, writers, and creators. Transform ideas into reality with intelligent collaboration.",
        longDescription: "Ara Studio is your creative partner that understands your style, learns from your work, and helps bring your ideas to life. Whether you're designing, writing, or creating, Ara Studio adapts to your workflow.",
        status: "Beta",
        features: ["Creative collaboration", "Multi-modal generation", "Style learning", "Project management"],
        color: "#2563EB",
        videoDemo: "/ara-studio-demo.mp4"
    },
    "ara-connect": {
        id: 3,
        name: "Ara Connect",
        slug: "ara-connect",
        description: "AI-powered relationship manager that helps you maintain meaningful connections with friends, family, and colleagues.",
        longDescription: "Never lose touch with the people who matter most. Ara Connect helps you nurture relationships by remembering important details, suggesting meaningful interactions, and keeping you connected.",
        status: "In Development",
        features: ["Relationship insights", "Smart reminders", "Communication coaching", "Social analytics"],
        color: "#059669",
        videoDemo: "/ara-connect-demo.mp4"
    },
    "os1": {
        id: 4,
        name: "OS1",
        slug: "os1",
        description: "Your ambient AI companion that lives across desktop, phone, and cloud. Seamlessly integrates with 250+ tools while working beautifully offline.",
        longDescription: "OS1 is the AI operating system that works everywhere you do. From your desktop to your phone to the cloud, OS1 provides a consistent, intelligent experience that integrates with over 250 tools while maintaining full offline capabilities.",
        status: "Research",
        features: ["Ambient presence", "250+ integrations", "Offline capable", "Cross-platform sync"],
        color: "#DC2626",
        videoDemo: "/os1-demo.mp4"
    }
} as const

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug
    const product = products[slug as keyof typeof products]

    if (!product) {
        return {
            title: 'Product Not Found - Ara Intelligence',
            description: 'The requested product could not be found.'
        }
    }

    return {
        title: `${product.name} - Ara Intelligence`,
        description: product.description,
        openGraph: {
            title: `${product.name} - Ara Intelligence`,
            description: product.longDescription,
            url: `https://ara.computer/products/${product.slug}`,
            type: 'website',
            videos: [
                {
                    url: product.videoDemo,
                    width: 1200,
                    height: 630,
                    type: "video/mp4",
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.name} - Ara Intelligence`,
            description: product.description,
        },
        other: {
            "og:video:type": "video/mp4",
            "og:video:width": "1200",
            "og:video:height": "630",
            "product:availability": product.status,
            "product:color": product.color,
        },
    }
}

export default async function ProductPage({ params, searchParams }: Props) {
    const slug = (await params).slug
    const product = products[slug as keyof typeof products]

    if (!product) {
        notFound()
    }

    return (
        <main className="px-6 max-w-7xl mx-auto">
            {/* Back Navigation */}
            <div className="mb-8">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                    ← Back to Products
                </Link>
            </div>

            {/* Hero Section */}
            <section className="mb-20">
                <div className="flex items-center gap-4 mb-6">
                    <h1 className="font-serif text-4xl md:text-[56px] font-light leading-[1.1] tracking-[-0.02em]">
                        {product.name}
                    </h1>
                    <span
                        className="px-4 py-2 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: product.color }}
                    >
                        {product.status}
                    </span>
                </div>

                <p className="font-serif text-xl md:text-2xl font-light leading-[1.3] tracking-[-0.01em] max-w-[50rem] text-gray-600 dark:text-gray-400 mb-8">
                    {product.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex gap-4">
                    <button
                        className="px-8 py-4 rounded-lg font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                        style={{ backgroundColor: product.color }}
                    >
                        Join Waitlist
                    </button>
                    <button className="px-8 py-4 rounded-lg font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        Request Demo
                    </button>
                </div>
            </section>

            {/* Product Demo */}
            <section className="mb-20">
                <div
                    className="aspect-video rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center"
                    style={{
                        background: `linear-gradient(135deg, ${product.color}15, ${product.color}05)`,
                        border: `1px solid ${product.color}20`
                    }}
                >
                    <div className="text-center">
                        <div
                            className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                            style={{ backgroundColor: `${product.color}20` }}
                        >
                            <div
                                className="w-12 h-12 rounded-full"
                                style={{ backgroundColor: product.color }}
                            />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">Demo video coming soon</p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="mb-20">
                <h2 className="text-3xl font-serif font-light tracking-[-0.02em] mb-8">Key Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: product.color }}
                            />
                            <span className="text-lg">{feature}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Long Description */}
            <section className="mb-20">
                <h2 className="text-3xl font-serif font-light tracking-[-0.02em] mb-8">About {product.name}</h2>
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 max-w-4xl">
                    {product.longDescription}
                </p>
            </section>
        </main>
    )
} 