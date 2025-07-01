export interface SuggestionState {
    text: string
    position: number
    isVisible: boolean
}

export class AISuggestionManager {
    private suggestionTimeoutRef: NodeJS.Timeout | null = null
    private suggestionAutoHideRef: NodeJS.Timeout | null = null
    private onSuggestionChange: (suggestion: SuggestionState) => void

    constructor(onSuggestionChange: (suggestion: SuggestionState) => void) {
        this.onSuggestionChange = onSuggestionChange
    }

    // Generate AI suggestion based on current content and cursor position
    generateSuggestion = async (editor: any) => {
        if (!editor) return

        const { from } = editor.state.selection
        const docText = editor.state.doc.textContent
        const beforeCursor = docText.slice(0, from)
        const afterCursor = docText.slice(from)

        // Only suggest if there's meaningful content before cursor
        if (beforeCursor.trim().length < 10) return

        // Get the last sentence or paragraph for context
        const lastSentence = beforeCursor.split(/[.!?]/).pop()?.trim() || beforeCursor.slice(-100)

        // Generate contextual suggestion
        const suggestionText = this.generateContextualSuggestion(lastSentence, afterCursor)

        if (suggestionText && suggestionText.trim()) {
            this.showSuggestion(suggestionText, from)
        }
    }

    // Accept the current suggestion with smooth inline insertion
    acceptSuggestion = (editor: any, suggestion: SuggestionState) => {
        if (!editor || !suggestion.isVisible) return

        const { from } = editor.state.selection

        // Insert text inline at cursor position
        editor.chain().focus().insertContentAt(from, suggestion.text).run()

        // Add fade-in animation to newly inserted text
        this.animateInsertedText(editor, from, suggestion.text.length)

        this.clearSuggestion()
    }

    // Show a suggestion at the current cursor position
    showSuggestion = (text: string, position: number) => {
        this.onSuggestionChange({ text, position, isVisible: true })

        // Auto-hide after 8 seconds
        if (this.suggestionAutoHideRef) {
            clearTimeout(this.suggestionAutoHideRef)
        }
        this.suggestionAutoHideRef = setTimeout(() => {
            this.clearSuggestion()
        }, 8000)
    }

    // Clear the current suggestion
    clearSuggestion = () => {
        this.onSuggestionChange({ text: '', position: 0, isVisible: false })

        if (this.suggestionAutoHideRef) {
            clearTimeout(this.suggestionAutoHideRef)
            this.suggestionAutoHideRef = null
        }
    }

    // Schedule suggestion generation after user stops typing
    scheduleSuggestion = (editor: any, delay: number = 2000) => {
        if (this.suggestionTimeoutRef) {
            clearTimeout(this.suggestionTimeoutRef)
        }

        this.suggestionTimeoutRef = setTimeout(() => {
            this.generateSuggestion(editor)
        }, delay)
    }

    // Add smooth fade-in animation to newly inserted text
    private animateInsertedText = (editor: any, startPos: number, length: number) => {
        setTimeout(() => {
            const editorElement = editor.view.dom
            const textNodes = this.getTextNodesInRange(editorElement, startPos, startPos + length)

            textNodes.forEach(node => {
                if (node.parentElement) {
                    const span = document.createElement('span')
                    span.className = 'ai-inserted-text'
                    span.style.cssText = `
            opacity: 0;
            transform: translateY(2px);
            transition: all 0.4s ease-out;
          `

                    // Wrap the text node
                    node.parentElement.insertBefore(span, node)
                    span.appendChild(node)

                    // Trigger animation
                    requestAnimationFrame(() => {
                        span.style.opacity = '1'
                        span.style.transform = 'translateY(0)'
                    })

                    // Remove wrapper after animation
                    setTimeout(() => {
                        if (span.parentElement) {
                            span.parentElement.insertBefore(node, span)
                            span.remove()
                        }
                    }, 400)
                }
            })
        }, 10)
    }

    // Helper to get text nodes in a range (simplified)
    private getTextNodesInRange = (element: Element, start: number, end: number): Text[] => {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null
        )

        const textNodes: Text[] = []
        let currentPos = 0
        let node

        while (node = walker.nextNode()) {
            const textNode = node as Text
            const nodeLength = textNode.textContent?.length || 0

            if (currentPos + nodeLength > start && currentPos < end) {
                textNodes.push(textNode)
            }

            currentPos += nodeLength
            if (currentPos >= end) break
        }

        return textNodes
    }

    // Simple suggestion generator (replace with actual AI)
    private generateContextualSuggestion = (context: string, afterText: string): string => {
        const contextLower = context.toLowerCase()

        // Don't suggest if there's already text right after cursor (unless it's a new paragraph)
        if (afterText.trim().length > 0 && !afterText.startsWith('\n')) {
            return ''
        }

        // Improved contextual suggestions that continue the sentence
        if (contextLower.includes('however') || contextLower.includes('but')) {
            return ' this approach has its limitations'
        }
        if (contextLower.includes('first') || contextLower.includes('initially')) {
            return ' we need to consider the broader implications'
        }
        if (contextLower.includes('therefore') || contextLower.includes('thus')) {
            return ' we can conclude that this method is effective'
        }
        if (contextLower.includes('interesting') || contextLower.includes('fascinating')) {
            return ' phenomenon that deserves further investigation'
        }
        if (contextLower.includes('problem') || contextLower.includes('issue')) {
            return ' requires a comprehensive solution'
        }
        if (contextLower.includes('research') || contextLower.includes('study')) {
            return ' indicates that further analysis is needed'
        }

        // Sentence continuation based on endings
        if (context.trim().endsWith(',')) {
            return ' which opens up new possibilities for exploration'
        }
        if (context.trim().endsWith(':')) {
            return ' understanding the core principles is essential'
        }
        if (context.trim().endsWith('and')) {
            return ' provides valuable insights into the underlying mechanisms'
        }

        return '' // No suggestion if no good match
    }

    // Cleanup method
    cleanup = () => {
        if (this.suggestionTimeoutRef) {
            clearTimeout(this.suggestionTimeoutRef)
        }
        if (this.suggestionAutoHideRef) {
            clearTimeout(this.suggestionAutoHideRef)
        }
    }
} 