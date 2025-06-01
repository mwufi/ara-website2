'use client';

import { useState } from 'react';

interface GmailActionsProps {
    connectionId: string;
    entityId: string;
}

interface Email {
    id: string;
    subject: string;
    from: string;
    snippet: string;
    receivedAt: string;
}

export function GmailActions({ connectionId, entityId }: GmailActionsProps) {
    const [loading, setLoading] = useState(false);
    const [emails, setEmails] = useState<Email[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Draft form state
    const [draftForm, setDraftForm] = useState({
        to: '',
        subject: '',
        body: '',
    });

    const fetchEmails = async () => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

            const response = await fetch('/api/composio/gmail/fetch-emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    entityId,
                    maxResults: 10,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setEmails(data.emails || []);
                setSuccess(`Fetched ${data.emails?.length || 0} emails successfully!`);
            } else {
                throw new Error(data.error || 'Failed to fetch emails');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const createDraft = async () => {
        if (!draftForm.to || !draftForm.subject || !draftForm.body) {
            setError('Please fill in all fields for the draft');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

            const response = await fetch('/api/composio/gmail/create-draft', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    entityId,
                    to: draftForm.to,
                    subject: draftForm.subject,
                    body: draftForm.body,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Draft created successfully!');
                setDraftForm({ to: '', subject: '', body: '' });
            } else {
                throw new Error(data.error || 'Failed to create draft');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const fillSampleDraft = () => {
        setDraftForm({
            to: 'test@example.com',
            subject: 'Test Email from Composio',
            body: 'This is a test email created through the Composio integration. Hello from the test page!',
        });
    };

    return (
        <div className="space-y-6">
            {/* Status Messages */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <div className="text-sm text-red-700">{error}</div>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3">
                    <div className="text-sm text-green-700">{success}</div>
                </div>
            )}

            {/* Fetch Emails Section */}
            <div className="border-t border-gray-200 pt-4">
                <h4 className="text-md font-medium text-gray-900 mb-3">Fetch Recent Emails</h4>
                <div className="space-y-3">
                    <button
                        onClick={fetchEmails}
                        disabled={loading}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Fetching...' : 'Fetch 10 Recent Emails'}
                    </button>

                    {emails.length > 0 && (
                        <div className="mt-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Recent Emails:</h5>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {emails.map((email) => (
                                    <div key={email.id} className="bg-gray-50 p-3 rounded-md">
                                        <div className="text-sm font-medium text-gray-900 truncate">
                                            {email.subject || '(No Subject)'}
                                        </div>
                                        <div className="text-xs text-gray-600">From: {email.from}</div>
                                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                            {email.snippet}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Draft Section */}
            <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-md font-medium text-gray-900">Create Email Draft</h4>
                    <button
                        onClick={fillSampleDraft}
                        className="text-sm text-blue-600 hover:text-blue-700"
                    >
                        Fill Sample Data
                    </button>
                </div>

                <div className="space-y-3">
                    <div>
                        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
                            To
                        </label>
                        <input
                            type="email"
                            id="to"
                            value={draftForm.to}
                            onChange={(e) => setDraftForm({ ...draftForm, to: e.target.value })}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="recipient@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            value={draftForm.subject}
                            onChange={(e) => setDraftForm({ ...draftForm, subject: e.target.value })}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Email subject"
                        />
                    </div>

                    <div>
                        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            id="body"
                            rows={4}
                            value={draftForm.body}
                            onChange={(e) => setDraftForm({ ...draftForm, body: e.target.value })}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Type your message here..."
                        />
                    </div>

                    <button
                        onClick={createDraft}
                        disabled={loading || !draftForm.to || !draftForm.subject || !draftForm.body}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating...' : 'Create Draft'}
                    </button>
                </div>
            </div>
        </div>
    );
} 