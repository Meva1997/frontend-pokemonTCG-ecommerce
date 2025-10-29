"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency, formatDate } from "@/utils";
import OrdersTableMobile, { getStatusBadge } from "./OrdersTableMobile";
import ConfirmPassword from "@/components/ui/ConfirmPassword";
import { OrdersArray } from "@/src/schemas";
import Image from "next/image";
import OrdersTableHeader from "./OrdersTableHeader";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export function OrdersTable({ orders }: { orders: OrdersArray }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toString().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const paidOrders = orders.filter((order) => order.status === "paid").length;
  const totalRevenue = orders
    .filter((order) => order.status === "paid")
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Hero Section */}
      <section className="text-center py-8 md:py-8 px-4 max-w-3xl xl:max-w-7xl xl:mx-auto bg-white-100 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 ">
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Orders Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
              Manage customer orders and their status
            </p>
          </div>
          <div className="text-xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">
            Total Orders: {totalOrders}
          </div>
        </div>
      </section>

      {/* Orders Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-3 md:gap-4 max-w-3xl  px-10 xl:px-0 xl:max-w-7xl xl:mx-auto ">
        <article className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs md:text-sm">Total Orders</p>
              <p className="text-lg md:text-2xl font-bold">{totalOrders}</p>
            </div>
            <div className="text-xl md:text-3xl opacity-80">📋</div>
          </div>
        </article>

        <article className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-xs md:text-sm">Pending</p>
              <p className="text-lg md:text-2xl font-bold">{pendingOrders}</p>
            </div>
            <div className="text-xl md:text-3xl opacity-80">⏳</div>
          </div>
        </article>

        <article className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs md:text-sm">Paid</p>
              <p className="text-lg md:text-2xl font-bold">{paidOrders}</p>
            </div>
            <div className="text-xl md:text-3xl opacity-80">💰</div>
          </div>
        </article>

        <article className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-xs md:text-sm">Revenue</p>
              <p className="text-lg md:text-2xl font-bold">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
            <div className="text-xl md:text-3xl opacity-80">💵</div>
          </div>
        </article>
      </section>

      {/* Search and Filters */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 max-w-3xl xl:max-w-7xl">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by Order ID, Status, or Address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-0 sm:min-w-[140px]"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </section>

      {/* Orders Table - Desktop */}
      <section className="hidden lg:block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-w-3xl xl:max-w-7xl xl:mx-auto">
        {/* Header */}
        <OrdersTableHeader />

        {/* Table Body */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <section key={order.id} className="">
                <div className="p-2">
                  <div className="grid grid-cols-7 items-center gap-4">
                    {/* Order */}
                    <article className="text-center">
                      <div className="rounded-lg p-3 transition-colors">
                        <div className="flex items-center justify-center mb-1">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            #{order.id}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {formatDate(order.createdAt)}
                        </div>
                      </div>
                    </article>

                    {/* Customer */}
                    <article className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          User #{order.userId}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {order.shippingAddress}
                      </div>
                    </article>

                    {/* Products */}
                    <article className="text-center">
                      <div className="rounded-lg p-2">
                        <div className="flex flex-col items-center space-y-2">
                          {order.orderProducts.length > 0 ? (
                            <div className="flex flex-col space-y-1">
                              {order.orderProducts
                                .slice(0, 2)
                                .map((product) => (
                                  <div
                                    key={product.productId}
                                    className="space-y-2 flex flex-col items-center"
                                  >
                                    <Image
                                      src={
                                        product.product.image ||
                                        "/placeholder.png"
                                      }
                                      alt={product.product.name}
                                      width={40}
                                      height={40}
                                      className="mx-auto rounded-md w-10 h-10"
                                    />
                                    <span className="text-xs text-gray-700 dark:text-gray-300 font-medium truncate max-w-32">
                                      {product.product.name}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      Qty: {product.quantity} *{" "}
                                      {formatCurrency(product.product.price)}
                                    </span>
                                  </div>
                                ))}
                              {order.orderProducts.length > 2 && (
                                <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                                  +{order.orderProducts.length - 2} more
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              No products
                            </span>
                          )}
                        </div>
                      </div>
                    </article>

                    {/* Status */}
                    <article className="text-center">
                      <p className="flex justify-center">
                        {getStatusBadge(order.status)}
                      </p>
                    </article>

                    {/* Total */}
                    <article className="text-center">
                      <p className="text-sm  text-gray-900 dark:text-white">
                        {formatCurrency(order.total)} (No Tax Included)
                      </p>
                    </article>

                    {/* Date */}
                    <article className="text-center">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {formatDate(order.createdAt)}
                      </p>
                    </article>

                    {/* Actions */}
                    <article className="text-center">
                      <div className="flex flex-col space-y-2">
                        <button
                          className="flex items-center justify-center px-3 py-2 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-all duration-200 group-hover:shadow-md cursor-pointer"
                          onClick={() =>
                            router.push(`/admin/orders/${order.id}`)
                          }
                        >
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          View
                        </button>
                        <button
                          className="flex items-center justify-center px-3 py-2 text-xs font-medium text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 rounded-lg transition-all duration-200 group-hover:shadow-md cursor-pointer"
                          onClick={() =>
                            router.push(`/admin/orders/${order.id}/edit`)
                          }
                        >
                          <svg
                            className="w-3 h-3 mr-1"
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
                          Edit
                        </button>
                        <button
                          className="flex items-center justify-center px-3 py-2 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-all duration-200 group-hover:shadow-md cursor-pointer"
                          onClick={() =>
                            router.push(`?deleteOrderId=${order.id}`)
                          }
                        >
                          <ConfirmPassword type="order" />
                          Delete
                        </button>
                      </div>
                    </article>
                  </div>
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-16 px-6">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No orders found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  No orders match your current search and filter criteria. Try
                  adjusting your filters or search terms.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("");
                    }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Orders Mobile View */}
      <Suspense fallback={<LoadingSpinner />}>
        <OrdersTableMobile
          orders={orders}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />
      </Suspense>
    </div>
  );
}
