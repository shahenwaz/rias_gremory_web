"use client";

import { Bot, Hash, Users } from "lucide-react";
import { DashboardInfoCard } from "@/app/dashboard/_components/dashboard-info-card";
import { DashboardStatCard } from "@/app/dashboard/_components/dashboard-stat-card";
import { useDashboard } from "@/app/dashboard/_components/dashboard-context";

export function DashboardHome() {
  const { activeGuild, activeSettings, modules, enabledCount } = useDashboard();

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-white/10 bg-white/4 p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/75">
          Dashboard Overview
        </p>

        <h1 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Manage {activeGuild.name} from one clean control panel.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
          A simple overview for the selected server. Module settings and logs
          are now separated into their own pages.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Members"
          value={activeGuild.memberCount.toLocaleString()}
        />
        <DashboardStatCard label="Role" value={activeGuild.role} />
        <DashboardStatCard
          label="Modules"
          value={`${enabledCount}/${modules.length}`}
        />
        <DashboardStatCard
          label="Logs"
          value={activeSettings.controlPanelLogs.enabled ? "Active" : "Off"}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <DashboardInfoCard
          icon={<Users className="h-4 w-4" />}
          label="Permission"
          title="Admin access verified"
          text="Mocked for now. Later Discord OAuth will check Manage Server or Administrator permission."
        />

        <DashboardInfoCard
          icon={<Bot className="h-4 w-4" />}
          label="Bot"
          title={
            activeGuild.botInstalled ? "Bot connected" : "Bot not installed"
          }
          text="The dashboard saves settings. The bot reads those settings and performs actions in Discord."
        />

        <DashboardInfoCard
          icon={<Hash className="h-4 w-4" />}
          label="Control logs"
          title={activeSettings.controlPanelLogs.lastAction}
          text={`Last updated ${activeSettings.controlPanelLogs.lastUpdated} in ${activeSettings.controlPanelLogs.channelName}.`}
        />
      </section>
    </div>
  );
}
