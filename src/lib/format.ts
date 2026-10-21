// Formats "2026-10-19" + "2026-11-07" as "OCT 19, 2026 – NOV 7, 2026".
// Parsing as UTC and formatting in UTC avoids any off-by-one-day timezone shift.
export function formatDateRange(start: string, end: string): string {
  const fmt = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const f = (iso: string) => fmt.format(new Date(`${iso}T00:00:00Z`)).toUpperCase();
  return `${f(start)} – ${f(end)}`;
}

// 150000 -> "₦150,000"
export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

// True once the cohort's end date is before today (in Lagos time).
// "en-CA" formats dates as YYYY-MM-DD, which compares correctly as plain strings.
export function hasEnded(endDate: string): boolean {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Lagos" });
  return endDate < today;
}