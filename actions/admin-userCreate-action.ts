"use server";

import { CreateUserSchema, ErrorSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function AdminUserCreateAction(
  prevState: ActionStateType,
  formData: FormData
) {
  const adminForm = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    isAdmin: formData.get("isAdmin") === "true", // Checkbox handling
  };

  const correctAdminForm = CreateUserSchema.safeParse(adminForm);

  if (!correctAdminForm.success) {
    const errors = correctAdminForm.error.issues.map((err) => err.message);
    return {
      errors,
      success: "",
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("tokenPokeTCG")?.value;

  const url = `${process.env.API_URL}/users`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(correctAdminForm.data),
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

  revalidatePath("/admin");

  return {
    errors: [],
    success,
  };
}
