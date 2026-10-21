"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Plus,
  AlertCircle,
} from "lucide-react";
import { apiRequest } from "@/lib/api-client";
import { ICONS } from "@/lib/icons";
import { MAX_MODULES } from "@/lib/constants";
import type { CurriculumItem } from "@/lib/training";
import ModuleForm from "@/components/admin/ModuleForm";

const iconButton =
  "rounded-md p-2 text-ink/40 transition-colors hover:bg-ink/5 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent";

export default function CurriculumEditor({
  modules,
}: {
  modules: CurriculumItem[];
}) {
  const router = useRouter();
  // "new" = the add form is open, a number = that module is being edited
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Close any open form, then ask the server for the fresh list
  const finish = () => {
    setEditing(null);
    router.refresh();
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= modules.length) return;

    // Swap two ids, then send the whole new order
    const ids = modules.map((m) => m.id);
    [ids[index], ids[target]] = [ids[target], ids[index]];

    setBusy(true);
    setError("");
    const result = await apiRequest("/api/admin/curriculum/order", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.refresh();
  };

  const remove = async (item: CurriculumItem) => {
    if (!window.confirm(`Delete "${item.label}"? This can't be undone.`))
      return;

    setBusy(true);
    setError("");
    const result = await apiRequest(`/api/admin/curriculum/${item.id}`, {
      method: "DELETE",
    });
    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.refresh();
  };

  const atLimit = modules.length >= MAX_MODULES;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/50">
          {modules.length} of {MAX_MODULES} modules
        </p>
        <button
          type="button"
          onClick={() => {
            setError("");
            setEditing("new");
          }}
          disabled={editing !== null || atLimit || busy}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-primary-dark disabled:opacity-50"
        >
          <Plus size={14} /> Add module
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      {editing === "new" && (
        <div className="rounded-2xl border border-primary/30 bg-white p-5">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-ink/50">
            New module
          </h2>
          <ModuleForm onDone={finish} onCancel={() => setEditing(null)} />
        </div>
      )}

      {modules.length === 0 && editing !== "new" ? (
        <p className="rounded-2xl border border-dashed border-ink/20 p-8 text-center text-sm text-ink/50">
          No modules yet. Add one to build the curriculum list on the Training
          page.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {modules.map((m, i) => {
            const Icon = (ICONS[m.icon] ?? ICONS.clapperboard).Icon;

            return (
              <li
                key={m.id}
                className="rounded-2xl border border-ink/10 bg-white"
              >
                {editing === m.id ? (
                  <div className="p-5">
                    <ModuleForm
                      item={m}
                      onDone={finish}
                      onCancel={() => setEditing(null)}
                    />
                  </div>
                ) : (
                  <div className="flex items-start gap-4 p-5">
                    <span className="pt-2 font-mono text-xs font-bold text-ink/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-ink">{m.label}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink/55">
                        {m.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center">
                      <button
                        type="button"
                        aria-label={`Move ${m.label} up`}
                        onClick={() => move(i, -1)}
                        disabled={busy || editing !== null || i === 0}
                        className={iconButton}
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Move ${m.label} down`}
                        onClick={() => move(i, 1)}
                        disabled={
                          busy || editing !== null || i === modules.length - 1
                        }
                        className={iconButton}
                      >
                        <ArrowDown size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Edit ${m.label}`}
                        onClick={() => {
                          setError("");
                          setEditing(m.id);
                        }}
                        disabled={busy || editing !== null}
                        className={iconButton}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${m.label}`}
                        onClick={() => remove(m)}
                        disabled={busy || editing !== null}
                        className={`${iconButton} hover:text-red-600`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
