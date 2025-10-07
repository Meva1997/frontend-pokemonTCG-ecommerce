"use server";

import { ErrorSchema, RegisterSchema, SuccessSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function registerFormAction(
  prevState: ActionStateType,
  formData: FormData
) {
  const registerFormData = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const register = RegisterSchema.safeParse(registerFormData);

  if (!register.success) {
    const errors = register.error.issues.map((issue) => issue.message);

    return {
      errors,
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/create-account`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: register.data.userName,
      email: register.data.email,
      password: register.data.password,
    }),
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
