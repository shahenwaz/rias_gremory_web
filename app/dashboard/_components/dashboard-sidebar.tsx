"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  dashboardNavGroups,
  type DashboardNavGroup,
  type DashboardNavItem,
} from "@/app/dashboard/_components/dashboard-nav-items";
import { cn } from "@/lib/utils";
import type { DashboardGuild } from "@/app/dashboard/_data/dashboard-data";

type DashboardSidebarProps = {
  activeGuild: DashboardGuild;
};

export function DashboardSidebar({ activeGuild }: DashboardSidebarProps) {
  return (
    <aside className="hidden h-full w-72 shrink-0 overflow-hidden rounded-t-2xl bg-[#101218] lg:flex lg:flex-col">
      <div className="px-3 pt-3 pb-2 shrink-0">
        <div className="rounded-md border border-white/10 bg-white/5 p-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-10 h-10 text-xs font-bold rounded-md shrink-0 bg-primary/18 text-primary">
              {activeGuild.icon}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold leading-5 text-white truncate">
                {activeGuild.name}
              </p>
              <p className="text-xs leading-4 text-white/42">
                {activeGuild.role}
              </p>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 min-h-0 px-3 py-2 space-y-3 overflow-y-auto">
        {dashboardNavGroups.map((group: DashboardNavGroup) => (
          <SidebarGroup key={group.title} group={group} />
        ))}
      </nav>
    </aside>
  );
}

function SidebarGroup({ group }: { group: DashboardNavGroup }) {
  return (
    <div>
      <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/28">
        {group.title}
      </p>

      <div className="space-y-0.5">
        {group.items.map((item: DashboardNavItem) => (
          <SidebarItem key={item.href} item={item} />
        ))}
      </div>
    </div>
  );
}

function SidebarItem({ item }: { item: DashboardNavItem }) {
  const pathname = usePathname();
  const Icon = item.icon;

  const isActive = item.exact
    ? pathname === item.href
    : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex h-8 items-center gap-2 rounded-md px-2.5 text-[13px] transition-colors",
        isActive
          ? "bg-primary/14 text-white"
          : "text-white/48 hover:bg-white/6 hover:text-white/82",
      )}
    >
      {isActive ? (
        <span className="absolute left-0 h-4 w-0.5 rounded-r-sm bg-primary" />
      ) : null}

      <Icon
        className={cn(
          "h-3.5 w-3.5 shrink-0 transition-colors",
          isActive ? "text-white" : "text-white/42 group-hover:text-white/75",
        )}
      />

      <span className="truncate">{item.label}</span>
    </Link>
  );
}
