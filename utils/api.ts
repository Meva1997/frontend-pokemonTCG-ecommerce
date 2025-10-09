// utils/api.ts
import { cookies } from "next/headers";

export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("tokenPokeTCG")?.value;

  if (!token) {
    throw new Error("No authentication token found");
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
