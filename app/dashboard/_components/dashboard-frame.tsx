"use client";

import { DashboardMobileNav } from "@/app/dashboard/_components/dashboard-mobile-nav";
import { DashboardMobileServerBar } from "@/app/dashboard/_components/dashboard-mobile-server-bar";
import { DashboardServerRail } from "@/app/dashboard/_components/dashboard-server-rail";
import { DashboardSidebar } from "@/app/dashboard/_components/dashboard-sidebar";
import { DashboardTopbar } from "@/app/dashboard/_components/dashboard-topbar";
import { useDashboard } from "@/app/dashboard/_components/dashboard-context";

type DashboardFrameProps = {
  children: React.ReactNode;
};

export function DashboardFrame({ children }: DashboardFrameProps) {
  const {
    guilds,
    activeGuildId,
    activeGuild,
    enabledCount,
    modules,
    setActiveGuildId,
  } = useDashboard();

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0d13] text-white">
      <DashboardServerRail
        guilds={guilds}
        activeGuildId={activeGuildId}
        onGuildChange={setActiveGuildId}
      />

      <DashboardSidebar activeGuild={activeGuild} />

      <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardTopbar
          activeGuild={activeGuild}
          enabledCount={enabledCount}
          totalModules={modules.length}
        />

        <DashboardMobileServerBar
          guilds={guilds}
          activeGuildId={activeGuildId}
          onGuildChange={setActiveGuildId}
        />

        <DashboardMobileNav />

        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          {children}
        </main>
      </section>
    </div>
  );
}
