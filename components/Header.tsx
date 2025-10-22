import Link from "next/link";
import UserNav from "./auth/UserNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/50 bg-background-black/60 backdrop-blur-md dark:border-slate-800/50 dark:bg-background-dark/80">
      <div className="container mx-auto px-4 py-2">
        {/* Layout responsive: columna hasta xl, fila en pantallas muy grandes */}
        <div className="flex flex-col xl:flex-row xl:h-16 xl:items-center xl:justify-between gap-4 xl:gap-0">
          {/* Logo */}
          <div className="flex items-center justify-center xl:justify-start">
            <Link href="/home" className="flex items-center gap-2">
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 20C21.7909 20 20 21.7909 20 24C20 26.2091 21.7909 28 24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20Z"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path d="M4 24H44" stroke="currentColor" strokeWidth="4" />
              </svg>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                PokeTCG Store
              </h1>
            </Link>
          </div>
          {/* Navegación */}
          <nav className="flex items-center justify-center gap-4 xl:gap-8">
            <Link
              href="/home"
              className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary"
            >
              Products
            </Link>
          </nav>
          {/* UserNav */}
          <div className="flex items-center justify-center xl:justify-end">
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
}
