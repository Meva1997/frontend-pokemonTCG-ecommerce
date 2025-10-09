import Link from "next/link";
import React from "react";

export default function SideBar() {
  return (
    <aside className="w-64 bg-background-light dark:bg-background-dark border-r-4 border-gray-500 dark:border-white/10 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          PokeTCG Admin
        </h1>
      </div>
      <nav className="flex-1 px-4 py-2 space-y-1">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-3 py-2 text-white bg-primary rounded-lg"
        >
          <span className="font-semibold">Users</span>
        </Link>
      </nav>
    </aside>
  );
}
