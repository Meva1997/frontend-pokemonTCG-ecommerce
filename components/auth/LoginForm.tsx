"use client";
import Link from "next/link";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { loginFormAction } from "@/actions/auth-login-action";
import { toast } from "react-toastify";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useRouter } from "next/navigation";
import ErrorMessage from "../ui/ErrorMessage";

export default function LoginForm() {
  const [state, dispatch, isPending] = useActionState(loginFormAction, {
    errors: [],
    success: "",
  });

  const router = useRouter();
  const hasShownSuccess = useRef(false);

  // Local state for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create FormData with the current values
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

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

      setFormData({ email: "", password: "" });

      const timoutId = setTimeout(() => {
        router.push("/home");
      }, 3500);

      return () => clearTimeout(timoutId);
    }
  }, [state.success, isPending, router]);

  // Reset success flag if there are errors to allow re-showing success toast
  useEffect(() => {
    if (state.errors.length > 0) {
      hasShownSuccess.current = false;
    }
  }, [state.errors]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {state.errors.map((error) => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}
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
            inputMode="email"
            required
            placeholder="your@email.com"
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
            inputMode="text"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            disabled={isPending}
            className="block w-full rounded-lg border border-purple-500/20 dark:border-purple-500/30 bg-white dark:bg-gray-900 focus:border-purple-500 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 py-3 px-4 text-gray-900 dark:text-white outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <Link
            href="/auth/forgot-password"
            className="font-medium text-purple-500 hover:text-purple-400"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        {isPending ? (
          <LoadingSpinner />
        ) : (
          <button
            type="submit"
            className="flex w-full justify-center rounded-lg bg-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign in
          </button>
        )}
      </div>
    </form>
  );
}
