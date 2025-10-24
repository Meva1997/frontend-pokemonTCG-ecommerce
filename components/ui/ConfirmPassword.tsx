"use client";
import { useActionState, useEffect, useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { deleteProductAction } from "@/actions/admin-deleteProduct-action";
import { toast } from "react-toastify";
import { deleteCategoryAction } from "@/actions/admin-deleteCategory-action";
import { adminDeleteUserAction } from "@/actions/admin-deleteUser-action";
import { deleteOrderAction } from "@/actions/admin-deleteOrder-action";

type DeleteType = "product" | "category" | "user" | "order";

type ConfirmPasswordProps = {
  type: DeleteType;
  redirectPath?: string;
};

export default function ConfirmPassword({
  type,
  redirectPath,
}: ConfirmPasswordProps) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const config = {
    user: {
      paramName: "deleteUserId",
      action: adminDeleteUserAction,
      entityName: "user",
      defaultRedirect: "/admin/users",
    },
    product: {
      paramName: "deleteProductId",
      action: deleteProductAction,
      entityName: "product",
      defaultRedirect: "/admin/products",
    },
    category: {
      paramName: "deleteCategoryId",
      action: deleteCategoryAction,
      entityName: "category",
      defaultRedirect: "/admin/categories",
    },
    order: {
      paramName: "deleteOrderId",
      action: deleteOrderAction,
      entityName: "order",
      defaultRedirect: "/admin/orders",
    },
  };

  const currentConfig = config[type];
  const deleteId = +searchParams.get(currentConfig.paramName)!;
  const show = deleteId ? true : false;

  const hideModal = new URLSearchParams(searchParams.toString());
  hideModal.delete(currentConfig.paramName);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    router.replace(`${pathname}?${hideModal}`); // Close the modal by removing the query parameter which is being used to show it
  }

  const deleteActionWithId = currentConfig.action.bind(null, deleteId);

  const [state, dispatch] = useActionState(deleteActionWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) => toast.error(error));
    }
    if (state.success) {
      toast.success(state.success);
      const finalRedirectPath = redirectPath || currentConfig.defaultRedirect; // Use provided redirectPath or default
      router.push(finalRedirectPath);
    }
  }, [
    state,
    router,
    redirectPath,
    currentConfig.defaultRedirect,
    currentConfig.action,
    currentConfig.entityName,
  ]);

  // Contenido dinámico
  const getContent = () => {
    switch (type) {
      case "product":
        return {
          title: "Delete Product",
          description:
            "Are you sure you want to delete this product? This action cannot be undone and will remove all associated data.",
          icon: (
            <svg
              className="w-6 h-6 text-red-500 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          ),
        };
      case "category":
        return {
          title: "Delete Category",
          description:
            "Are you sure you want to delete this category? This action cannot be undone and may affect associated products.",
          icon: (
            <svg
              className="w-6 h-6 text-red-500 mb-2"
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
          ),
        };
      case "user":
        return {
          title: "Delete User",
          description:
            "Are you sure you want to delete this user? This action cannot be undone and will remove all associated data.",
          icon: (
            <svg
              className="w-6 h-6 text-red-500 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zm0 5a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          ),
        };
      case "order":
        return {
          title: "Delete Order",
          description:
            "Are you sure you want to delete this order? This action cannot be undone and will remove all associated data.",
          icon: (
            <svg
              className="w-6 h-6 text-red-500 mb-2"
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
          ),
        };
      default:
        return {
          title: "Confirm Deletion",
          description:
            "Are you sure you want to delete this item? This action cannot be undone.",
          icon: (
            <svg
              className="w-6 h-6 text-red-500 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.76 0L3.054 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          ),
        };
    }
  };

  const content = getContent();

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
              className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6 shadow-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 border border-gray-200 dark:border-gray-700"
            >
              {/* Header with Icon */}
              <div className="flex flex-col items-center text-center mb-4">
                {content.icon}
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900 dark:text-white"
                >
                  {content.title}
                </DialogTitle>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                {content.description}
              </p>

              {/* Warning Box */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.76 0L3.054 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-red-800 dark:text-red-200">
                    This action is irreversible
                  </span>
                </div>
              </div>

              {/* Form */}
              <form action={dispatch} noValidate className="space-y-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Confirm with your password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    required
                  />
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    className="flex-1 inline-flex justify-center items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-colors"
                    onClick={close}
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="flex-1 inline-flex justify-center items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-colors"
                  >
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
                    Delete {currentConfig.entityName}
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
