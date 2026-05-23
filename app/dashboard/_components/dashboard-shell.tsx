"use client";

import { DashboardFrame } from "@/app/dashboard/_components/dashboard-frame";
import { DashboardProvider } from "@/app/dashboard/_components/dashboard-context";
import type {
  DashboardGuild,
  DashboardSettings,
} from "@/app/dashboard/_data/dashboard-data";

type DashboardShellProps = {
  guilds: DashboardGuild[];
  settings: DashboardSettings[];
  children: React.ReactNode;
};

export function DashboardShell({
  guilds,
  settings,
  children,
}: DashboardShellProps) {
  if (!guilds.length || !settings.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0d13] px-4 text-center text-white">
        <div className="max-w-sm rounded-2xl border border-white/10 bg-white/4 p-6">
          <p className="text-sm font-medium">No dashboard data</p>
          <p className="mt-2 text-sm text-white/55">
            Add a mock guild first, then reload the dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardProvider guilds={guilds} settings={settings}>
      <DashboardFrame>{children}</DashboardFrame>
    </DashboardProvider>
  );
}
