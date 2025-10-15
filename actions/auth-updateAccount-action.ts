"use server";

import { ErrorSchema, SuccessSchema, UpdateAccountSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ActionState = {
  errors: string[];
  success: string;
};

export async function updateAccountAction(
  prevState: ActionState,
  formData: FormData
) {
  const accountForm = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmNewPassword: formData.get("confirmNewPassword"),
  };

  const form = UpdateAccountSchema.safeParse(accountForm);
  if (!form.success) {
    const errors = form.error.issues.map((err) => err.message);
    return { errors, success: "" };
  }

  const cookiesStore = await cookies();
  const token = cookiesStore.get("tokenPokeTCG")?.value;

  const url = `${process.env.API_URL}/auth/update-account`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(accountForm),
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

  revalidatePath("/auth/account");

  return { errors: [], success };
}
