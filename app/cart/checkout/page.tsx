"use client";

import { useState } from "react";
import Link from "next/link";
import CartItems from "@/components/cart/CartItems";
import OrderSummary from "@/components/cart/OrderSummary";
import ShippingInfo from "@/components/cart/ShippingInfo";
import StripeCheckoutForm from "@/components/cart/StripeCheckoutForm";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createPaymentIntentAction } from "@/actions/checkout-payment-action";
import { CreatePaymentIntentResponse } from "@/src/schemas";

type CheckoutStep = "shipping" | "payment";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getTotalPrice } = useCartStore();

  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [shippingAddress, setShippingAddress] = useState("");
  const [stripeData, setStripeData] =
    useState<CreatePaymentIntentResponse | null>(null);
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);

  // Mirror the OrderSummary logic so amounts match exactly
  const FREE_SHIPPING_THRESHOLD = 100;
  const subTotal = getTotalPrice();
  const shipping = subTotal > FREE_SHIPPING_THRESHOLD ? 0 : 10;
  const tax = subTotal * 0.1;

  async function handleContinueToPayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string)?.trim();
    const address = (data.get("address") as string)?.trim();
    const city = (data.get("city") as string)?.trim();
    const postalCode = (data.get("postalCode") as string)?.trim();
    const country = (data.get("country") as string)?.trim();

    if (!name || !address || !city || !postalCode || !country) {
      toast.error("Please fill in all shipping fields.");
      return;
    }

    const fullAddress = `${address}, ${city} ${postalCode}, ${country}`;
    setShippingAddress(fullAddress);

    // Map cart items to the shape the backend expects: { productId, quantity }
    const products = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    setIsCreatingIntent(true);

    const result = await createPaymentIntentAction(
      products,
      shipping,
      tax,
      "usd",
    );

    setIsCreatingIntent(false);

    if (result.errors.length > 0) {
      result.errors.forEach((err) => toast.error(err));
      return;
    }

    if (result.data) {
      setStripeData(result.data);
      setStep("payment");
    }
  }

  function handlePaymentSuccess(orderId: number) {
    clearCart();
    toast.success(`Order #${orderId} confirmed! Thank you.`);
    router.push("/cart/checkout/thank-you");
  }

  function handlePaymentError(message: string) {
    toast.error(message);
  }

  // Step indicator data
  const steps = [
    { id: "shipping", label: "Shipping", number: 1 },
    { id: "payment", label: "Payment", number: 2 },
  ] as const;

  return (
    <main className="min-h-screen bg-[#141118] px-4 py-10 md:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* ── Top nav ── */}
        <div className="flex items-center gap-2 text-sm text-[#ab9db9]">
          <Link className="hover:text-white transition-colors" href="/cart">
            Cart
          </Link>
          <svg
            className="w-3 h-3"
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
          <span className="text-white font-medium">Checkout</span>
        </div>

        {/* ── Step indicator ── */}
        <div className="flex items-center gap-0">
          {steps.map((s, i) => {
            const isActive = step === s.id;
            const isCompleted = steps.findIndex((x) => x.id === step) > i;
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-[#8013ec] text-white"
                          : "bg-[#302839] text-[#ab9db9]"
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      s.number
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isActive
                        ? "text-white"
                        : isCompleted
                          ? "text-green-400"
                          : "text-[#ab9db9]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-16 h-px mx-3 ${
                      isCompleted ? "bg-green-500" : "bg-[#302839]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left */}
          <div className="space-y-6">
            {/* Step 1 — Shipping */}
            {step === "shipping" && (
              <form onSubmit={handleContinueToPayment} className="space-y-6">
                <div className="rounded-xl border border-[#302839] bg-[#1a1620] p-6">
                  <ShippingInfo />
                </div>
                <button
                  type="submit"
                  disabled={isCreatingIntent || items.length === 0}
                  className="flex w-full items-center justify-center gap-2 rounded-xl h-13 px-6 py-3 bg-[#8013ec] text-white text-base font-bold tracking-wide hover:bg-violet-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/40"
                >
                  {isCreatingIntent ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Processing…
                    </>
                  ) : (
                    <>
                      Continue to Payment
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
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Step 2 — Payment */}
            {step === "payment" && stripeData && (
              <div className="space-y-4">
                {/* Shipping summary pill */}
                <div className="rounded-xl border border-[#302839] bg-[#1a1620] p-4 flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-400"
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
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#ab9db9] mb-0.5">Shipping to</p>
                    <p className="text-sm text-white font-medium truncate">
                      {shippingAddress}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="text-xs text-[#8013ec] hover:text-violet-400 transition-colors font-medium flex-shrink-0"
                  >
                    Edit
                  </button>
                </div>

                {/* Stripe form card */}
                <div className="rounded-xl border border-[#302839] bg-[#1a1620] p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">
                      Payment details
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-[#ab9db9]">
                      <svg
                        className="w-3.5 h-3.5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      SSL secured
                    </div>
                  </div>

                  <StripeCheckoutForm
                    clientSecret={stripeData.clientSecret}
                    paymentIntentId={stripeData.paymentIntentId}
                    shippingAddress={shippingAddress}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right — Order summary (sticky on desktop) */}
          <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
            <OrderSummary />
            <CartItems />
          </div>
        </div>
      </div>
    </main>
  );
}
