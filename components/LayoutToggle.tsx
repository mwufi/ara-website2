'use client'

import { AlignLeft, AlignCenter } from 'lucide-react'

type LayoutType = 'left' | 'center'

interface LayoutToggleProps {
    onLayoutChange: (layout: LayoutType) => void
    currentLayout: LayoutType
}

export default function LayoutToggle({ onLayoutChange, currentLayout }: LayoutToggleProps) {
    const toggleLayout = () => {
        onLayoutChange(currentLayout === 'left' ? 'center' : 'left')
    }

    const isCenter = currentLayout === 'center'

    return (
        <div className="fixed hidden md:block bottom-6 right-6 z-50">
            <button
                onClick={toggleLayout}
                className="p-3 rounded-full shadow-lg transition-all duration-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                title={isCenter ? "Switch to left-aligned layout" : "Switch to centered layout"}
            >
                {isCenter ? <AlignLeft size={20} /> : <AlignCenter size={20} />}
            </button>
        </div>
    )
} 