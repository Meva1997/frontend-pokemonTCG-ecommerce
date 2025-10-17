"use client";
import { useRouter } from "next/navigation";
import { UsersTable as UsersTableType } from "@/src/schemas";
import ConfirmDeleteUser from "./ConfirmDeleteUser";
import UserSearchBar from "./UserSearchBar";

export default function UsersTable({ users }: { users: UsersTableType }) {
  const router = useRouter();

  // Función para obtener el badge de rol
  const getRoleBadge = (isAdmin: boolean) => {
    return isAdmin ? (
      <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
        Administrator
      </span>
    ) : (
      <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
        User
      </span>
    );
  };

  // Función para obtener el badge de status
  const getStatusBadge = (confirmed: boolean) => {
    return confirmed ? (
      <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
        Active
      </span>
    ) : (
      <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">
        Inactive
      </span>
    );
  };

  // Calcular estadísticas basadas en los usuarios recibidos (ya filtrados si es necesario)
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.confirmed).length;
  const adminUsers = users.filter((u) => u.isAdmin).length;
  const inactiveUsers = users.filter((u) => !u.confirmed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Users Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage user accounts and permissions
            </p>
          </div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            Total users: {totalUsers}
          </div>
        </div>
      </div>

      {/* Users Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Users</p>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
            <div className="text-3xl opacity-80">👥</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Active Users</p>
              <p className="text-2xl font-bold">{activeUsers}</p>
            </div>
            <div className="text-3xl opacity-80">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Administrators</p>
              <p className="text-2xl font-bold">{adminUsers}</p>
            </div>
            <div className="text-3xl opacity-80">🛡️</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Inactive</p>
              <p className="text-2xl font-bold">{inactiveUsers}</p>
            </div>
            <div className="text-3xl opacity-80">❌</div>
          </div>
        </div>
      </div>

      {/* <UserSearchBar value={searchTerm} onChange={setSearchTerm} /> */}

      {/* Users Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Users ({totalUsers})
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {totalUsers > 0
                ? Math.round((activeUsers / totalUsers) * 100)
                : 0}
              % Active Rate
            </div>
          </div>
        </div>

        {users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
              >
                {/* User Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {/* Avatar con iniciales */}
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {user.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                        {user.userName}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {user.id}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-1">
                    <button
                      className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-colors"
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
                    <button
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                      onClick={() => router.push(`?deleteUserId=${user.id}`)}
                    >
                      <ConfirmDeleteUser />
                    </button>
                  </div>
                </div>

                {/* User Email */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 truncate">
                  {user.email}
                </p>

                {/* User Meta */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      Role:
                    </span>
                    {getRoleBadge(user.isAdmin)}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      Status:
                    </span>
                    {getStatusBadge(user.confirmed)}
                  </div>

                  {/* User Permissions */}
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Permissions:
                    </span>
                    <span
                      className={`font-bold ${
                        user.isAdmin
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {user.isAdmin ? "Full Access" : "Limited"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No users found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your search terms or create a new user account.
            </p>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              onClick={() => router.push("/admin/users/new")}
            >
              Add User
            </button>
          </div>
        )}
      </div>

      {/* ConfirmDeleteUser Modal */}
      {/* <ConfirmDeleteUser /> */}
    </div>
  );
}

// <div className="overflow-x-auto bg-white dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/10 shadow-sm">
//   <table className="w-full text-left">
//     <thead className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50">
//       <tr>
//         <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
//           Name
//         </th>
//         <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
//           Email
//         </th>
//         <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
//           Role
//         </th>
//         <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
//           Status
//         </th>
//         <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide text-right">
//           Actions
//         </th>
//       </tr>
//     </thead>
//     <tbody className="divide-y divide-gray-200 dark:divide-white/10">
//       {users.length > 0 ? (
//         users.map((user) => (
//           <tr
//             key={user.id}
//             className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-150"
//           >
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="flex items-center space-x-3">
//                 {/* Avatar con iniciales */}
//                 <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
//                   <span className="text-sm font-semibold text-primary">
//                     {user.userName.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium text-gray-900 dark:text-white">
//                     {user.userName}
//                   </div>
//                 </div>
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 {user.email}
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <span
//                 className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
//                   user.isAdmin
//                     ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300"
//                     : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400"
//                 }`}
//               >
//                 {user.isAdmin ? "Admin" : "User"}
//               </span>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <span
//                 className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
//                   user.confirmed
//                     ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
//                     : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
//                 }`}
//               >
//                 {user.confirmed ? "Active" : "Inactive"}
//               </span>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-right">
//               <div className="flex items-center justify-end space-x-2">
//                 {/* Botón Edit */}
//                 <button
//                   className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-purple-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-400/50 transition-colors"
//                   onClick={() =>
//                     router.push(`/admin/users/${user.id}/edit`)
//                   }
//                 >
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                     />
//                   </svg>
//                 </button>

//                 {/* Botón Delete */}
//                 <button
//                   className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
//                   onClick={() => router.push(`?deleteUserId=${user.id}`)}
//                 >
//                   <ConfirmDeleteUser />
//                 </button>
//               </div>
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr>
//           <td colSpan={5} className="px-6 py-12 text-center">
//             <div className="flex flex-col items-center justify-center space-y-3">
//               <svg
//                 className="w-12 h-12 text-gray-300 dark:text-gray-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                 />
//               </svg>
//               <div>
//                 <h3 className="text-sm font-medium text-gray-900 dark:text-white">
//                   No users found
//                 </h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   Get started by creating a new user account.
//                 </p>
//               </div>
//             </div>
//           </td>
//         </tr>
//       )}
//     </tbody>
//   </table>
// </div>
//   );
// }
