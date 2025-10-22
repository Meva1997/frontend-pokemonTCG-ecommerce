"use server";

import { ErrorSchema, SuccessSchemaObj } from "@/src/schemas";
import { cookies } from "next/headers";

type ActionStateType = {
  errors: string[];
  success: string | { message: string };
};

export async function checkoutPaymentAction(
  prevState: ActionStateType,
  formData: FormData
) {
  const rawShippingInfo = {
    name: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    country: formData.get("country"),
    phone: formData.get("phone"),
  };

  const productsRaw = formData.get("products") as string;
  const products = productsRaw ? JSON.parse(productsRaw) : [];

  // Info de pago
  const paymentInfo = {
    method: "test", // o formData.get("method") si lo tienes en el formulario
    currency: "usd",
    notes: "Pago desde frontend",
    last4: (formData.get("cardNumber") as string)?.slice(-4) || "",
    brand: "visa", // podrías deducir la marca por el número de tarjeta si quieres
  };

  const orderPayload = {
    products,
    shippingAddress: rawShippingInfo.address,
  };

  const cookieStore = await cookies();
  const token = cookieStore.get("tokenPokeTCG")?.value;

  const url = `${process.env.API_URL}/orders`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderPayload),
  });

  const json = await req.json();

  if (!req.ok) {
    const { error } = ErrorSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }

  //? If the order creation is successful, confirm the payment
  const orderId = json.id;
  const paymentUrl = `${process.env.API_URL}/orders/${orderId}/pay`;

  const payReq = await fetch(paymentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentInfo),
  });

  const payJson = await payReq.json();

  if (!payReq.ok) {
    const { error } = ErrorSchema.parse(payJson);
    return {
      errors: [error],
      success: "",
    };
  }

  const success = SuccessSchemaObj.parse(payJson);

  return {
    errors: [],
    success,
  };
}
