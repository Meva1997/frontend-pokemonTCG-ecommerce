import CartContent from "@/components/cart/CartContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart - PokeTCG Store",
  description: "View and manage your shopping cart at PokeTCG Store",
};

export default function ShoppingCartPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-10">Shopping Cart</h1>
      <main>
        <CartContent />
      </main>
    </>
  );
}
