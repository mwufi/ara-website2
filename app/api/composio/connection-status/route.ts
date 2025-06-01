import { NextRequest, NextResponse } from 'next/server';
import { OpenAIToolSet } from 'composio-core';

export async function POST(request: NextRequest) {
    try {
        const { connectedAccountId } = await request.json();

        if (!connectedAccountId) {
            return NextResponse.json(
                { error: 'connectedAccountId is required' },
                { status: 400 }
            );
        }

        const toolset = new OpenAIToolSet({
            apiKey: process.env.COMPOSIO_API_KEY,
        });

        // Get the specific connection status
        const connection = await toolset.connectedAccounts.get({
            connectedAccountId: connectedAccountId,
        });

        return NextResponse.json({
            status: connection.status,
            id: connection.id,
            appName: connection.appName,
        });
    } catch (error) {
        console.error('Error checking connection status:', error);
        return NextResponse.json(
            { error: 'Failed to check connection status' },
            { status: 500 }
        );
    }
} 