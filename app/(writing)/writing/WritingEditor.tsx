import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect, useRef } from 'react'
import AIInteraction from './AIInteraction'
import CommentExtension from '@sereneinserenade/tiptap-comment-extension'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { MessageCircle, X, Reply, Check } from 'lucide-react'

interface Comment {
  id: string
  content: string
  author: string
  timestamp: Date
  replies?: Comment[]
  resolved?: boolean
}

interface SuggestionState {
  text: string
  position: number
  isVisible: boolean
}

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
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [showCommentsSidebar, setShowCommentsSidebar] = useState(false)
  const [lastTypingTime, setLastTypingTime] = useState(Date.now())
  const [suggestion, setSuggestion] = useState<SuggestionState>({
    text: '',
    position: 0,
    isVisible: false
  })
  const typingStartRef = useRef<number | null>(null)
  const characterCountRef = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const suggestionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const suggestionAutoHideRef = useRef<NodeJS.Timeout | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      CommentExtension.configure({
        HTMLAttributes: {
          class: 'comment-highlight',
        },
        onCommentActivated: (commentId: string) => {
          setActiveCommentId(commentId)
          if (commentId && comments.length > 0) {
            setShowCommentsSidebar(true)
          }
        },
      }),
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-screen p-12 bg-white writing-app',
      },
      handleKeyDown: (view, event) => {
        // Handle Tab key for accepting suggestions
        if (event.key === 'Tab' && suggestion.isVisible) {
          event.preventDefault()
          acceptSuggestion()
          return true
        }
        return false
      },
    },
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML()
      onChange(newContent)

      // Track typing activity
      const now = Date.now()
      setLastActivity(now)
      setLastTypingTime(now)

      // Clear any existing suggestion when user types
      if (suggestion.isVisible) {
        clearSuggestion()
      }

      // Clear existing suggestion timeout
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current)
      }

      // Set new timeout for AI suggestion
      suggestionTimeoutRef.current = setTimeout(() => {
        generateAISuggestion(editor)
      }, 2000) // Wait 2 seconds after user stops typing

      // Calculate typing rate
      if (!typingStartRef.current) {
        typingStartRef.current = now
        characterCountRef.current = editor.state.doc.textContent.length
      } else {
        const currentLength = editor.state.doc.textContent.length
        const timeDiff = now - typingStartRef.current
        const charDiff = currentLength - characterCountRef.current

        if (timeDiff > 1000) { // Reset every second
          const typingRate = charDiff / (timeDiff / 1000)
          setTypingRate(typingRate)
          typingStartRef.current = now
          characterCountRef.current = currentLength
        }
      }
    },
    onSelectionUpdate: ({ editor }) => {
      // Clear suggestion when cursor moves
      if (suggestion.isVisible) {
        clearSuggestion()
      }

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

  // Accept the current suggestion
  const acceptSuggestion = () => {
    if (!editor || !suggestion.isVisible) return

    const { from } = editor.state.selection
    editor.commands.insertContentAt(from, suggestion.text)
    clearSuggestion()
  }

  // Clear the current suggestion
  const clearSuggestion = () => {
    setSuggestion({ text: '', position: 0, isVisible: false })

    if (suggestionAutoHideRef.current) {
      clearTimeout(suggestionAutoHideRef.current)
      suggestionAutoHideRef.current = null
    }
  }

  // Show a suggestion at the current cursor position
  const showSuggestion = (text: string, position: number) => {
    setSuggestion({ text, position, isVisible: true })

    // Auto-hide after 5 seconds
    if (suggestionAutoHideRef.current) {
      clearTimeout(suggestionAutoHideRef.current)
    }
    suggestionAutoHideRef.current = setTimeout(() => {
      clearSuggestion()
    }, 5000)
  }

  // Generate AI suggestion based on current content and cursor position
  const generateAISuggestion = async (editor: any) => {
    if (!editor) return

    const { from } = editor.state.selection
    const docText = editor.state.doc.textContent
    const beforeCursor = docText.slice(0, from)
    const afterCursor = docText.slice(from)

    // Only suggest if there's meaningful content before cursor
    if (beforeCursor.trim().length < 10) return

    // Get the last sentence or paragraph for context
    const lastSentence = beforeCursor.split(/[.!?]/).pop()?.trim() || beforeCursor.slice(-100)

    // Simple AI suggestion logic (you can replace this with actual AI API calls)
    const suggestions = generateContextualSuggestion(lastSentence, afterCursor)

    if (suggestions && suggestions.trim()) {
      showSuggestion(suggestions, from)
    }
  }

  // Simple suggestion generator (replace with actual AI)
  const generateContextualSuggestion = (context: string, afterText: string): string => {
    const contextLower = context.toLowerCase()

    // Don't suggest if there's already text right after cursor
    if (afterText.trim().length > 0 && !afterText.startsWith('\n')) {
      return ''
    }

    console.log('context', context)
    console.log('afterText', afterText)

    // Simple contextual suggestions
    if (contextLower.includes('however') || contextLower.includes('but')) {
      return ' this approach has its limitations.'
    }
    if (contextLower.includes('first') || contextLower.includes('initially')) {
      return ' we need to consider the broader implications.'
    }
    if (contextLower.includes('therefore') || contextLower.includes('thus')) {
      return ' we can conclude that this method is effective.'
    }
    if (contextLower.includes('interesting') || contextLower.includes('fascinating')) {
      return ' phenomenon that deserves further investigation.'
    }
    if (contextLower.includes('problem') || contextLower.includes('issue')) {
      return ' requires a comprehensive solution.'
    }
    if (contextLower.includes('research') || contextLower.includes('study')) {
      return ' indicates that further analysis is needed.'
    }

    // Default suggestions based on sentence endings
    if (context.endsWith(',')) {
      return ' which opens up new possibilities for exploration.'
    }
    if (context.endsWith(':')) {
      return ' understanding the core principles is essential.'
    }

    return '' // No suggestion if no good match
  }

  // Show sidebar when comments exist
  useEffect(() => {
    if (comments.length > 0 && !showCommentsSidebar) {
      setShowCommentsSidebar(true)
    }
  }, [comments.length])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current)
      }
      if (suggestionAutoHideRef.current) {
        clearTimeout(suggestionAutoHideRef.current)
      }
    }
  }, [])

  // Add suggestion overlay effect
  useEffect(() => {
    if (!editor || !suggestion.isVisible) return

    const editorElement = editor.view.dom
    let suggestionElement = editorElement.querySelector('.ai-suggestion-overlay') as HTMLElement

    if (!suggestionElement) {
      suggestionElement = document.createElement('span')
      suggestionElement.className = 'ai-suggestion-overlay'
      suggestionElement.style.cssText = `
        position: absolute;
        color: #9ca3af;
        pointer-events: none;
        user-select: none;
        z-index: 10;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
      `
      editorElement.appendChild(suggestionElement)
    }

    suggestionElement.textContent = suggestion.text

    // Position the suggestion at the cursor
    const selection = editor.view.state.selection
    const cursorPos = editor.view.coordsAtPos(selection.from)
    const editorRect = editorElement.getBoundingClientRect()

    suggestionElement.style.left = `${cursorPos.left - editorRect.left}px`
    suggestionElement.style.top = `${cursorPos.top - editorRect.top}px`

    return () => {
      const element = editorElement.querySelector('.ai-suggestion-overlay')
      if (element) {
        element.remove()
      }
    }
  }, [editor, suggestion])

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

  const createComment = () => {
    if (!editor || !newComment.trim()) return

    const commentId = `comment-${Date.now()}`
    const comment: Comment = {
      id: commentId,
      content: newComment,
      author: userName,
      timestamp: new Date(),
      replies: [],
      resolved: false,
    }

    // Add comment to the selected text
    editor.commands.setComment(commentId)

    // Add to comments list
    setComments(prev => [...prev, comment])
    setNewComment('')
    setActiveCommentId(commentId)
    setShowCommentsSidebar(true)
  }

  const addReply = (commentId: string) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: `reply-${Date.now()}`,
      content: replyContent,
      author: userName,
      timestamp: new Date(),
    }

    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        }
      }
      return comment
    }))

    setReplyContent('')
    setReplyingTo(null)
  }

  const resolveComment = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, resolved: !comment.resolved }
      }
      return comment
    }))
  }

  const deleteComment = (commentId: string) => {
    if (!editor) return

    editor.commands.unsetComment(commentId)
    setComments(prev => prev.filter(comment => comment.id !== commentId))
    setActiveCommentId(null)

    // Hide sidebar if no comments left
    if (comments.length <= 1) {
      setShowCommentsSidebar(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (!editor) {
    return null
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Main editor container - centered */}
      <div className="max-w-4xl mx-auto">
        <EditorContent editor={editor} />
      </div>

      {/* Comment toolbar - positioned relative to centered content */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-xl p-4 border border-gray-200 max-w-md w-full mx-4 z-10">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Add Comment</span>
        </div>
        <div className="flex gap-3">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment to the selected text..."
            className="min-h-[60px] resize-none flex-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-gray-800"
          />
          <Button
            onClick={createComment}
            disabled={!newComment.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4"
          >
            Add
          </Button>
        </div>
      </div>

      {/* AI suggestion hint */}
      {suggestion.isVisible && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-lg z-20 pointer-events-none ai-suggestion-hint">
          Press <kbd className="bg-gray-600 px-1 rounded">Tab</kbd> to accept suggestion
        </div>
      )}

      {/* hide for now */}
      {showAI && false && (
        <AIInteraction
          message={aiMessage}
          onDismiss={() => setShowAI(false)}
        />
      )}

      {/* Comments Sheet */}
      {comments.length > 0 && (
        <Sheet open={showCommentsSidebar} onOpenChange={setShowCommentsSidebar}>
          <SheetTrigger asChild>
            <Button
              className="fixed top-6 right-6 z-20 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              size="sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Comments ({comments.length})
            </Button>
          </SheetTrigger>
          <SheetContent className="w-96 sm:max-w-96">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                Comments ({comments.length})
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
              {comments.map((comment) => (
                <Card
                  key={comment.id}
                  className={`transition-all border ${activeCommentId === comment.id
                    ? 'ring-2 ring-blue-500 border-blue-200 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                    } ${comment.resolved ? 'opacity-60 bg-gray-50' : 'bg-white'}`}
                >
                  <CardHeader className="pb-3 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
                          {comment.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                          <div className="text-xs text-gray-500">{formatTime(comment.timestamp)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => resolveComment(comment.id)}
                          className="h-7 w-7 p-0 hover:bg-green-50"
                        >
                          <Check className={`w-3.5 h-3.5 ${comment.resolved ? 'text-green-600' : 'text-gray-400'}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteComment(comment.id)}
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 p-4">
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">{comment.content}</p>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="space-y-2 ml-2 border-l-2 border-gray-200 pl-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {reply.author.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-xs font-medium text-gray-700">{reply.author}</span>
                              <span className="text-xs text-gray-500">{formatTime(reply.timestamp)}</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply form */}
                    {replyingTo === comment.id ? (
                      <div className="mt-3 space-y-3 border-t border-gray-100 pt-3">
                        <Textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Write a reply..."
                          className="min-h-[60px] resize-none text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => addReply(comment.id)}
                            disabled={!replyContent.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setReplyingTo(null)
                              setReplyContent('')
                            }}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setReplyingTo(comment.id)}
                        className="mt-2 h-7 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <Reply className="w-3 h-3 mr-1" />
                        Reply
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}

              {comments.length === 0 && (
                <div className="text-center text-gray-500 text-sm mt-12 py-8">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p>No comments yet</p>
                  <p className="text-xs mt-1">Select text and add a comment to get started</p>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}