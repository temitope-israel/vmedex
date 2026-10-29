import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import LoginForm from "@/components/admin/LoginForm";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Sign In | VMedex Digital",
  robots: { index: false, follow: false }, // keep admin pages out of search results
};

export default async function AdminLoginPage() {
  let signedIn = false;
  try {
    signedIn = Boolean(await getSession());
  } catch {
    // Database unreachable: just show the form, which explains problems properly
  }
  // redirect() works by throwing a special signal, so it must sit OUTSIDE the try
  if (signedIn) redirect("/admin");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-paper px-4 py-12 sm:px-6 lg:px-8">
      {/* Modern subtle ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="w-full max-w-md rounded-[2rem] border border-ink/5 bg-paper/80 p-8 shadow-2xl shadow-ink/5 backdrop-blur-xl sm:p-12">
        {/* Centralized Header Section with Icon */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <ShieldCheck size={32} strokeWidth={1.5} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Admin Sign In
          </h1>
          <p className="mt-3 text-sm font-medium text-ink/60 leading-relaxed">
            Secure access to the VMedex Digital{" "}
            <br className="hidden sm:block" /> content manager.
          </p>
        </div>

        {/* Form Component */}
        <LoginForm />

        {/* Minimal Footer Context */}
        <div className="mt-8 text-center text-xs font-medium text-ink/40">
          Secured by VMedex Digital Infrastructure
        </div>
      </div>
    </div>
  );
}

// import type { Metadata } from "next";
// import { redirect } from "next/navigation";
// import { getSession } from "@/lib/session";
// import LoginForm from "@/components/admin/LoginForm";

// export const metadata: Metadata = {
//   title: "Admin Sign In | VMedex Digital",
//   robots: { index: false, follow: false }, // keep admin pages out of search results
// };

// export default async function AdminLoginPage() {
//   let signedIn = false;
//   try {
//     signedIn = Boolean(await getSession());
//   } catch {
//     // Database unreachable: just show the form, which explains problems properly
//   }
//   // redirect() works by throwing a special signal, so it must sit OUTSIDE the try
//   if (signedIn) redirect("/admin");

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-paper px-6 py-32">
//       <div className="w-full max-w-sm">
//         <h1 className="text-2xl font-bold text-ink">Admin sign in</h1>
//         <p className="mb-8 mt-1 text-sm text-ink/50">
//           VMedex Digital content manager
//         </p>
//         <LoginForm />
//       </div>
//     </div>
//   );
// }

// import type { Metadata } from "next";
// import LoginForm from "@/components/admin/LoginForm";

// export const metadata: Metadata = {
//   title: "Admin Sign In | VMedex Digital",
//   robots: { index: false, follow: false }, // keep admin pages out of search results
// };

// export default function AdminLoginPage() {
//   return (
//     <div className="min-h-screen bg-paper flex items-center justify-center px-6 py-32">
//       <div className="w-full max-w-sm">
//         <h1 className="text-2xl font-bold text-ink">Admin sign in</h1>
//         <p className="mt-1 mb-8 text-sm text-ink/50">
//           VMedex Digital content manager
//         </p>
//         <LoginForm />
//       </div>
//     </div>
//   );
// }
