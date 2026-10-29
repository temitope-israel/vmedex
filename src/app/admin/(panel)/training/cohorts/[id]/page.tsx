import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getCohortById, type AdminCohort } from "@/lib/training-admin";
import CohortForm from "@/components/admin/CohortForm";
import FlyerUploader from "@/components/admin/FlyerUploader";
import LoadError from "@/components/admin/LoadError";

export const metadata: Metadata = {
  title: "Edit cohort | VMedex Admin",
  robots: { index: false, follow: false },
};

export default async function EditCohortPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id: raw } = await params;
  const id = Number(raw);
  if (!Number.isInteger(id) || id < 1) notFound();

  let cohort: AdminCohort | null = null;
  try {
    cohort = await getCohortById(id);
  } catch (error) {
    console.error("Cohort failed to load:", error);
    return (
      <div className="mx-auto max-w-3xl">
        <LoadError what="this cohort" />
      </div>
    );
  }
  if (!cohort) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
        Training
      </p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-ink">
        Edit cohort
      </h1>

      <div className="mt-8 flex flex-col gap-6">
        <FlyerUploader cohortId={cohort.id} flyerToken={cohort.flyerPath} />
        <CohortForm cohort={cohort} />
      </div>
    </div>
  );
}
