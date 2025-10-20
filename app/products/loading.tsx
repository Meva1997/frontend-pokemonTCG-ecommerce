import React from "react";

// Skeleton individual del producto
const ProductCardSkeleton = () => {
  return (
    <div className="group flex flex-col rounded-lg overflow-hidden bg-[#1a1620] animate-pulse">
      {/* Imagen skeleton */}
      <div className="relative w-full aspect-square bg-[#302839] rounded-t-lg">
        <div className="absolute top-2 right-2">
          <div className="bg-[#302839] h-6 w-16 rounded-full"></div>
        </div>
      </div>

      {/* Contenido skeleton */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Título skeleton */}
        <div className="h-6 bg-[#302839] rounded mb-2 w-3/4"></div>

        {/* Descripción skeleton */}
        <div className="space-y-2 mb-2 flex-grow">
          <div className="h-4 bg-[#302839] rounded w-full"></div>
          <div className="h-4 bg-[#302839] rounded w-2/3"></div>
        </div>

        {/* Botón "View Details" skeleton */}
        <div className="h-6 bg-[#302839] rounded mb-2 w-1/3"></div>

        {/* Precio y botón skeleton */}
        <div className="flex justify-between items-center mb-2">
          <div className="h-8 bg-[#302839] rounded w-20"></div>
          <div className="h-10 bg-[#302839] rounded w-24"></div>
        </div>

        {/* Información adicional skeleton */}
        <div className="mt-4 pt-4 border-t border-[#302839]">
          <div className="flex justify-between text-xs">
            <div className="h-3 bg-[#302839] rounded w-20"></div>
            <div className="h-3 bg-[#302839] rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton del sidebar de filtros
const FiltersSkeleton = () => {
  return (
    <aside className="w-full lg:w-1/4 xl:w-1/5 space-y-8">
      <div className="bg-[#1a1620] p-6 rounded-lg shadow-lg shadow-[#8013ec]/10 animate-pulse">
        <div className="h-6 bg-[#302839] rounded mb-4 w-16"></div>
        <div className="space-y-4">
          {/* Category filter skeleton */}
          <div>
            <div className="h-4 bg-[#302839] rounded mb-2 w-16"></div>
            <div className="h-10 bg-[#302839] rounded w-full"></div>
          </div>

          {/* Price filter skeleton */}
          <div>
            <div className="h-4 bg-[#302839] rounded mb-2 w-20"></div>
            <div className="h-2 bg-[#302839] rounded w-full mb-1"></div>
            <div className="flex justify-between">
              <div className="h-3 bg-[#302839] rounded w-6"></div>
              <div className="h-3 bg-[#302839] rounded w-8"></div>
            </div>
          </div>

          {/* Stock filter skeleton */}
          <div>
            <div className="h-4 bg-[#302839] rounded mb-2 w-12"></div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-[#302839] rounded"></div>
                <div className="h-3 bg-[#302839] rounded w-16"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-[#302839] rounded"></div>
                <div className="h-3 bg-[#302839] rounded w-20"></div>
              </div>
            </div>
          </div>

          {/* Clear filters button skeleton */}
          <div className="h-10 bg-[#302839] rounded w-full"></div>
        </div>
      </div>
    </aside>
  );
};

export default function Loading() {
  return (
    <div>
      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          {/* Header skeleton */}
          <div className="text-center mb-12 animate-pulse">
            <div className="h-12 bg-[#302839] rounded mx-auto mb-2 w-64"></div>
            <div className="h-6 bg-[#302839] rounded mx-auto w-96"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters Skeleton */}
            <FiltersSkeleton />

            {/* Main Content Skeleton */}
            <div className="w-full lg:w-3/4 xl:w-4/5">
              {/* Controls skeleton */}
              <div className="flex justify-between items-center mb-6 animate-pulse">
                <div className="h-5 bg-[#302839] rounded w-48"></div>
                <div className="h-10 bg-[#302839] rounded w-48"></div>
              </div>

              {/* Products grid skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {/* Renderizar 6 productos skeleton */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
