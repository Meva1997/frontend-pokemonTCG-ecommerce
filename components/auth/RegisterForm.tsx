"use client";

import { registerFormAction } from "@/actions/create-account-action";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import ErrorMessage from "../ui/ErrorMessage";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../ui/LoadingSpinner";
import { toast } from "react-toastify";
import Link from "next/link";

export default function RegisterForm() {
  const [state, dispatch, isPending] = useActionState(registerFormAction, {
    errors: [],
    success: "",
  });

  const router = useRouter();
  const hasShownSuccess = useRef(false);

  // Local state for form inputs
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Function to handle changes in the form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Custom function to submit the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create FormData with the current values
    const formDataToSend = new FormData();
    formDataToSend.append("userName", formData.userName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("confirmPassword", formData.confirmPassword);

    // Send using the action
    startTransition(() => {
      dispatch(formDataToSend);
    });
  };

  // ✅ Move side effects into useEffect
  useEffect(() => {
    if (state.success && !isPending && !hasShownSuccess.current) {
      hasShownSuccess.current = true;
      toast.success(state.success);

      // Limpiar el formulario solo cuando es exitoso
      setFormData({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Delay navigation to allow the toast to be seen
      const timeoutId = setTimeout(() => {
        router.push("/auth/login");
      }, 1500);

      // Cleanup timeout if the component unmounts before navigation
      return () => clearTimeout(timeoutId);
    }
  }, [state.success, isPending, router]);

  // Reset the flag when there are errors (to allow new attempts)
  useEffect(() => {
    if (state.errors.length > 0) {
      hasShownSuccess.current = false;
    }
  }, [state.errors]);

  return (
    <div className="relative flex pt-20 w-full flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-purple-500/20 dark:border-purple-500/30 shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20">
        <div className="p-8 md:p-12">
          <div className="text-center my-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Create an account
            </h2>
            <p className="my-2 text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary hover:text-primary/80"
              >
                Sign in
              </Link>
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {state.errors.map((error) => (
              <ErrorMessage key={error}>{error}</ErrorMessage>
            ))}
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={formData.userName}
                  onChange={handleInputChange}
                  disabled={isPending}
                  className="block w-full rounded-lg border border-purple-500/20 dark:border-purple-500/30 bg-white dark:bg-gray-900 focus:border-purple-500 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 py-3 px-4 text-gray-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isPending}
                  className="block w-full rounded-lg border border-purple-500/20 dark:border-purple-500/30 bg-white dark:bg-gray-900 focus:border-purple-500 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 py-3 px-4 text-gray-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isPending}
                  className="block w-full rounded-lg border border-purple-500/20 dark:border-purple-500/30 bg-white dark:bg-gray-900 focus:border-purple-500 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 py-3 px-4 text-gray-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isPending}
                  className="block w-full rounded-lg border border-purple-500/20 dark:border-purple-500/30 bg-white dark:bg-gray-900 focus:border-purple-500 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 py-3 px-4 text-gray-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div>
              {isPending ? (
                <LoadingSpinner />
              ) : (
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex w-full justify-center rounded-lg bg-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create an account
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
