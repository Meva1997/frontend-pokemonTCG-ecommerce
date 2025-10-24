"use client";
import { adminUpdateProductStatusAction } from "@/actions/admin-updateProductStatus-action";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { OrderDetail } from "@/src/schemas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function OrdersUpdateStatus({ order }: { order: OrderDetail }) {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [currentOrder, setCurrentOrder] = useState<OrderDetail | null>(
    order.status ? order : null
  );

  const adminUpdateProductStatusActionWithId =
    adminUpdateProductStatusAction.bind(null, order.id.toString());
  const [state, dispatch, isPending] = useActionState(
    adminUpdateProductStatusActionWithId,
    {
      errors: [],
      success: "",
    }
  );

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success);
      router.push(`/admin/orders/${order.id}`);
    }
  }, [state, order.id, router]);

  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
      description: "Order is awaiting processing",
    },
    {
      value: "paid",
      label: "Paid",
      color:
        "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
      description: "Payment has been received",
    },
    {
      value: "shipped",
      label: "Shipped",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
      description: "Order has been shipped to customer",
    },
    {
      value: "delivered",
      label: "Delivered",
      color:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
      description: "Order has been delivered",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
      description: "Order has been cancelled",
    },
  ];

  const currentStatusOption = statusOptions.find(
    (opt) => opt.value === currentOrder?.status
  );

  return (
    <>
      <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
        <Link
          href="/admin/orders"
          className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          Orders
        </Link>
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
            d="M9 5l7 7-7 7"
          />
        </svg>
        <Link
          href={`/admin/orders/${order.id}`}
          className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          Order #{order.id}
        </Link>
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
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="text-gray-900 dark:text-gray-200 font-medium">
          Edit
        </span>
      </nav>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Edit Order #{order.id}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update the status of this order
            </p>
          </div>
        </div>
      </div>

      {/* Current Status Display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Current Status
        </h3>
        <div className="flex items-center space-x-3">
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${currentStatusOption?.color}`}
          >
            {currentStatusOption?.label}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {currentStatusOption?.description}
          </span>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <form action={dispatch} className="space-y-6">
          {/* Status Selection */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select New Status
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {statusOptions.map((option) => (
                <label
                  key={option.value}
                  className={`relative cursor-pointer rounded-lg border-2 p-4 hover:shadow-md transition-all ${
                    selectedStatus === option.value
                      ? "border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800"
                      : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={selectedStatus === option.value}
                    onChange={(e) =>
                      setSelectedStatus(
                        e.target.value as
                          | "pending"
                          | "paid"
                          | "shipped"
                          | "delivered"
                          | "cancelled"
                      )
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${option.color}`}
                    >
                      {option.label}
                    </span>
                    {selectedStatus === option.value && (
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {option.description}
                  </p>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {isPending ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
              <button
                type="submit"
                disabled={selectedStatus === currentOrder?.status}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {selectedStatus === currentOrder?.status
                  ? "No Changes"
                  : "Update Order Status"}
              </button>

              <Link
                href={`/admin/orders/${order.id}`}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
              >
                Cancel
              </Link>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
