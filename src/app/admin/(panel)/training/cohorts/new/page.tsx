import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import CohortForm from "@/components/admin/CohortForm";

export const metadata: Metadata = {
  title: "New cohort | VMedex Admin",
  robots: { index: false, follow: false },
};

export default async function NewCohortPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
        Training
      </p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-ink">
        New cohort
      </h1>
      <div className="mt-8">
        <CohortForm />
      </div>
    </div>
  );
}
