"use client";
import ConfirmPassword from "@/components/ui/ConfirmPassword";
// import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Categories } from "@/src/schemas";
import { formatDate } from "@/utils";
import { useRouter } from "next/navigation";
// import { Suspense } from "react";

export default function CategoriesInfo({
  categories,
}: {
  categories: Categories;
}) {
  const router = useRouter();

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 w-2/3 mx-auto md:w-full md:mx-0">
          <div className="flex flex-col space-y-2  items-center justify-between md:flex-row md:space-y-0 text-center md:text-left">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Categories Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your product categories and their details
              </p>
            </div>
            <div className="text-xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">
              Total categories: {categories.length}
            </div>
          </div>
        </div>

        {/* Categories Stats */}
        <div className="grid grid-cols-1 w-2/3 mx-auto md:w-full md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Categories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
              <div className="text-3xl opacity-80">📁</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Active Categories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
              <div className="text-3xl opacity-80">✅</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Parent Categories</p>
                <p className="text-2xl font-bold">
                  {categories.filter((cat) => cat.parentId === null).length}
                </p>
              </div>
              <div className="text-3xl opacity-80">🏷️</div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 w-3/4 mx-auto md:w-full">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Categories
            </h2>
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
                >
                  {/* Category Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <span className="text-lg">{category.icon || "📁"}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ID: {category.id}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-1">
                      <button
                        className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded"
                        onClick={() =>
                          router.push(`/admin/categories/${category.id}/edit`)
                        }
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded"
                        onClick={() =>
                          router.push(`?deleteCategoryId=${category.id}`)
                        }
                      >
                        <ConfirmPassword type="category" />
                      </button>
                    </div>
                  </div>

                  {/* Category Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Category Meta */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">
                        Type:
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          category.parentId === null
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        }`}
                      >
                        {category.parentId === null ? "Parent" : "Subcategory"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">
                        Created:
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {formatDate(category.createdAt as string)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No categories found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Get started by creating your first category.
              </p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Create Category
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
