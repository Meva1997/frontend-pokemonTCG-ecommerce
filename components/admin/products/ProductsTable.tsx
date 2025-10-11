"use client";

import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { sampleProductsAdmin } from "@/src/db/productsMock";
import { formatCurrency } from "@/utils";
import ProductsSearchBar from "./ProductsSearchBar";

export default function ProductsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products] = useState(sampleProductsAdmin);

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para obtener el badge de stock
  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">
          Out of stock
        </span>
      );
    } else if (stock <= 5) {
      return (
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">
          {stock} in stock
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
          {stock} in stock
        </span>
      );
    }
  };

  const router = useRouter();

  const getProductDetailLink = (slug: string) => {
    const productLink = router.push(`/admin/products/${slug}`);
    return productLink;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search Bar */}
      <ProductsSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/10">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 dark:border-white/10">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                Product
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                Stock
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                Price
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                Category
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                Created At
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <Suspense fallback={<LoadingSpinner />}>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm
                          ? "No products found matching your search."
                          : "No products available."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 dark:border-white/10 last:border-b-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    onClick={() => getProductDetailLink(product.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-md bg-gray-200 dark:bg-white/10 flex items-center justify-center overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="w-auto object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<span class="material-symbols-outlined text-gray-400">image</span>`;
                              }
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStockBadge(product.stock)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-medium">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                      {product.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </button>
                        <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </Suspense>
          </tbody>
        </table>
      </div>
    </div>
  );
}
