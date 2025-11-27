import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
          Featured Products
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/products"
            className="group flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-video w-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-4xl">✨</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Limited Edition
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Rare and collectible cards in limited edition.
              </p>
            </div>
          </Link>
          <Link
            href="/products"
            className="group flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-video w-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-4xl">🎯</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Exclusive Accessories
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Unique accessories to enhance your gaming experience.
              </p>
            </div>
          </Link>
          <Link
            href="/products"
            className="group flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-video w-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-4xl">🆕</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                New Arrivals
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Discover the latest collections of Pokemon TCG.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
