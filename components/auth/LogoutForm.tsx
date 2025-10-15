"use client";
import { useState } from "react";
import { AuthLogoutAction } from "@/actions/auth-logout-action";
import { toast } from "react-toastify";

export default function LogoutForm() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogOut = async () => {
    setIsLoggingOut(true);
    toast.info("Logging out...");
    try {
      await AuthLogoutAction();
    } catch (error) {
      // console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
      toast.success("Logged out successfully");
    }
  };

  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      onClick={handleLogOut}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? (
        <>
          {/* Spinner */}
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
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
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Logging out...
        </>
      ) : (
        "Logout"
      )}
    </button>
  );
}
