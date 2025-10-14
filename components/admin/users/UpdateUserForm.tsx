"use client";

import { updateUserAction } from "@/actions/admin-updateUser-action";
import { UpdateUserFormData } from "@/src/schemas";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function UpdateUserForm({ user }: { user: UpdateUserFormData }) {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const { slug } = params;

  const updateUserActionWithId = updateUserAction.bind(null, +slug);
  const [state, dispatch] = useActionState(updateUserActionWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success);
      router.push("/admin/users");
    }
  }, [state, router]);

  const checkIsAdmin = user.isAdmin ? true : false;

  return (
    <form
      className="max-w-md my-10 mx-auto p-6 bg-gray-700/40  rounded-lg shadow-md"
      noValidate
      action={dispatch}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Update User</h2>
        <Link
          href="/admin/users"
          className="text-md text-gray-400 hover:text-purple-500 transition-colors cursor-pointer"
        >
          &larr; Back to Users
        </Link>
      </div>

      <div className="mb-4">
        <label htmlFor="userName" className="block text-sm font-medium mb-2">
          Username
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          defaultValue={user.userName}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={user.email}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="currentPassword"
          className="block text-sm font-medium mb-2"
        >
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="confirmNewPassword"
          className="block text-sm font-medium  mb-2"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isAdmin"
            className="mr-2"
            defaultChecked={checkIsAdmin}
          />
          <span className="text-sm font-medium">Admin Role</span>
        </label>
      </div>

      <div className=" mb-6 text-center">
        <span className="text-gray-400/70">
          *Leave password fields blank to keep current password
        </span>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
      >
        Update User
      </button>
    </form>
  );
}
