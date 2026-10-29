"use client";

import { useState } from "react";

export default function LogoutButton({
  className = "text-sm font-medium text-paper/70 hover:text-paper cursor-pointer transition-colors",
}: {
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (!res.ok) throw new Error("Sign out failed");
      // A full page load throws away every cached admin page
      window.location.assign("/admin/login");
    } catch {
      // If sign-out silently failed offline, the person would think they were
      // logged out while the cookie was still valid. So we say so.
      setError("Couldn't sign out. Check your connection and try again.");
      setBusy(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        disabled={busy}
        className={className}
      >
        {busy ? "Signing out..." : "Sign out"}
      </button>
      {error && (
        <p role="alert" className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LogoutButton({
//   className = "text-2xl font-medium text-paper hover:text-ink transition-colors cursor-pointer",
// }: {
//   className?: string;
// }) {
//   const router = useRouter();
//   const [error, setError] = useState("");

//   const handleLogout = async () => {
//     setError("");
//     try {
//       const res = await fetch("/api/admin/logout", { method: "POST" });
//       if (!res.ok) throw new Error("Sign out failed");
//       router.push("/admin/login");
//       router.refresh();
//     } catch {
//       // If sign-out silently failed offline, the person would think they were
//       // logged out while the cookie was still valid. So we say so.
//       setError("Couldn't sign out. Check your connection and try again.");
//     }
//   };

//   return (
//     <div>
//       <button type="button" onClick={handleLogout} className={className}>
//         Sign out
//       </button>
//       {error && (
//         <p role="alert" className="mt-1 text-xs text-red-400">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }
