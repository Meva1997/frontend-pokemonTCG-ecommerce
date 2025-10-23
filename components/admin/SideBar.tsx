"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();

  const isActive = () => {
    return "bg-purple-500 text-white hover:bg-purple-700 p-2 rounded-lg";
  };

  return (
    <aside className=" w-40 md:w-52 xl:w-64 bg-background-light dark:bg-background-dark border-r-4 border-gray-500 dark:border-white/10 flex flex-col">
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
    </aside>
  );
}
