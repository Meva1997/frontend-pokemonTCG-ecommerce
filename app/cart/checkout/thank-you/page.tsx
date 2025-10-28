"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const [mounted, setMounted] = useState(false);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate order number only on client side
    setOrderNumber(Math.floor(Math.random() * 900000) + 100000);
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#141118] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-6 animate-pulse">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141118] relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {Math.random() > 0.5 ? "🎉" : "✨"}
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 md:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-6 animate-pulse">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Thank you for your purchase!
            </h1>

            <p className="text-xl text-[#ab9db9] mb-2">
              Your order has been successfully processed
            </p>

            <p className="text-[#8013ec] font-bold text-lg">
              Order number: #{orderNumber}
            </p>
          </div>

          {/* Order Confirmation Card */}
          <div className="bg-[#211c27] border border-[#302839] rounded-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  📧 What&apos;s next?
                </h2>
                <div className="space-y-3 text-[#ab9db9]">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#8013ec] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm">
                      We&apos;ve sent you a confirmation email with your order
                      details
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#8013ec] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm">
                      You&apos;ll receive another email when your order ships
                      with tracking information
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#8013ec] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm">
                      Estimated delivery time is 3-5 business days
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  🚚 Shipping information
                </h2>
                <div className="bg-[#1a1620] border border-[#302839] rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#ab9db9]">Status:</span>
                      <span className="text-yellow-400 font-medium">
                        Processing
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#ab9db9]">Method:</span>
                      <span className="text-white">Standard shipping</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#ab9db9]">Estimated time:</span>
                      <span className="text-white">3-5 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#8013ec] hover:bg-[#6c10c4] text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Continue shopping
            </Link>

            <Link
              href="/auth/account"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#211c27] hover:bg-[#302839] text-white font-medium border border-[#302839] rounded-lg transition-all duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              View my orders
            </Link>
          </div>

          {/* Support Section */}
          <div className="bg-[#211c27] border border-[#302839] rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              Need help?
            </h3>
            <p className="text-[#ab9db9] mb-4">
              If you have any questions about your order, don&apos;t hesitate to
              contact us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support"
                className="inline-flex items-center justify-center px-6 py-2 text-[#8013ec] hover:text-white border border-[#8013ec] hover:bg-[#8013ec] rounded-md transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Support center
              </Link>
              <a
                href="mailto:support@poketcg.com"
                className="inline-flex items-center justify-center px-6 py-2 text-[#ab9db9] hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                support@poketcg.com
              </a>
            </div>
          </div>

          {/* Pokemon Theme Footer */}
          <div className="text-center mt-8 text-[#ab9db9]">
            <p className="text-sm">
              Thank you for being part of the PokeTCG community! 🎮✨
            </p>
            <p className="text-xs mt-2">
              We hope you enjoy your new Pokémon TCG collection
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
