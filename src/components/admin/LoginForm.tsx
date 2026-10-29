"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { apiRequest } from "@/lib/api-client";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await apiRequest("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!result.ok) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  // Upgraded input class with softer borders, padding for the left icon, and a focus ring
  const inputClass =
    "w-full rounded-xl border border-ink/20 bg-paper/50 px-11 py-3 text-sm text-ink outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-ink/40";

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-ink/10 bg-paper p-8 shadow-sm sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Please enter your details to sign in.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-ink"
          >
            Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink/40">
              <Mail size={18} />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="username"
              className={inputClass}
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-ink">
              Password
            </label>
            <Link
              href="/admin/forgot-password"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink/40">
              <Lock size={18} />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-2 text-ink/40 hover:bg-ink/5 hover:text-ink transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-100"
          >
            <AlertCircle size={18} className="shrink-0 text-red-500" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-paper shadow-md shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign in"}
        </button>
      </form>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Loader2, AlertCircle } from "lucide-react";
// import { apiRequest } from "@/lib/api-client";

// export default function LoginForm() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const result = await apiRequest("/api/admin/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!result.ok) {
//       setError(result.error);
//       setLoading(false);
//       return;
//     }

//     router.push("/admin");
//     router.refresh();
//   };

//   const inputClass =
//     "mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary transition-colors bg-paper";

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//       <div>
//         <label htmlFor="email" className="text-sm font-medium text-ink">
//           Email
//         </label>
//         <input
//           id="email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           autoComplete="username"
//           className={inputClass}
//         />
//       </div>
//       <div>
//         <label htmlFor="password" className="text-sm font-medium text-ink">
//           Password
//         </label>
//         <input
//           id="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           autoComplete="current-password"
//           className={inputClass}
//         />
//       </div>

//       {error && (
//         <div
//           role="alert"
//           className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
//         >
//           <AlertCircle size={16} className="shrink-0" /> {error}
//         </div>
//       )}

//       <button
//         type="submit"
//         disabled={loading}
//         className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-paper hover:bg-primary-dark transition-colors disabled:opacity-60"
//       >
//         {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign in"}
//       </button>
//     </form>
//   );
// }
