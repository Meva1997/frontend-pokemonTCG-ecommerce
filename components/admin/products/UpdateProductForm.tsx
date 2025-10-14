"use client";
import { useActionState, useEffect } from "react";
import { updateProduct } from "@/actions/admin-updateProduct-action";
import { Category, Product } from "@/src/schemas";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

type UpdateProductFormProps = {
  product: Product;
  categories: Category;
};

export default function UpdateProductForm({
  product,
  categories,
}: UpdateProductFormProps) {
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [state, dispatch] = useActionState(updateProductWithId, {
    errors: [],
    success: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((err) => {
        toast.error(err);
      });
    }
    if (state.success) {
      toast.success(state.success);
      router.push("/admin/products");
    }
  }, [state, router]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-white/10 my-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Update Product
      </h1>

      <form action={dispatch} noValidate className="space-y-6">
        {/* Product Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Product Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter product name"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            defaultValue={product.name}
          />
        </div>

        {/* Price Field */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            defaultValue={product.price}
          />
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
            defaultValue={product.description}
          />
        </div>

        {/* Image URL Field */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Image URL
          </label>
          <input
            id="image"
            name="image"
            type="url"
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            defaultValue={product.image}
          />
          <Image
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
            className="mt-5 rounded-md"
            priority={false}
            unoptimized={true}
          />
        </div>

        {/* Stock Field */}
        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            defaultValue={product.stock}
          />
        </div>

        {/* Category Field */}
        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            defaultValue={product.categoryId}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => router.push("/admin/products")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-500 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
