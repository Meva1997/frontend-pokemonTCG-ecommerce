"use client";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/src/schemas";
import { createCategoryAction } from "@/actions/admin-createCategory-action";
import { toast } from "react-toastify";
import { updateCategoryAction } from "@/actions/admin-updateCategory-action";

type FormData = {
  name: string;
  description: string;
  icon: string;
};

type CategoryFormProps = {
  initialData?: Category;
  mode?: "create" | "edit";
};

export function CategoryForm({
  initialData,
  mode = "create",
}: CategoryFormProps) {
  const router = useRouter();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    icon: initialData?.icon || "",
  });

  const action =
    mode === "edit" && initialData?.id
      ? updateCategoryAction.bind(null, initialData.id)
      : createCategoryAction;

  // Iconos sugeridos para categorías
  const suggestedIcons = [
    "📁",
    "📦",
    "🎮",
    "📱",
    "💻",
    "🎧",
    "🏠",
    "👕",
    "👟",
    "📚",
    "🎵",
    "🎨",
    "⚽",
    "🍔",
    "☕",
    "🚗",
    "✨",
    "🔥",
    "⭐",
    "💎",
    "🎯",
    "🛍️",
    "🎁",
    "🏆",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconSelect = (icon: string) => {
    setFormData((prev) => ({
      ...prev,
      icon,
    }));
  };

  const clearForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: "",
    });
  };

  const [state, dispatch] = useActionState(action, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success);
      if (mode === "create") {
        clearForm();
      } else {
        router.push("/admin/categories");
      }
      clearForm();
    }
  }, [state, router, mode]);

  // Títulos y textos dinámicos
  const isEditMode = mode === "edit";
  const title = isEditMode ? "Edit Category" : "Create New Category";
  const subtitle = isEditMode
    ? "Update the category information"
    : "Add a new category to organize your products";
  const submitText = isEditMode ? "Update Category" : "Create Category";
  const submitIcon = isEditMode ? (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  ) : (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
          </div>
          <div className="text-3xl">{formData.icon || "📁"}</div>
        </div>
      </div>

      {/* Form */}
      <form className=" p-6 space-y-6" action={dispatch} noValidate>
        {/* Category Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Category Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Ultra Premium Collection"
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            required
          />
        </div>

        {/* Category Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="e.g., Limited edition products with exclusive cards and collectibles"
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
            required
          />
        </div>

        {/* Icon Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category Icon
          </label>

          {/* Custom Icon Input */}
          <div className="mb-3">
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleInputChange}
              placeholder="Enter custom icon (emoji or text)"
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* Suggested Icons */}
          <div className="space-y-2 md:space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Or choose from suggested icons:
            </p>
            <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
              {suggestedIcons.map((icon, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleIconSelect(icon)}
                  className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-lg transition-colors ${
                    formData.icon === icon
                      ? "border-purple-500 bg-purple-100 dark:bg-purple-900/30"
                      : "border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          {formData.icon && (
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Preview:
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-lg">{formData.icon}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formData.name || "Category Name"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formData.description || "Category description..."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          {!isEditMode && (
            <button
              type="button"
              onClick={clearForm}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Clear Form
            </button>
          )}
          {isEditMode && <div></div>} {/* Spacer para mantener el layout */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className=" p-2 md:px-4 md:py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center space-x-2 p-2 md:px-6 md:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitIcon}
              <span>{submitText}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// ✅ Exportar como CreateCategoryForm para mantener compatibilidad
export { CategoryForm as CreateCategoryForm };
export default CategoryForm;
