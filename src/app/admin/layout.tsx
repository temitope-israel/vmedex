import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | VMedex Digital",
  robots: { index: false, follow: false }, // Keep every admin page out of search result.
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-1 bg-paper text-ink"> {children}</div>;
}
