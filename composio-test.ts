import { OpenAI } from "openai";
import { OpenAIToolSet } from "composio-core";

import * as dotenv from 'dotenv';
dotenv.config();

const openai_client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Initialise the Composio Tool Set
const composio_toolset = new OpenAIToolSet({
    apiKey: process.env.COMPOSIO_API_KEY
});

async function github_integration() {
    const tools = await composio_toolset.getTools({
        actions: ["github_unstar_a_repository_for_the_authenticated_user"],
    });
    const instruction = "Unstar a repo composiohq/composio on GitHub";

    // Initialise the Composio Tool Set
    const response = await openai_client.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: instruction }],
        tools: tools,
        tool_choice: "auto",
    });

    const resp = await composio_toolset.handleToolCall(response);
    console.log(resp);
}

async function setup_google_integration() {
    const toolset = new OpenAIToolSet({ apiKey: '9iqimaencjuhfhumru7dsa' });

    const integration = await toolset.integrations.get({ integrationId: 'f69d7c64-0945-46ae-9584-1fffafb31e93' });
    const expectedInputFields = await toolset.integrations.getRequiredParams({ integrationId: integration.id! });
    // Collect auth params from your users
    console.log(expectedInputFields);

    // 2 --- get the account from the user
    const connectedAccount = await toolset.connectedAccounts.initiate({
        integrationId: integration.id,
        entityId: 'default',
    });

    // connected account properties:
    // connectionStatus (string), connectedAccountId (string), redirectUrl (string | null)
    console.log(connectedAccount.redirectUrl);
}

async function do_google_integration() {
    const tools = await composio_toolset.getTools({
        actions: ["GMAIL_CREATE_LABEL"]
    });


    const instruction = "Create a new label in my gmail account called 'test'";

    // Creating a chat completion request to the OpenAI model
    const response = await openai_client.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: instruction }],
        tools: tools,
        tool_choice: "auto",
    });

    const tool_response = await composio_toolset.handleToolCall(response);

    console.log(tool_response);
}

async function main() {
    // await github_integration();
    // await setup_google_integration();
    await do_google_integration();
}

main();
