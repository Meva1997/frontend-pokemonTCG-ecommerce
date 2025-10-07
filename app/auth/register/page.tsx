import Link from "next/link";
import SocialLogin from "@/components/SocialLogin";
import RegisterForm from "@/components/auth/RegisterForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PokeTCG Store - Register",
  description: "Create an account at PokeTCG Store",
  keywords: ["register", "sign up", "create account", "PokeTCG Store"],
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Create an account
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Registration Form */}
            <RegisterForm />

            {/* Social Login Section */}
            <SocialLogin />
          </div>
        </div>
      </main>
    </div>
  );
}
