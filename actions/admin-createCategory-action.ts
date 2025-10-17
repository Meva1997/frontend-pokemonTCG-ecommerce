"use server";

import {
  CreateCategorySchema,
  ErrorSchema,
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ActionStateType = {
  errors: string[];
  success: string;
};

export const createCategoryAction = async (
  prevState: ActionStateType,
  formData: FormData
) => {
  const rawForm = {
    name: formData.get("name"),
    description: formData.get("description"),
    icon: formData.get("icon"),
  };

  const form = CreateCategorySchema.safeParse(rawForm);

  if (!form.success) {
    const errors = form.error.issues.map((err) => err.message);
    return {
      errors,
      success: "",
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("tokenPokeTCG")?.value;

  const url = `${process.env.API_URL}/categories`;

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

  revalidatePath("/admin/categories");

  return {
    errors: [],
    success,
  };
};
