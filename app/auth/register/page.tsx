import RegisterForm from "@/components/auth/RegisterForm";

import { Metadata } from "next";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export const metadata: Metadata = {
  title: "PokeTCG Store - Register",
  description: "Create an account at PokeTCG Store",
  keywords: ["register", "sign up", "create account", "PokeTCG Store"],
};

export default function RegisterPage() {
  return (
    <div className="flex my-20 flex-col">
      {/* Main Content */}
      <main className="flex-grow mb-20">
        <div className="container mx-auto flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            {/* Registration Form */}
            <Suspense fallback={<LoadingSpinner />}>
              <RegisterForm />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
