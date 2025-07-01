import { useEffect } from 'react'
import { SuggestionState } from '@/lib/writing/ai-suggestions'

interface SuggestionOverlayProps {
    editor: any
    suggestion: SuggestionState
}

export default function SuggestionOverlay({ editor, suggestion }: SuggestionOverlayProps) {
    useEffect(() => {
        if (!editor || !suggestion.isVisible) return

        const editorElement = editor.view.dom as HTMLElement
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
        opacity: 0;
        transform: translateY(2px);
        transition: all 0.3s ease-out;
      `
            editorElement.appendChild(suggestionElement)
        }

        suggestionElement.textContent = suggestion.text

        // Position the suggestion at the cursor
        try {
            const selection = editor.view.state.selection
            const cursorPos = editor.view.coordsAtPos(selection.from)
            const editorRect = editorElement.getBoundingClientRect()

            suggestionElement.style.left = `${cursorPos.left - editorRect.left}px`
            suggestionElement.style.top = `${cursorPos.top - editorRect.top}px`

            // Trigger fade-in animation
            requestAnimationFrame(() => {
                suggestionElement.style.opacity = '1'
                suggestionElement.style.transform = 'translateY(0)'
            })
        } catch (error) {
            console.warn('Error positioning suggestion:', error)
        }

        return () => {
            const element = editorElement.querySelector('.ai-suggestion-overlay')
            if (element) {
                element.remove()
            }
        }
    }, [editor, suggestion])

    // Show Tab hint when suggestion is visible
    if (!suggestion.isVisible) return null

    return (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-lg z-20 pointer-events-none ai-suggestion-hint animate-pulse">
            Press <kbd className="bg-gray-600 px-1 rounded">Tab</kbd> to accept suggestion
        </div>
    )
} 