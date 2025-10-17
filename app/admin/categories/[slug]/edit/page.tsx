import { CategoryForm } from "@/components/admin/categories/CreateCategoryForm";
import { CategorySchema } from "@/src/schemas";
import { authenticatedFetch } from "@/utils/api";
import Link from "next/link";

const fetchCategoryData = async (slug: string) => {
  const req = await authenticatedFetch(
    `${process.env.API_URL}/categories/${slug}`,
    {
      method: "GET",
    }
  );
  if (!req.ok) {
    throw new Error("Failed to fetch category data");
  }
  const json = await req.json();
  const category = CategorySchema.parse(json);
  return category;
};

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await fetchCategoryData(slug);

  return (
    <main className="my-10 p-10 max-w-4xl mx-auto">
      <section className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Edit Category</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Make changes to the category details below.
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-purple-600 p-3 rounded-lg cursor-pointer hover:bg-purple-100 hover:dark:bg-purple-500 transition-colors">
          <Link href="/admin/categories">Go back to the categories list</Link>
        </div>
      </section>

      {/* ✅ Usar el formulario en modo edit */}
      <CategoryForm initialData={category} mode="edit" />
    </main>
  );
}
