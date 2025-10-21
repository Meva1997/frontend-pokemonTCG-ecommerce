"use client";

import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/utils";
import { useEffect, useState } from "react";

export default function OrderSummary() {
  const [mounted, setMounted] = useState(false);
  const { items, getTotalPrice, getTotalItems } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const subTotal = mounted ? getTotalPrice() : 0;
  const totalItems = mounted ? getTotalItems() : 0;
  const shipping = subTotal > 100 ? 0 : 10;
  const tax = subTotal * 0.07;
  const total = subTotal + shipping + tax;

  return (
    <div className="rounded-lg border border-[#302839] bg-[#211c27] p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        Order Summary ({totalItems} {totalItems === 1 ? "item" : "items"})
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-[#ab9db9]">Subtotal</span>
          <span className="text-white font-medium">
            {formatCurrency(subTotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#ab9db9]">Shipping</span>
          <span className="text-white font-medium">
            {shipping === 0 ? (
              <span className="text-green-400">Free</span>
            ) : (
              formatCurrency(shipping)
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#ab9db9]">Tax (10%)</span>
          <span className="text-white font-medium">{formatCurrency(tax)}</span>
        </div>

        <div className="border-t border-[#302839] my-4"></div>

        <div className="flex justify-between text-lg">
          <span className="text-white font-bold">Total</span>
          <span className="text-[#8013ec] font-bold">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <button
        className="mt-6 flex w-full items-center justify-center rounded-md h-12 px-6 bg-[#8013ec] text-white text-base font-bold tracking-wide hover:bg-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={items.length === 0}
      >
        <span>Pay {formatCurrency(total)}</span>
      </button>

      <p className="text-xs text-[#ab9db9] mt-4 text-center">
        By clicking &quot;Pay&quot;, you agree to our{" "}
        <a className="underline hover:text-white" href="#">
          Terms of Service
        </a>
        .
      </p>

      {/* Información adicional */}
      {shipping === 0 && subTotal > 0 && (
        <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-green-400 text-sm">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Free shipping included!</span>
          </div>
        </div>
      )}
    </div>
  );
}
