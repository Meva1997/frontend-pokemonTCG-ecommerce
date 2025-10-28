import AccountForm from "@/components/auth/AccountForm";
import OrderHistory from "@/components/auth/OrderHistory";
import { verifySession } from "@/src/auth/dal";
import { authenticatedFetch } from "@/utils/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Account - PokeTCG Store",
  description: "Manage your account settings",
};

const fetchOrderHistory = async (userId: string) => {
  const url = `${process.env.API_URL}/orders/user/${userId}`;
  const req = await authenticatedFetch(url);
  if (!req.ok) {
    console.log("Failed to fetch order history");
    return [];
  }
  const json = await req.json();
  return json;
};

export default async function AccountPage() {
  const { user } = await verifySession();

  const orderHistory = await fetchOrderHistory(user.id.toString());

  return (
    <>
      <main className="my-10">
        <h2 className="text-center text-2xl font-bold my-10">
          Manage your <span className="text-purple-500">account settings</span>{" "}
          and view your <span className="text-purple-500">order history</span>
        </h2>
        <article>
          <AccountForm user={user} />
        </article>
        <hr className="my-6" />
        <article>
          <h3 className="text-xl font-semibold text-center my-6">
            Order History
          </h3>
          <OrderHistory orders={orderHistory} />
        </article>
      </main>
    </>
  );
}
