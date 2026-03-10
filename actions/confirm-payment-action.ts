"use server";

import { cookies } from "next/headers";
import {
  ConfirmPaymentRequestSchema,
  ConfirmPaymentResponseSchema,
  ErrorSchema,
} from "@/src/schemas";

type ConfirmPaymentActionState = {
  errors: string[];
  data: {
    message: string;
    orderId: number;
    paymentId: number;
    status: "paid";
  } | null;
};

export async function confirmPaymentAction(
  paymentIntentId: string,
  shippingAddress: string,
): Promise<ConfirmPaymentActionState> {
  // Validate the payload before hitting the network
  const parseResult = ConfirmPaymentRequestSchema.safeParse({
    paymentIntentId,
    shippingAddress,
  });

  if (!parseResult.success) {
    return {
      errors: parseResult.error.issues.map((i) => i.message),
      data: null,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("tokenPokeTCG")?.value;

  if (!token) {
    return { errors: ["You must be logged in to proceed."], data: null };
  }

  const url = `${process.env.API_URL}/payments/confirm`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(parseResult.data),
    });
  } catch {
    return {
      errors: ["Network error — could not reach the server."],
      data: null,
    };
  }

  const json = await res.json();

  if (!res.ok) {
    const parsed = ErrorSchema.safeParse(json);
    return {
      errors: [parsed.success ? parsed.data.error : "Unexpected server error"],
      data: null,
    };
  }

  const parsed = ConfirmPaymentResponseSchema.safeParse(json);
  if (!parsed.success) {
    return { errors: ["Invalid response from server"], data: null };
  }

  return { errors: [], data: parsed.data };
}
