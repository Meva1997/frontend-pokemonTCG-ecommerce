"use client";

export default function UserSearchBar() {
  return (
    <div className="mb-6">
      <form>
        <div className="relative">
          {/* Icono de búsqueda */}

          <input
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-black/20 border border-gray-200 dark:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus-ring-primary transition-colors"
            placeholder="Search users by name or email..."
            type="text"
          />
        </div>
      </form>
    </div>
  );
}
