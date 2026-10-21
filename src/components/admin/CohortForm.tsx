"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, Trash2 } from "lucide-react";
import { apiRequest } from "@/lib/api-client";
import { formatNaira } from "@/lib/format";
import type { AdminCohort } from "@/lib/training-admin";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary";

// A label wrapped around its input, so clicking the text focuses the field
function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink/40">{hint}</span>}
    </label>
  );
}

export default function CohortForm({ cohort }: { cohort?: AdminCohort }) {
  const router = useRouter();
  const editing = Boolean(cohort);

  const [form, setForm] = useState({
    name: cohort?.name ?? "",
    startDate: cohort?.startDate ?? "",
    endDate: cohort?.endDate ?? "",
    durationNote: cohort?.durationNote ?? "",
    location: cohort?.location ?? "Lagos, Nigeria",
    locationNote: cohort?.locationNote ?? "",
    feeAmount: cohort ? String(cohort.feeAmount) : "",
    feeNote: cohort?.feeNote ?? "",
    certificationTitle: cohort?.certificationTitle ?? "",
    certificationNote: cohort?.certificationNote ?? "",
    isActive: cohort?.isActive ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  // Returns an onChange handler that updates just one field
  const set =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const feeNumber = Number(form.feeAmount);
  const feePreview =
    form.feeAmount !== "" && Number.isInteger(feeNumber) && feeNumber >= 0
      ? formatNaira(feeNumber)
      : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Friendly instant check. The server repeats it, because only the server is trusted.
    if (form.endDate < form.startDate) {
      setError("The end date can't be before the start date.");
      return;
    }

    setSaving(true);
    const result = await apiRequest(
      editing ? `/api/admin/cohorts/${cohort!.id}` : "/api/admin/cohorts",
      {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );

    if (!result.ok) {
      setError(result.error);
      setSaving(false);
      return;
    }

    router.push("/admin/training");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!cohort) return;
    if (!window.confirm(`Delete "${cohort.name}"? This can't be undone.`))
      return;

    setDeleting(true);
    setError("");
    const result = await apiRequest(`/api/admin/cohorts/${cohort.id}`, {
      method: "DELETE",
    });

    if (!result.ok) {
      setError(result.error);
      setDeleting(false);
      return;
    }

    router.push("/admin/training");
    router.refresh();
  };

  const busy = saving || deleting;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <section className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-ink/50">
          Basics
        </h2>
        <Field
          label="Cohort name"
          hint="Only you see this. For example: October 2026 Cohort"
        >
          <input
            required
            maxLength={255}
            value={form.name}
            onChange={set("name")}
            className={inputClass}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Start date">
            <input
              required
              type="date"
              value={form.startDate}
              onChange={set("startDate")}
              className={inputClass}
            />
          </Field>
          <Field label="End date">
            <input
              required
              type="date"
              value={form.endDate}
              onChange={set("endDate")}
              className={inputClass}
            />
          </Field>
        </div>
        <Field
          label="Duration note"
          hint="Small text under the dates, e.g. 3 Weeks Intensive"
        >
          <input
            maxLength={100}
            value={form.durationNote}
            onChange={set("durationNote")}
            className={inputClass}
          />
        </Field>
      </section>

      <section className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-ink/50">
          Location and fee
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Location">
            <input
              required
              maxLength={255}
              value={form.location}
              onChange={set("location")}
              className={inputClass}
            />
          </Field>
          <Field label="Location note" hint="e.g. Physical Studio Access">
            <input
              maxLength={255}
              value={form.locationNote}
              onChange={set("locationNote")}
              className={inputClass}
            />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Tuition fee (naira)"
            hint={
              feePreview
                ? `Visitors will see: ${feePreview}`
                : "Whole numbers only, no commas"
            }
          >
            <input
              required
              type="number"
              min={0}
              step={1}
              inputMode="numeric"
              value={form.feeAmount}
              onChange={set("feeAmount")}
              className={inputClass}
            />
          </Field>
          <Field label="Fee note" hint="e.g. Installment Plans Open">
            <input
              maxLength={255}
              value={form.feeNote}
              onChange={set("feeNote")}
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      <section className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-ink/50">
          Certification (optional)
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Certification title"
            hint="Leave empty to hide this box on the page"
          >
            <input
              maxLength={100}
              value={form.certificationTitle}
              onChange={set("certificationTitle")}
              className={inputClass}
            />
          </Field>
          <Field label="Certification note">
            <input
              maxLength={255}
              value={form.certificationNote}
              onChange={set("certificationNote")}
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      <label className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-5">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, isActive: e.target.checked }))
          }
          className="mt-1"
        />
        <span>
          <span className="block text-sm font-medium text-ink">
            Show this cohort on the Training page
          </span>
          <span className="block text-xs text-ink/50">
            Only one cohort can be active. Ticking this switches off whichever
            one is showing now.
          </span>
        </span>
      </label>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-paper transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : null}
            {editing ? "Save changes" : "Create cohort"}
          </button>
          <Link
            href="/admin/training"
            className="text-sm font-medium text-ink/60 transition-colors hover:text-ink"
          >
            Cancel
          </Link>
        </div>

        {editing && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 transition-colors hover:text-red-700 disabled:opacity-60"
          >
            {deleting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
