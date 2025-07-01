import { useState, useRef, useEffect } from 'react'

export interface TypingStats {
    rate: number
    lastActivity: number
    isActive: boolean
}

export function useTypingTracker() {
    const [typingStats, setTypingStats] = useState<TypingStats>({
        rate: 0,
        lastActivity: Date.now(),
        isActive: false
    })

    const typingStartRef = useRef<number | null>(null)
    const characterCountRef = useRef(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const updateActivity = (editor: any) => {
        const now = Date.now()

        // Calculate typing rate
        if (!typingStartRef.current) {
            typingStartRef.current = now
            characterCountRef.current = editor.state.doc.textContent.length
        } else {
            const currentLength = editor.state.doc.textContent.length
            const timeDiff = now - typingStartRef.current
            const charDiff = currentLength - characterCountRef.current

            if (timeDiff > 1000) { // Reset every second
                const rate = charDiff / (timeDiff / 1000)

                setTypingStats(prev => ({
                    ...prev,
                    rate: rate,
                    lastActivity: now,
                    isActive: rate > 0
                }))

                typingStartRef.current = now
                characterCountRef.current = currentLength
            }
        }
    }

    const checkInactivity = (callback: (stats: TypingStats) => void) => {
        const checkInterval = 1000 // Check every second

        intervalRef.current = setInterval(() => {
            const now = Date.now()
            const timeSinceLastActivity = now - typingStats.lastActivity

            // Update active status
            const isActive = timeSinceLastActivity < 3000 // 3 seconds of inactivity

            const updatedStats = {
                ...typingStats,
                isActive
            }

            setTypingStats(updatedStats)
            callback(updatedStats)
        }, checkInterval)
    }

    const cleanup = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
    }

    useEffect(() => {
        return cleanup
    }, [])

    return {
        typingStats,
        updateActivity,
        checkInactivity,
        cleanup
    }
} 