import Link from "next/link";
import SocialLogin from "@/components/SocialLogin";
import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PokeTCG Store - Login",
  description: "Log in to your account at PokeTCG Store",
  keywords: ["login", "sign in", "auth", "PokeTCG Store"],
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 pokeball-bg">
      <div className="w-full max-w-md rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-purple-500/20 dark:border-purple-500/30 shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20">
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-purple-500/20 dark:bg-purple-500/30 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-gray-900">
              <svg
                className="w-10 h-10 text-purple-500"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 20C21.7909 20 20 21.7909 20 24C20 26.2091 21.7909 28 24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20Z"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path d="M4 24H44" stroke="currentColor" strokeWidth="4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              PokeTCG Store
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Log in to your account
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Social Login Section */}
          <SocialLogin />

          {/* Register Link */}
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-semibold leading-6 text-purple-500 hover:text-purple-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
