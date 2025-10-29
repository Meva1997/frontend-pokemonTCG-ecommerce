import ProductsHeader from "@/components/admin/products/ProductsHeader";
import ProductsTable from "@/components/admin/products/ProductsTable";
import SideBar from "@/components/admin/SideBar";
import { verifySession } from "@/src/auth/dal";
import { AllProductsSchema } from "@/src/schemas";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Products - PokeTCG Store",
  description: "Manage products in the admin panel",
};

const fetchProducts = async () => {
  const url = `${process.env.API_URL}/products`;
  const req = await fetch(url, { method: "GET" });
  const json = await req.json();
  if (!req.ok) {
    return [];
  }
  const product = AllProductsSchema.parse(json);
  return product;
};

export default async function AdminProductsPage() {
  const { user } = await verifySession();

  if (!user.isAdmin) {
    redirect("/home");
  }

  const product = await fetchProducts();

  return (
    <>
      <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
        <SideBar />
        {/* Main Content */}
        <main className="flex-1 p-8 my-16 md:my-0">
          <ProductsHeader />
          <div className="max-w-7xl mx-auto">
            {/* products Table */}
            <ProductsTable products={product} />
          </div>
        </main>
      </div>
    </>
  );
}
