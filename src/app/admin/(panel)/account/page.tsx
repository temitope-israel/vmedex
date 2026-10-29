import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import PasswordForm from "@/components/admin/PasswordForm";

export const metadata: Metadata = {
  title: "Account | VMedex Admin",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-xl">
      <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
        Account
      </p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-ink">
        Change password
      </h1>
      <p className="mt-2 text-sm text-ink/50">
        Signed in as {session.email} ({session.role}).
      </p>
      <div className="mt-8">
        <PasswordForm />
      </div>
    </div>
  );
}
