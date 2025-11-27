import Link from "next/link";

export default function HeroSection() {
  return (
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
  );
}
