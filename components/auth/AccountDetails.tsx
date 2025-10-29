import { User } from "@/src/schemas";
import React from "react";
import LogoutForm from "./LogoutForm";

export default function AccountDetails({ user }: { user: User }) {
  return (
    <>
      <div className="w-sm md:max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Account Details</h2>
        </div>

        {/* User Avatar Section */}
        <div className="px-6 py-6">
          <div className="flex items-center space-x-4 mb-6">
            {/* Avatar con iniciales */}
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user.userName.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Nombre y rol */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user.userName}
              </h3>
              <span
                className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                  user.isAdmin
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                {user.isAdmin ? "Administrator" : "User"}
              </span>
            </div>
            <div className="flex grow justify-end">
              <LogoutForm />
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-4">
            {/* User ID */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    User ID
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Unique identifier
                  </p>
                </div>
              </div>
              <span className="text-sm font-mono text-gray-900 dark:text-white bg-white dark:bg-gray-600 px-2 py-1 rounded">
                #{user.id}
              </span>
            </div>

            {/* Username */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Display name
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-900 dark:text-white font-medium">
                {user.userName}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-orange-600 dark:text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Contact information
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-900 dark:text-white font-medium break-all">
                {user.email}
              </span>
            </div>

            {/* Admin Status */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    user.isAdmin
                      ? "bg-purple-100 dark:bg-purple-900/40"
                      : "bg-gray-100 dark:bg-gray-600"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${
                      user.isAdmin
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Account Type
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Permission level
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    user.isAdmin ? "bg-purple-500" : "bg-gray-400"
                  }`}
                ></div>
                <span className="text-sm text-gray-900 dark:text-white font-medium">
                  {user.isAdmin ? "Administrator" : "Standard User"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
