"use client";

import React, { useState } from "react";
import { formatCurrency, formatDate } from "@/utils";
import ProductsSearchBar from "./ProductsSearchBar";
import Link from "next/link";
import { ProductsArrayType } from "@/src/schemas";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ConfirmPassword from "@/components/ui/ConfirmPassword";

export default function ProductsTable({
  products,
}: {
  products: ProductsArrayType;
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoryId.toString().includes(searchTerm.toLowerCase())
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
          Low stock ({stock})
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
          In stock ({stock})
        </span>
      );
    }
  };

  // Calcular estadísticas
  const totalProducts = products.length;
  const inStockProducts = products.filter((p) => p.stock > 0).length;
  const lowStockProducts = products.filter(
    (p) => p.stock > 0 && p.stock <= 5
  ).length;
  const outOfStockProducts = products.filter((p) => p.stock === 0).length;
  const totalValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ">
        <div className="flex flex-col space-y-4 text-center lg:flex-row lg:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Products Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your inventory and product details
            </p>
          </div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            Total Products: {totalProducts}
          </div>
        </div>
      </div>

      {/* Products Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Products</p>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
            <div className="text-3xl opacity-80">📦</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">In Stock</p>
              <p className="text-2xl font-bold">{inStockProducts}</p>
            </div>
            <div className="text-3xl opacity-80">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Low Stock</p>
              <p className="text-2xl font-bold">{lowStockProducts}</p>
            </div>
            <div className="text-3xl opacity-80">⚠️</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Out of Stock</p>
              <p className="text-2xl font-bold">{outOfStockProducts}</p>
            </div>
            <div className="text-3xl opacity-80">❌</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 px-6">
        <ProductsSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Products Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Products ({filteredProducts.length})
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Value: {formatCurrency(totalValue)}
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 p-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
              >
                {/* Product Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-lg"
                        priority={false}
                        unoptimized={true}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-lg">📦</span>`;
                          }
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {product.id}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-1 pl-2 flex-col sm:flex-row sm:pl-0">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                    <button
                      className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors"
                      onClick={() =>
                        router.push(`?deleteProductId=${product.id}`)
                      }
                    >
                      <ConfirmPassword type="product" />
                    </button>
                  </div>
                </div>

                {/* Product Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Product Meta */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      Price:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(product.price)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      Stock:
                    </span>
                    {getStockBadge(product.stock)}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      Category:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {product.categoryId}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      Created:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {product.createdAt
                        ? formatDate(product.createdAt)
                        : "N/A"}
                    </span>
                  </div>

                  {/* Total Value */}
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Total Value:
                    </span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(product.price * product.stock)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? "No products found" : "No products available"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by adding your first product"}
            </p>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              onClick={() => {
                if (searchTerm) {
                  setSearchTerm("");
                }
              }}
            >
              {searchTerm ? "Clear Search" : "Add Product"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
