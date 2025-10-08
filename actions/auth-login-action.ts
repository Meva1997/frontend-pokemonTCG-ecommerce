"use server";

import { ErrorSchema, LoginSchema } from "@/src/schemas";
import { cookies } from "next/headers";

type ActionState = {
  errors: string[];
  success: string;
};
export async function loginFormAction(
  prevState: ActionState,
  formData: FormData
) {
  const loginFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const login = LoginSchema.safeParse(loginFormData);

  if (!login.success) {
    const errors = login.error.issues.map((issue) => issue.message);
    return {
      errors,
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/login`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: login.data.email,
      password: login.data.password,
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

  //Set cookie in the browser

  const cookiesStore = await cookies();
  cookiesStore.set({
    name: "tokenPokeTCG",
    value: json,
    httpOnly: true,
  });

  return { errors: [], success: "Login successful" };
}
