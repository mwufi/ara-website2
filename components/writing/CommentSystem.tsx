import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { MessageCircle, X, Reply, Check } from 'lucide-react'
import { Comment } from '@/lib/writing/comment-manager'

interface CommentSystemProps {
    userName: string
    editor: any
    comments: Comment[]
    activeCommentId: string | null
    showCommentsSidebar: boolean
    setShowCommentsSidebar: (show: boolean) => void
    createComment: (content: string, author: string, editor?: any) => string | null
    addReply: (commentId: string, content: string, author: string) => void
    resolveComment: (commentId: string) => void
    deleteComment: (commentId: string, editor?: any) => void
}

export default function CommentSystem({
    userName,
    editor,
    comments,
    activeCommentId,
    showCommentsSidebar,
    setShowCommentsSidebar,
    createComment,
    addReply,
    resolveComment,
    deleteComment
}: CommentSystemProps) {
    const [newComment, setNewComment] = useState('')
    const [replyingTo, setReplyingTo] = useState<string | null>(null)
    const [replyContent, setReplyContent] = useState('')

    const handleCreateComment = () => {
        createComment(newComment, userName, editor)
        setNewComment('')
    }

    const handleAddReply = (commentId: string) => {
        addReply(commentId, replyContent, userName)
        setReplyContent('')
        setReplyingTo(null)
    }

    const handleDeleteComment = (commentId: string) => {
        deleteComment(commentId, editor)
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    return (
        <>
            {/* Comment Toolbar */}
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
                        onClick={handleCreateComment}
                        disabled={!newComment.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                    >
                        Add
                    </Button>
                </div>
            </div>

            {/* Comments Sidebar */}
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
                                                    onClick={() => handleDeleteComment(comment.id)}
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
                                                        onClick={() => handleAddReply(comment.id)}
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
        </>
    )
} 