import { UsersTableSchema, type UsersTable } from "@/src/schemas";
import { authenticatedFetch } from "@/utils/api";
import { Suspense } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

// Helper functions para los estilos de badges
function getRoleBadgeStyles(role: string) {
  switch (role) {
    case "Admin":
      return "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300";
    case "Editor":
      return "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300";
    case "Support":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
    case "Viewer":
    default:
      return "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400";
  }
}

function getStatusBadgeStyles(status: string) {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
    case "Inactive":
      return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400";
  }
}

export default async function UsersTable() {
  const request = await authenticatedFetch(`${process.env.API_URL}/users`);
  if (!request.ok) {
    throw new Error("Failed to fetch users");
  }
  const response = await request.json();
  const users = UsersTableSchema.parse(response);
  return (
    <div>
      {/* Users Table */}
      <div className="overflow-x-auto bg-white dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/10">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 dark:border-white/10">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                Email
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                Role
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <Suspense fallback={<LoadingSpinner />}>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 dark:border-white/10 last:border-b-0"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                    {user.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${getRoleBadgeStyles(
                        user.isAdmin ? "Admin" : "User"
                      )}`}
                    >
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeStyles(
                        user.confirmed ? "Active" : "Inactive"
                      )}`}
                    >
                      {user.confirmed ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary rounded-full hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </Suspense>
          </tbody>
        </table>
      </div>
    </div>
  );
}
