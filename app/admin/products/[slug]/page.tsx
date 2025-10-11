"use client";
import ProductDetails from "@/components/admin/products/ProductDetails";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductByIdPage() {
  const params = useParams<{ slug: string }>();
  const { slug } = params;

  return (
    <>
      <h1>Product Detail Page</h1>
      <Link href="/admin/products" className="text-blue-500 underline">
        Back to Products
      </Link>
      <ProductDetails slug={slug} />
    </>
  );
}
