import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
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
                        padding: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                >
                    {/* Ara logo/icon */}
                    <div
                        style={{
                            width: '140px',
                            height: '140px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '70px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '70px',
                            marginBottom: '48px',
                        }}
                    >
                        🤖
                    </div>

                    <h1
                        style={{
                            fontSize: '80px',
                            fontWeight: 'bold',
                            margin: '0 0 24px 0',
                            background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Ara Intelligence
                    </h1>

                    <p
                        style={{
                            fontSize: '36px',
                            margin: '0',
                            opacity: 0.9,
                            maxWidth: '900px',
                            lineHeight: 1.4,
                        }}
                    >
                        Building the future of AI - personal, cute, and intelligent assistants for everyone.
                    </p>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
} 