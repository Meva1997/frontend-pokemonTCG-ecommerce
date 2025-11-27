type SidebarFilterProps = {
  uniqueCategories: string[];
  categoryNames: { [key: string]: string };
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: number;
  setPriceRange: (price: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (inStock: boolean) => void;
  outOfStockOnly: boolean;
  setOutOfStockOnly: (outOfStock: boolean) => void;
};

export default function SidebarFilter({
  uniqueCategories,
  categoryNames,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  inStockOnly,
  setInStockOnly,
  outOfStockOnly,
  setOutOfStockOnly,
}: SidebarFilterProps) {
  return (
    <div className="space-y-4">
      {/* Categoría */}
      <div>
        <label
          className="block text-sm font-medium text-[#ab9db9] mb-2"
          htmlFor="category"
        >
          Category
        </label>
        <select
          className="w-full bg-[#302839] border border-[#302839] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8013ec] focus:border-[#8013ec] appearance-none"
          id="category"
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ab9db9' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: "right 0.5rem center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "1.5em 1.5em",
            paddingRight: "2.5rem",
          }}
        >
          <option value="All">All Categories</option>
          {uniqueCategories.slice(1).map((categoryId) => (
            <option key={categoryId} value={categoryId}>
              {categoryNames[categoryId] || `Category ${categoryId}`}
            </option>
          ))}
        </select>
      </div>

      {/* Precio */}
      <div>
        <label
          className="block text-sm font-medium text-[#ab9db9] mb-2"
          htmlFor="price"
        >
          Price (Max: ${priceRange})
        </label>
        <input
          className="w-full h-2 bg-[#302839] rounded-lg appearance-none cursor-pointer accent-[#8013ec]"
          id="price"
          max="500"
          min="0"
          name="price"
          type="range"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
        />
        <div className="flex justify-between text-xs text-[#ab9db9] mt-1">
          <span>$0</span>
          <span>$500</span>
        </div>
      </div>

      {/* Stock */}
      <div>
        <label className="block text-sm font-medium text-[#ab9db9]">
          Stock
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              className="h-4 w-4 rounded border-[#302839] bg-[#302839] text-[#8013ec] focus:ring-[#8013ec]"
              id="in-stock"
              name="stock"
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            <label className="ml-2 text-sm text-white" htmlFor="in-stock">
              In Stock
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 rounded border-[#302839] bg-[#302839] text-[#8013ec] focus:ring-[#8013ec]"
              id="out-of-stock"
              name="stock"
              type="checkbox"
              checked={outOfStockOnly}
              onChange={(e) => setOutOfStockOnly(e.target.checked)}
            />
            <label className="ml-2 text-sm text-white" htmlFor="out-of-stock">
              Out of Stock
            </label>
          </div>
        </div>
      </div>

      <button
        className="w-full bg-[#8013ec] hover:bg-[#6c10c4] text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
        onClick={() => {
          setSelectedCategory("All");
          setPriceRange(500);
          setInStockOnly(false);
          setOutOfStockOnly(false);
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className="inline-block"
          fill="white"
        >
          <circle
            cx="10"
            cy="10"
            r="8"
            fill="white"
            stroke="#8013ec"
            strokeWidth="2"
          />
          <line
            x1="2"
            y1="10"
            x2="18"
            y2="10"
            stroke="#8013ec"
            strokeWidth="2"
          />
          <circle
            cx="10"
            cy="10"
            r="2"
            fill="white"
            stroke="#8013ec"
            strokeWidth="2"
          />
        </svg>
        Clear Filters
      </button>
    </div>
  );
}
