import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const config = {
            hasComposioApiKey: !!process.env.COMPOSIO_API_KEY,
            hasOpenaiApiKey: !!process.env.OPENAI_API_KEY,
            hasGmailIntegrationId: !!process.env.GMAIL_INTEGRATION_ID,
            hasGithubIntegrationId: !!process.env.GITHUB_INTEGRATION_ID,
            composioApiKeyPrefix: process.env.COMPOSIO_API_KEY ?
                process.env.COMPOSIO_API_KEY.substring(0, 8) + '...' : 'NOT SET',
            gmailIntegrationIdPrefix: process.env.GMAIL_INTEGRATION_ID ?
                process.env.GMAIL_INTEGRATION_ID.substring(0, 8) + '...' : 'NOT SET'
        };

        return NextResponse.json({
            status: 'Configuration Check',
            config,
            allRequiredSet: config.hasComposioApiKey && config.hasOpenaiApiKey && config.hasGmailIntegrationId
        });
    } catch (error) {
        console.error('Error checking config:', error);
        return NextResponse.json(
            { error: 'Failed to check configuration' },
            { status: 500 }
        );
    }
} 