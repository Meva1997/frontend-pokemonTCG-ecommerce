export default function CheckoutLoading() {
  return (
    <main className="flex-1 px-4 py-8 md:px-10 lg:px-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left Column - Forms Skeleton */}
        <div className="space-y-8">
          {/* Breadcrumb Skeleton */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-8 bg-[#302839] rounded animate-pulse"></div>
              <div className="w-4 h-4 bg-[#302839] rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-[#302839] rounded animate-pulse"></div>
            </div>
            <div className="h-9 w-32 bg-[#302839] rounded animate-pulse"></div>
          </div>

          <div className="space-y-8">
            {/* Shipping Info Skeleton */}
            <div className="space-y-4">
              {/* Title */}
              <div className="h-6 w-48 bg-[#302839] rounded animate-pulse"></div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-4">
                {/* Full Name */}
                <div className="flex flex-col space-y-2">
                  <div className="h-4 w-28 bg-[#302839] rounded animate-pulse"></div>
                  <div className="h-12 w-full bg-[#211c27] border border-[#302839] rounded-md animate-pulse"></div>
                </div>

                {/* Address */}
                <div className="flex flex-col space-y-2">
                  <div className="h-4 w-20 bg-[#302839] rounded animate-pulse"></div>
                  <div className="h-12 w-full bg-[#211c27] border border-[#302839] rounded-md animate-pulse"></div>
                </div>

                {/* City, Postal Code, Country */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col space-y-2">
                    <div className="h-4 w-12 bg-[#302839] rounded animate-pulse"></div>
                    <div className="h-12 w-full bg-[#211c27] border border-[#302839] rounded-md animate-pulse"></div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="h-4 w-24 bg-[#302839] rounded animate-pulse"></div>
                    <div className="h-12 w-full bg-[#211c27] border border-[#302839] rounded-md animate-pulse"></div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="h-4 w-10 bg-[#302839] rounded animate-pulse"></div>
                    <div className="h-12 w-full bg-[#211c27] border border-[#302839] rounded-md animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Skeleton */}
            <div className="space-y-4">
              {/* Title */}
              <div className="h-6 w-36 bg-[#302839] rounded animate-pulse"></div>

              <div className="rounded-lg border border-[#302839] bg-[#211c27] p-4">
                {/* Stripe Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-8 w-8 bg-white rounded-md animate-pulse"></div>
                  <div className="h-4 w-48 bg-[#302839] rounded animate-pulse"></div>
                </div>

                {/* Payment Form Fields */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Card Number */}
                  <div className="flex flex-col space-y-2">
                    <div className="h-4 w-32 bg-[#302839] rounded animate-pulse"></div>
                    <div className="h-12 w-full bg-[#211c27] border border-[#302839] rounded-md animate-pulse"></div>
                  </div>

                  {/* Expiry and CVC */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                      <div className="h-4 w-28 bg-[#302839] rounded animate-pulse"></div>
                      <div className="h-12 w-full bg-[#211c27] border border-[#302839] rounded-md animate-pulse"></div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="h-4 w-8 bg-[#302839] rounded animate-pulse"></div>
                      <div className="h-12 w-full bg-[#211c27] border border-[#302839] rounded-md animate-pulse"></div>
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div className="flex flex-col space-y-2">
                    <div className="h-4 w-36 bg-[#302839] rounded animate-pulse"></div>
                    <div className="h-12 w-full bg-[#211c27] border border-[#302839] rounded-md animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Summary Skeleton */}
        <div className="space-y-8">
          {/* Order Summary Skeleton */}
          <div className="rounded-lg border border-[#302839] bg-[#211c27] p-6">
            {/* Title */}
            <div className="h-6 w-40 bg-[#302839] rounded animate-pulse mb-4"></div>

            <div className="space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-[#302839] rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-[#302839] rounded animate-pulse"></div>
              </div>

              {/* Shipping */}
              <div className="flex justify-between">
                <div className="h-4 w-12 bg-[#302839] rounded animate-pulse"></div>
                <div className="h-4 w-12 bg-[#302839] rounded animate-pulse"></div>
              </div>

              {/* Tax */}
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-[#302839] rounded animate-pulse"></div>
                <div className="h-4 w-12 bg-[#302839] rounded animate-pulse"></div>
              </div>

              <div className="border-t border-[#302839] my-4"></div>

              {/* Total */}
              <div className="flex justify-between">
                <div className="h-6 w-12 bg-[#302839] rounded animate-pulse"></div>
                <div className="h-6 w-20 bg-[#8013ec] rounded animate-pulse"></div>
              </div>
            </div>

            {/* Pay Button */}
            <div className="mt-6 h-12 w-full bg-[#8013ec] rounded-md animate-pulse"></div>

            {/* Terms Text */}
            <div className="mt-4 space-y-1">
              <div className="h-3 w-full bg-[#302839] rounded animate-pulse"></div>
              <div className="h-3 w-24 bg-[#302839] rounded animate-pulse mx-auto"></div>
            </div>
          </div>

          {/* Cart Items Skeleton */}
          <div className="rounded-lg border border-[#302839] bg-[#211c27] p-6">
            {/* Title */}
            <div className="h-5 w-24 bg-[#302839] rounded animate-pulse mb-4"></div>

            <div className="space-y-4">
              {/* Cart Item 1 */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#302839] rounded-md flex-shrink-0 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-[#302839] rounded animate-pulse"></div>
                  <div className="h-3 w-20 bg-[#302839] rounded animate-pulse"></div>
                  <div className="h-3 w-16 bg-[#302839] rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-16 bg-[#302839] rounded animate-pulse"></div>
              </div>

              {/* Cart Item 2 */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#302839] rounded-md flex-shrink-0 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-40 bg-[#302839] rounded animate-pulse"></div>
                  <div className="h-3 w-20 bg-[#302839] rounded animate-pulse"></div>
                  <div className="h-3 w-16 bg-[#302839] rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-16 bg-[#302839] rounded animate-pulse"></div>
              </div>

              {/* Cart Item 3 */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#302839] rounded-md flex-shrink-0 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-36 bg-[#302839] rounded animate-pulse"></div>
                  <div className="h-3 w-20 bg-[#302839] rounded animate-pulse"></div>
                  <div className="h-3 w-16 bg-[#302839] rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-16 bg-[#302839] rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
