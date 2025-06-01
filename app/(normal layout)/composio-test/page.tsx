'use client';

import { useState } from 'react';
import { ComposioConnectionManager } from '@/components/ComposioConnectionManager';

export default function ComposioTestPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Composio Integration Test
                    </h1>

                    <div className="space-y-8">
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Connect Your Accounts
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Test connecting to various services through Composio. Start by connecting your Gmail account.
                            </p>
                        </div>

                        <ComposioConnectionManager />
                    </div>
                </div>
            </div>
        </div>
    );
} 