'use client'

import { useState, useEffect } from 'react'
import WritingOnboarding from './WritingOnboarding'
import WritingEditor from './WritingEditor'

export default function WritingPage() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [userName, setUserName] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    // Check if user has completed onboarding before
    const hasCompletedOnboarding = localStorage.getItem('writing-onboarding-complete')
    const savedName = localStorage.getItem('writing-user-name')
    const savedContent = localStorage.getItem('writing-content')
    
    if (hasCompletedOnboarding) {
      setShowOnboarding(false)
      setUserName(savedName || '')
      setContent(savedContent || '')
    }
  }, [])

  const handleOnboardingComplete = (name: string) => {
    setUserName(name)
    setShowOnboarding(false)
    localStorage.setItem('writing-onboarding-complete', 'true')
    localStorage.setItem('writing-user-name', name)
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    localStorage.setItem('writing-content', newContent)
  }

  if (showOnboarding) {
    return <WritingOnboarding onComplete={handleOnboardingComplete} />
  }

  return (
    <div className="min-h-screen bg-white">
      <WritingEditor 
        content={content}
        onChange={handleContentChange}
        userName={userName}
      />
    </div>
  )
}