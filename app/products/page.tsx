import { AllProductsSchema } from "@/src/schemas";
import StoreProducts from "@/components/products/StoreProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - PokeTCG Store",
  description: "Browse our collection of Pokemon TCG cards and merchandise",
};

const fetchProducts = async () => {
  try {
    const url = `${process.env.API_URL}/products`;
    const req = await fetch(url, { method: "GET" });

    if (!req.ok) {
      return [];
    }

    const json = await req.json();

    // Validar y transformar los datos con el schema
    const products = AllProductsSchema.parse(json);
    return products;
  } catch (error) {
    // Handle error by returning an empty array
    return [];
  }
};

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <>
      {/* Pasar los productos reales al componente */}
      <StoreProducts products={products} />
    </>
  );
}
