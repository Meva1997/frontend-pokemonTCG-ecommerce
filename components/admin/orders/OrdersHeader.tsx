export default function OrdersHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0 mb-6 md:mb-8 max-w-3xl xl:mx-auto">
      <h2 className="text-2xl text-center lg:text-left md:text-4xl font-bold text-gray-900 dark:text-white">
        Orders
      </h2>
      <div className="flex flex-col mx-auto lg:mx-0 sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
        {/* Filtros de estado */}
        <select className="px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <option value="">All Status</option>
          <option value="pending">Pending</option>d
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* Stats rápidas */}
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
          <span className="px-2 md:px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full whitespace-nowrap">
            3 Pending
          </span>
          <span className="px-2 md:px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full whitespace-nowrap">
            5 Paid
          </span>
          <span className="px-2 md:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full whitespace-nowrap">
            1 Shipped
          </span>
        </div>
      </div>
    </div>
  );
}
