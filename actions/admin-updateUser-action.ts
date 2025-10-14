"use server";

import { ErrorSchema, SuccessSchema, updateUserSchema } from "@/src/schemas";
import { cookies } from "next/headers";

type ActionStateType = {
  errors: string[];
  success: string;
};

export const updateUserAction = async (
  slug: number,
  prevState: ActionStateType,
  formData: FormData
) => {
  const rawForm = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    currentPassword: formData.get("currentPassword") as string,
    newPassword: formData.get("newPassword") as string,
    confirmNewPassword: formData.get("confirmNewPassword") as string,
    isAdmin: formData.get("isAdmin") === "on",
  };

  const cleanedForm = {
    userName: rawForm.userName,
    email: rawForm.email,
    currentPassword: rawForm.currentPassword?.trim() || undefined,
    newPassword: rawForm.newPassword?.trim() || undefined,
    confirmNewPassword: rawForm.confirmNewPassword?.trim() || undefined,
    isAdmin: rawForm.isAdmin,
  };

  const formValidation = updateUserSchema.safeParse(cleanedForm);

  if (!formValidation.success) {
    const errors = formValidation.error.issues.map((err) => err.message);
    return {
      errors,
      success: "",
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("tokenPokeTCG")?.value;

  const url = `${process.env.API_URL}/users/${slug}`;

  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formValidation.data),
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

  return {
    errors: [],
    success,
  };
};
