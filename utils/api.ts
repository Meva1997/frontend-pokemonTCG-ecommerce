// utils/api.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("tokenPokeTCG")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
}
