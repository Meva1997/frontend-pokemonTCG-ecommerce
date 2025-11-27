export default function SidebarSkeleton() {
  return (
    <aside className="space-y-6 animate-pulse">
      {/* Category select skeleton */}
      <div>
        <div className="h-4 bg-gray-700 rounded w-32 mb-3" />
        <div className="h-10 bg-gray-700 rounded w-full" />
      </div>

      {/* Price range skeleton */}
      <div>
        <div className="h-4 bg-gray-700 rounded w-40 mb-3" />
        <div className="h-2 bg-gray-700 rounded w-full" />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <div className="h-3 bg-gray-700 rounded w-10" />
          <div className="h-3 bg-gray-700 rounded w-14" />
        </div>
      </div>

      {/* Checkbox group skeletons (e.g., brand, stock) */}
      <div>
        <div className="h-4 bg-gray-700 rounded w-24 mb-3" />
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-700 rounded" />
            <div className="h-4 bg-gray-700 rounded w-24 ml-3" />
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-700 rounded" />
            <div className="h-4 bg-gray-700 rounded w-28 ml-3" />
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-700 rounded" />
            <div className="h-4 bg-gray-700 rounded w-20 ml-3" />
          </div>
        </div>
      </div>

      {/* Action buttons skeleton */}
      <div className="space-y-3">
        <div className="h-10 bg-indigo-600/40 rounded w-full" />
        <div className="h-10 bg-gray-700 rounded w-full" />
      </div>
    </aside>
  );
}
