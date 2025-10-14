"use server";

import {
  ErrorSchema,
  PasswordSchema,
  Product,
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ActionState = {
  errors: string[];
  success: string;
};

export const deleteProductAction = async (
  id: Product["id"],
  prevState: ActionState,
  formData: FormData
) => {
  const form = {
    password: formData.get("password"),
  };

  const validateForm = PasswordSchema.safeParse(form);

  if (!validateForm.success) {
    const errors = validateForm.error.issues.map((err) => err.message);
    return {
      errors,
      success: "",
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("tokenPokeTCG")?.value;

  const url = `${process.env.API_URL}/products/${id}`;
  const req = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(validateForm.data),
  });
  console.log("🚀 ~ deleteProductAction ~ req:", req);

  const json = await req.json();
  console.log("🚀 ~ deleteProductAction ~ json:", json);

  if (!req.ok) {
    const { error } = ErrorSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json);

  revalidatePath("/admin/products");

  return {
    errors: [],
    success,
  };
};
