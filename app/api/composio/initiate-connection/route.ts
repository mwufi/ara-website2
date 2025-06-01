import { NextRequest, NextResponse } from 'next/server';
import { OpenAIToolSet } from 'composio-core';

export async function POST(request: NextRequest) {
    try {
        const { appName, entityId } = await request.json();

        if (!appName || !entityId) {
            return NextResponse.json(
                { error: 'appName and entityId are required' },
                { status: 400 }
            );
        }

        // Check if we have the required environment variables
        if (!process.env.COMPOSIO_API_KEY) {
            console.error('COMPOSIO_API_KEY is not set');
            return NextResponse.json(
                { error: 'Composio API key is not configured' },
                { status: 500 }
            );
        }

        const integrationId = getIntegrationId(appName);
        if (!integrationId) {
            console.error(`Integration ID not found for app: ${appName}`);
            return NextResponse.json(
                { error: `Integration ID not configured for ${appName}` },
                { status: 500 }
            );
        }

        console.log(`Initiating OAuth connection for entity ${entityId} with integration ${integrationId}...`);

        const toolset = new OpenAIToolSet({
            apiKey: process.env.COMPOSIO_API_KEY,
        });

        // Initiate the connection
        const connectionRequest = await toolset.connectedAccounts.initiate({
            integrationId: integrationId,
            entityId: entityId,
        });

        console.log('Connection request result:', {
            status: connectionRequest.connectionStatus,
            hasRedirectUrl: !!connectionRequest.redirectUrl,
            connectedAccountId: connectionRequest.connectedAccountId
        });

        // Check if a redirect URL was provided (expected for OAuth)
        if (connectionRequest?.redirectUrl) {
            console.log(`Received redirect URL: ${connectionRequest.redirectUrl}`);
            return NextResponse.json({
                connectionStatus: connectionRequest.connectionStatus,
                connectedAccountId: connectionRequest.connectedAccountId,
                redirectUrl: connectionRequest.redirectUrl,
            });
        } else {
            console.error("Error: Expected a redirectUrl for OAuth flow but didn't receive one.");
            return NextResponse.json(
                {
                    error: 'Expected a redirectUrl for OAuth flow but did not receive one',
                    connectionStatus: connectionRequest.connectionStatus,
                    debug: connectionRequest
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Error initiating connection:', error);

        // Provide more specific error information
        let errorMessage = 'Failed to initiate connection';
        if (error instanceof Error) {
            errorMessage = error.message;
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        }

        return NextResponse.json(
            {
                error: errorMessage,
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

function getIntegrationId(appName: string): string {
    // You would typically store these in environment variables
    // or fetch them from your database based on the app name
    switch (appName.toLowerCase()) {
        case 'gmail':
            const gmailId = process.env.GMAIL_INTEGRATION_ID;
            if (!gmailId) {
                console.error('GMAIL_INTEGRATION_ID environment variable is not set');
            } else {
                console.log(`Using Gmail integration ID: ${gmailId.substring(0, 8)}...`);
            }
            return gmailId || '';
        case 'github':
            const githubId = process.env.GITHUB_INTEGRATION_ID;
            if (!githubId) {
                console.error('GITHUB_INTEGRATION_ID environment variable is not set');
            } else {
                console.log(`Using GitHub integration ID: ${githubId.substring(0, 8)}...`);
            }
            return githubId || '';
        default:
            throw new Error(`Unsupported app: ${appName}`);
    }
} 