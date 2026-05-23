"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardMobileNavItems } from "@/app/dashboard/_components/dashboard-nav-items";
import { cn } from "@/lib/utils";

export function DashboardMobileNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-white/8 bg-[#0f1117] px-4 py-3 lg:hidden">
      <div className="flex gap-2 overflow-x-auto">
        {dashboardMobileNavItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-primary/35 bg-primary/15 text-white"
                  : "border-white/10 bg-white/5 text-white/55 hover:bg-white/8 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
