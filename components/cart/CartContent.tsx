"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

export default function CartContent() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  console.log("🚀 ~ CartContent ~ items:", items);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#141118] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-[#ab9db9] text-lg mb-8">
              Looks like you haven&apos;t added any products to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-[#8013ec] hover:bg-[#6c10c4] text-white font-bold rounded-lg transition-colors transform hover:scale-105"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141118] text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-[#ab9db9]">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-[#1a1620] rounded-lg p-6 shadow-lg shadow-[#8013ec]/10 border border-[#302839]"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={150}
                      height={150}
                      className="h-32 w-32 sm:h-40 sm:w-40 rounded-lg object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-[#ab9db9] mb-3">
                      Category ID: {item.categoryId}
                    </p>
                    <p className="text-2xl font-bold text-[#8013ec] mb-4">
                      ${item.price.toFixed(2)} each
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex items-center space-x-3">
                        <span className="text-white font-medium">
                          Quantity:
                        </span>
                        <div className="flex items-center space-x-2 bg-[#302839] rounded-lg p-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-md hover:bg-[#8013ec] text-white flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="text-white font-bold text-lg w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.stock}
                            className="w-8 h-8 rounded-md hover:bg-[#8013ec] disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[#ab9db9] text-sm">
                          (Stock: {item.stock})
                        </span>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors bg-red-900/20 hover:bg-red-900/30 px-3 py-2 rounded-lg"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span className="text-sm font-medium">Remove</span>
                      </button>
                    </div>

                    {/* Item Subtotal */}
                    <div className="mt-4 pt-4 border-t border-[#302839]">
                      <div className="flex justify-between items-center">
                        <span className="text-[#ab9db9]">Item Subtotal:</span>
                        <span className="text-white font-bold text-xl">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="pt-6">
              <button
                onClick={clearCart}
                className="flex items-center space-x-2 px-6 py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>Clear All Items</span>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1620] rounded-lg p-6 shadow-lg shadow-[#8013ec]/10 border border-[#302839] sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#ab9db9] truncate pr-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-white font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-[#302839] mb-6" />

              {/* Calculations */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#ab9db9]">Subtotal</span>
                  <span className="text-white">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#ab9db9]">Shipping</span>
                  <span className="text-green-400 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#ab9db9]">Tax (10%)</span>
                  <span className="text-white">
                    ${(getTotalPrice() * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <hr className="border-[#302839] mb-6" />

              {/* Total */}
              <div className="flex justify-between text-xl font-bold mb-8">
                <span className="text-white">Total</span>
                <span className="text-[#8013ec] text-2xl">
                  ${(getTotalPrice() * 1.1).toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Link
                  href="/cart/checkout"
                  className="w-full bg-[#8013ec] hover:bg-[#6c10c4] text-white font-bold py-4 px-6 rounded-lg transition-colors transform hover:scale-105 shadow-lg shadow-[#8013ec]/25 mx-auto block text-center"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/products"
                  className="block w-full text-center border border-[#302839] text-[#ab9db9] hover:text-white hover:bg-[#302839] font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-[#302839]">
                <div className="flex items-center justify-center space-x-2 text-[#ab9db9] text-sm">
                  <svg
                    className="h-5 w-5 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
