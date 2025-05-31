import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Product data (same as in page.tsx)
const products = {
    "mailpuppy": {
        name: "MailPuppy",
        description: "Voice-first email intelligence",
        color: "#AB0782",
        emoji: "📧",
        status: "Coming Soon"
    },
    "ara-studio": {
        name: "Ara Studio",
        description: "Creative AI companion",
        color: "#2563EB",
        emoji: "🎨",
        status: "Beta"
    },
    "ara-connect": {
        name: "Ara Connect",
        description: "AI-powered relationship manager",
        color: "#059669",
        emoji: "🤝",
        status: "In Development"
    },
    "os1": {
        name: "OS1",
        description: "Ambient AI operating system",
        color: "#DC2626",
        emoji: "💻",
        status: "Research"
    }
} as const

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
    const product = products[params.slug as keyof typeof products]

    // Fallback if product not found
    if (!product) {
        return new ImageResponse(
            (
                <div style={{
                    fontSize: 64,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    Product Not Found
                </div>
            )
        )
    }

    return new ImageResponse(
        (
            <div
                style={{
                    background: `linear-gradient(135deg, ${product.color}20, ${product.color}05)`,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Inter, sans-serif',
                    color: '#1f2937',
                    padding: '60px',
                    position: 'relative',
                }}
            >
                {/* Background Pattern */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(circle at 20% 20%, ${product.color}10 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${product.color}15 0%, transparent 50%)`,
                    }}
                />

                {/* Main Content */}
                <div
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '32px',
                        padding: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        boxShadow: `0 25px 50px -12px ${product.color}40`,
                        border: `2px solid ${product.color}30`,
                        position: 'relative',
                    }}
                >
                    {/* Product Icon */}
                    <div
                        style={{
                            width: '160px',
                            height: '160px',
                            background: `linear-gradient(135deg, ${product.color}, ${product.color}cc)`,
                            borderRadius: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '80px',
                            marginBottom: '40px',
                            boxShadow: `0 20px 40px ${product.color}40`,
                        }}
                    >
                        {product.emoji}
                    </div>

                    {/* Product Name */}
                    <h1
                        style={{
                            fontSize: '72px',
                            fontWeight: 'bold',
                            margin: '0 0 20px 0',
                            background: `linear-gradient(45deg, ${product.color}, ${product.color}aa)`,
                            backgroundClip: 'text',
                            color: 'transparent',
                            lineHeight: 1.1,
                        }}
                    >
                        {product.name}
                    </h1>

                    {/* Status Badge */}
                    <div
                        style={{
                            background: product.color,
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '20px',
                            fontSize: '20px',
                            fontWeight: '600',
                            marginBottom: '24px',
                        }}
                    >
                        {product.status}
                    </div>

                    {/* Description */}
                    <p
                        style={{
                            fontSize: '32px',
                            margin: '0',
                            color: '#4b5563',
                            maxWidth: '700px',
                            lineHeight: 1.3,
                        }}
                    >
                        {product.description}
                    </p>

                    {/* Ara Intelligence Branding */}
                    <p
                        style={{
                            fontSize: '24px',
                            margin: '40px 0 0 0',
                            color: '#9ca3af',
                            fontWeight: '500',
                        }}
                    >
                        Ara Intelligence
                    </p>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
} 