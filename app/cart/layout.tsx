import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="admin-layout min-h-screen bg-background-light dark:bg-background-dark">
        {/* ✅ Envolver children en Suspense para mejor UX */}

        <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>

        <ToastContainer
          autoClose={3000}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          draggable={false}
          theme="dark"
        />
      </div>
    </>
  );
}
