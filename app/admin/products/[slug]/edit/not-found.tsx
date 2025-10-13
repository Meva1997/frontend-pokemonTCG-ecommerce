import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <div className="m-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Whoops... Product Not Found</h1>
        <p className="text-lg animate-pulse text-purple-500">
          The product you are looking for does not exist.
        </p>
        <Link href="/admin/products" className="hover:underline text-red-600">
          Go back to products
        </Link>
      </div>
    </div>
  );
}
