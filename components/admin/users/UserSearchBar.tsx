type Props = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export default function UserSearchBar({ searchTerm, setSearchTerm }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mb-6">
      <form>
        <div className="relative">
          <input
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-black/20 border border-gray-200 dark:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus-ring-primary transition-colors"
            placeholder="Buscar usuarios por nombre, email, rol (admin/user) o estado (confirmed/unconfirmed)..."
            type="text"
          />
        </div>
      </form>
    </div>
  );
}
