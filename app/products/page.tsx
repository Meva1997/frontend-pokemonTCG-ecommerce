import { AllProductsSchema } from "@/src/schemas";
import StoreProducts from "@/components/products/StoreProducts";
import { redirect } from "next/navigation";

const fetchProducts = async () => {
  try {
    const url = `${process.env.API_URL}/products`;
    const req = await fetch(url, { method: "GET" });
    const json = await req.json();

    if (!req.ok) {
      // console.error("Failed to fetch products:", req.status, req.statusText);
      redirect("/home");
      return [];
    }

    // Validar y transformar los datos con el schema
    const products = AllProductsSchema.parse(json);
    return products;
  } catch (error) {
    // console.error("Error fetching products:", error);
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
