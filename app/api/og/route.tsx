import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Ara Intelligence'
    const description = searchParams.get('description') || 'Building the future of AI'

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
                    }}
                >
                    {/* Ara logo/icon placeholder */}
                    <div
                        style={{
                            width: '120px',
                            height: '120px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '60px',
                            marginBottom: '40px',
                        }}
                    >
                        🤖
                    </div>

                    <h1
                        style={{
                            fontSize: '72px',
                            fontWeight: 'bold',
                            margin: '0 0 20px 0',
                            background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        {title}
                    </h1>

                    <p
                        style={{
                            fontSize: '32px',
                            margin: '0',
                            opacity: 0.9,
                            maxWidth: '800px',
                            lineHeight: 1.4,
                        }}
                    >
                        {description}
                    </p>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    )
} 