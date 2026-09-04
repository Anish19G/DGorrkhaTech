"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { LogOut } from "lucide-react";
import { adminLogout, adminMe } from "@/lib/api";
import type { AdminUser } from "@/lib/types";

const navItems = [
  { href: "/admin", label: "Leads" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/blog", label: "Blog" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    adminMe()
      .then((user) => {
        if (!cancelled) setAdmin(user);
      })
      .catch(() => {
        if (!cancelled) router.replace("/admin/login");
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  const onLogout = async () => {
    await adminLogout();
    router.push("/admin/login");
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Loading admin dashboard…
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-60 flex-shrink-0 border-r border-slate-200 bg-white p-6 sm:block">
        <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-white">
            DG
          </span>
          Admin
        </div>
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "block rounded-lg px-3 py-2 text-sm font-medium",
                pathname === item.href
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={onLogout}
          className="mt-8 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          <LogOut size={16} /> Sign out
        </button>
      </aside>
      <main className="flex-1 p-6 sm:p-10">
        <p className="mb-6 text-sm text-slate-500">Signed in as {admin.email}</p>
        {children}
      </main>
    </div>
  );
}
