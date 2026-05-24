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
  const { guilds, activeGuildId, activeGuild, setActiveGuildId } =
    useDashboard();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0b0d13] text-white">
      <DashboardTopbar />

      <div className="flex min-h-0 flex-1 overflow-hidden bg-[#0b0d13]">
        <DashboardServerRail
          guilds={guilds}
          activeGuildId={activeGuildId}
          onGuildChange={setActiveGuildId}
        />

        <div className="flex min-h-0 flex-1 rounded-l-2xl bg-[#070910]">
          <DashboardSidebar activeGuild={activeGuild} />

          <section className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <DashboardMobileServerBar
              guilds={guilds}
              activeGuildId={activeGuildId}
              onGuildChange={setActiveGuildId}
            />

            <DashboardMobileNav />

            <main className="flex-1 min-h-0 px-4 py-5 overflow-y-auto lg:px-5">
              {children}
            </main>
          </section>
        </div>
      </div>
    </div>
  );
}
