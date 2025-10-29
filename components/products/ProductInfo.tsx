import Image from "next/image";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/utils/index";
import InfoAddToCartButton from "../cart/InfoAddToCartButton";

const fetchProductBySlug = async (slug: string) => {
  const url = `${process.env.API_URL}/products/${slug}`;
  const req = await fetch(url, { method: "GET" });
  const json = await req.json();
  return json;
};

// Helper para obtener el estado del stock
const getStockStatus = (stock: number) => {
  if (stock === 0) return { text: "Out of stock", color: "text-red-400" };
  if (stock <= 5) return { text: "Last units", color: "text-yellow-400" };
  return { text: "In stock", color: "text-green-400" };
};

// Helper para mapear categorías (basado en tu mapping anterior)
const getCategoryName = (categoryId: number) => {
  const categories: { [key: number]: string } = {
    1: "Elite Trainer Box (ETB)",
    2: "Premium Collection",
    3: "Booster Packs",
    4: "Ultra Premium Collection",
  };
  return categories[categoryId] || `Category ${categoryId}`;
};

export default async function ProductInfo({ slug }: { slug: string }) {
  const product = await fetchProductBySlug(slug);

  const stockStatus = getStockStatus(product.stock);
  const categoryName = getCategoryName(product.categoryId);

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Imagen del producto */}
          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl shadow-[#8013ec]/20">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Información del producto */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <p className="text-[#ab9db9] text-sm font-medium">
                  Status:{" "}
                  <span className={stockStatus.color}>{stockStatus.text}</span>
                </p>
                {product.stock > 0 && (
                  <p className="text-[#ab9db9] text-sm font-medium">
                    Stock:{" "}
                    <span className="text-white">{product.stock} units</span>
                  </p>
                )}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter text-white">
                {product.name}
              </h1>
              <p className="text-[#ab9db9] text-sm font-medium mt-2">
                Category: {categoryName}
              </p>
            </div>

            <p className="text-[#ab9db9] text-base leading-relaxed">
              {product.description}
            </p>

            <p className="text-4xl font-bold text-[#8013ec]">
              {formatCurrency(product.price)}
            </p>

            <div className="flex items-center gap-4 mt-4">
              {product.stock > 0 && <InfoAddToCartButton product={product} />}
              <Link
                href="/products"
                className="flex-1 sm:flex-none flex min-w-[180px] max-w-full sm:max-w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#8013ec] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#6c10c4] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="truncate">Back to products</span>
              </Link>
            </div>

            {/* Información adicional */}
            <div className="mt-6 p-4 bg-[#1a1620] rounded-lg border border-[#302839]">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Product Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-[#ab9db9]">Product ID:</span>
                  <span className="text-white ml-2">#{product.id}</span>
                </div>
                <div>
                  <span className="text-[#ab9db9]">Available Stock:</span>
                  <span className={`ml-2 ${stockStatus.color}`}>
                    {product.stock} units
                  </span>
                </div>
                <div>
                  <span className="text-[#ab9db9]">Date Added:</span>
                  <span className="text-white ml-2">
                    {formatDate(product.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="text-[#ab9db9]">Last Updated:</span>
                  <span className="text-white ml-2">
                    {formatDate(product.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de productos relacionados - placeholder */}
      <div className="bg-[#1a1620] py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-white">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Placeholder para productos relacionados */}
            <div className="text-center text-[#ab9db9] col-span-full py-8">
              <p>Related products will be loaded soon...</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
