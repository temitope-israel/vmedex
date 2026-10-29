import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getCurriculum, type CurriculumItem } from "@/lib/training";
import CurriculumEditor from "@/components/admin/CurriculumEditor";
import LoadError from "@/components/admin/LoadError";

export const metadata: Metadata = {
  title: "Curriculum | VMedex Admin",
  robots: { index: false, follow: false },
};

export default async function AdminCurriculumPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  let modules: CurriculumItem[] = [];
  let loadFailed = false;
  try {
    modules = await getCurriculum();
  } catch (error) {
    console.error("Curriculum failed to load:", error);
    loadFailed = true;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
        Training
      </p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-ink">
        Curriculum modules
      </h1>
      <p className="mt-2 text-sm text-ink/50">
        These appear on the Training page, in the order shown here.
      </p>

      <div className="mt-8">
        {loadFailed ? (
          <LoadError what="the curriculum" />
        ) : (
          <CurriculumEditor modules={modules} />
        )}
      </div>
    </div>
  );
}
