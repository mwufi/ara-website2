interface Connection {
    id: string;
    appName: string;
    status: 'ACTIVE' | 'INITIATED' | 'DISABLED';
    entityId: string;
}

interface ConnectionStatusProps {
    connections: Connection[];
    loading: boolean;
}

export function ConnectionStatus({ connections, loading }: ConnectionStatusProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return 'bg-green-100 text-green-800';
            case 'INITIATED':
                return 'bg-yellow-100 text-yellow-800';
            case 'DISABLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return '✅';
            case 'INITIATED':
                return '⏳';
            case 'DISABLED':
                return '❌';
            default:
                return '❓';
        }
    };

    if (loading) {
        return (
            <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Connection Status</h3>
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Connection Status</h3>

            {connections.length === 0 ? (
                <p className="text-gray-500 text-sm">No connections found. Connect an account to get started.</p>
            ) : (
                <div className="space-y-3">
                    {connections.map((connection) => (
                        <div
                            key={connection.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-lg">{getStatusIcon(connection.status)}</span>
                                <div>
                                    <div className="font-medium text-gray-900 capitalize">
                                        {connection.appName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        ID: {connection.id.slice(0, 8)}...
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                        connection.status
                                    )}`}
                                >
                                    {connection.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 