import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center bg-cover bg-center py-20 text-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/50 to-black/70"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl font-black leading-tight tracking-tighter sm:text-5xl md:text-6xl text-white">
            Colect, Trade, and Battle with the Best Pokemon TCG Cards
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
            Discover a universe of collectible cards, accessories, and exclusive
            Pokemon TCG products. Start your adventure today!
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-purple-500/30 transition-all hover:bg-purple-700 hover:shadow-xl hover:shadow-purple-500/40"
          >
            <span className="truncate">Explore Collection</span>
          </Link>
        </div>
      </section>

      {/* Destacados Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
            Featured Products
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
            </div>
          </div>
        </div>
      </section>

      {/* Categorías Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
            Shop by Category
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-64 w-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="text-6xl">🃏</span>
              </div>
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">
                  Cards & Collectibles
                </h3>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-64 w-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="text-6xl">🎯</span>
              </div>
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Accessories</h3>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-64 w-full bg-gradient-to-br from-yellow-600 to-red-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="text-6xl">⭐</span>
              </div>
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">
                  Exclusive Products
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Novedades Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
            New Arrivals
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-square w-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <span className="text-6xl">☀️</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Sun & Moon Expansion
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Explore the magic of the Alola region with the Sun & Moon
                  expansion.
                </p>
              </div>
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-square w-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <span className="text-6xl">⚔️</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Sword & Shield Expansion
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Venture into the Galar region with the Sword & Shield
                  expansion.
                </p>
              </div>
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-square w-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <span className="text-6xl">🏆</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Elite Trainer Set
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Enhance your game with the Elite Trainer Set.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Get notified about new products and exclusive offers
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
