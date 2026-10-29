"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Clapperboard,
  ExternalLink,
  ListOrdered,
  KeyRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";
import React from "react";
import type { AccountRole } from "@/lib/constants";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  matchPrefixes?: string[]; // extra paths that should also highlight this item
  soon?: boolean;
  adminOnly?: boolean;
};

const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  {
    href: "/admin/training",
    label: "Cohorts",
    icon: Clapperboard,
    matchPrefixes: ["/admin/training/cohorts"],
  },
  {
    href: "/admin/training/curriculum",
    label: "Curriculum",
    icon: ListOrdered,
  },
  { href: "/admin/users", label: "Users", icon: Users, adminOnly: true },
  { href: "/admin/account", label: "Account", icon: KeyRound },
];

// "soon" items are shown but not clickable until we build them
// const navItems: NavItem[] = [
//   { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
//   {
//     href: "/admin/training",
//     label: "Training",
//     icon: Clapperboard,
//     // soon: true,
//   },
// ];

export default function AdminShell({
  email,
  role,
  children,
}: {
  email: string;
  role: AccountRole;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (item: NavItem) =>
    pathname === item.href ||
    (item.matchPrefixes ?? []).some((p) => pathname.startsWith(p));

  // const isActive = (item:NavItem) => item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const itemClass =
    "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors";

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="bg-ink text-paper md:sticky md:top-0 md:flex md:h-screen md:w-64 md:shrink-0 md:flex-col">
        {/* Brand row. On phones it also holds Sign out */}
        <div className="flex items-center justify-between px-5 py-4 md:block md:border-b md:border-white/10 md:px-6 md:py-6">
          <div>
            <p className="text-sm font-black uppercase tracking-widest">
              VMedex
            </p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
              Content Manager
            </p>
          </div>
          <div className="md:hidden">
            <LogoutButton />
          </div>
        </div>

        {/* Navigation: a scrolling row on phones, a column on desktop */}
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:overflow-visible md:py-4">
          {navItems.filter((item) => !item.adminOnly || role === "admin").map((item) => {
            const Icon = item.icon;

            if (item.soon) {
              return (
                <span
                  key={item.href}
                  aria-disabled="true"
                  className={`${itemClass} cursor-not-allowed text-paper/35`}
                >
                  <Icon size={16} />
                  {item.label}
                  <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider">
                    Soon
                  </span>
                </span>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${itemClass} ${
                  isActive(item)
                    ? "bg-primary text-paper"
                    : "text-paper/70 hover:bg-white/5 hover:text-paper"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${itemClass} text-paper/70 hover:bg-white/5 hover:text-paper md:mt-4`}
          >
            <ExternalLink size={16} />
            View site
          </a>
        </nav>

        {/* Account block, desktop only */}
        <div className="hidden md:block border-t border-white/10 px-6 py-5">
          <p className="truncate text-sm text-paper/50">{email} · {role}</p>
          <div className="mt-2">
            <LogoutButton />
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 bg-ink/[0.03] px-6 py-10 md:px-10">
        {children}
      </main>
    </div>
  );
}
