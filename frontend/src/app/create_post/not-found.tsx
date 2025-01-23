export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-neutral-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Community Not Found</h1>
      <p className="text-lg text-gray-400 mb-6">
        The community you're looking for doesn't exist or has been removed.
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-500 transition-all"
      >
        Go Back to Home
      </a>
    </div>
  );
}
