"use client";

import { useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe, Appearance } from "@stripe/stripe-js";
import { confirmPaymentAction } from "@/actions/confirm-payment-action";

// Initialise Stripe once outside the component tree to avoid re-creating on every render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const stripeAppearance: Appearance = {
  theme: "night",
  variables: {
    colorPrimary: "#8013ec",
    colorBackground: "#211c27",
    colorText: "#ffffff",
    colorDanger: "#f87171",
    fontFamily: "inherit",
    borderRadius: "6px",
  },
};

// ─── Inner form — must be a descendant of <Elements> ─────────────────────────

interface CheckoutFormInnerProps {
  paymentIntentId: string;
  shippingAddress: string;
  onSuccess: (orderId: number) => void;
  onError: (message: string) => void;
}

function CheckoutFormInner({
  paymentIntentId,
  shippingAddress,
  onSuccess,
  onError,
}: CheckoutFormInnerProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsSubmitting(true);

    // 1. Tell Stripe to collect card details and confirm the PaymentIntent
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (stripeError) {
      onError(stripeError.message ?? "Payment failed. Please try again.");
      setIsSubmitting(false);
      return;
    }

    if (!paymentIntent || paymentIntent.status !== "succeeded") {
      onError(
        `Payment not yet completed. Status: ${paymentIntent?.status ?? "unknown"}`,
      );
      setIsSubmitting(false);
      return;
    }

    // 2. Confirm the order on the backend
    const result = await confirmPaymentAction(paymentIntentId, shippingAddress);

    if (result.errors.length > 0) {
      onError(result.errors[0]);
      setIsSubmitting(false);
      return;
    }

    if (result.data) {
      onSuccess(result.data.orderId);
    }

    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Test card banner */}
      <details className="group rounded-lg border border-yellow-500/30 bg-yellow-500/5 overflow-hidden">
        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none select-none">
          <div className="flex items-center gap-2">
            <span className="text-base">🧪</span>
            <span className="text-yellow-400 text-sm font-semibold">
              Test mode — click to see card details
            </span>
          </div>
          <svg
            className="w-4 h-4 text-yellow-400/60 transition-transform group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </summary>
        <div className="px-4 pb-4 pt-1 border-t border-yellow-500/20">
          <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-xs font-mono mt-2">
            <span className="text-yellow-400/60">Card number</span>
            <span className="text-yellow-200">4242 4242 4242 4242</span>
            <span className="text-yellow-400/60">Expiry</span>
            <span className="text-yellow-200">12 / 29</span>
            <span className="text-yellow-400/60">CVC</span>
            <span className="text-yellow-200">424</span>
            <span className="text-yellow-400/60">ZIP</span>
            <span className="text-yellow-200">42424</span>
          </div>
        </div>
      </details>

      <PaymentElement options={{ layout: "tabs" }} />

      <button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className="relative flex w-full items-center justify-center gap-2 rounded-xl h-13 px-6 py-3 bg-[#8013ec] text-white text-base font-bold tracking-wide hover:bg-violet-600 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/40"
      >
        {isSubmitting ? (
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
            Processing payment…
          </>
        ) : (
          <>
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Pay now
          </>
        )}
      </button>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-4 pt-1">
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          Secure payment
        </div>
        <div className="w-px h-3 bg-[#302839]" />
        <div className="flex items-center gap-1.5 text-xs text-[#ab9db9]">
          <svg
            className="w-3.5 h-3.5"
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
          Powered by Stripe
        </div>
      </div>
    </form>
  );
}

// ─── Public wrapper — mounts Elements context ────────────────────────────────

interface StripeCheckoutFormProps {
  clientSecret: string;
  paymentIntentId: string;
  shippingAddress: string;
  onSuccess: (orderId: number) => void;
  onError: (message: string) => void;
}

export default function StripeCheckoutForm({
  clientSecret,
  paymentIntentId,
  shippingAddress,
  onSuccess,
  onError,
}: StripeCheckoutFormProps) {
  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance: stripeAppearance }}
    >
      <CheckoutFormInner
        paymentIntentId={paymentIntentId}
        shippingAddress={shippingAddress}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
}
