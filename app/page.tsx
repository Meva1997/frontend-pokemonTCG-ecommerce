import Link from "next/link";
import React from "react";

export default function Welcome() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <section className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-4 text-center">
          Welcome to Pokémon TCG E‑Commerce
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
          This project is a modern, modular e-commerce platform for Pokémon
          Trading Card Game products. It demonstrates best practices in frontend
          development, scalable architecture, and user experience design.
        </p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-600 mb-2">
            Log In Credentials
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Admin User:</li>
            <ul className="list-disc list-inside ml-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Email: test@email.com </li>
              <li>Password: password</li>
              <li>
                <span className="text-red-600 font-bold text-xl">Note:</span>{" "}
                Use these credentials to log in as an admin user.{" "}
                <span className="font-bold text-red-600">
                  Please do not make any changes
                </span>{" "}
                to the admin account credentials. It is for demonstration
                purposes only.
              </li>
            </ul>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-600 mb-2">
            Key Features
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Responsive product grid and detail pages</li>
            <li>Shopping cart with persistent state</li>
            <li>Checkout flow and order summary</li>
            <li>User authentication and protected routes</li>
            <li>Order history and account management</li>
            <li>Admin dashboard for orders, products, users, categories</li>
            <li>Dark mode and mobile-first design</li>
            <li>Integration-ready for Stripe payments and Pokémon TCG API</li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-600 mb-2">
            Tech Stack
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Next.js 13+ (App Router)</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Zustand (cart state management)</li>
            <li>Zod (schema validation)</li>
            <li>Cloudinary (product images)</li>
            <li>Custom authentication</li>
            <li>StitchAI (design inspiration)</li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-600 mb-2">
            Project Highlights
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Clean, maintainable code and UI</li>
            <li>Performance-focused (optimized images, fast load times)</li>
            <li>Accessibility: semantic HTML, keyboard navigation</li>
            <li>Type safety for all domain models</li>
            <li>Fully responsive layouts for all devices</li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-600 mb-2">
            Contact
          </h2>
          <div className="text-gray-700 dark:text-gray-300">
            <p className="mb-1">
              Created by{" "}
              <span className="font-bold">Alex Medina (Meva1997)</span>
            </p>
            <p className="mb-1">
              Email:{" "}
              <a
                href="mailto:mevadev97@gmail.com"
                className="text-blue-600 underline"
              >
                mevadev97@gmail.com
              </a>
            </p>
            <p className="mb-1">
              GitHub:{" "}
              <a
                href="https://github.com/Meva1997"
                className="text-blue-600 underline"
              >
                Meva1997
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/alex-fullstack-developer/"
                className="text-blue-600 underline"
              >
                alex-fullstack-developer
              </a>
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Link
            href="/home"
            className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow hover:bg-purple-700 transition-colors text-lg"
          >
            Enter the Store
          </Link>
        </div>
      </section>
    </main>
  );
}
