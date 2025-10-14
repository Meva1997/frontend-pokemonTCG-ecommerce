import UpdateUserForm from "@/components/admin/users/UpdateUserForm";
import { UpdateUserBackendSchema } from "@/src/schemas";
import { authenticatedFetch } from "@/utils/api";

const fetchUserBySlug = async (slug: number) => {
  const url = `${process.env.API_URL}/users/${slug}`;
  const req = await authenticatedFetch(url, {
    method: "GET",
  });
  const json = await req.json();
  if (!req.ok) {
    throw new Error("Failed to fetch user");
  }
  const user = UpdateUserBackendSchema.parse(json);
  return user;
};

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;

  const user = await fetchUserBySlug(slug);

  const userWithPasswordFields = {
    ...user,
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  return (
    <div>
      <UpdateUserForm user={userWithPasswordFields} />
    </div>
  );
}
