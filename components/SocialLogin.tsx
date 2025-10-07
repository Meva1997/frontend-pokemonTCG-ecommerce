import React from "react";

export default function SocialLogin() {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-purple-500/20 dark:border-purple-500/30"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-white dark:bg-gray-900 border border-purple-500/20 dark:border-purple-500/30 px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-purple-500/10 transition-colors duration-200"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="text-sm font-medium">Google</span>
        </button>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-white dark:bg-gray-900 border border-purple-500/20 dark:border-purple-500/30 px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-purple-500/10 transition-colors duration-200"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 4.98 3.66 9.14 8.44 9.9v-7.02H7.97v-2.89h2.47V9.98c0-2.45 1.45-3.8 3.7-3.8 1.05 0 2.15.19 2.15.19v2.47h-1.26c-1.2 0-1.58.74-1.58 1.54v1.82h2.77l-.44 2.89h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94C22 6.53 17.5 2.04 12 2.04z" />
          </svg>
          <span className="text-sm font-medium">Facebook</span>
        </button>
      </div>
    </div>
  );
}
