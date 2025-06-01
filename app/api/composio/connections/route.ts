import { NextRequest, NextResponse } from 'next/server';
import { OpenAIToolSet } from 'composio-core';

export async function POST(request: NextRequest) {
    try {
        const { entityId } = await request.json();

        if (!entityId) {
            return NextResponse.json(
                { error: 'entityId is required' },
                { status: 400 }
            );
        }

        const toolset = new OpenAIToolSet({
            apiKey: process.env.COMPOSIO_API_KEY,
        });

        // Get all connections for the entity
        const connections = await toolset.connectedAccounts.list({
            entityId: entityId,
        });

        return NextResponse.json({
            connections: connections.items || [],
        });
    } catch (error) {
        console.error('Error fetching connections:', error);
        return NextResponse.json(
            { error: 'Failed to fetch connections' },
            { status: 500 }
        );
    }
} 