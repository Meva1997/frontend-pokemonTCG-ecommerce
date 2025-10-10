"use server";
import UsersInfo from "./UsersInfo";
import { authenticatedFetch } from "@/utils/api";
import { UsersTableSchema } from "@/src/schemas";

export default async function UsersTableEntry() {
  const request = await authenticatedFetch(`${process.env.API_URL}/users`);
  if (!request.ok) {
    throw new Error("Failed to fetch users");
  }
  const response = await request.json();
  const users = UsersTableSchema.parse(response);

  return (
    <div>
      <UsersInfo users={users} />
    </div>
  );
}
