"use client";

import { useActionState, useEffect } from "react";
import { updateAccountAction } from "@/actions/auth-updateAccount-action";
import { User } from "@/src/schemas";
import { toast } from "react-toastify";
import LoadingSpinner from "../ui/LoadingSpinner";
import AccountDetails from "./AccountDetails";

export default function AccountForm({ user }: { user: User }) {
  const [state, dispatch, isPending] = useActionState(updateAccountAction, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((err) => toast.error(err));
    }
    if (state.success) {
      toast.success(state.success);
    }
  }, [state]);

  return (
    <>
      <AccountDetails user={user} />
      {!user.isAdmin && (
        <>
          <form
            className="mx-auto my-16 max-w-2xl space-y-6 bg-gray-600/30 p-4 rounded-lg border-2 border-purple-500/40"
            noValidate
            action={dispatch}
          >
            <h2 className="text-xl font-semibold">Account Details</h2>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="user@example.com"
              defaultValue={user.email}
            />
            <label htmlFor="userName" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="John Doe"
              defaultValue={user.userName}
            />

            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Current Password"
            />
            <label htmlFor="newPassword" className="block text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="New Password"
            />

            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm New Password"
            />
            <div className="text-sm text-gray-300">
              Leave new password fields empty to keep your current password.
            </div>

            {isPending ? (
              <LoadingSpinner />
            ) : (
              <button
                type="submit"
                className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
              >
                Update Details
              </button>
            )}
          </form>
        </>
      )}
    </>
  );
}
