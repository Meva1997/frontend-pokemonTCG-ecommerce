"use server";

import {
  ErrorSchema,
  Product,
  SuccessSchema,
  UpdateProductSchema,
} from "@/src/schemas";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function updateProduct(
  productId: Product["id"],
  prevState: ActionStateType,
  formData: FormData
) {
  const rawForm = {
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    image: formData.get("image"),
    stock: formData.get("stock"),
    categoryId: formData.get("categoryId"),
  };

  const updateForm = UpdateProductSchema.safeParse(rawForm);
  if (!updateForm.success) {
    const errors = updateForm.error.issues.map((err) => err.message);
    return {
      errors,
      success: "",
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("tokenPokeTCG")?.value;

  const url = `${process.env.API_URL}/products/${productId}`;

  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateForm.data),
  });

  const json = await req.json();

  if (!req.ok) {
  }

  const success = SuccessSchema.parse(json);

  return {
    errors: [],
    success,
  };
}
