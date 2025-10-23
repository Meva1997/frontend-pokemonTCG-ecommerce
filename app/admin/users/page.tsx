import { verifySession } from "@/src/auth/dal";
import { redirect } from "next/navigation";
import SideBar from "@/components/admin/SideBar";
import UsersTableEntry from "@/components/admin/users/UsersTableEntry";
import AddUserButton from "@/components/admin/users/AddUserButton";

export default async function AdminPage() {
  const { user } = await verifySession();

  if (!user.isAdmin) {
    redirect("/home");
  }

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Users
            </h2>
            <div className="flex items-center justify-end bg-purple-600/50 dark:bg-purple-600/80 p-2 rounded-lg hover:bg-purple-800 transition-all cursor-pointer">
              <AddUserButton />
            </div>
          </div>

          {/* Users Table */}
          <UsersTableEntry />
        </div>
      </main>
    </div>
  );
}
