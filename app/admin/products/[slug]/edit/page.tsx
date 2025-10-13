import UpdateProductForm from "@/components/admin/products/UpdateProductForm";
import { CategoriesSchema, ProductsSchema } from "@/src/schemas";
import { authenticatedFetch } from "@/utils/api";
import Link from "next/link";
import { notFound } from "next/navigation";

const getProductById = async (slug: string) => {
  const url = `${process.env.API_URL}/products/${slug}`;
  const req = await authenticatedFetch(url, { method: "GET" });
  const json = await req.json();
  if (!req.ok) {
    notFound();
  }
  const product = ProductsSchema.parse(json);
  return product;
};

const getAllCategories = async () => {
  const url = `${process.env.API_URL}/categories`;
  const req = await fetch(url, { method: "GET" });
  const json = await req.json();
  if (!req.ok) {
    return [];
  }
  const categories = CategoriesSchema.parse(json);
  return categories;
};

export default async function UpdateProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductById(slug);
  const categories = await getAllCategories();

  return (
    <>
      <header className="my-6 max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-left">
            Edit Product: {product.name}{" "}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Update the details of the product below.
          </p>
        </div>

        <div className="">
          <Link
            href="/admin/products"
            className="inline-block px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </header>
      <UpdateProductForm product={product} categories={categories} />
    </>
  );
}
