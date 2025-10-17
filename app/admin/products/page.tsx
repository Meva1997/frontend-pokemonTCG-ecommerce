import ProductsHeader from "@/components/admin/products/ProductsHeader";
import ProductsTable from "@/components/admin/products/ProductsTable";
import SideBar from "@/components/admin/SideBar";
// import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { AllProductsSchema } from "@/src/schemas";
// import { Suspense } from "react";

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
  const product = await fetchProducts();

  return (
    <>
      <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
        <SideBar />
        {/* Main Content */}
        <main className="flex-1 p-8">
          <ProductsHeader />
          <div className="max-w-7xl mx-auto">
            {/* products Table */}
            {/* <Suspense fallback={<LoadingSpinner />}> */}
            <ProductsTable products={product} />
            {/* </Suspense> */}
          </div>
        </main>
      </div>
    </>
  );
}
