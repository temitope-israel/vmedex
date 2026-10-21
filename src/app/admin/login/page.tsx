import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In | VMedex Digital",
  robots: { index: false, follow: false }, // keep admin pages out of search results
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6 py-32">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-ink">Admin sign in</h1>
        <p className="mt-1 mb-8 text-sm text-ink/50">
          VMedex Digital content manager
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
