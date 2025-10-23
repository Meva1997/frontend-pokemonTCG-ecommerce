"use client";
import { AdminUserCreateAction } from "@/actions/admin-userCreate-action";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddUserButton() {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const [state, dispatch, isPending] = useActionState(AdminUserCreateAction, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((err) => toast.error(err));
    }

    if (state.success) {
      toast.success(state.success);
      close();
    }
  }, [state]);

  return (
    <>
      <Button
        onClick={open}
        className="flex items-center justify-center gap-2 p-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors outline-none"
      >
        <svg
          className="w-4 h-4 flex-shrink-0 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add User
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 p-6 shadow-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 border border-gray-200 dark:border-white/10"
            >
              <DialogTitle
                as="h3"
                className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
              >
                Add New Admin User
              </DialogTitle>

              <form className="space-y-4" action={dispatch}>
                {/* Username Field */}
                <div>
                  <label
                    htmlFor="userName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Username
                  </label>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="Enter username"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="user@example.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                </div>

                {/* Role Field */}
                <input type="hidden" name="isAdmin" value="true" />

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  {isPending ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <Button
                        type="button"
                        onClick={close}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-500 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                      >
                        send{" "}
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
