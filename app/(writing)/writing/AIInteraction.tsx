'use client'

import { useState, useEffect } from 'react'

interface AIInteractionProps {
  message: string
  onDismiss: () => void
}

export default function AIInteraction({ message, onDismiss }: AIInteractionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(onDismiss, 300) // Wait for fade-out animation
  }

  return (
    <div 
      className={`fixed bottom-8 right-8 max-w-sm bg-gray-800 text-white p-4 rounded-lg shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-300 hover:text-white text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  )
}