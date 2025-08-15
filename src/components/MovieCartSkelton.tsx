function MovieCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg overflow-hidden shadow-md bg-gray-200">
      <div className="h-80 bg-gray-300"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>

      <div className="px-4 pb-2 space-y-2 flex gap-3">
        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
}

export default MovieCardSkeleton;
