"use client";

import { useState } from "react";
import { formatCurrency } from "@/utils";
import { sampleProducts } from "@/src/db/productsMock";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [priceRange, setPriceRange] = useState(200);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [outOfStockOnly, setOutOfStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Popularidad");

  // Filtrar productos
  const filteredProducts = sampleProducts.filter((product) => {
    const categoryMatch =
      selectedCategory === "Todas" || product.category === selectedCategory;
    const priceMatch = product.price <= priceRange;
    const stockMatch =
      (!inStockOnly && !outOfStockOnly) ||
      (inStockOnly && product.stock > 0) ||
      (outOfStockOnly && product.stock === 0);

    return categoryMatch && priceMatch && stockMatch;
  });

  // Función para obtener el color del stock
  const getStockColor = (stock: number) => {
    if (stock === 0) return "text-red-500";
    if (stock <= 5) return "text-yellow-400";
    return "text-green-400";
  };

  // Función para formatear el stock
  const formatStock = (stock: number) => {
    if (stock === 0) return "Agotado";
    if (stock > 50) return "En stock: 50+";
    return `En stock: ${stock}`;
  };

  return (
    <div>
      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter">
              Nuestros Productos
            </h1>
            <p className="text-[#ab9db9] text-lg mt-2">
              Explora nuestra colección de cartas y productos de Pokémon TCG.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filtros */}
            <aside className="w-full lg:w-1/4 xl:w-1/5 space-y-8">
              <div className="bg-[#1a1620] p-6 rounded-lg shadow-lg shadow-[#8013ec]/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  Filtros
                </h3>
                <div className="space-y-4">
                  {/* Categoría */}
                  <div>
                    <label
                      className="block text-sm font-medium text-[#ab9db9] mb-2"
                      htmlFor="category"
                    >
                      Categoría
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
                      <option>Todas</option>
                      <option>Carta Individual</option>
                      <option>Booster Box</option>
                      <option>Elite Trainer Box</option>
                      <option>Accesorio</option>
                      <option>Colección Especial</option>
                    </select>
                  </div>

                  {/* Precio */}
                  <div>
                    <label
                      className="block text-sm font-medium text-[#ab9db9] mb-2"
                      htmlFor="price"
                    >
                      Precio
                    </label>
                    <input
                      className="w-full h-2 bg-[#302839] rounded-lg appearance-none cursor-pointer accent-[#8013ec]"
                      id="price"
                      max="200"
                      min="0"
                      name="price"
                      type="range"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-[#ab9db9] mt-1">
                      <span>$0</span>
                      <span>${priceRange}+</span>
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
                          En Stock
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
                          Agotado
                        </label>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-[#8013ec] hover:bg-[#6c10c4] text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2">
                    <div className="pokeball-icon">
                      <style jsx>{`
                        .pokeball-icon {
                          width: 20px;
                          height: 20px;
                          background-color: #fff;
                          border-radius: 50%;
                          position: relative;
                          border: 2px solid #8013ec;
                          display: inline-block;
                          vertical-align: middle;
                        }
                        .pokeball-icon::before {
                          content: "";
                          position: absolute;
                          top: 50%;
                          left: 0;
                          right: 0;
                          height: 2px;
                          background-color: #8013ec;
                          transform: translateY(-50%);
                        }
                        .pokeball-icon::after {
                          content: "";
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          width: 6px;
                          height: 6px;
                          background-color: #fff;
                          border: 2px solid #8013ec;
                          border-radius: 50%;
                          transform: translate(-50%, -50%);
                        }
                      `}</style>
                    </div>
                    Aplicar Filtros
                  </button>
                </div>
              </div>
            </aside>

            {/* Contenido Principal */}
            <div className="w-full lg:w-3/4 xl:w-4/5">
              <div className="flex justify-between items-center mb-6">
                <p className="text-[#ab9db9]">
                  Mostrando {filteredProducts.length} de {sampleProducts.length}{" "}
                  productos
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
                    <option>Ordenar por: Popularidad</option>
                    <option>Ordenar por: Precio (Ascendente)</option>
                    <option>Ordenar por: Precio (Descendente)</option>
                    <option>Ordenar por: Fecha de Lanzamiento</option>
                  </select>
                </div>
              </div>

              {/* Grid de productos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group flex flex-col rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#8013ec]/20 hover:-translate-y-2 bg-[#1a1620]"
                  >
                    <div className="relative w-full aspect-square">
                      <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover rounded-t-lg"
                        style={{ backgroundImage: `url("${product.image}")` }}
                      ></div>
                      <div className="absolute top-2 right-2 bg-[#8013ec] text-white text-xs font-bold px-2 py-1 rounded-full">
                        {product.category}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold leading-normal">
                        {product.name}
                      </h3>
                      <p className="text-[#ab9db9] text-sm mt-1 mb-2 flex-grow">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xl font-bold text-[#8013ec]">
                          {formatCurrency(product.price)}
                        </p>
                        <p
                          className={`text-sm ${getStockColor(product.stock)}`}
                        >
                          {formatStock(product.stock)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
