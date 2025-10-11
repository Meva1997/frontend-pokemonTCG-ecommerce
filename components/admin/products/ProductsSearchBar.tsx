type ProductsSearchBarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export default function ProductsSearchBar({
  searchTerm,
  setSearchTerm,
}: ProductsSearchBarProps) {
  return (
    <div className="mb-6">
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"></span>
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
    </div>
  );
}
