"use client";

import { Suspense, useState } from "react";
import { Product, ProductsArrayType } from "@/src/schemas";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-toastify";
import LoadingSpinner from "../ui/LoadingSpinner";
import StoreItemCard from "./StoreItemCard";
import SidebarFilter from "./SidebarFilter";
import SidebarSkeleton from "./SidebarSkeleton";

interface PageExampleProps {
  products: ProductsArrayType;
}

export default function StoreProducts({ products }: PageExampleProps) {
  const { addItem, getItemQuantity } = useCartStore(); // ✅ Usar el store

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(500);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [outOfStockOnly, setOutOfStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Popularity");

  // ✅ Función para añadir al carrito
  const handleAddToCart = (product: Product) => {
    const itemQuantity = getItemQuantity(product.id);
    const availableStock = product.stock - itemQuantity;

    // Verificar si hay stock disponible
    if (availableStock <= 0) {
      if (product.stock === 0) {
        toast.error(`${product.name} is out of stock!`);
      } else {
        toast.warning(
          `⚠️ Maximum quantity of ${product.name} already in cart!`
        );
      }
      return;
    }

    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
        categoryId: product.categoryId,
      });

      // ✅ Notificación de éxito
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      // console.error("Error adding to cart:", error);
      toast.error("❌ Failed to add item to cart");
    }
  };

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
        return 0;
    }
  });

  return (
    <div>
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
                <Suspense fallback={<SidebarSkeleton />}>
                  <SidebarFilter
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    inStockOnly={inStockOnly}
                    setInStockOnly={setInStockOnly}
                    outOfStockOnly={outOfStockOnly}
                    setOutOfStockOnly={setOutOfStockOnly}
                    uniqueCategories={uniqueCategories}
                    categoryNames={categoryNames}
                  />
                </Suspense>
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
                {sortedProducts.map((product) => {
                  const itemQuantity = getItemQuantity(product.id); // ✅ Cantidad en carrito
                  const availableStock = product.stock - itemQuantity; // ✅ Stock disponible real
                  const isOutOfStock = availableStock <= 0; // ✅ Sin stock disponible

                  return (
                    <Suspense key={product.id} fallback={<LoadingSpinner />}>
                      <StoreItemCard
                        product={product}
                        key={product.id}
                        itemQuantity={itemQuantity}
                        availableStock={availableStock}
                        isOutOfStock={isOutOfStock}
                        handleAddToCart={handleAddToCart}
                        categoryNames={categoryNames}
                      />
                    </Suspense>
                  );
                })}
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
