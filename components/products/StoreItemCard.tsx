import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatCurrency, formatDate } from "@/utils";
import { Product } from "@/src/schemas";

type StoreItemCardProps = {
  product: Product;
  itemQuantity: number;
  availableStock: number;
  isOutOfStock: boolean;
  handleAddToCart: (product: Product) => void;
  categoryNames: Record<string, string>;
};

export default function StoreItemCard({
  product,
  itemQuantity,
  availableStock,
  isOutOfStock,
  handleAddToCart,
  categoryNames,
}: StoreItemCardProps) {
  const router = useRouter();

  return (
    <div
      key={product.id}
      className="group flex flex-col w-4/5 mx-auto md:w-full md:mx-0 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#8013ec]/20 hover:-translate-y-2 bg-[#1a1620]"
    >
      <div className="relative w-full aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className={` w-1/2 mx-auto mt-20 md:mt-0 md:w-full object-cover rounded-t-lg ${
            product.stock === 0 ? "grayscale" : ""
          }`}
          loading="lazy"
        />

        {/* ✅ Overlay para productos sin stock */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-t-lg">
            <div className="text-white text-center">
              <div className="text-3xl mb-2">🚫</div>
              <div className="text-sm font-bold tracking-wider">
                OUT OF STOCK
              </div>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          {isOutOfStock ? (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {product.stock === 0 ? "Out of Stock" : "Max in Cart"}
            </span>
          ) : availableStock <= 5 ? (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              Only {availableStock} left
            </span>
          ) : (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              In Stock ({availableStock} available)
            </span>
          )}
        </div>

        {/* ✅ Badge de cantidad en carrito */}
        {itemQuantity > 0 && (
          <div className="absolute top-2 left-2">
            <span
              className={`text-white text-xs px-2 py-1 rounded-full font-bold ${
                availableStock <= 0
                  ? "bg-orange-500 animate-pulse"
                  : "bg-[#8013ec]"
              } `}
            >
              In Cart: {itemQuantity}
              {availableStock <= 0 && " (MAX)"}
            </span>
          </div>
        )}
      </div>

      <div
        className={`p-4 flex flex-col flex-grow ${
          product.stock === 0 ? "opacity-75" : ""
        }`}
      >
        <h3
          className={`text-lg font-bold leading-normal ${
            product.stock === 0
              ? "text-gray-400 dark:text-gray-500"
              : "text-white"
          }`}
        >
          {product.name}
          {product.stock === 0 && " (Out of Stock)"}
        </h3>
        <p className="text-[#ab9db9] text-sm mt-1 mb-2 flex-grow line-clamp-2">
          {product.description}
        </p>
        <p
          className="bg-[#8013ec] mb-2 rounded-lg w-1/3 text-center text-white cursor-pointer hover:bg-[#6c10c4] py-1 text-sm"
          onClick={() => router.push(`/products/${product.id}/info`)}
        >
          View Details
        </p>

        <div className="flex justify-between items-center mb-2">
          <p
            className={`text-xl font-bold ${
              product.stock === 0
                ? "text-gray-400 dark:text-gray-500"
                : "text-[#8013ec]"
            }`}
          >
            {formatCurrency(product.price)}
          </p>
          <button
            onClick={() => handleAddToCart(product)}
            disabled={isOutOfStock}
            className={`
              px-4 py-2 rounded-md transition-all duration-300 
              flex items-center space-x-2 transform
              ${
                isOutOfStock
                  ? "bg-gray-500 cursor-not-allowed opacity-50"
                  : "bg-[#8013ec] hover:bg-[#6c10c4] hover:scale-105"
              } text-white
                `}
            title={
              isOutOfStock
                ? product.stock === 0
                  ? "Product out of stock"
                  : "Maximum quantity in cart"
                : "Add to cart"
            }
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4-2h2.2M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
              />
            </svg>
            <span>
              {isOutOfStock
                ? product.stock === 0
                  ? "Sold Out"
                  : "Max in Cart"
                : "Add to Cart"}
            </span>
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-4 pt-4 border-t border-[#302839]">
          <div className="flex flex-col text-center md:flex-row justify-between text-xs text-[#ab9db9]">
            <span>
              Category:{" "}
              {categoryNames[product.categoryId.toString()] ||
                `ID ${product.categoryId}`}
            </span>
            <span>
              Added: {product.createdAt ? formatDate(product.createdAt) : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
