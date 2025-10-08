import { verifySession } from "@/src/auth/dal";
import Link from "next/link";

export default async function UserNav() {
  async function getSessionSafely() {
    try {
      return await verifySession();
    } catch (error) {
      return null;
    }
  }

  const session = await getSessionSafely();

  return (
    <>
      {!session ? (
        <nav className="flex space-x-4">
          <Link
            href="/auth/login"
            className="rounded-lg bg-purple-600 px-4  text-white hover:bg-purple-700"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="rounded-lg bg-gray-200 px-4  text-gray-800 hover:bg-gray-300"
          >
            Register
          </Link>
        </nav>
      ) : (
        <nav className="flex space-x-4 text-sm md:-ml-44">
          <span className="self-center text-white">
            Hello, {session.user.userName}
          </span>
          <Link href="/auth/account" className="self-center text-white">
            Account
          </Link>
          {session.user.isAdmin && (
            <Link href="/admin" className="self-center text-white">
              Admin
            </Link>
          )}
          <form action="/auth/logout" method="post">
            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-4 text-white hover:bg-purple-700 cursor-pointer"
            >
              Logout
            </button>
          </form>
        </nav>
      )}
    </>
  );
}
