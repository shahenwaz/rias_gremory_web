import {
  Bot,
  Hash,
  LayoutDashboard,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardGuild } from "@/lib/dashboard-data";

type DashboardSidebarProps = {
  activeGuild: DashboardGuild;
};

export function DashboardSidebar({ activeGuild }: DashboardSidebarProps) {
  return (
    <aside className="hidden h-screen w-72 shrink-0 overflow-hidden border-r border-white/8 bg-[#101218] lg:flex lg:flex-col">
      <div className="shrink-0 border-b border-white/8 p-4">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/35">
          Control Panel
        </p>

        <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 text-sm font-bold text-primary">
              {activeGuild.icon}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {activeGuild.name}
              </p>
              <p className="text-xs text-white/45">{activeGuild.role}</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4">
        <SidebarGroup title="Overview">
          <SidebarItem active icon={<LayoutDashboard className="h-4 w-4" />}>
            Dashboard
          </SidebarItem>
          <SidebarItem icon={<Settings2 className="h-4 w-4" />}>
            Module Settings
          </SidebarItem>
        </SidebarGroup>

        <SidebarGroup title="Moderation">
          <SidebarItem icon={<ShieldCheck className="h-4 w-4" />}>
            Logs
          </SidebarItem>
          <SidebarItem icon={<Bot className="h-4 w-4" />}>
            Mod Actions
          </SidebarItem>
        </SidebarGroup>

        <SidebarGroup title="System">
          <SidebarItem icon={<Hash className="h-4 w-4" />}>
            Control Panel Logs
          </SidebarItem>
        </SidebarGroup>
      </nav>
    </aside>
  );
}

function SidebarGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
        {title}
      </p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SidebarItem({
  active = false,
  icon,
  children,
}: {
  active?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
        active
          ? "bg-primary/15 text-white"
          : "text-white/50 hover:bg-white/6 hover:text-white",
      )}
    >
      {icon}
      {children}
    </button>
  );
}
