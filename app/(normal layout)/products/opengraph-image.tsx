import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
    const products = [
        { name: "MailPuppy", color: "#AB0782", emoji: "📧" },
        { name: "Ara Studio", color: "#2563EB", emoji: "🎨" },
        { name: "Ara Connect", color: "#059669", emoji: "🤝" },
        { name: "OS1", color: "#DC2626", emoji: "💻" }
    ]

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Inter, sans-serif',
                    color: 'white',
                    padding: '40px',
                }}
            >
                <div
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        padding: '60px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        width: '90%',
                    }}
                >
                    <h1
                        style={{
                            fontSize: '64px',
                            fontWeight: 'bold',
                            margin: '0 0 40px 0',
                            background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Our Products
                    </h1>

                    {/* Products Grid */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '30px',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            marginBottom: '40px',
                        }}
                    >
                        {products.map((product, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '40px',
                                        backgroundColor: `${product.color}40`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '40px',
                                        border: `2px solid ${product.color}`,
                                    }}
                                >
                                    {product.emoji}
                                </div>
                                <span
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        color: 'white',
                                    }}
                                >
                                    {product.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    <p
                        style={{
                            fontSize: '28px',
                            margin: '0',
                            opacity: 0.9,
                            maxWidth: '800px',
                            lineHeight: 1.4,
                        }}
                    >
                        The next generation of personal AI assistants
                    </p>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
} 