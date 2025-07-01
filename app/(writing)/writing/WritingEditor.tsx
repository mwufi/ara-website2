import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect, useRef } from 'react'
import CommentExtension from '@sereneinserenade/tiptap-comment-extension'
import { AISuggestionManager, SuggestionState } from '@/lib/writing/ai-suggestions'
import { useTypingTracker } from '@/lib/writing/typing-tracker'
import { useCommentManager } from '@/lib/writing/comment-manager'
import SuggestionOverlay from '@/components/writing/SuggestionOverlay'
import CommentSystem from '@/components/writing/CommentSystem'

interface WritingEditorProps {
  content: string
  onChange: (content: string) => void
  userName: string
}

export default function WritingEditor({ content, onChange, userName }: WritingEditorProps) {
  const [suggestion, setSuggestion] = useState<SuggestionState>({
    text: '',
    position: 0,
    isVisible: false
  })

  const aiSuggestionManagerRef = useRef<AISuggestionManager | null>(null)
  const { typingStats, updateActivity } = useTypingTracker()
  const {
    comments,
    activeCommentId,
    showCommentsSidebar,
    setShowCommentsSidebar,
    createComment,
    addReply,
    resolveComment,
    deleteComment,
    handleCommentActivated
  } = useCommentManager()

  // Initialize AI suggestion manager
  useEffect(() => {
    aiSuggestionManagerRef.current = new AISuggestionManager(setSuggestion)
    return () => {
      aiSuggestionManagerRef.current?.cleanup()
    }
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      CommentExtension.configure({
        HTMLAttributes: {
          class: 'comment-highlight',
        },
        onCommentActivated: handleCommentActivated,
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
        if (event.key === 'Tab' && suggestion.isVisible && aiSuggestionManagerRef.current) {
          event.preventDefault()
          aiSuggestionManagerRef.current.acceptSuggestion(editor, suggestion)
          return true
        }
        return false
      },
    },
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML()
      onChange(newContent)

      // Update typing activity tracking
      updateActivity(editor)

      // Clear existing suggestion when user types
      if (suggestion.isVisible && aiSuggestionManagerRef.current) {
        aiSuggestionManagerRef.current.clearSuggestion()
      }

      // Schedule new AI suggestion
      if (aiSuggestionManagerRef.current) {
        aiSuggestionManagerRef.current.scheduleSuggestion(editor)
      }
    },
    onSelectionUpdate: ({ editor }) => {
      // Clear suggestion when cursor moves
      if (suggestion.isVisible && aiSuggestionManagerRef.current) {
        aiSuggestionManagerRef.current.clearSuggestion()
      }
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Main editor container - centered */}
      <div className="max-w-4xl mx-auto">
        <EditorContent editor={editor} />
      </div>

      {/* AI Suggestion Overlay */}
      <SuggestionOverlay editor={editor} suggestion={suggestion} />

      {/* Comment System */}
      <CommentSystem
        userName={userName}
        editor={editor}
        comments={comments}
        activeCommentId={activeCommentId}
        showCommentsSidebar={showCommentsSidebar}
        setShowCommentsSidebar={setShowCommentsSidebar}
        createComment={createComment}
        addReply={addReply}
        resolveComment={resolveComment}
        deleteComment={deleteComment}
      />
    </div>
  )
}