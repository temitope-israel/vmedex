import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listUsers, type AdminUser } from "@/lib/users-admin";
import UsersManager from "@/components/admin/UsersManager";
import LoadError from "@/components/admin/LoadError";

export const metadata: Metadata = {
  title: "Users | VMedex Admin",
  robots: { index: false, follow: false },
};

export default async function UsersPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (session.role !== "admin") redirect("/admin"); // editors never see this page

  let users: AdminUser[] = [];
  let loadFailed = false;
  try {
    users = await listUsers();
  } catch (error) {
    console.error("Users failed to load:", error);
    loadFailed = true;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
        Admin
      </p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-ink">
        Users
      </h1>
      <p className="mt-2 text-sm text-ink/50">
        Editors can edit all site content. Admins can also add and remove
        accounts.
      </p>
      <div className="mt-8">
        {loadFailed ? (
          <LoadError what="the accounts" />
        ) : (
          <UsersManager users={users} currentUserId={session.adminId} />
        )}
      </div>
    </div>
  );
}
