"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductsArrayType } from "@/src/schemas";
import { formatCurrency, formatDate } from "@/utils";
import { useRouter } from "next/navigation";

interface PageExampleProps {
  products: ProductsArrayType;
}

export default function StoreProducts({ products }: PageExampleProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(500); // Aumentado para cubrir el rango de tus productos
  const [inStockOnly, setInStockOnly] = useState(false);
  const [outOfStockOnly, setOutOfStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Popularity");

  // Obtener categorías únicas de los productos reales
  const uniqueCategories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.categoryId.toString()))),
  ];

  // Mapeo de categoryId a nombres más amigables
  const categoryNames: { [key: string]: string } = {
    "1": "Elite Trainer Box (ETB)",
    "2": "Premium Collection",
    "3": "Booster Packs",
    "4": "Ultra Premium Collection",
    // Puedes agregar más según tus categorías
  };

  // Filtrar productos
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" ||
      product.categoryId.toString() === selectedCategory;
    const priceMatch = product.price <= priceRange;
    const stockMatch =
      (!inStockOnly && !outOfStockOnly) ||
      (inStockOnly && product.stock > 0) ||
      (outOfStockOnly && product.stock === 0);

    return categoryMatch && priceMatch && stockMatch;
  });

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Sort by: Price (Ascending)":
        return a.price - b.price;
      case "Sort by: Price (Descending)":
        return b.price - a.price;
      case "Sort by: Release Date":
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );
      default:
        return 0; // Popularity (mantener orden original)
    }
  });

  return (
    <div>
      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter text-white">
              Our Products
            </h1>
            <p className="text-[#ab9db9] text-lg mt-2">
              Explore our collection of Pokémon TCG cards and products.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filtros */}
            <aside className="w-full lg:w-1/4 xl:w-1/5 space-y-8">
              <div className="bg-[#1a1620] p-6 rounded-lg shadow-lg shadow-[#8013ec]/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                  Filters
                </h3>
                <div className="space-y-4">
                  {/* Categoría */}
                  <div>
                    <label
                      className="block text-sm font-medium text-[#ab9db9] mb-2"
                      htmlFor="category"
                    >
                      Category
                    </label>
                    <select
                      className="w-full bg-[#302839] border border-[#302839] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8013ec] focus:border-[#8013ec] appearance-none"
                      id="category"
                      name="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ab9db9' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="All">All Categories</option>
                      {uniqueCategories.slice(1).map((categoryId) => (
                        <option key={categoryId} value={categoryId}>
                          {categoryNames[categoryId] ||
                            `Category ${categoryId}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Precio */}
                  <div>
                    <label
                      className="block text-sm font-medium text-[#ab9db9] mb-2"
                      htmlFor="price"
                    >
                      Price (Max: ${priceRange})
                    </label>
                    <input
                      className="w-full h-2 bg-[#302839] rounded-lg appearance-none cursor-pointer accent-[#8013ec]"
                      id="price"
                      max="500"
                      min="0"
                      name="price"
                      type="range"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-[#ab9db9] mt-1">
                      <span>$0</span>
                      <span>$500</span>
                    </div>
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-sm font-medium text-[#ab9db9]">
                      Stock
                    </label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <input
                          className="h-4 w-4 rounded border-[#302839] bg-[#302839] text-[#8013ec] focus:ring-[#8013ec]"
                          id="in-stock"
                          name="stock"
                          type="checkbox"
                          checked={inStockOnly}
                          onChange={(e) => setInStockOnly(e.target.checked)}
                        />
                        <label
                          className="ml-2 text-sm text-white"
                          htmlFor="in-stock"
                        >
                          In Stock
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          className="h-4 w-4 rounded border-[#302839] bg-[#302839] text-[#8013ec] focus:ring-[#8013ec]"
                          id="out-of-stock"
                          name="stock"
                          type="checkbox"
                          checked={outOfStockOnly}
                          onChange={(e) => setOutOfStockOnly(e.target.checked)}
                        />
                        <label
                          className="ml-2 text-sm text-white"
                          htmlFor="out-of-stock"
                        >
                          Out of Stock
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full bg-[#8013ec] hover:bg-[#6c10c4] text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
                    onClick={() => {
                      setSelectedCategory("All");
                      setPriceRange(500);
                      setInStockOnly(false);
                      setOutOfStockOnly(false);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      className="inline-block"
                      fill="white"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        fill="white"
                        stroke="#8013ec"
                        strokeWidth="2"
                      />
                      <line
                        x1="2"
                        y1="10"
                        x2="18"
                        y2="10"
                        stroke="#8013ec"
                        strokeWidth="2"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="2"
                        fill="white"
                        stroke="#8013ec"
                        strokeWidth="2"
                      />
                    </svg>
                    Clear Filters
                  </button>
                </div>
              </div>
            </aside>

            {/* Contenido Principal */}
            <div className="w-full lg:w-3/4 xl:w-4/5">
              <div className="flex justify-between items-center mb-6">
                <p className="text-[#ab9db9]">
                  Showing {sortedProducts.length} of {products.length} products
                </p>
                <div className="relative">
                  <select
                    className="bg-[#1a1620] border border-[#302839] rounded-md py-2 pl-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-[#8013ec] focus:border-[#8013ec] appearance-none"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ab9db9' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: "right 0.5rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1.5em 1.5em",
                      paddingRight: "2.5rem",
                    }}
                  >
                    <option value="Popularity">Sort by: Popularity</option>
                    <option value="Sort by: Price (Ascending)">
                      Sort by: Price (Low to High)
                    </option>
                    <option value="Sort by: Price (Descending)">
                      Sort by: Price (High to Low)
                    </option>
                    <option value="Sort by: Release Date">
                      Sort by: Release Date
                    </option>
                  </select>
                </div>
              </div>

              {/* Grid de productos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group flex flex-col rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#8013ec]/20 hover:-translate-y-2 bg-[#1a1620]"
                  >
                    <div className="relative w-full aspect-square">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover rounded-t-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-product.png"; // Fallback image
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        {product.stock > 0 ? (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            In Stock ({product.stock})
                          </span>
                        ) : (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold leading-normal text-white">
                        {product.name}
                      </h3>
                      <p className="text-[#ab9db9] text-sm mt-1 mb-2 flex-grow line-clamp-2">
                        {product.description}
                      </p>
                      <p
                        className=" bg-[#8013ec] mb-2 rounded-lg w-1/3 text-center text-white cursor-pointer hover:bg-[#6c10c4]"
                        onClick={() =>
                          router.push(`/products/${product.id}/info`)
                        }
                      >
                        View Details
                      </p>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xl font-bold text-[#8013ec]">
                          {formatCurrency(product.price)}
                        </p>
                        <button
                          className="bg-[#8013ec] hover:bg-[#6c10c4] text-white px-4 py-2 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={product.stock === 0}
                        >
                          {product.stock > 0 ? "Add to Cart" : "Sold Out"}
                        </button>
                      </div>

                      {/* Información adicional */}
                      <div className="mt-4 pt-4 border-t border-[#302839]">
                        <div className="flex justify-between text-xs text-[#ab9db9]">
                          <span>
                            Category:{" "}
                            {categoryNames[product.categoryId.toString()] ||
                              `ID ${product.categoryId}`}
                          </span>
                          <span>
                            Added:{" "}
                            {product.createdAt
                              ? formatDate(product.createdAt)
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Estado vacío */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    No products found
                  </h3>
                  <p className="text-[#ab9db9] mb-4">
                    We couldn&apos;t find any products matching your criteria.
                  </p>
                  <button
                    className="bg-[#8013ec] hover:bg-[#6c10c4] text-white px-6 py-3 rounded-md transition-colors duration-300"
                    onClick={() => {
                      setSelectedCategory("All");
                      setPriceRange(500);
                      setInStockOnly(false);
                      setOutOfStockOnly(false);
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
