"use client";
import { useRouter } from "next/navigation";
import { UsersTable as UsersTableType } from "@/src/schemas";

export default function UsersTable({ users }: { users: UsersTableType }) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto bg-white dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/10 shadow-sm">
      <table className="w-full text-left">
        <thead className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
              Name
            </th>
            <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
              Email
            </th>
            <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
              Role
            </th>
            <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
              Status
            </th>
            <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-white/10">
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    {/* Avatar con iniciales */}
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {user.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.userName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      user.isAdmin
                        ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300"
                        : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400"
                    }`}
                  >
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      user.confirmed
                        ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                    }`}
                  >
                    {user.confirmed ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {/* Botón Edit */}
                    <button
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-purple-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-400/50 transition-colors"
                      onClick={() =>
                        router.push(`/admin/users/${user.id}/edit`)
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

                    {/* Botón Delete */}
                    <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <svg
                    className="w-12 h-12 text-gray-300 dark:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      No users found
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Get started by creating a new user account.
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
