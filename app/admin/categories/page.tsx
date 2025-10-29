import CategoriesInfo from "@/components/admin/categories/CategoriesInfo";
import { CategoryForm } from "@/components/admin/categories/CreateCategoryForm";
import SideBar from "@/components/admin/SideBar";
import { verifySession } from "@/src/auth/dal";
import { CategoriesSchema } from "@/src/schemas";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Categories - PokeTCG Store",
  description: "Manage categories in the admin panel",
};

const fetchCategories = async () => {
  const url = `${process.env.API_URL}/categories`;
  const req = await fetch(url);
  const json = await req.json();
  if (!req.ok) {
    return [];
  }
  const categories = CategoriesSchema.parse(json);
  return categories;
};

export default async function CategoriesPage() {
  const { user } = await verifySession();

  if (!user.isAdmin) {
    redirect("/home");
  }
  const categories = await fetchCategories();

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <main className="flex-1 mt-10 md:my-0">
        <div className="max-w-7xl mx-auto space-y-8 mb-6 md:mb-0">
          {/* Categories Info */}
          <CategoriesInfo categories={categories} />

          {/* Create Category Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 w-3/4 mx-auto md:w-full">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white my-4 px-4">
              Create New Category
            </h2>
            <CategoryForm mode="create" />
          </div>
        </div>
      </main>
    </div>
  );
}
