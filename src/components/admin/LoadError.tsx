import { AlertTriangle } from "lucide-react";

export default function LoadError({ what = "this page" }: { what?: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900"
    >
      <AlertTriangle size={18} className="mt-0.5 shrink-0" />
      <p>
        We couldn&apos;t load {what}. This is usually a temporary a connection
        problem. Refresh the page to try again.
      </p>
    </div>
  );
}
