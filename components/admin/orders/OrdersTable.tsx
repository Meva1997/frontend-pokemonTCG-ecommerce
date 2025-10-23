"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatCurrency, formatDate } from "@/utils";
import OrdersTableMobile from "./OrdersTableMobile";

// Tipos para las órdenes basados en tu JSON
type OrderProduct = {
  productId: number;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
    price: number;
  };
};

type Order = {
  id: number;
  userId: number;
  status: string;
  shippingAddress: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  orderProducts: OrderProduct[];
};

type OrdersTableProps = {
  orders: Order[];
};

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filtrar órdenes
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toString().includes(searchTerm) ||
      order.shippingAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Función para obtener el badge de estado
  const getStatusBadge = (status: string) => {
    const badges = {
      pending:
        "px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
      paid: "px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
      shipped:
        "px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
      delivered:
        "px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
      cancelled:
        "px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
    };

    return (
      <span className={badges[status as keyof typeof badges] || badges.pending}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Calcular estadísticas
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const paidOrders = orders.filter((o) => o.status === "paid").length;
  const totalRevenue = orders
    .filter(
      (o) =>
        o.status === "paid" ||
        o.status === "shipped" ||
        o.status === "delivered"
    )
    .reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 md:w-3xl xl:w-full">
        <div className="flex flex-col sm:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Orders Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
              Manage customer orders and their status
            </p>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">
            Total Orders: {totalOrders}
          </div>
        </div>
      </section>

      {/* Orders Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-3 md:gap-4 max-w-3xl  px-10 xl:px-0 xl:max-w-7xl xl:mx-auto ">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs md:text-sm">Total Orders</p>
              <p className="text-lg md:text-2xl font-bold">{totalOrders}</p>
            </div>
            <div className="text-xl md:text-3xl opacity-80">📋</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-xs md:text-sm">Pending</p>
              <p className="text-lg md:text-2xl font-bold">{pendingOrders}</p>
            </div>
            <div className="text-xl md:text-3xl opacity-80">⏳</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs md:text-sm">Paid</p>
              <p className="text-lg md:text-2xl font-bold">{paidOrders}</p>
            </div>
            <div className="text-xl md:text-3xl opacity-80">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-xs md:text-sm">Revenue</p>
              <p className="text-lg md:text-2xl font-bold">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
            <div className="text-xl md:text-3xl opacity-80">💵</div>
          </div>
        </div>
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
        {/* Header fijo */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-7 gap-4 py-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Order
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-green-600 dark:text-green-400"
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
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Products
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Total
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a4 4 0 118 0v4m-4 8h.01M12 19h.01M8 19h.01M4 19h.01M20 19h.01M16 19h.01M8 15h.01M12 15h.01M16 15h.01M20 15h.01M4 15h.01M8 11h.01M12 11h.01M16 11h.01M20 11h.01M4 11h.01"
                  />
                </svg>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filas con scroll individual */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-200 group"
            >
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
                <div className="min-w-full py-5 px-6">
                  <div className="grid grid-cols-7 items-center min-w-[700px] gap-4">
                    {/* Order */}
                    <div className="text-center">
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
                    </div>

                    {/* Customer */}
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          User #{order.userId}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {order.shippingAddress}
                      </div>
                    </div>

                    {/* Products */}
                    <div className="text-center">
                      <div className="rounded-lg p-3 transition-colors">
                        <div className="flex flex-col items-center space-y-2">
                          {order.orderProducts.length > 0 ? (
                            order.orderProducts.slice(0, 2).map((item, idx) => (
                              <div
                                key={idx}
                                className="flex flex-col items-center space-y-1"
                              >
                                <Image
                                  src={item.product.image}
                                  alt={item.product.name}
                                  width={32}
                                  height={32}
                                  className="rounded-md object-cover border-2 border-gray-200 dark:border-gray-600 shadow-sm"
                                />
                                <div className="text-xs text-center">
                                  <div className="text-gray-900 dark:text-white truncate font-medium max-w-24">
                                    {item.product.name}
                                  </div>
                                  <div className="text-gray-500 dark:text-gray-400">
                                    Qty: {item.quantity} ×{" "}
                                    {formatCurrency(item.price)}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              No products
                            </span>
                          )}
                          {order.orderProducts.length > 2 && (
                            <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                              +{order.orderProducts.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="text-center">
                      <div className="flex justify-center">
                        {getStatusBadge(order.status)}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatCurrency(order.total)}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="text-center">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {formatDate(order.createdAt)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="text-center">
                      <div className="flex flex-col space-y-2">
                        <button className="flex items-center justify-center px-3 py-2 text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-lg transition-all duration-200 group-hover:shadow-md">
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
                        <button className="flex items-center justify-center px-3 py-2 text-xs font-medium text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 rounded-lg transition-all duration-200 group-hover:shadow-md">
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
                        <button className="flex items-center justify-center px-3 py-2 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-all duration-200 group-hover:shadow-md">
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
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
      </section>

      {/* Orders Mobile View */}
      <OrdersTableMobile
        orders={orders}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      />
    </div>
  );
}
