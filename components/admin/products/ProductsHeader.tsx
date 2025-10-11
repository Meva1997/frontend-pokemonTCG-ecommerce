"use client";

import AddProductButton from "./AddProductButton";

export default function ProductsHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
        Products
      </h2>
      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors my-4 bg-purple-500 w-1/6 hover:bg-purple-600 cursor-pointer">
        <AddProductButton />
      </div>
    </div>
  );
}
