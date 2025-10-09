import SideBar from "@/components/admin/SideBar";
import Link from "next/link";

export default function createUserPage() {
  return (
    <div className=" min-h-screen bg-background-light dark:bg-background-dark">
      {/* Sidebar placeholder - puedes importar tu SideBar aquí */}
      <div className="w-64">
        <SideBar />
      </div>

      {/* Main Content */}
      <main className="flex justify-center">
        {/* Form Container */}
        <div className=" bg-white dark:bg-black/20 rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-8 w-1/4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Add New User
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Create a new user account for the system
            </p>
          </div>

          <form className="space-y-6" noValidate>
            {/* Error Messages */}
            {/* Username Field */}
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder="Enter username"
                  className="block w-full rounded-lg border border-purple-500/20 dark:border-purple-500/30 bg-white dark:bg-gray-900 focus:border-purple-500 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 py-3 px-4 text-gray-900 dark:text-white outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  placeholder="user@example.com"
                  className="block w-full rounded-lg border border-purple-500/20 dark:border-purple-500/30 bg-white dark:bg-gray-900 focus:border-purple-500 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 py-3 px-4 text-gray-900 dark:text-white outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-purple-500/20 dark:border-purple-500/30 bg-white dark:bg-gray-900 focus:border-purple-500 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 py-3 px-4 text-gray-900 dark:text-white outline-none transition-colors"
                />
              </div>
            </div>

            {/* Role Field */}
            <div>
              <label
                htmlFor="isAdmin"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Role
              </label>
              <div className="mt-1">
                <select
                  id="isAdmin"
                  name="isAdmin"
                  className="block w-full rounded-lg border border-purple-500/20 dark:border-purple-500/30 bg-white dark:bg-gray-900 focus:border-purple-500 focus:ring-purple-500 py-3 px-4 text-gray-900 dark:text-white outline-none transition-colors"
                >
                  <option value="false">User</option>
                  <option value="true">Admin</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create User
              </button>
            </div>
          </form>
          {/* Footer */}
          <div className="mt-6 text-center">
            <Link
              href="/admin"
              className="text-sm font-medium text-purple-500 hover:text-purple-400 transition-colors"
            >
              ← Back to User Management
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
