import OrdersHeader from "@/components/admin/orders/OrdersHeader";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";
import SideBar from "@/components/admin/SideBar";
import { verifySession } from "@/src/auth/dal";
import { OrdersArraySchema } from "@/src/schemas";
import { authenticatedFetch } from "@/utils/api";
import { redirect } from "next/navigation";

async function fetchOrders() {
  const url = `${process.env.API_URL}/orders`;
  const req = await authenticatedFetch(url);
  if (!req.ok) {
    return [];
  }
  const json = await req.json();
  const orders = OrdersArraySchema.parse(json);
  return orders;
}

export default async function AdminOrdersPage() {
  const orders = await fetchOrders();
  const { user } = await verifySession();

  if (!user.isAdmin) {
    redirect("/home");
  }

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
