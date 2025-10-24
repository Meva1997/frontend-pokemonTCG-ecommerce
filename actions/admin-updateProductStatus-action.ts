"use server";

import {
  ErrorSchema,
  OrderStatusUpdateSchema,
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ActionStateType = {
  errors: string[];
  success: string;
};

export const adminUpdateProductStatusAction = async (
  id: string,
  prevState: ActionStateType,
  formData: FormData
) => {
  const rawForm = {
    status: formData.get("status"),
  };

  const form = OrderStatusUpdateSchema.safeParse(rawForm);

  if (!form.success) {
    const error = form.error.issues.map((err) => err.message);
    return {
      ...prevState,
      errors: error,
      success: "",
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("tokenPokeTCG")?.value;

  const url = `${process.env.API_URL}/orders/${id}`;

  const req = await fetch(url, {
    method: "PUT",
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
      ...prevState,
      errors: [error],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json);

  revalidatePath(`/admin/orders/${id}`);

  return {
    errors: [],
    success,
  };
};
