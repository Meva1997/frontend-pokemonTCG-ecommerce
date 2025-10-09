"use client";
import { AuthLogoutAction } from "@/actions/auth-logout-action";
import React from "react";

export default function LogoutForm() {
  return (
    <button
      type="button"
      className="rounded-lg bg-purple-600 px-4 text-white hover:bg-purple-700 cursor-pointer"
      onClick={async () => {
        await AuthLogoutAction();
      }}
    >
      Logout
    </button>
  );
}
