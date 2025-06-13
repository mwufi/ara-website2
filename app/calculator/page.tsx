'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CalculatorRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Generate a random room ID
    const randomRoomId = Math.random().toString(36).substring(2, 15);
    router.push(`/calculator/${randomRoomId}`);
  }, [router]);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Creating new calculator room...</p>
      </div>
    </div>
  );
}