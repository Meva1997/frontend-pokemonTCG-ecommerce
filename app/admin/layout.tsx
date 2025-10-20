import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="admin-layout min-h-screen bg-background-light dark:bg-background-dark">
        {/* ✅ Envolver children en Suspense para mejor UX */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
              </div>
            </div>
          }
        >
          {children}
        </Suspense>

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
