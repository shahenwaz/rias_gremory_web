"use client";

import * as React from "react";
import { DashboardServerRail } from "@/components/dashboard/dashboard-server-rail";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { DashboardMobileServerBar } from "@/components/dashboard/dashboard-mobile-server-bar";
import type {
  DashboardGuild,
  DashboardModule,
  DashboardSettings,
} from "@/lib/dashboard-data";

type DashboardShellProps = {
  guilds: DashboardGuild[];
  settings: DashboardSettings[];
};

function buildModuleState(modules: DashboardModule[]) {
  return Object.fromEntries(
    modules.map((module: DashboardModule) => [module.id, module.enabled]),
  ) as Record<string, boolean>;
}

export function DashboardShell({ guilds, settings }: DashboardShellProps) {
  const firstGuild = guilds[0];
  const [activeGuildId, setActiveGuildId] = React.useState(
    firstGuild?.id ?? "",
  );

  const activeGuild =
    guilds.find((guild: DashboardGuild) => guild.id === activeGuildId) ??
    firstGuild;

  const activeSettings =
    settings.find(
      (dashboardSettings: DashboardSettings) =>
        dashboardSettings.guildId === activeGuildId,
    ) ?? settings[0];

  const [moduleState, setModuleState] = React.useState<Record<string, boolean>>(
    () => buildModuleState(activeSettings?.modules ?? []),
  );

  React.useEffect(() => {
    setModuleState(buildModuleState(activeSettings?.modules ?? []));
  }, [activeGuildId, activeSettings]);

  if (!activeGuild || !activeSettings) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <div className="max-w-sm rounded-2xl border border-white/10 bg-white/4 p-6">
          <p className="text-sm font-medium text-white">No dashboard data</p>
          <p className="mt-2 text-sm text-white/55">
            Add a mock guild first, then reload the dashboard.
          </p>
        </div>
      </div>
    );
  }

  const modules = activeSettings.modules.map((module: DashboardModule) => ({
    ...module,
    enabled: moduleState[module.id] ?? module.enabled,
  }));

  const enabledCount = modules.filter(
    (module: DashboardModule) => module.enabled,
  ).length;

  function toggleModule(moduleId: string) {
    setModuleState((currentState: Record<string, boolean>) => ({
      ...currentState,
      [moduleId]: !currentState[moduleId],
    }));
  }

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

        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          <DashboardOverview
            activeGuild={activeGuild}
            settings={activeSettings}
            modules={modules}
            enabledCount={enabledCount}
            onToggleModule={toggleModule}
          />
        </main>
      </section>
    </div>
  );
}
