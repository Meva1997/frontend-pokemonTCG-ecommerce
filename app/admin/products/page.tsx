import ProductsHeader from "@/components/admin/products/ProductsHeader";
import ProductsTable from "@/components/admin/products/ProductsTable";
import SideBar from "@/components/admin/SideBar";
import React from "react";

export default function AdminProductsPage() {
  return (
    <>
      <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
        <SideBar />
        {/* Main Content */}
        <main className="flex-1 p-8">
          <ProductsHeader />
          <div className="max-w-7xl mx-auto">
            {/* products Table */}
            <ProductsTable />
          </div>
        </main>
      </div>
    </>
  );
}
