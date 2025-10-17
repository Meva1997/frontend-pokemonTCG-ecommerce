import CategoriesInfo from "@/components/admin/categories/CategoriesInfo";
import { CategoryForm } from "@/components/admin/categories/CreateCategoryForm";
import SideBar from "@/components/admin/SideBar";
import { CategoriesSchema } from "@/src/schemas";

const fetchCategories = async () => {
  const url = `${process.env.API_URL}/categories`;
  const req = await fetch(url);
  const json = await req.json();
  if (!req.ok) {
    throw new Error("Failed to fetch categories");
  }
  const categories = CategoriesSchema.parse(json);
  return categories;
};

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Categories Info */}
          <CategoriesInfo categories={categories} />

          {/* Create Category Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Create New Category
            </h2>
            <CategoryForm mode="create" />
          </div>
        </div>
      </main>
    </div>
  );
}
