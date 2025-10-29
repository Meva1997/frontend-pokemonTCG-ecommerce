import CartContent from "@/components/cart/CartContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart - PokeTCG Store",
  description: "View and manage your shopping cart at PokeTCG Store",
};

export default function ShoppingCartPage() {
  return (
    <>
      <main>
        <CartContent />
      </main>
    </>
  );
}
