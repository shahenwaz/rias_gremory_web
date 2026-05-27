"use client";

import { Command, Hash, ListChecks, Users } from "lucide-react";
import { ActiveModulesSection } from "@/app/dashboard/_components/overview/active-modules-section";
import { DashboardControlHero } from "@/app/dashboard/_components/overview/dashboard-control-hero";
import { OverviewMetricCard } from "@/app/dashboard/_components/overview/overview-metric-card";
import { QuickActionsPanel } from "@/app/dashboard/_components/overview/quick-actions-panel";
import { useServerConfigSummary } from "@/app/dashboard/_components/overview/use-server-config-summary";
import { useDashboard } from "@/app/dashboard/_components/dashboard-context";
import type { DashboardModule } from "@/app/dashboard/_data/dashboard-data";

export function DashboardHome() {
  const { activeGuild, activeSettings, modules, enabledCount } = useDashboard();
  const serverConfig = useServerConfigSummary(activeGuild.id);

  const readyModules = modules.filter(
    (module: DashboardModule) => module.status === "ready",
  );

  const needsApiModules = modules.filter(
    (module: DashboardModule) => module.status === "needs-api",
  );

  const enabledModules = modules.filter(
    (module: DashboardModule) => module.enabled,
  );

  return (
    <div className="space-y-4">
      <DashboardControlHero
        guildName={activeGuild.name}
        configStatus={serverConfig.status}
        prefixLabel={serverConfig.prefixLabel}
        channelAccessLabel={serverConfig.channelAccessLabel}
        errorMessage={serverConfig.errorMessage}
      />

      <section className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewMetricCard
          icon={<Users className="size-4" />}
          label="Members"
          value={activeGuild.memberCount.toLocaleString()}
          hint="Server size"
        />

        <OverviewMetricCard
          icon={<Hash className="size-4" />}
          label="Prefix"
          value={serverConfig.prefixLabel}
          hint="Command trigger"
          isLoading={serverConfig.status === "loading"}
        />

        <OverviewMetricCard
          icon={<Command className="size-4" />}
          label="Command Channels"
          value={serverConfig.commandReadyLabel}
          hint={serverConfig.disabledChannelLabel}
          isLoading={serverConfig.status === "loading"}
        />

        <OverviewMetricCard
          icon={<ListChecks className="size-4" />}
          label="Modules"
          value={`${enabledCount}/${modules.length}`}
          hint={`${readyModules.length} ready, ${needsApiModules.length} need API`}
        />
      </section>

      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
        <ActiveModulesSection modules={enabledModules} />

        <QuickActionsPanel controlPanelLogs={activeSettings.controlPanelLogs} />
      </section>
    </div>
  );
}
