import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { OpenAIToolSet } from 'composio-core';

export async function POST(request: NextRequest) {
    try {
        const { entityId, to, subject, body } = await request.json();

        if (!entityId || !to || !subject || !body) {
            return NextResponse.json(
                { error: 'entityId, to, subject, and body are required' },
                { status: 400 }
            );
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const toolset = new OpenAIToolSet({
            apiKey: process.env.COMPOSIO_API_KEY,
        });

        // Get Gmail draft tools
        const tools = await toolset.getTools({
            actions: ['GMAIL_CREATE_DRAFT'],
        });

        // Create instruction for creating a draft
        const instruction = `Create a Gmail draft with the following details:
    To: ${to}
    Subject: ${subject}
    Body: ${body}`;

        // Call OpenAI with Composio tools
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [{ role: 'user', content: instruction }],
            tools: tools,
            tool_choice: 'auto',
        });

        // Handle the tool call
        const toolResponse = await toolset.handleToolCall(response, entityId);

        return NextResponse.json({
            success: true,
            message: 'Draft created successfully',
            draftId: extractDraftId(toolResponse),
            response: toolResponse,
        });
    } catch (error) {
        console.error('Error creating draft:', error);
        return NextResponse.json(
            { error: 'Failed to create draft' },
            { status: 500 }
        );
    }
}

function extractDraftId(toolResponse: any): string | null {
    try {
        // Try to extract draft ID from various possible response structures
        if (toolResponse && typeof toolResponse === 'object') {
            if (toolResponse.id) return toolResponse.id;
            if (toolResponse.draftId) return toolResponse.draftId;
            if (toolResponse.data && toolResponse.data.id) return toolResponse.data.id;
            if (Array.isArray(toolResponse) && toolResponse[0] && toolResponse[0].id) {
                return toolResponse[0].id;
            }
        }
        return null;
    } catch (error) {
        console.error('Error extracting draft ID:', error);
        return null;
    }
} 