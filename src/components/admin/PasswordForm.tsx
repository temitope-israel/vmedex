"use client";

import { useState } from "react";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { apiRequest } from "@/lib/api-client";
import { MIN_PASSWORD_LENGTH } from "@/lib/constants";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary";

export default function PasswordForm() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const set =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setDone(false);

    // Friendly instant checks. The server repeats them.
    if (form.next.length < MIN_PASSWORD_LENGTH) {
      setError(
        `Your new password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      );
      return;
    }
    if (form.next !== form.confirm) {
      setError("The new password and its confirmation don't match.");
      return;
    }

    setSaving(true);
    const result = await apiRequest("/api/admin/account/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: form.current,
        newPassword: form.next,
      }),
    });
    setSaving(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    setForm({ current: "", next: "", confirm: "" });
    setDone(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6"
    >
      <label className="block">
        <span className="text-sm font-medium text-ink">Current password</span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={form.current}
          onChange={set("current")}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">New password</span>
        <input
          type="password"
          required
          autoComplete="new-password"
          value={form.next}
          onChange={set("next")}
          className={inputClass}
        />
        <span className="mt-1 block text-xs text-ink/40">
          At least {MIN_PASSWORD_LENGTH} characters.
        </span>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">
          Confirm new password
        </span>
        <input
          type="password"
          required
          autoComplete="new-password"
          value={form.confirm}
          onChange={set("confirm")}
          className={inputClass}
        />
      </label>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}
      {done && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> Password
          changed.
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          Change password
        </button>
      </div>
    </form>
  );
}
