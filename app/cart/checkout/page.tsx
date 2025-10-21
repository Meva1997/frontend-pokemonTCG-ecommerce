import CartItems from "@/components/cart/CartItems";
import OrderSummary from "@/components/cart/OrderSummary";
import PaymentMethod from "@/components/cart/PaymentMethod";
import ShippingInfo from "@/components/cart/ShippingInfo";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <>
      <main className="flex-1 px-4 py-8 md:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column - Forms */}
          <div className="space-y-8">
            {/* Breadcrumb */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#ab9db9]">
                <Link
                  className="hover:text-white flex items-center"
                  href="/cart"
                >
                  Cart
                </Link>
                <span>
                  <svg
                    className="w-4 h-4 flex"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </span>
                <span className="text-sm text-[#ab9db9]">Checkout</span>
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Checkout
              </h1>
            </div>

            <div className="space-y-8">
              {/* Componente 1: Información de Envío */}
              <ShippingInfo />

              {/* Componente 2: Método de Pago */}
              <PaymentMethod />
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-8">
            {/* Componente 3: Resumen del Pedido */}
            <OrderSummary />

            {/* Componente 4: Contenido del Carrito */}
            <CartItems />
          </div>
        </div>
      </main>
    </>
  );
}
