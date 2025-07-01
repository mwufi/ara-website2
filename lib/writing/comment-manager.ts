import { useState } from 'react'

export interface Comment {
    id: string
    content: string
    author: string
    timestamp: Date
    replies?: Comment[]
    resolved?: boolean
}

export function useCommentManager() {
    const [comments, setComments] = useState<Comment[]>([])
    const [activeCommentId, setActiveCommentId] = useState<string | null>(null)
    const [showCommentsSidebar, setShowCommentsSidebar] = useState(false)

    const createComment = (content: string, author: string, editor?: any) => {
        if (!content.trim()) return null

        const commentId = `comment-${Date.now()}`
        const comment: Comment = {
            id: commentId,
            content,
            author,
            timestamp: new Date(),
            replies: [],
            resolved: false,
        }

        // Add comment to the selected text if editor is provided
        if (editor) {
            editor.commands.setComment(commentId)
        }

        setComments(prev => [...prev, comment])
        setActiveCommentId(commentId)
        setShowCommentsSidebar(true)

        return commentId
    }

    const addReply = (commentId: string, content: string, author: string) => {
        if (!content.trim()) return

        const reply: Comment = {
            id: `reply-${Date.now()}`,
            content,
            author,
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
    }

    const resolveComment = (commentId: string) => {
        setComments(prev => prev.map(comment => {
            if (comment.id === commentId) {
                return { ...comment, resolved: !comment.resolved }
            }
            return comment
        }))
    }

    const deleteComment = (commentId: string, editor?: any) => {
        if (editor) {
            editor.commands.unsetComment(commentId)
        }

        setComments(prev => prev.filter(comment => comment.id !== commentId))
        setActiveCommentId(null)

        // Hide sidebar if no comments left
        if (comments.length <= 1) {
            setShowCommentsSidebar(false)
        }
    }

    const handleCommentActivated = (commentId: string) => {
        setActiveCommentId(commentId)
        if (commentId && comments.length > 0) {
            setShowCommentsSidebar(true)
        }
    }

    return {
        comments,
        activeCommentId,
        showCommentsSidebar,
        setShowCommentsSidebar,
        createComment,
        addReply,
        resolveComment,
        deleteComment,
        handleCommentActivated
    }
} 