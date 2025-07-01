'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect, useRef } from 'react'
import AIInteraction from './AIInteraction'

interface WritingEditorProps {
  content: string
  onChange: (content: string) => void
  userName: string
}

export default function WritingEditor({ content, onChange, userName }: WritingEditorProps) {
  const [aiMessage, setAiMessage] = useState('')
  const [showAI, setShowAI] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())
  const [typingRate, setTypingRate] = useState(0)
  const typingStartRef = useRef<number | null>(null)
  const characterCountRef = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-screen p-8 bg-white',
      },
    },
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML()
      onChange(newContent)
      
      // Track typing activity
      const now = Date.now()
      setLastActivity(now)
      
      // Calculate typing rate
      if (!typingStartRef.current) {
        typingStartRef.current = now
        characterCountRef.current = editor.state.doc.textContent.length
      } else {
        const currentLength = editor.state.doc.textContent.length
        const timeDiff = now - typingStartRef.current
        const charDiff = currentLength - characterCountRef.current
        
        if (timeDiff > 1000) { // Reset every second
          setTypingRate(charDiff / (timeDiff / 1000))
          typingStartRef.current = now
          characterCountRef.current = currentLength
        }
      }
    },
    onSelectionUpdate: ({ editor }) => {
      // Handle text selection for AI exploration
      const { from, to } = editor.state.selection
      if (from !== to) {
        const selectedText = editor.state.doc.textBetween(from, to)
        if (selectedText.trim().length > 0) {
          triggerAI('explore', selectedText)
        }
      }
    },
  })

  // AI activation logic
  useEffect(() => {
    const checkActivity = () => {
      const now = Date.now()
      const timeSinceLastActivity = now - lastActivity
      
      // If user stopped typing for 5+ seconds and was typing actively before
      if (timeSinceLastActivity > 5000 && typingRate > 2) {
        triggerAI('question')
      }
      
      // Congratulatory message for continuous typing
      if (typingRate > 5) {
        triggerAI('congratulate')
      }
    }

    // Random AI activation every 15-30 seconds
    const randomInterval = Math.random() * 15000 + 15000 // 15-30 seconds
    intervalRef.current = setInterval(() => {
      checkActivity()
    }, randomInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [lastActivity, typingRate])

  const triggerAI = (type: 'question' | 'congratulate' | 'explore', selectedText?: string) => {
    let message = ''
    
    switch (type) {
      case 'congratulate':
        const congratulations = [
          "You're on fire! 🔥",
          "Great flow going!",
          "Love the momentum!",
          "Keep it up!",
        ]
        message = congratulations[Math.floor(Math.random() * congratulations.length)]
        break
        
      case 'question':
        const questions = [
          "What's the core idea you're exploring here?",
          "How does this connect to your main theme?",
          "What inspired this direction?",
          "Where do you see this going next?",
        ]
        message = questions[Math.floor(Math.random() * questions.length)]
        break
        
      case 'explore':
        if (selectedText) {
          message = `Interesting point about "${selectedText}". Could you expand on this?`
        }
        break
    }
    
    if (message) {
      setAiMessage(message)
      setShowAI(true)
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setShowAI(false)
      }, 5000)
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div className="relative min-h-screen bg-white">
      <EditorContent editor={editor} />
      
      {showAI && (
        <AIInteraction
          message={aiMessage}
          onDismiss={() => setShowAI(false)}
        />
      )}
    </div>
  )
}