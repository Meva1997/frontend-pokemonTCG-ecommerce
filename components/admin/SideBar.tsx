"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SideBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = () => {
    return "bg-purple-500 text-white hover:bg-purple-700 p-2 rounded-lg";
  };

  // Sidebar content for reuse
  const sidebarContent = (
    <>
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          PokeTCG Admin
        </h1>
      </div>
      <nav className="flex-1 px-4 py-2 space-y-4">
        <Link
          href="/admin/users"
          className={`flex items-center gap-3 px-3 py-2 text-white rounded-lg ${
            pathname === "/admin/users"
              ? isActive()
              : "hover:bg-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          <span className="font-semibold">Users</span>
        </Link>
        <Link
          href="/admin/products"
          className={`flex items-center gap-3 px-3 py-2 text-white rounded-lg ${
            pathname === "/admin/products"
              ? isActive()
              : "hover:bg-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          <span className="font-semibold">Products</span>
        </Link>
        <Link
          href="/admin/categories"
          className={`flex items-center gap-3 px-3 py-2 text-white rounded-lg ${
            pathname === "/admin/categories"
              ? isActive()
              : "hover:bg-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          <span className="font-semibold">Categories</span>
        </Link>
        <Link
          href="/admin/orders"
          className={`flex items-center gap-3 px-3 py-2 text-white rounded-lg ${
            pathname === "/admin/orders"
              ? isActive()
              : "hover:bg-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          <span className="font-semibold">Orders</span>
        </Link>
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center p-2 bg-background-light dark:bg-background-dark border-b border-gray-300 dark:border-white/10 absolute top-30 left-0 right-0 my-6 ">
        <button
          aria-label="Open sidebar"
          className="text-purple-600 dark:text-purple-400 focus:outline-none"
          onClick={() => setOpen(true)}
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span className="ml-2 font-bold text-lg text-gray-900 dark:text-white">
          Menu
        </span>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-40 md:w-52 xl:w-64 bg-background-light dark:bg-background-dark border-r-4 border-gray-500 dark:border-white/10 flex-col min-h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <aside className="relative w-64 max-w-full bg-background-light dark:bg-background-dark border-r-4 border-gray-500 dark:border-white/10 flex flex-col min-h-screen animate-slide-in">
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-white/10">
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Menu
              </span>
              <button
                aria-label="Close sidebar"
                className="text-purple-600 dark:text-purple-400 focus:outline-none"
                onClick={() => setOpen(false)}
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M6 18L18 6"
                  />
                </svg>
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
      {/* Simple slide-in animation */}
      <style jsx>{`
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
