"use client";
import Link from "next/link";

export default function LoginForm() {
  return (
    <form className="space-y-6">
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
            placeholder="your@email.com"
            className="block w-full rounded-lg border border-purple-500/20 dark:border-purple-500/30 bg-white dark:bg-gray-900 focus:border-purple-500 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 py-3 px-4 text-gray-900 dark:text-white outline-none"
          />
        </div>
      </div>

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
            inputMode="text"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="block w-full rounded-lg border border-purple-500/20 dark:border-purple-500/30 bg-white dark:bg-gray-900 focus:border-purple-500 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 py-3 px-4 text-gray-900 dark:text-white outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <Link
            href="/auth/forgot-password"
            className="font-medium text-purple-500 hover:text-purple-400"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          // disabled={loading}
          className="flex w-full justify-center rounded-lg bg-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
