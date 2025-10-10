"use client";

import { UsersTable } from "@/src/schemas";
import { useState } from "react";

export default function UserSearchBar({ users }: { users: UsersTable }) {
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredUsers = users.filter((user) => {
    // Normalizar campos
    const userName = user.userName?.toLowerCase() ?? "";
    const email = user.email?.toLowerCase() ?? "";
    const role = user.isAdmin ? "admin" : "user";
    const status = user.confirmed ? "confirmed" : "unconfirmed";

    // Verificar si el término de búsqueda coincide con alguno de los campos
    return (
      userName.includes(normalizedSearchTerm) ||
      email.includes(normalizedSearchTerm) ||
      role.includes(normalizedSearchTerm) ||
      status.includes(normalizedSearchTerm)
    );
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mb-6 relative">
      <form>
        <div className="relative">
          <input
            className="w-full pl-12 pr-12 py-3 bg-white dark:bg-black/20 border border-gray-200 dark:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus-ring-primary transition-colors"
            placeholder="Search users by name, email, confirmed status or role..."
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
          />

          {/* Botón para limpiar búsqueda */}
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {/* Close icon and needs to be imported on layout */}
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>
      </form>

      {/* Mostrar resultados solo si el searchTerm no está vacío */}
      {searchTerm.trim() !== "" && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {filteredUsers.length > 0 ? (
            <>
              {/* Header con contador de resultados */}
              <div className="px-4 py-2 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {filteredUsers.length} user
                  {filteredUsers.length !== 1 ? "s" : ""} found
                </p>
              </div>

              {/* Lista de usuarios */}
              <ul className="py-2">
                {filteredUsers.map((user) => (
                  <li
                    key={user.id}
                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {/* Avatar con iniciales */}
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">
                            {/* Here appears the first letter of the user found  */}
                            {user.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>

                        {/* Info del usuario */}
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.userName}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {user.email}
                          </span>
                        </div>
                      </div>

                      {/* Badges de rol y status */}
                      <div className="flex items-center space-x-2">
                        {/* Badge de rol */}
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.isAdmin
                              ? "bg-primary/10 text-primary dark:bg-primary/20"
                              : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400"
                          }`}
                        >
                          {user.isAdmin ? "Admin" : "User"}
                        </span>

                        {/* Status badge */}
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.confirmed
                              ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                          }`}
                        >
                          {user.confirmed ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Footer si hay muchos resultados */}
              {filteredUsers.length > 5 && (
                <div className="px-4 py-2 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Showing first {Math.min(filteredUsers.length, 10)} results
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Estado vacío */
            <div className="px-4 py-8 text-center">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                No users found
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
