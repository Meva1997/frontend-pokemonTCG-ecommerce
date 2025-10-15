"use server";

import {
  ErrorSchema,
  PasswordSchema,
  SuccessSchema,
  User,
} from "@/src/schemas";
import { cookies } from "next/headers";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function adminDeleteUserAction(
  id: User["id"],
  prevState: ActionStateType,
  formData: FormData
) {
  const rawForm = {
    password: formData.get("password"),
  };

  const form = PasswordSchema.safeParse(rawForm);

  if (!form.success) {
    const errors = form.error.issues.map((err) => err.message);
    return {
      errors,
      success: "",
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("tokenPokeTCG")?.value;

  const url = `${process.env.API_URL}/users/${id}`;

  const req = await fetch(url, {
    method: "DELETE",
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

  return {
    errors: [],
    success,
  };
}
