import { UsersTableSchema, type UsersTable } from "@/src/schemas";
import { authenticatedFetch } from "@/utils/api";
import UsersInfo from "./UsersInfo";
import UserSearchBar from "./UserSearchBar";

export default async function UsersTable() {
  const request = await authenticatedFetch(`${process.env.API_URL}/users`);
  if (!request.ok) {
    throw new Error("Failed to fetch users");
  }
  const response = await request.json();
  const users = UsersTableSchema.parse(response);

  return (
    <div>
      <UserSearchBar users={users} />
      {/* Users Table */}
      <div className="overflow-x-auto bg-white dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/10">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 dark:border-white/10">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                Email
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                Role
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <UsersInfo users={users} />
        </table>
      </div>
    </div>
  );
}
