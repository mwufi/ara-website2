import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { OpenAIToolSet } from 'composio-core';

export async function POST(request: NextRequest) {
  try {
    const { entityId, maxResults = 10 } = await request.json();

    if (!entityId) {
      return NextResponse.json(
        { error: 'entityId is required' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const toolset = new OpenAIToolSet({
      apiKey: process.env.COMPOSIO_API_KEY,
    });

    // Get Gmail tools
    const tools = await toolset.getTools({
      actions: ['GMAIL_FETCH_EMAILS'],
    });

    // Create instruction for fetching emails
    const instruction = `Fetch ${maxResults} recent emails from Gmail`;

    // Call OpenAI with Composio tools
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: instruction }],
      tools: tools,
      tool_choice: 'auto',
    });

    // Handle the tool call
    const toolResponse = await toolset.handleToolCall(response, entityId);

    // Extract emails from the response
    const emails = extractEmailsFromResponse(toolResponse);

    return NextResponse.json({
      emails: emails,
      count: emails.length,
    });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}

function extractEmailsFromResponse(toolResponse: any) {
  try {
    // The structure of toolResponse may vary based on Composio's response format
    // This is a basic extraction - you may need to adjust based on actual response structure
    if (toolResponse && Array.isArray(toolResponse)) {
      return toolResponse.map((email: any) => ({
        id: email.id || Math.random().toString(36),
        subject: email.subject || '(No Subject)',
        from: email.from || 'Unknown Sender',
        snippet: email.snippet || email.body || '',
        receivedAt: email.date || email.receivedAt || new Date().toISOString(),
      }));
    }
    
    // If toolResponse has a different structure, try to extract from it
    if (toolResponse && toolResponse.data && Array.isArray(toolResponse.data)) {
      return toolResponse.data.map((email: any) => ({
        id: email.id || Math.random().toString(36),
        subject: email.subject || '(No Subject)',
        from: email.from || 'Unknown Sender',
        snippet: email.snippet || email.body || '',
        receivedAt: email.date || email.receivedAt || new Date().toISOString(),
      }));
    }

    return [];
  } catch (error) {
    console.error('Error extracting emails:', error);
    return [];
  }
} 