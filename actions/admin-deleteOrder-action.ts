"use server";

import {
  ErrorSchema,
  OrderDetail,
  PasswordSchema,
  SuccessSchema,
} from "@/src/schemas";
import { cookies } from "next/headers";

type ActionState = {
  errors: string[];
  success: string;
};

export const deleteOrderAction = async (
  id: OrderDetail["id"],
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

  const url = `${process.env.API_URL}/orders/${id}`;
  const req = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(validateForm.data),
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
