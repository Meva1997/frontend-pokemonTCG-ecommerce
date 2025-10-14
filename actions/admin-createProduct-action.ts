"use server";

import { ErrorSchema, SuccessSchema, UpdateProductSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type ActionState = {
  errors: string[];
  success: string;
};

export const addProductAction = async (
  prevState: ActionState,
  formData: FormData
) => {
  const productForm = {
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    image: formData.get("image"),
    stock: formData.get("stock"),
    categoryId: formData.get("categoryId"),
  };

  const form = UpdateProductSchema.safeParse(productForm);

  if (!form.success) {
    const errors = form.error.issues.map((err) => err.message);
    return {
      errors,
      success: "",
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("tokenPokeTCG")?.value;

  const url = `${process.env.API_URL}/products`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form.data),
  });

  const json = await req.json();

  if (!req.ok) {
    const { error } = ErrorSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json);

  revalidatePath("/admin/products");
  redirect("/admin/products");

  return {
    errors: [],
    success,
  };
};
