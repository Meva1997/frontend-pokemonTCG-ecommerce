import OrdersHeader from "@/components/admin/orders/OrdersHeader";
import OrdersTable from "@/components/admin/orders/OrdersTable";
import SideBar from "@/components/admin/SideBar";
// import LoadingSpinner from "@/components/ui/LoadingSpinner";
// import { Suspense } from "react";

// Mock data basado en tu respuesta del backend
const mockOrders = [
  {
    id: 3,
    userId: 1,
    status: "paid",
    shippingAddress: "casa",
    total: 15.98,
    createdAt: "2025-10-21T16:52:48.214Z",
    updatedAt: "2025-10-21T17:04:18.297Z",
    orderProducts: [
      {
        productId: 4,
        quantity: 2,
        price: 7.99,
        product: {
          name: "Ultra Pro Sleeves",
          image:
            "https://res.cloudinary.com/dukbscvow/image/upload/v1760447573/Captura_de_pantalla_2025-10-14_a_la_s_7.12.38_a.m._pbbwiz.png",
          price: 7.99,
        },
      },
    ],
  },
  {
    id: 4,
    userId: 1,
    status: "pending",
    shippingAddress: "av. del Bajio 1700-4",
    total: 489.99,
    createdAt: "2025-10-22T15:22:11.229Z",
    updatedAt: "2025-10-22T15:22:11.229Z",
    orderProducts: [
      {
        productId: 9,
        quantity: 1,
        price: 450,
        product: {
          name: "Evolving Skies Booster Box",
          image:
            "https://res.cloudinary.com/dukbscvow/image/upload/v1760447198/Captura_de_pantalla_2025-10-14_a_la_s_7.06.22_a.m._xug6zo.png",
          price: 450,
        },
      },
      {
        productId: 8,
        quantity: 1,
        price: 39.99,
        product: {
          name: "Pikachu V-UNION Box",
          image:
            "https://res.cloudinary.com/dukbscvow/image/upload/v1760446802/Captura_de_pantalla_2025-10-14_a_la_s_6.59.48_a.m._vn2dw1.png",
          price: 39.99,
        },
      },
    ],
  },
  {
    id: 7,
    userId: 1,
    status: "paid",
    shippingAddress: "av. del Bajio 1700-4",
    total: 529.98,
    createdAt: "2025-10-22T15:49:42.856Z",
    updatedAt: "2025-10-22T15:49:44.013Z",
    orderProducts: [
      {
        productId: 9,
        quantity: 1,
        price: 450,
        product: {
          name: "Evolving Skies Booster Box",
          image:
            "https://res.cloudinary.com/dukbscvow/image/upload/v1760447198/Captura_de_pantalla_2025-10-14_a_la_s_7.06.22_a.m._xug6zo.png",
          price: 450,
        },
      },
      {
        productId: 8,
        quantity: 2,
        price: 39.99,
        product: {
          name: "Pikachu V-UNION Box",
          image:
            "https://res.cloudinary.com/dukbscvow/image/upload/v1760446802/Captura_de_pantalla_2025-10-14_a_la_s_6.59.48_a.m._vn2dw1.png",
          price: 39.99,
        },
      },
    ],
  },
  {
    id: 2,
    userId: 1,
    status: "shipped",
    shippingAddress: "casa",
    total: 15.98,
    createdAt: "2025-10-21T16:31:56.842Z",
    updatedAt: "2025-10-21T16:36:43.476Z",
    orderProducts: [],
  },
];

export default async function AdminOrdersPage() {
  // Aquí más adelante podrás reemplazar con tu función de fetch real
  const orders = mockOrders;

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <SideBar />
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <OrdersHeader />
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
