"use client";
import Image from "next/image";
import { OrderDetailArray, OrderProduct } from "@/src/schemas";
import { getStatusBadge } from "../admin/orders/OrdersTableMobile";
import { formatCurrency, formatDate } from "@/utils";

export default function OrderHistory({ orders }: { orders: OrderDetailArray }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">No orders found.</div>
    );
  }

  return (
    <article className="space-y-8 w-full max-w-3xl mx-auto px-2 sm:px-4 md:px-0">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-sm flex flex-col gap-4"
        >
          <section className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 mb-2 md:mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-bold text-lg text-purple-700 dark:text-purple-400">
                Order
              </span>
              <span className="px-2 py-1 rounded text-md font-semibold w-fit">
                {getStatusBadge(order.status)}{" "}
                {/* This import is the reason why the component is a use client */}
              </span>
            </div>
            <div className="text-sm text-gray-500 text-right">
              Made on {formatDate(order.createdAt)}
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-2">
            <div className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Shipping Address:</span>{" "}
              {order.shippingAddress}
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Total:</span>
              {formatCurrency(order.total)} without taxes
            </div>

            <div className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Payment:</span>{" "}
              {order.payment.method} ({order.payment.status})
            </div>
          </section>

          <div className="mb-2 text-gray-700 dark:text-gray-300">
            <span className="font-medium">Products:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {order.orderProducts.map((item: OrderProduct) => (
              <section
                key={item.productId}
                className="flex items-center gap-3 sm:gap-4 border rounded p-2 bg-gray-50 dark:bg-gray-800 w-full"
              >
                <div className="min-w-[64px] min-h-[64px] flex items-center justify-center">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={64}
                    height={64}
                    className="rounded object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 dark:text-white truncate">
                    {item.product.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </div>
                  <div className="text-sm text-gray-500">
                    Price: {formatCurrency(item.price)}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      ))}
    </article>
  );
}
