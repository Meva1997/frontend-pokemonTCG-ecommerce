import ProductInfo from "@/components/products/ProductInfo";
import React from "react";

export default async function UniqueProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <header className="mt-10">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Product Information
        </h1>
      </header>
      <main>
        <ProductInfo slug={slug} />
      </main>
    </>
  );
}
