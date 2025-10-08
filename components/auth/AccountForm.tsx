"use client";

import { User } from "@/src/schemas";

// import { verifySession } from "@/src/auth/dal";

export default function AccountForm({ user }: { user: User }) {
  return (
    <form className="mx-auto max-w-2xl space-y-6">
      <h2 className="text-xl font-semibold">Account Details</h2>
      <label htmlFor="email" className="block text-sm font-medium">
        Email
      </label>
      <input
        type="email"
        id="email"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="user@example.com"
        defaultValue={user.email}
      />
      <label htmlFor="name" className="block text-sm font-medium">
        Name
      </label>
      <input
        type="text"
        id="name"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="John Doe"
        defaultValue={user.userName}
      />
      <button
        type="submit"
        className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
      >
        Update Details
      </button>
    </form>
  );
}
