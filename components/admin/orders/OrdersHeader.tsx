import { OrdersArray } from "@/src/schemas";

export default function OrdersHeader({ orders }: { orders: OrdersArray }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0 mb-6 md:mb-8 max-w-3xl xl:mx-auto">
      <h2 className="text-2xl text-center lg:text-left md:text-4xl font-bold text-gray-900 dark:text-white">
        Orders
      </h2>
      <div className="flex flex-col mx-auto lg:mx-0 sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
        {/* Stats rápidas */}
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
          <span className="px-2 md:px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full whitespace-nowrap">
            {orders.filter((order) => order.status === "pending").length}{" "}
            Pending
          </span>
          <span className="px-2 md:px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full whitespace-nowrap">
            {orders.filter((order) => order.status === "paid").length} Paid
          </span>
          <span className="px-2 md:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full whitespace-nowrap">
            {orders.filter((order) => order.status === "shipped").length}{" "}
            Shipped
          </span>
          <span className="px-2 md:px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full whitespace-nowrap">
            {orders.filter((order) => order.status === "delivered").length}{" "}
            Delivered
          </span>
          <span className="px-2 md:px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full whitespace-nowrap">
            {orders.filter((order) => order.status === "cancelled").length}{" "}
            Canceled
          </span>
        </div>
      </div>
    </div>
  );
}
