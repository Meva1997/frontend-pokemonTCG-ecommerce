"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function AuthLogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("tokenPokeTCG");
  redirect("/auth/login");
}
