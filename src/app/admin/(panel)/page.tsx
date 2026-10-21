import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { getSession } from "@/lib/session";

import { getActiveCohort, getCurriculum, type Cohort } from "@/lib/training";
import { formatDateRange, formatNaira, hasEnded } from "@/lib/format";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Admin | VMedex Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  // Second line of defence: don't rely on the proxy alone
  // The layout checks too, but layouts don't re-run on every navigation
  const session = await getSession();
  if (!session) redirect("/admin/login");

  let cohort: Cohort | null = null;
  let moduleCount = 0;
  let loadFailed = false;

  try {
    const [c, items] = await Promise.all([getActiveCohort(), getCurriculum()]);
    cohort = c;
    moduleCount = items.length;
  } catch (error) {
    console.error("Dashboard data failed to load:", error);
    loadFailed = true;
  }

  const open = cohort !== null && !hasEnded(cohort.endDate);
  const status = !cohort
    ? { label: "No active cohort", tone: "bg-ink/10 text-ink/60" }
    : open
      ? { label: "Registration open", tone: "bg-emerald-100 text-emerald-700" }
      : { label: "Cohort ended", tone: "bg-amber-100 text-amber-800" };
  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
        Signed in as {session.email}
      </p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-ink">
        Dashboard
      </h1>

      {loadFailed ? (
        <div
          role="alert"
          className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900"
        >
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <p>
            We couldn&apos;t load the training data. This is usually a temporary
            connection problem. Refresh the page to try again.
          </p>
        </div>
      ) : (
        <section className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-ink/50">
              Training Page
            </h2>
            <span>{status.label}</span>
          </div>

          {cohort ? (
            <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-xs text-ink/40">Active cohort</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">
                  {cohort.name}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink/40">Dates</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">
                  {formatDateRange(cohort.startDate, cohort.endDate)}
                </dd>
              </div>

              <div>
                <dt className="text-xs text-ink/40">Tuition</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">
                  {formatNaira(cohort.feeAmount)}
                </dd>
              </div>

              <div>
                <dt className="text-xs text-ink/40">Curriculum modules</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">
                  {moduleCount}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-6 text-sm text-ink/60">
              No cohort is marked active, so visitors see the &quot;coming soon&quot; version of the Training page.
            </p>
          )}

          <div className="mt-6 border-t border-ink-10 pt-4">
            <Link
            href="/admin/training"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">


            Manage training content <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
