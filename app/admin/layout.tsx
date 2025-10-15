import { ToastContainer } from "react-toastify";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="auth-layout">
        {children}
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
