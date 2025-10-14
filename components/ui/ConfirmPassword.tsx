"use client";
import { useActionState, useEffect, useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { deleteProductAction } from "@/actions/admin-deleteProduct-action";
import { toast } from "react-toastify";

export default function ConfirmPassword() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const deleteProductId = +searchParams.get("deleteProductId")!;
  const show = deleteProductId ? true : false;

  const hideModal = new URLSearchParams(searchParams.toString());
  hideModal.delete("deleteProductId");

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    router.replace(`${pathname}?${hideModal}`); // Close the modal by removing the query parameter which is being used to show it
  }

  const deleteProductWithId = deleteProductAction.bind(null, deleteProductId);
  const [state, dispatch] = useActionState(deleteProductWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) => toast.error(error));
    }
    if (state.success) {
      toast.success(state.success);
      router.push("/admin/products"); // Redirect to products page after successful deletion
    }
  }, [state, router]);

  return (
    <>
      <p onClick={open}>Delete</p>

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
                Are you sure you want to delete this product? This action cannot
                be undone.
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
