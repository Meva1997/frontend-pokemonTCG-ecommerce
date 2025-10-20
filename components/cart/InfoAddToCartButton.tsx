"use client";

import { useCartStore } from "@/store/cartStore";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface AddToCartButtonProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    stock: number;
    categoryId: number;
  };
  className?: string;
  children?: React.ReactNode;
}

export default function InfoAddToCartButton({
  product,
  className = "",
  children,
}: AddToCartButtonProps) {
  const [mounted, setMounted] = useState(false);
  const { addItem, getItemQuantity } = useCartStore();

  // Evitar hydration mismatch
  const itemQuantity = mounted ? getItemQuantity(product.id) : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = () => {
    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
        categoryId: product.categoryId,
      });

      toast.success(`✅ ${product.name} added to cart!`);
    } catch (error) {
      // console.error("Error adding to cart:", error);
      toast.error("❌ Failed to add item to cart");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className={`
          bg-[#8013ec] hover:bg-[#6c10c4] text-white px-4 py-2 rounded-md
          transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
          transform hover:scale-105 flex items-center space-x-2
          ${className}
        `}
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
          {children || (product.stock > 0 ? "Add to Cart" : "Sold Out")}
        </span>
      </button>

      {/* Badge de cantidad en carrito */}
      {itemQuantity > 0 && (
        <div className="absolute -top-2 -right-2 bg-[#8013ec] text-white text-xs px-2 py-1 rounded-full font-bold border-2 border-white">
          {itemQuantity}
        </div>
      )}
    </div>
  );
}
