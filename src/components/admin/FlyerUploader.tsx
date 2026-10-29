"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Trash2,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { apiRequest } from "@/lib/api-client";
import { FLYER_TYPES, MAX_FLYER_BYTES } from "@/lib/constants";

type Props = {
  cohortId: number;
  flyerToken: string | null; // the saved flyer's token, if any
};

export default function FlyerUploader({ cohortId, flyerToken }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const clearSelection = () => {
    // Release the temporary preview URL so the browser can free the memory
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const choose = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    setError("");

    // Friendly instant checks. The server repeats them properly.
    if (!FLYER_TYPES.includes(picked.type)) {
      setError("Please choose a JPG, PNG or WebP image.");
      e.target.value = "";
      return;
    }
    if (picked.size > MAX_FLYER_BYTES) {
      setError(
        `That image is too large. The limit is ${MAX_FLYER_BYTES / 1024 / 1024} MB.`,
      );
      e.target.value = "";
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(picked);
    // A temporary local address that lets us preview the file before uploading it
    setPreviewUrl(URL.createObjectURL(picked));
  };

  const upload = async () => {
    if (!file) return;
    setBusy(true);
    setError("");

    // FormData carries the file. We must NOT set Content-Type ourselves:
    // the browser adds it, including the boundary marker the server needs.
    const body = new FormData();
    body.append("file", file);

    // 60 seconds, because a few megabytes can be slow on a weak connection
    const result = await apiRequest(
      `/api/admin/cohorts/${cohortId}/flyer`,
      { method: "POST", body },
      60000,
    );
    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    clearSelection();
    router.refresh();
  };

  const remove = async () => {
    if (
      !window.confirm(
        "Remove this flyer? The Training page will go back to the default image.",
      )
    ) {
      return;
    }
    setBusy(true);
    setError("");
    const result = await apiRequest(`/api/admin/cohorts/${cohortId}/flyer`, {
      method: "DELETE",
    });
    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.refresh();
  };

  // What to display: the new selection, else the saved flyer, else nothing
  const shown = previewUrl
    ? { src: previewUrl, alt: "Selected flyer preview" }
    : flyerToken
      ? { src: `/api/flyer/${flyerToken}`, alt: "Current flyer" }
      : null;

  return (
    <section className="rounded-2xl border border-ink/10 bg-white p-6">
      <h2 className="text-xs font-bold uppercase tracking-widest text-ink/50">
        Flyer
      </h2>
      <p className="mt-1 text-sm text-ink/50">
        Shown beside the headline on the Training page. JPG, PNG or WebP, up to
        3 MB.
      </p>

      <div className="mt-5 flex min-h-40 items-center justify-center rounded-xl border border-dashed border-ink/15 bg-ink/[0.02] p-4">
        {shown ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shown.src}
            alt={shown.alt}
            className="max-h-80 w-auto max-w-full rounded-lg object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-sm text-ink/40">
            <ImageIcon size={28} />
            No flyer yet. The default image is shown.
          </div>
        )}
      </div>

      {previewUrl && (
        <p className="mt-2 text-xs text-amber-700">
          New image selected. It isn&apos;t live until you press Upload.
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label
          className={`inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ink/70 transition-colors hover:border-primary hover:text-primary ${
            busy ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <Upload size={14} />
          {flyerToken || file ? "Choose a different image" : "Choose image"}
          <input
            ref={inputRef}
            type="file"
            accept={FLYER_TYPES.join(",")}
            onChange={choose}
            disabled={busy}
            className="hidden"
          />
        </label>

        {file && (
          <>
            <button
              type="button"
              onClick={upload}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              {busy && <Loader2 size={14} className="animate-spin" />}
              Upload flyer
            </button>
            <button
              type="button"
              onClick={clearSelection}
              disabled={busy}
              className="text-sm font-medium text-ink/60 transition-colors hover:text-ink"
            >
              Cancel
            </button>
          </>
        )}

        {flyerToken && !file && (
          <button
            type="button"
            onClick={remove}
            disabled={busy}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 transition-colors hover:text-red-700 disabled:opacity-60"
          >
            {busy ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            Remove flyer
          </button>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}
    </section>
  );
}
