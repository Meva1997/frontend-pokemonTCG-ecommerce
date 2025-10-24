import OrdersUpdateStatus from "@/components/admin/orders/OrdersUpdateStatus";
import { OrderDetailSchema } from "@/src/schemas";
import { authenticatedFetch } from "@/utils/api";
import { redirect } from "next/navigation";

const fetchOrder = async (slug: string) => {
  const url = `${process.env.API_URL}/orders/${slug}`;
  const req = await authenticatedFetch(url, {
    method: "GET",
  });
  if (!req.ok) {
    redirect("/admin/orders");
  }
  const json = await req.json();
  const orderDetails = OrderDetailSchema.parse(json);
  return orderDetails;
};

export default async function EditOrderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const order = await fetchOrder(slug);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <OrdersUpdateStatus order={order} />
      </div>
    </div>
  );
}
