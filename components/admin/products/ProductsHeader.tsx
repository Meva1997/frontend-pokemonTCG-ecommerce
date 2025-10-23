// "use client";

import { CategoriesSchema } from "@/src/schemas";
import AddProductButton from "./AddProductButton";

const fetchCategories = async () => {
  const url = `${process.env.API_URL}/categories`;
  const req = await fetch(url, { method: "GET" });
  const json = await req.json();
  if (!req.ok) {
    throw new Error("Failed to fetch categories");
  }
  const categories = CategoriesSchema.parse(json); // Assuming the API returns an array of categories
  return categories;
};

export default async function ProductsHeader() {
  const categories = await fetchCategories();

  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
        Products
      </h2>
      <div className="flex items-center justify-end bg-purple-600/50 dark:bg-purple-600/80 p-2 rounded-lg hover:bg-purple-800 transition-all cursor-pointer">
        <AddProductButton categories={categories} />
      </div>
    </div>
  );
}
