"use client";

import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/api-client";
import { ICONS } from "@/lib/icons";
import type { CurriculumItem } from "@/lib/training";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary";

type Props = {
  item?: CurriculumItem; // present when editing, absent when adding
  onDone: () => void;
  onCancel: () => void;
};

export default function ModuleForm({ item, onDone, onCancel }: Props) {
  const [form, setForm] = useState({
    label: item?.label ?? "",
    description: item?.description ?? "",
    icon: item?.icon ?? "camera",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const result = await apiRequest(
      item ? `/api/admin/curriculum/${item.id}` : "/api/admin/curriculum",
      {
        method: item ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );

    if (!result.ok) {
      setError(result.error);
      setSaving(false);
      return;
    }
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <label className="block">
        <span className="text-sm font-medium text-ink">Module name</span>
        <input
          required
          maxLength={100}
          value={form.label}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, label: e.target.value }))
          }
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">Description</span>
        <textarea
          required
          rows={3}
          maxLength={500}
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          className={`${inputClass} resize-none`}
        />
        <span className="mt-1 block text-right text-xs text-ink/40">
          {form.description.length}/500
        </span>
      </label>

      <fieldset>
        <legend className="text-sm font-medium text-ink">Icon</legend>
        <div className="mt-2 grid grid-cols-5 gap-2 sm:grid-cols-8">
          {Object.entries(ICONS).map(([key, { label, Icon }]) => {
            const selected = form.icon === key;
            return (
              <button
                key={key}
                type="button"
                title={label}
                aria-label={label}
                aria-pressed={selected}
                onClick={() => setForm((prev) => ({ ...prev, icon: key }))}
                className={`flex aspect-square items-center justify-center rounded-lg border transition-colors ${
                  selected
                    ? "border-primary bg-primary text-paper"
                    : "border-ink/15 bg-white text-ink/60 hover:border-primary/40 hover:text-primary"
                }`}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          {item ? "Save changes" : "Add module"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="text-sm font-medium text-ink/60 transition-colors hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
