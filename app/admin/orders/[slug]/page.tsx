import { OrderDetailSchema } from "@/src/schemas";
import { formatCurrency, formatDate } from "@/utils";
import { authenticatedFetch } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OrderDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  async function fetchOrderById(id: string) {
    const url = `${process.env.API_URL}/orders/${id}`;
    const req = await authenticatedFetch(url, {
      method: "GET",
    });
    if (!req.ok) {
      redirect("/admin/orders");
    }
    const json = await req.json();
    const orderDetails = OrderDetailSchema.parse(json);
    return orderDetails;
  }

  const orderDetails = await fetchOrderById(slug);

  const totalPayment = orderDetails.total * 1.08; // Assuming 8% tax for example

  function getStatusBadge(status: string) {
    const statusOptions = {
      pending: {
        label: "Pending",
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
      },
      paid: {
        label: "Paid",
        color:
          "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
      },
      shipped: {
        label: "Shipped",
        color:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
      },
      delivered: {
        label: "Delivered",
        color:
          "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
      },
      cancelled: {
        label: "Cancelled",
        color: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
      },
    };

    const currentStatus =
      statusOptions[status as keyof typeof statusOptions] ||
      statusOptions.pending;

    return (
      <span
        className={`px-3 py-1 text-sm font-medium rounded-full ${currentStatus.color}`}
      >
        {currentStatus.label}
      </span>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
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
          <span className="text-gray-900 dark:text-gray-200 font-medium">
            Order Details
          </span>
        </nav>

        {/* Header */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Order #{orderDetails.id}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Created on {formatDate(orderDetails.createdAt)}
              </p>
            </div>
            <span className="mt-4 sm:mt-0">
              {getStatusBadge(orderDetails.status)}
            </span>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Information */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-purple-600"
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
                Order Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Order ID
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        #{orderDetails.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-4 h-4 text-gray-500"
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
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Total Amount
                      </span>
                      <p className="font-bold text-xl text-purple-600">
                        {formatCurrency(orderDetails.total)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1M8 7v2a2 2 0 002 2h4a2 2 0 002-2V7m-6 0h6"
                      />
                    </svg>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Created
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatDate(orderDetails.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-4 h-4 text-gray-500"
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
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Last Updated
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatDate(orderDetails.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Customer Information */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-blue-600"
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
                Customer Information
              </h2>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {orderDetails.user.userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Name
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {orderDetails.user.userName}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Email
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {orderDetails.user.email}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Shipping Address
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {orderDetails.shippingAddress}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Products */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-green-600"
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
                Products ( {orderDetails.orderProducts.length} )
              </h2>
              <div className="space-y-4">
                {orderDetails.orderProducts.map((orderProduct) => (
                  <div
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    key={orderProduct.productId}
                  >
                    <Image
                      src={orderProduct.product.image}
                      alt={orderProduct.product.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {orderDetails.orderProducts[0].product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span>Qty: {orderProduct.quantity}</span>
                          <span className="mx-2">×</span>
                          <span>{formatCurrency(orderProduct.price)}</span>
                        </div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(
                            orderProduct.quantity * orderProduct.price
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Information */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Payment Information
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Method
                  </span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {orderDetails.payment.method.charAt(0).toUpperCase() +
                      orderDetails.payment.method.slice(1)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Status
                  </span>
                  <div className="mt-1">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                      {orderDetails.payment.status.charAt(0).toUpperCase() +
                        orderDetails.payment.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Amount
                  </span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(orderDetails.payment.amount)} USD
                  </p>
                </div>
              </div>
            </section>

            {/* Order Summary */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(orderDetails.payment.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Tax (estimated) 10%
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(orderDetails.payment.amount * 0.1)}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-lg font-bold text-purple-600">
                      {formatCurrency(
                        orderDetails.payment.amount +
                          orderDetails.payment.amount * 0.1
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <Link
                href={`/admin/orders/${orderDetails.id}/edit`}
                className="w-full inline-block text-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Update Order Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
