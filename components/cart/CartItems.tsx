"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/utils";

export default function CartItems() {
  const { items } = useCartStore();

  return (
    <div className="rounded-lg border border-[#302839] bg-[#211c27] p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
      </h3>
      <div className="space-y-4">
        {/* ✅ Mapear sobre el array items */}
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-md flex-shrink-0 overflow-hidden bg-[#302839]">
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm leading-tight">
                {item.name} {/* ✅ Acceder a item.name */}
              </p>
              <p className="text-sm text-[#ab9db9]">
                Quantity: {item.quantity} {/* ✅ Acceder a item.quantity */}
              </p>
              <p className="text-xs text-[#ab9db9]">
                {formatCurrency(item.price)} each{" "}
                {/* ✅ Acceder a item.price */}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white font-medium">
                {formatCurrency(item.price * item.quantity)}{" "}
                {/* ✅ Calcular total por producto */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
