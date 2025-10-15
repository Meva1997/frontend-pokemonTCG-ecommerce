import AccountForm from "@/components/auth/AccountForm";
import { verifySession } from "@/src/auth/dal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Account - PokeTCG Store",
  description: "Manage your account settings",
};

export default async function AccountPage() {
  const { user } = await verifySession();

  return (
    <>
      {user ? (
        <main className="my-10">
          <AccountForm user={user} />
        </main>
      ) : (
        // If no user is found, prompt to log in. A fallback; in practice, users should be redirected to login.
        <div className="my-10 space-y-4">
          <h1 className="text-2xl font-bold text-center">
            Please log in to view your account.
          </h1>
        </div>
      )}
    </>
  );
}
