# Composio Integration Test Page

This page allows you to test Composio integrations, specifically for connecting to Gmail and other services via OAuth.

## Setup

### 1. Environment Variables

You need to set up the following environment variables in your `.env.local` file:

```bash
# OpenAI API Key for using GPT models with Composio
OPENAI_API_KEY=your_openai_api_key_here

# Composio API Key - get this from your Composio dashboard
COMPOSIO_API_KEY=your_composio_api_key_here

# Integration IDs - get these from your Composio integrations setup
GMAIL_INTEGRATION_ID=your_gmail_integration_id_here
GITHUB_INTEGRATION_ID=your_github_integration_id_here
```

### 2. Setting up Composio Integrations

1. **Sign up for Composio**: Go to [Composio](https://composio.dev) and create an account
2. **Get your API Key**: From your Composio dashboard, copy your API key
3. **Create Integrations**: 
   - Go to Integrations in your Composio dashboard
   - Create a new integration for Gmail
   - Copy the Integration ID for Gmail
   - Repeat for any other services you want to test

### 3. Gmail Integration Setup

For Gmail, you'll need to:

1. Create a Gmail integration in Composio
2. Configure OAuth scopes (typically `https://www.googleapis.com/auth/gmail.readonly` and `https://www.googleapis.com/auth/gmail.compose`)
3. Set up redirect URLs if using custom OAuth flows

## Features

### Connection Management
- **View Connection Status**: See all connected accounts for a test user
- **Connect Gmail**: Initiate OAuth flow to connect a Gmail account
- **Disconnect Accounts**: Remove connected accounts

### Gmail Actions
- **Fetch Emails**: Retrieve recent emails from connected Gmail account
- **Create Drafts**: Create email drafts with custom content

## Usage

1. Navigate to `/composio-test` in your app
2. Click "Connect Gmail Account" to start the OAuth flow
3. Complete the authorization in the popup window
4. Once connected, you can:
   - Fetch recent emails
   - Create email drafts with custom content
   - Use the "Fill Sample Data" button for quick testing

## How It Works

The integration uses:

1. **Composio SDK**: For managing connections and executing actions
2. **OpenAI**: To process natural language instructions and convert them to API calls
3. **OAuth Flow**: For secure authentication with external services

### Architecture

```
Frontend Components
├── ComposioConnectionManager (main component)
├── ConnectionStatus (displays connected accounts)
└── GmailActions (email actions interface)

API Routes
├── /api/composio/initiate-connection (start OAuth flow)
├── /api/composio/connections (list connections)
├── /api/composio/connection-status (check connection status)
├── /api/composio/gmail/fetch-emails (fetch emails)
├── /api/composio/gmail/create-draft (create drafts)
└── /api/composio/disconnect (disconnect accounts)
```

## Testing

1. **Connection Flow**: Test connecting and disconnecting accounts
2. **Email Fetching**: Verify that emails are retrieved correctly
3. **Draft Creation**: Test creating drafts with various content
4. **Error Handling**: Test with invalid credentials or disconnected accounts

## Troubleshooting

### Common Issues

1. **"Integration not found"**: Make sure your `GMAIL_INTEGRATION_ID` is correct
2. **"Connection timeout"**: The OAuth flow might have been cancelled or timed out
3. **"Failed to fetch emails"**: Check that the Gmail account is properly connected and has the right permissions
4. **API Key errors**: Verify your `COMPOSIO_API_KEY` and `OPENAI_API_KEY` are correct

### Debug Steps

1. Check browser console for JavaScript errors
2. Check Next.js server logs for API errors
3. Verify environment variables are set correctly
4. Test API endpoints directly using tools like Postman

## Next Steps

- Add support for more integrations (GitHub, Slack, etc.)
- Implement real-time connection status updates
- Add more Gmail actions (send emails, manage labels, etc.)
- Add connection persistence and user management 