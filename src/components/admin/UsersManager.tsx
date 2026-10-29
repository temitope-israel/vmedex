"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, CheckCircle2, Trash2 } from "lucide-react";
import { apiRequest } from "@/lib/api-client";
import { generatePassword } from "@/lib/password";
import { MIN_PASSWORD_LENGTH, type AccountRole } from "@/lib/constants";
import type { AdminUser } from "@/lib/users-admin";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary";

export default function UsersManager({
  users,
  currentUserId,
}: {
  users: AdminUser[];
  currentUserId: number;
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    role: "editor" as AccountRole,
    password: "",
  });
  const [creating, setCreating] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setCreating(true);

    const result = await apiRequest("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setCreating(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    setNotice(
      `Account created for ${form.email.trim().toLowerCase()}. Share the password with them privately, and ask them to change it under Account.`,
    );
    setForm({ email: "", role: "editor", password: "" });
    router.refresh();
  };

  const remove = async (user: AdminUser) => {
    if (
      !window.confirm(
        `Remove ${user.email}? They will be signed out immediately.`,
      )
    )
      return;

    setError("");
    setNotice("");
    setRemovingId(user.id);
    const result = await apiRequest(`/api/admin/users/${user.id}`, {
      method: "DELETE",
    });
    setRemovingId(null);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-ink/50">
          Add an account
        </h2>
        <form onSubmit={create} className="mt-5 flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-3">
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-ink">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">Role</span>
              <select
                value={form.role}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    role: e.target.value as AccountRole,
                  }))
                }
                className={inputClass}
              >
                <option value="editor">Editor (content only)</option>
                <option value="admin">Admin (also manages accounts)</option>
              </select>
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-sm font-medium text-ink">
                Temporary password
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                  autoComplete="off"
                  value={form.password}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, password: e.target.value }))
                  }
                  className={`${inputClass} font-mono`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((p) => ({ ...p, password: generatePassword() }))
                  }
                  className="mt-1.5 shrink-0 rounded-lg border border-ink/15 px-4 text-sm font-medium text-ink/70 transition-colors hover:border-primary hover:text-primary"
                >
                  Generate
                </button>
              </div>
            </label>
            <p className="mt-1 text-xs text-ink/40">
              Shown in plain text so you can copy it. They should change it
              after their first sign-in.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
            </div>
          )}
          {notice && (
            <div
              role="status"
              className="flex items-start gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
            >
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> {notice}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={creating}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              {creating && <Loader2 size={14} className="animate-spin" />}
              Create account
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-ink/50">
          Accounts ({users.length})
        </h2>
        <ul className="mt-4 flex flex-col gap-3">
          {users.map((u) => (
            <li
              key={u.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white p-5"
            >
              <div className="flex min-w-0 flex-wrap items-center gap-3">
                <span className="truncate text-sm font-semibold text-ink">
                  {u.email}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    u.role === "admin"
                      ? "bg-primary/10 text-primary"
                      : "bg-ink/10 text-ink/60"
                  }`}
                >
                  {u.role}
                </span>
                {u.id === currentUserId && (
                  <span className="text-xs text-ink/40">you</span>
                )}
              </div>
              {u.id !== currentUserId && (
                <button
                  type="button"
                  onClick={() => remove(u)}
                  disabled={removingId !== null}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 transition-colors hover:text-red-700 disabled:opacity-50"
                >
                  {removingId === u.id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
