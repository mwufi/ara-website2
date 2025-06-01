'use client';

import { useState, useEffect } from 'react';
import { ConnectionStatus } from './ConnectionStatus';
import { GmailActions } from './GmailActions';

interface Connection {
    id: string;
    appName: string;
    status: 'ACTIVE' | 'INITIATED' | 'DISABLED';
    entityId: string;
}

interface ConnectionRequest {
    connectionStatus: string;
    connectedAccountId?: string;
    redirectUrl?: string;
    waitUntilActive?: (timeout: number) => Promise<Connection>;
}

export function ComposioConnectionManager() {
    const [connections, setConnections] = useState<Connection[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string>('');

    // Initialize user ID from localStorage or generate new one
    useEffect(() => {
        const initializeUserId = () => {
            if (typeof window !== 'undefined') {
                const storedUserId = localStorage.getItem('composio-test-user-id');
                if (storedUserId) {
                    setCurrentUserId(storedUserId);
                } else {
                    const newUserId = 'test-user-' + Math.random().toString(36).substr(2, 9);
                    localStorage.setItem('composio-test-user-id', newUserId);
                    setCurrentUserId(newUserId);
                }
            }
        };

        initializeUserId();
    }, []);

    // Load existing connections when user ID is set
    useEffect(() => {
        if (currentUserId) {
            loadConnections();
        }
    }, [currentUserId]);

    const loadConnections = async () => {
        if (!currentUserId) return;

        try {
            setLoading(true);
            const response = await fetch('/api/composio/connections', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entityId: currentUserId }),
            });

            if (response.ok) {
                const data = await response.json();
                setConnections(data.connections || []);
            }
        } catch (err) {
            console.error('Failed to load connections:', err);
        } finally {
            setLoading(false);
        }
    };

    const resetUserId = () => {
        const newUserId = 'test-user-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('composio-test-user-id', newUserId);
        setCurrentUserId(newUserId);
        setConnections([]);
        setError(null);
        setSuccess('User ID reset! This will create a fresh testing session.');
    };

    const initiateGmailConnection = async () => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

            const response = await fetch('/api/composio/initiate-connection', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    appName: 'gmail',
                    entityId: currentUserId,
                }),
            });

            const data = await response.json();

            if (response.ok && data.redirectUrl) {
                setSuccess('Redirecting to Gmail authorization...');
                // Open OAuth flow in a popup or redirect
                window.open(data.redirectUrl, 'oauth', 'width=600,height=600');

                // Poll for connection completion
                pollForConnection(data.connectedAccountId);
            } else {
                // Show more detailed error information
                let errorMessage = data.error || 'Failed to initiate connection';
                if (data.details) {
                    errorMessage += ` (Details: ${data.details})`;
                }

                // Log the full response for debugging
                console.error('Connection initiation failed:', data);

                throw new Error(errorMessage);
            }
        } catch (err) {
            console.error('Error in initiateGmailConnection:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const pollForConnection = async (connectedAccountId: string) => {
        const maxAttempts = 30; // 5 minutes (10s intervals)
        let attempts = 0;

        const poll = async () => {
            try {
                const response = await fetch('/api/composio/connection-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ connectedAccountId }),
                });

                const data = await response.json();

                if (data.status === 'ACTIVE') {
                    setSuccess('Gmail connection established successfully!');
                    loadConnections();
                    return;
                }

                attempts++;
                if (attempts < maxAttempts) {
                    setTimeout(poll, 10000); // Poll every 10 seconds
                } else {
                    setError('Connection timeout. Please try again.');
                }
            } catch (err) {
                console.error('Failed to poll connection status:', err);
                setError('Failed to check connection status');
            }
        };

        poll();
    };

    const disconnectAccount = async (connectionId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/composio/disconnect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ connectionId }),
            });

            if (response.ok) {
                setSuccess('Account disconnected successfully');
                loadConnections();
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Failed to disconnect account');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const gmailConnection = connections.find(conn => conn.appName === 'gmail' && conn.status === 'ACTIVE');

    // Don't render until user ID is initialized
    if (!currentUserId) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Status Messages */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">{error}</div>
                        </div>
                    </div>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">Success</h3>
                            <div className="mt-2 text-sm text-green-700">{success}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* User ID Display */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-blue-800">Current Test User ID</h3>
                        <div className="mt-1 text-sm text-blue-700 font-mono">{currentUserId}</div>
                        <div className="mt-1 text-xs text-blue-600">
                            This ID persists across page refreshes and is stored in localStorage
                        </div>
                    </div>
                    <button
                        onClick={resetUserId}
                        className="text-sm text-blue-600 hover:text-blue-700 underline"
                        title="Generate a new user ID for fresh testing"
                    >
                        Reset User ID
                    </button>
                </div>
            </div>

            {/* Connection Status */}
            <ConnectionStatus connections={connections} loading={loading} />

            {/* Gmail Connection */}
            <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Gmail Integration</h3>

                {!gmailConnection ? (
                    <div className="space-y-4">
                        <p className="text-gray-600">
                            Connect your Gmail account to test email actions like fetching emails and creating drafts.
                        </p>
                        <button
                            onClick={initiateGmailConnection}
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Connecting...' : 'Connect Gmail Account'}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                <span className="text-sm text-gray-900">Gmail Connected</span>
                            </div>
                            <button
                                onClick={() => disconnectAccount(gmailConnection.id)}
                                disabled={loading}
                                className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
                            >
                                Disconnect
                            </button>
                        </div>

                        <GmailActions
                            connectionId={gmailConnection.id}
                            entityId={currentUserId}
                        />
                    </div>
                )}
            </div>
        </div>
    );
} 