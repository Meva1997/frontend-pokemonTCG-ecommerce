"use client";
import { useState } from "react";
import UserSearchBar from "./UserSearchBar";
import UsersTable from "./UsersTable";
import { UsersTable as UsersTableType } from "@/src/schemas";

export default function UsersInfo({ users }: { users: UsersTableType }) {
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    const userName = user.userName?.toLowerCase() ?? "";
    const email = user.email?.toLowerCase() ?? "";
    const role = user.isAdmin ? "admin" : "user";
    const status = user.confirmed ? "confirmed" : "unconfirmed";
    return (
      userName.includes(normalizedSearchTerm) ||
      email.includes(normalizedSearchTerm) ||
      role.includes(normalizedSearchTerm) ||
      status.includes(normalizedSearchTerm)
    );
  });

  return (
    <div className="space-y-6">
      <UserSearchBar value={searchTerm} onChange={setSearchTerm} />
      <UsersTable users={searchTerm.trim() !== "" ? filteredUsers : users} />
    </div>
  );
}
