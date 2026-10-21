import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, Pencil } from "lucide-react";
import { getSession } from "@/lib/session";
import { listCohorts, type AdminCohort } from "@/lib/training-admin";
import { formatDateRange, formatNaira, hasEnded } from "@/lib/format";
import LoadError from "@/components/admin/LoadError";

export const metadata: Metadata = {
  title: "Training | VMedex Admin",
  robots: { index: false, follow: false },
};

function statusOf(c: AdminCohort) {
  if (!c.isActive) return { label: "Not shown", tone: "bg-ink/10 text-ink/60" };
  if (hasEnded(c.endDate))
    return { label: "Active, but ended", tone: "bg-amber-100 text-amber-800" };
  return { label: "Live on site", tone: "bg-emerald-100 text-emerald-700" };
}

export default async function AdminTrainingPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  let cohorts: AdminCohort[] = [];
  let loadFailed = false;
  try {
    cohorts = await listCohorts();
  } catch (error) {
    console.error("Cohort list failed to load:", error);
    loadFailed = true;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
            Training
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-ink">
            Cohorts
          </h1>
        </div>
        <Link
          href="/admin/training/cohorts/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-primary-dark"
        >
          <Plus size={14} /> New cohort
        </Link>
      </div>

      <div className="mt-8">
        {loadFailed ? (
          <LoadError what="the cohorts" />
        ) : cohorts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-ink/20 p-8 text-center text-sm text-ink/50">
            No cohorts yet. Create one to show dates and a fee on the Training
            page.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {cohorts.map((c) => {
              const status = statusOf(c);
              return (
                <li
                  key={c.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-5"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-semibold text-ink">{c.name}</h2>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${status.tone}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink/55">
                      {formatDateRange(c.startDate, c.endDate)} ·{" "}
                      {formatNaira(c.feeAmount)}
                    </p>
                  </div>
                  <Link
                    href={`/admin/training/cohorts/${c.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    <Pencil size={14} /> Edit
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
