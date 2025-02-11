'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 p-6">
      <div className="max-w-md rounded-xl border border-blue-200 bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-blue-700">Something's not quite right...</h2>
        <p className="mt-2 font-medium text-gray-600">
          {error.message || 'An unexpected error occurred.'}
        </p>
        {error.digest && <p className="mt-1 text-sm text-gray-500">Error Code: {error.digest}</p>}
        <button
          onClick={() => reset()}
          className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
