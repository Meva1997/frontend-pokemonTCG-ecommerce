import OrdersHeader from "@/components/admin/orders/OrdersHeader";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";
import SideBar from "@/components/admin/SideBar";
import { OrdersArraySchema } from "@/src/schemas";
import { authenticatedFetch } from "@/utils/api";
// import LoadingSpinner from "@/components/ui/LoadingSpinner";
// import { Suspense } from "react";

async function fetchOrders() {
  const url = `${process.env.API_URL}/orders`;
  const req = await authenticatedFetch(url);
  if (!req.ok) {
    throw new Error("Failed to fetch orders");
  }
  const json = await req.json();
  const orders = OrdersArraySchema.parse(json);
  return orders;
}

export default async function AdminOrdersPage() {
  // Aquí más adelante podrás reemplazar con tu función de fetch real
  const orders = await fetchOrders();

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <SideBar />
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <OrdersHeader orders={orders} />
        <div className="max-w-7xl mx-auto">
          {/* Orders Table */}
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <OrdersTable orders={orders} />
          {/* </Suspense> */}
        </div>
      </main>
    </div>
  );
}
