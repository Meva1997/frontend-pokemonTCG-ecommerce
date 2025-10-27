"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import CartItems from "@/components/cart/CartItems";
import OrderSummary from "@/components/cart/OrderSummary";
import PaymentMethod from "@/components/cart/PaymentMethod";
import ShippingInfo from "@/components/cart/ShippingInfo";
import { checkoutPaymentAction } from "@/actions/checkout-payment-action";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [state, dispatch, isPending] = useActionState(checkoutPaymentAction, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) => {
        toast.error(`Log in to continue. ${error}`);
      });
    }
    if (state.success) {
      // Si success es un objeto { message: string }, muestra el mensaje
      if (typeof state.success === "string") {
        toast.success(state.success);
      } else if (
        typeof state.success === "object" &&
        "message" in state.success
      ) {
        toast.success(state.success.message);
      }
      clearCart();
      router.push("/cart/checkout/thank-you");
    }
  }, [state, clearCart, router]);

  return (
    <>
      <main className="flex-1 px-4 py-8 my-10 md:px-10 lg:px-20">
        <form action={dispatch}>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Column - Forms */}
            <div className="space-y-8">
              {/* Breadcrumb */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#ab9db9]">
                  <Link
                    className="hover:text-white flex items-center"
                    href="/cart"
                  >
                    Cart
                  </Link>
                  <span>
                    <svg
                      className="w-4 h-4 flex"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-[#ab9db9]">Checkout</span>
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Checkout
                </h1>
              </div>

              <input
                type="hidden"
                name="products"
                value={JSON.stringify(
                  items.map(({ id, quantity }) => ({ id, quantity }))
                )}
              />

              <div className="space-y-8">
                {/* Shipping Information */}
                <ShippingInfo />

                {/* Payment Method */}
                <PaymentMethod />
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="space-y-8">
              {/* Order Summary */}
              <OrderSummary isPending={isPending} />

              {/* Cart Items */}
              <CartItems />
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
