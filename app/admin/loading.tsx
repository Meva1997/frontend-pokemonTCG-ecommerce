import React from "react";

export default function AdminLoading() {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      {/* Sidebar Skeleton */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700">
        <div className="p-6">
          {/* Logo Skeleton */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>

          {/* Navigation Skeleton */}
          <nav className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 p-3 rounded-lg animate-pulse"
              >
                <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
              </div>
            ))}
          </nav>
        </div>

        {/* User Section Skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-3">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-64 animate-pulse"></div>
            </div>
            <div className="w-32 h-10 bg-purple-300 dark:bg-purple-600 rounded-lg animate-pulse"></div>
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            {/* Search/Filter Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="flex space-x-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-28 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-4"
                    >
                      {/* Image/Icon */}
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3 animate-pulse"></div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-4/5 animate-pulse"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/5 animate-pulse"></div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        </div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
