"use client";

import { adminDeleteUserAction } from "@/actions/admin-deleteUser-action";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ConfirmDeleteUser() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const deleteUserId = +searchParams.get("deleteUserId")!;
  const show = deleteUserId ? true : false;

  const hideModal = new URLSearchParams(searchParams.toString());
  hideModal.delete("deleteUserId");

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    router.replace(`${pathname}?${hideModal}`); // Close the modal by removing the query parameter which is being used to show it
  }

  const deleteUserActionWithId = adminDeleteUserAction.bind(null, deleteUserId);
  const [state, dispatch] = useActionState(deleteUserActionWithId, {
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
      router.replace(pathname); // Refresh the page to reflect the changes
    }
  }, [state, router, pathname]);

  return (
    <>
      <p onClick={open}>
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </p>

      <Dialog
        open={show}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Confirm Deletion
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                Are you sure you want to delete this user? This action cannot be
                undone.
              </p>
              <form action={dispatch} noValidate>
                <div className="my-6">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full rounded-md border border-gray-300 bg-white/10 px-3 py-2 text-sm/6 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
                <div className="mt-4">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                    onClick={close}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="ml-2 inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-500 data-open:bg-red-600"
                    type="submit"
                  >
                    Delete
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
