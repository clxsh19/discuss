'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <div className="max-w-md p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        {/* Icon */}
        <div className="text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M9.879 9.879A3 3 0 116.342 6.34m12.73 5.43l-1.067-1.068a4.5 4.5 0 00-6.364 0l-1.067 1.068m1.854 1.854a4.5 4.5 0 006.364 0m-1.854-1.854l1.067 1.068"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mt-4">Oops! Something went wrong</h1>

        {/* Message */}
        <p className="mt-2 text-gray-400 text-sm">{error.message}</p>

        {/* Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-500 focus:outline-none"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}
